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

### Grabbing Anime ID's from MAL

You will need to resolve the anime names to MAL id numbers. Thankfully, I have 
a script which will do this for you. Simply run 

	$ node tester

This will take some time, as requests can only be made at a limited rate.

Your output will be available at `./datafiles/conversion.xml`, and this is 
the file you should upload to MyAnimeList. 

Enjoy!

### PS

Suggestions are welcome. If you are able to find a way to automagically
lookup these AniDB ID's, PLEASE send me a pull request.

This will save LOTS OF TIME for LOTS OF PEOPLE.

Thanks!