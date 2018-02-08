# Grain Website

Documentation for the Grain programming language.

[![Build Status](https://travis-ci.org/grain-lang/grain-lang.github.io.svg?branch=docs-main)](https://travis-ci.org/grain-lang/grain-lang.github.io)

## About

This documentation site is a [Hexo](https://hexo.io/) site. All of the docs are generated from Markdown files, and Hexo builds a static website that is hosted on GitHub Pages from the `master` branch. Thus, all development is to be done on the `docs-main` branch, and the CI will pick up those changes and land them on `master`.

## Contributing

### Documentation Site

The documentation site is everything served from `/docs/` on the [main Grain website](https://grain-lang.org/).

To get the docs up and running locally, just run

```sh
npm install
npm start
```

This will install all the necessary dependencies and serve the website on port 4000.

For simple edits to the existing Markdown files, just edit them as you would any normal Markdown.

To add a new page, add a new Markdown file in the relevant location and update `_config.yml` to include it. It's the same as normal Markdown, but you must include a set of front matter, i.e. a set of key value pairs that begin the file and surrounded by dashes, like so:

```
---
title: Some Title of Some Topic
---

## Content begins here
```

The title is inserted at the beginning of the page, and is used in the sidebar. Thus, all headings in the Markdown files should start at heading level 2.

### Home Page

The home page is just static HTML/CSS. To get it running, start a web server in your local directory. For example:

```sh
python -m SimpleHTTPServer 4040
# This starts a server on port 4040
```

### Putting It All Together

If for some reason you wish to view the entire site running together, you can run

```sh
npm run build
```

and then follow the steps outlined in the Home Page section.

Don't commit the `/docs/` directory, as we wish to keep this repo clean (it's not in the `.gitignore` because those files need to be checked into source control for GitHub pages to work properly, and that's done automatically on the `master` branch).
