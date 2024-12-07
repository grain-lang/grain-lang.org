export interface HeirarchicalHeading {
  id: string;
  text: string;
  subheadings: HeirarchicalHeading[];
}

export type BlogAuthor = "Oscar Spencer" | "Philip Blair" | "Blaine Bublitz" | "Marcus Roberts";
