# Lerna Update Wizard

Command line interface for simplifying the process of bulk updating dependencies across multiple Lerna packages.

## Install

```bash
$ yarn add --dev lerna-update-wizard
```

Or via NPM:

```bash
$ npm install --save-dev lerna-update-wizard
```

If installed globally, it can be used independently on any project:

```bash
$ yarn global add lerna-update-wizard
```

## Usage

Simply run the `lernaupdate` command in the root of a Lerna-based project:

```bash
$ lernaupdate
```

Or from the outside by specifying the path to the project:

```bash
$ lernaupdate ~/projects/my-lerna-project
```

## Features

### Update dependencies across packages

1. Search for and select the **dependency** to upgrade
2. Select the **packages** in which you wish to perform the upgrade
3. Pick the desired **version** to be installed for the dependency

![Update dependency](/public/update.gif?raw=true "Update dependency")

### Add new dependencies across packages

1. Enter the name of a **dependency** not already in your project
2. Select the **packages** in which to add the dependency
3. Pick the desired **version** to be installed for the dependency
4. When prompted, specify dependency **type** for each package (normal/dev/peer)

![Add packages](/public/add.gif?raw=true "Add dependency")

### Deduplicate dependencies across packages

1. Run the command with the `--dedupe` option
2. Only dependencies installed with 2 or more differing versions will be presented
3. Complete the flow like normal (described above)

![Deduplicate packages](/public/dedupe.gif?raw=true "Deduplicate dependency")

### Auto-generate Git branch & commit

1. After installation, choose whether or not you'd like to generate a Git **branch** for your changes
2. Then choose whether or not you'd like to make a separate Git **commit** for your changes.

   A nice commit message with details about the update version range for each affected package will be generated for you.

![Git](/public/git.gif?raw=true "Git")

### Non-interactive mode

The script can run without prompting you for input. Simply specify the `--non-interactive` flag:

```bash
$ lernaupdate --non-interactive --dependency lodash@4.2.1 ./my-project
```

The script will tell you if you need to specify any additional input flags based on the state of your mono repo.

For instance, you might need/wish to include information about which packages to affect and which type of installation to perform if the dependency is a first-time install:

```bash
$ lernaupdate --non-interactive \
              --dependency lodash@4.2.1 \
              --packages packages/utils,packages/tools \
              --new-installs-mode dev \
              ./my-project
```

**Note: Git features are not available for `--non-interactive` mode.**

### Yarn support

Lerna Update Wizard will automatically detect the package manager used for each package and use the appropriate one for installing the dependency.

**Note:** If the project root directory contains a `yarn.lock` file, Yarn will be used to install all packages, in order to support Yarn Workspaces.

#### NPM

![NPM install](/public/npm.gif?raw=true "NPM install")

#### Yarn

![Yarn install](/public/yarn.gif?raw=true "Yarn install")

### Notes

Lerna Update Wizard takes Lerna's `packages` config parameter into account if [specified in lerna.json](https://github.com/lerna/lerna#lernajson). This means that if you have your packages located in a directory other than `packages/`, this tool will still work, as long as their parent directory is specified.
