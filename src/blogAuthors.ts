import { ImageMetadata } from "astro";
import type { BlogAuthor } from "./types";

import oscarHeadshot from "./images/headshots/oscar-headshot-square.jpg";
import philipHeadshot from "./images/headshots/philip-headshot-square.jpg";
import blaineHeadshot from "./images/headshots/blaine-headshot-square.jpg";
import marcusHeadshot from "./images/headshots/marcus-headshot-square.jpg";

export const authorInfo: Record<BlogAuthor, { xLink: string; github: string; headshot: ImageMetadata }> = {
  "Oscar Spencer": { xLink: "oscar_spen", github: "ospencer", headshot: oscarHeadshot },
  "Philip Blair": { xLink: "Philip_E_Blair", github: "peblair", headshot: philipHeadshot },
  "Blaine Bublitz": { xLink: "BlaineBublitz", github: "phated", headshot: blaineHeadshot },
  "Marcus Roberts": { xLink: "marcusr", github: "marcusroberts", headshot: marcusHeadshot },
};
