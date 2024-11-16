import { Octokit } from "octokit";
import fs from "node:fs";

async function generateContributors() {
  const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });

  const PAGE_SIZE = 25;
  let results = [];
  let batch = [];
  let pageNumber = 1;
  do {
    const res = await octokit.rest.repos.listContributors({
      owner: "grain-lang",
      repo: "grain",
      page: pageNumber,
      per_page: PAGE_SIZE,
    });

    if (res.status !== 200) {
      console.error("Failed to get contributors");
      return;
    }

    batch = res.data;
    results.push(...batch);
    pageNumber++;
  } while (batch.length === PAGE_SIZE);

  fs.writeFileSync("../contributors.json", JSON.stringify(results, undefined, 4));
}

await generateContributors();
