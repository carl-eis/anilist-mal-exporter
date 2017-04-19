Anilist.co to MAL Exporter
==========================

### Preamble
This is a semi user-friendly command-line app used for exporting your anime list
from `ANILIST.CO` to `MYANIMELIST.COM`

I will not be held accountable for damaged anime lists resulting from
the usage of this applicaton.

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

    $ node index

If your config is set correctly, all your anime will be exported into an
MAL-compatible XML file at `datafiles/anilist.xml`

### The hard part!

This is where the manual hard labour comes in. You will notice that in
`datafiles/anilist.xml`, each anime entry contains a `REPLACE_ME` value
for `<series_animedb_id></series_animedb_id>` tags.

You will need to
- Search the name of each anime
- Replace the REPLACE_ME value in each tag with the correct AniDB ID
corresponding to the anime name.

Some notes:
- You can find this ID in the url bar of any anime on MAL. Just click
on the anime / hover over a link to an anime page and you will see
the URL contains the correct ID.

Happy linking!

### PS

Suggestions are welcome. If you are able to find a way to automagically
lookup these AniDB ID's, PLEASE send me a pull request.

This will save LOTS OF TIME for LOTS OF PEOPLE.

Thanks!