import { ImageMetadata } from "astro";
import type { BlogAuthor } from "./types";

import oscarHeadshot from "./images/headshots/oscar-headshot-square.jpg";
import philipHeadshot from "./images/headshots/philip-headshot-square.jpg";
import blaineHeadshot from "./images/headshots/blaine-headshot-square.jpg";
import marcusHeadshot from "./images/headshots/marcus-headshot-square.jpg";

export interface AuthorInfo {
  mastodonLink?: string;
  blueskyProfile?: string;
  githubProfile: string;
  headshot: ImageMetadata;
}

export const authorInfoByName: Record<BlogAuthor, AuthorInfo> = {
  "Oscar Spencer": { blueskyProfile: "ospencer.dev", githubProfile: "ospencer", headshot: oscarHeadshot },
  "Philip Blair": { githubProfile: "peblair", headshot: philipHeadshot },
  "Blaine Bublitz": { mastodonLink: "https://fosstodon.org/@phated", githubProfile: "phated", headshot: blaineHeadshot },
  "Marcus Roberts": { githubProfile: "marcusroberts", headshot: marcusHeadshot },
};
