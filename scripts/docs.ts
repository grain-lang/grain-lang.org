import { Octokit } from "octokit";
import os from "node:os";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

// Constants
const GRAIN_ORG = "grain-lang";
const GRAIN_REPO = "grain";
const GRAIN_DOCS_PATH = "stdlib";
const VERSION_SKIP_LIST = ["v0.3.0", "v0.3.1", "v0.3.2"];
const FILE_SKIP_LIST = ["stdlib/README.md", "stdlib/CHANGELOG.md", "stdlib/runtime/"]

const cwd = path.dirname(url.fileURLToPath(import.meta.url));

if ('GITHUB_ACCESS_TOKEN' in process.env) {
  console.log("No Github access token found, rate limits may be hit.");
}
const auth = 'GITHUB_ACCESS_TOKEN' in process.env ? process.env.GITHUB_ACCESS_TOKEN : "";
const octokit = new Octokit({ auth });

const collectReleases = async (octokit: Octokit, page: number = 1) => {
  // TODO: Handle quota limits
  const {data, headers} = await octokit.rest.repos.listReleases({
    owner: GRAIN_ORG,
    repo: GRAIN_REPO,
    page
  });
  // Filter releases
  const releaseList = data.filter(({ tag_name }) => tag_name.startsWith("grain-") || tag_name == "preview");
  // Fetch next page if available
  const linkHeader = headers.link;
  const pagesRemaining = linkHeader && linkHeader.includes(`rel=\"next\"`);
  if (pagesRemaining) {
    releaseList.push(...await collectReleases(octokit, page + 1));
  }
  return releaseList;
}

const collectDocFiles = async (
  octokit: Octokit,
  ref: string, 
  path: string
): Promise<{ name: string, path: string, download_url: string | null }[]> => {
  // Fetch path content
  let {data} = await octokit.rest.repos.getContent({
    owner: GRAIN_ORG,
    repo: GRAIN_REPO,
    path,
    ref
  });
  const directoryContent = Array.isArray(data) ? data : [data];
  const documentList = [];
  for await (const entry of directoryContent) {
    if (entry.type == "file") {
      if (!entry.name.endsWith(".md")) continue;
      documentList.push(entry);
    } else if (entry.type == "dir") {
      // Recursively fetch directory content
      const dirContent = await collectDocFiles(octokit, ref, entry.path);
      documentList.push(...dirContent);
    }
  }
  return documentList;
}

const grainReleases = await collectReleases(octokit);
const versionList: string[] = [];
// Note: Using Promise.all so that we can fetch all releases asynchronously
await Promise.all(grainReleases.map(async (release) => {
  const version = release.tag_name.replace("grain-", "");
  if (VERSION_SKIP_LIST.includes(version)) return;
  versionList.push(version);
  const docsPath = path.join(cwd, "../src/content/docs/", version);
  // Only fetch docs if they don't exist
  const docsExist = fs.existsSync(docsPath);
  if (version != "preview" && docsExist) return;
  console.log("Fetching docs for release:", release.tag_name);
  const docFiles = await collectDocFiles(octokit, release.target_commitish, GRAIN_DOCS_PATH);
  if (docsExist) await fs.promises.rm(docsPath, { recursive: true });
  await fs.promises.mkdir(docsPath, { recursive: true });
  await Promise.all(docFiles.map(async (file) => {
    if (FILE_SKIP_LIST.some(prefix => file.path.startsWith(prefix))) return;
    if (!file.download_url) {
      console.log(`No download url for file: ${file} in version ${version}`);
      return;
    }
    const response = await fetch(file.download_url);
    if (response.status != 200) {
      console.log(`Failed to download file: ${file} in version ${version}`);
      return;
    }
    const content = await response.text();
    const docPath = path.join(docsPath, file.path);
    await fs.promises.mkdir(path.dirname(docPath), { recursive: true });
    await fs.promises.writeFile(docPath, content);
  }));
}));
await fs.promises.writeFile(path.join(cwd, "../src/content/docs/versions.json"), JSON.stringify(versionList.sort()));