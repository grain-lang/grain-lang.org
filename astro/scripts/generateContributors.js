import { Octokit } from "octokit";
import fs from "node:fs";

async function generateContributors() {
  const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });

  const results = await octokit.paginate(octokit.rest.repos.listContributors, {
    owner: "grain-lang",
    repo: "grain",
    per_page: 25,
  });

  fs.writeFileSync("../contributors.json", JSON.stringify(results, undefined, 4));
}

await generateContributors();
