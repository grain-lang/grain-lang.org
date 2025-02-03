---
title: Grain 🧡 Hacktoberfest!
subtitle: Check out everything contributed to Grain for Hacktoberfest.
date: 2020-11-13 12:00:00
author: Blaine Bublitz
cover: /src/images/cover/wesley-tingey-BCri44lkmhQ-unsplash.jpg
coverAttribution: Wesley Tingey / Unsplash
tags:
  - Hacktoberfest
---

Last month, Grain took part in [DigitalOcean's Hacktoberfest](https://hacktoberfest.digitalocean.com) event, which is a great resource for anyone that wants to get into Open Source. Whether you need guidance on _how_ to contribute or just need ideas for projects to help on, each October they provide a platform (and incentives!) for people to get involved.

We had some amazing developers jump in and contribute to Grain in October! And we wanted to take some time to thank everyone and highlight the work they did.

## Highlighting the Contributors

_Warning:_ Heavy use of exclamation points incoming.

[@bmakuh](https://github.com/bmakuh) submitted a bunch of pull requests for some long-standing improvements that needed to be made, including renaming our output filenames from `.wasm` to `.gr.wasm` and adding support for trailing commas in pretty much every data structure!

[@ohana54](https://github.com/ohana54) added many much-needed standard library methods, like `flatMap`/`find`/`findIndex` for Lists and `filter`/`reject` for Maps, while also cleaning up our standard library tests!

[@fa7ad](https://github.com/fa7ad) cleaned up a massive if-else chain with a constant pattern match (now that we support them) and wrote our `isnt` operator to check if two values aren't physically equal!

[@lvaniscak](https://github.com/lvaniscak) implemented `find` and `findIndex` methods in our Array standard library to match the List API!

[@clovis1122](https://github.com/clovis1122) wrote `Array.fill` and `Array.fillRange` methods for the standard library!

[@MScheibel](https://github.com/MScheibel) sent a pull request for the `Array.count` method in the standard library... and it was their first Pull Request __ever__!!

[@miguelcarvalho13](https://github.com/miguelcarvalho13) showed up and wrote an entire Queue implementation for our standard library. We're lining up to use it!

[@Dony477](https://github.com/Dony477) added `product` methods for both Lists and Arrays to generate cartesian products of tuples! Again, this was their first pull request. Color me impressed!

[@tmphey](https://github.com/tmphey) contributed `List.take`, `List.takeWhile`, and `List.sub` methods to the standard library, in service of future work on sorting methods. They even contributed the website documentation for these!

[@ng-marcus](https://github.com/ng-marcus) exploded onto the scene and added __language server protocol__ support to the Grain CLI and then went on to implement it in our VSCode extension! We now have inline errors and code lenses in VSCode, which is absolutely mind-blowing! We are also excited to have Marcus as a direct contributor on the [grain-language-server](https://github.com/grain-lang/grain-language-server) project.

## So Many Thanks

The amount of energy around the Grain project in October was astounding. Even though I was unavailable most of the month, I was watching the pull requests roll in while Oscar reviewed and guided everyone to get contributions merged.

When I finally had a chance to catch up, it took me a full day to review everything submitted throughout the month and my `git pull` actually pulled down more than 100 commits. That is mind-blowing for such an early stage project!

I can't thank everyone enough for this, and I really hope y'all continue to contribute. Or if you haven't contributed yet, feel free to join our [Discord](https://discord.com/invite/grain-lang) and we can guide you to landing some code of your own.

## Version 0.2.0 - Amaranth

All of this work was instrumental in our latest release: [__Grain v0.2.0__, codenamed Amaranth](https://github.com/grain-lang/grain/releases/tag/v0.2.0). We encourage you to clone the project and try it out today!
