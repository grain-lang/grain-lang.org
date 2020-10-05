<div align="center">
  <a href="https://grain-lang.org/">
    <img src="https://raw.githubusercontent.com/grain-lang/grain/master/grain_shorthand_color.png" alt="Grain" height="200" />
  </a>
</div>

# Grain Website

Documentation for the Grain programming language at [grain-lang.org](https://grain-lang.org/).

[![Netlify Status](https://api.netlify.com/api/v1/badges/62e3f960-de88-4a28-a8f8-b8dddca145cb/deploy-status)](https://app.netlify.com/sites/grain-lang/deploys)

## About

This documentation site is a [Hexo](https://hexo.io/) site. All of the docs are generated from Markdown files, and Hexo builds a static website that is hosted on Netlify.

## Contributing

### Cloning the Repository

Since this repo contains a git submodule, it's easiest to clone while including submodules:

```sh
git clone git@github.com:grain-lang/grain-lang.org.git --recurse-submodules
```

If you've already cloned the repo without the submodules, you can pull them like so:

```sh
git pull --recurse-submodules
```

### Editing a Document

To make a change to a document, edit the corresponding Markdown file in [src](src). The file path matches the URL path after `/docs`, but if you have trouble finding the page you're looking for, you can click the "Edit on GitHub" button at the top of page on the website.

### Adding a New Document

Create your new Markdown file in `src`. You'll also need to update [docs_config.yml](docs_config.yml) to include your new page in the sidebar. Each document starts with some front-matter, which is a bit of yml/json that is given to the renderer. For now, this only includes the title of the page. Since the title of the page is an `h1`, headers in your document should begin at level 2:

```markdown
---
title: Some Title of Some Topic
---

## Content Begins Here
```

### Previewing the Site

Once a PR is created, Netlify will create a preview site and comment on the PR with a link. If you'd like to view your changes locally,

For the docs, run:

```sh
npm install
npm run start-docs
```

For the blog, run:

```sh
npm install
npm run start-blog
```

This will install all build dependencies and serve the website on port 3000.
