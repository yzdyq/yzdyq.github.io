import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const config = await readFile(new URL("../wrangler.toml", import.meta.url), "utf8");
const version = config.match(/^HUGO_VERSION\s*=\s*"([^"]+)"\s*$/m)?.[1];

if (!version) {
  throw new Error("HUGO_VERSION is missing from wrangler.toml [vars].");
}

if (!["win32", "linux"].includes(process.platform) || process.arch !== "x64") {
  throw new Error(`Unsupported Hugo build platform: ${process.platform}/${process.arch}`);
}

const target = process.platform === "win32" ? "windows-amd64" : "linux-amd64";
const archiveExtension = process.platform === "win32" ? "zip" : "tar.gz";
const binaryName = process.platform === "win32" ? "hugo.exe" : "hugo";
const archiveName = `hugo_${version}_${target}.${archiveExtension}`;
const downloadUrl = `https://github.com/gohugoio/hugo/releases/download/v${version}/${archiveName}`;
const tempDirectory = await mkdtemp(join(tmpdir(), "hugo-build-"));
const archivePath = join(tempDirectory, archiveName);

try {
  const response = await fetch(downloadUrl);
  if (!response.ok) {
    throw new Error(`Failed to download Hugo ${version}: HTTP ${response.status}`);
  }

  await writeFile(archivePath, Buffer.from(await response.arrayBuffer()));

  const extraction = spawnSync(
    "tar",
    process.platform === "win32"
      ? ["-xf", archivePath, "-C", tempDirectory, binaryName]
      : ["-xzf", archivePath, "-C", tempDirectory, binaryName],
    { stdio: "inherit" },
  );
  if (extraction.error) {
    throw extraction.error;
  }
  if (extraction.status !== 0) {
    throw new Error(`Failed to extract Hugo ${version}.`);
  }

  const build = spawnSync(join(tempDirectory, binaryName), ["--gc", "--minify"], {
    cwd: process.cwd(),
    stdio: "inherit",
  });
  if (build.error) {
    throw build.error;
  }
  if (build.status !== 0) {
    process.exitCode = build.status ?? 1;
  }
} finally {
  await rm(tempDirectory, { recursive: true, force: true });
}
