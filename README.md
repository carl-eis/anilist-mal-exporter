Anilist.co to MAL Exporter
==========================

### Preamble
This is a semi user-friendly command-line app used for exporting your anime list
from `ANILIST.CO` to `MYANIMELIST.COM`

> DISCLAIMER: I will not be held accountable for damaged anime lists resulting from
> the usage of this applicaton. (This script should be safe to use, but nonetheless.)

You will need to install Node.js - if you have never used this before,
check out the relevant guide here:
- [Windows](https://github.com/carl-eis/Ultimate.Setup/wiki/Windows-Setup)
- [Linux / Unix](https://github.com/carl-eis/Ultimate.Setup/wiki/Node.js-Linux)

### Getting Started

Assuming you have node.js installed, clone the repo. Once you are in
the repo folder, run these commands:

    $ npm install -g yarn
    $ yarn

Then, copy the `config_example.json` file to `config.json` and edit
accordingly.

> Note: You wil be able to get your [Anilist API Credentials here.](https://anilist.co/settings/developer)

### Running the exporter

When in the directory, just run

    $ yarn start

If your config is set correctly, all your anime will be exported into an
MAL-compatible XML file at `datafiles/anilist.xml`

### Grabbing Anime ID's from MAL

The MAL API is currently down - because of this, you will have to manually insert the MAL ID of each anime in the above XML.

- Each ID value will be generated as `REPLACE_ME`
- Search the name of the anime on the MAL website
- Click on the desired result
- The numeric MAL ID of that anime will be in the searchbar
- Replace the `REPLACE_ME` section in the generated XML with this ID
- Continue this until you have replaced all of these values
- Your XML file should now be safe to import on the MAL website.

Enjoy!