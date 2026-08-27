import { Octokit } from "octokit";
import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";

async function generateContributors() {
  const octokit = new Octokit({ auth: process.env.GITHUB_ACCESS_TOKEN });

  const repos = await octokit.paginate(octokit.rest.repos.listForOrg, {
    org: "grain-lang",
    per_page: 100,
  });

  const repoContributions = await Promise.all(
    repos
      .filter((repo) => !repo.fork)
      .map((repo) =>
        octokit.paginate(octokit.rest.repos.listContributors, {
          owner: "grain-lang",
          repo: repo.name,
          per_page: 100,
        }),
      ),
  );

  const contributionsFlattened = repoContributions.flat();

  const groupedByLogin = Object.groupBy(contributionsFlattened, (c) => c.login);
  const results = Object.entries(groupedByLogin).map(
    ([login, contributionInfos]) => ({
      login,
      profileUrl: contributionInfos[0].html_url,
      avatarUrl: contributionInfos[0].avatar_url,
      count: contributionInfos.reduce((acc, c) => acc + c.contributions, 0),
    }),
  );

  const cwd = path.dirname(url.fileURLToPath(import.meta.url));
  await fs.writeFile(
    path.join(cwd, "..", "contributors.json"),
    JSON.stringify(results, undefined, 4),
  );
}

await generateContributors();
