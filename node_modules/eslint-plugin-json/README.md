# eslint-plugin-json

[![Build Status](https://travis-ci.org/azeemba/eslint-plugin-json.svg)](https://travis-ci.org/azeemba/eslint-plugin-json) [![Code Climate](https://codeclimate.com/github/azeemba/eslint-plugin-json/badges/gpa.svg)](https://codeclimate.com/github/azeemba/eslint-plugin-json)

Lint JSON files

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-json`:

```
$ npm install eslint-plugin-json --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-json` globally.

## Usage

Add `json` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "json"
    ]
}
```

You can run ESLint on individual JSON files or you can use the `--ext` flag to add JSON files to the list.

```
eslint . --ext .json --ext .js
eslint example.json
```

## FAQs


#### How does eslint-plugin-json work?

Starting from version 1.3, this plugin relies on what [VSCode](https://github.com/Microsoft/vscode-json-languageservice)
uses for its implementation of JSON validation. 
This plugin used to use JSHint, however due to the large size of 
this dependency, it was replaced.


#### Why doesn't this plugin use `eslint` itself or just `JSON.parse`?

`eslint`'s parser is a JavaScript parser. JSON is a stricter subset and things
that are valid JavaScript are not valid JSON. This is why something more specific 
is more appropriate.

While `JSON.parse` seems ideal, it is not designed to continue after the first error.
So if you have a missing trailing comma in the start of the file, the rest of the file
will go unlinted. A smarter parser that can self-correct after seeing errors is needed
which the VSCode implementation provides by leveraging the
[jsonc-parser](https://www.npmjs.com/package/jsonc-parser) module.


#### Will this plugin provide more configuration?

Now that we have moved to a different implementation for our validation, a lot
more things are possible. Optional support for JSON comments, trailing commas
and schemas are possible.

Additionally, support for autofixing common errors is also possible.


#### Is `eslint` really the best tool to lint my JSON?

Not really. `eslint` plugin interface wasn't designed to lint a completely different language but
its interface is flexible enough to allow it. So this plugin is certainly unusual.

Ideally, your editor would natively supports linting JSON. If it doesn't though, then might as well
use this plugin. Hacky linting is better than no linting :)