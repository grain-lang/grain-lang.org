import { Octokit } from "octokit";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

async function generateContributors() {
  const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });

  const results = await octokit.paginate(octokit.rest.repos.listContributors, {
    owner: "grain-lang",
    repo: "grain",
    per_page: 25,
  });

  const cwd = path.dirname(url.fileURLToPath(import.meta.url));
  fs.writeFileSync(path.join(cwd, "..", "contributors.json"), JSON.stringify(results, undefined, 4));
}

await generateContributors();
