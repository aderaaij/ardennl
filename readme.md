# 🏄 TotallyStatical site generator

A barebone static site generator / rapid prototyping tool leveraging the awesome powers of Gulp and Webpack for all the heavy lifting.

## Requirements:

* [Node]( https://nodejs.org/download/ )

## Installation:
* run `npm install` to install all node dependencies
* run `gulp` to build the app and start watching!
* run `gulp build:production` to create a production build

## Features:
* **💃 Sass/CSS**:
  * Blazing fast Node Sass(libsass) parser
  * Sass Sourcemaps for development
  * CSS prefixing with [autoprefixer](https://github.com/postcss/autoprefixer)
  * CSS minifying with [cssnano](http://cssnano.co/)
* **🤓 Javascript**:
  * ES6 support with babel and webpack
  * Source maps
* **🍕 Templating**:
  * [Pug templating language](http://jade-lang.com/) with partials support
* **👩‍💻 Development**:
  * File watching and livereloading synchronized across multiple browsers/devices with [BrowserSync](https://www.browsersync.io/)
  * Source maps
* **🚀 Deployment**:
  * Blazing fast FTP deploys with [vinyl-ftp](https://www.npmjs.com/package/vinyl-ftp)
  * SFTP deployment with [gulp-sftp](https://www.npmjs.com/package/vinyl-ftp)
* **📦 Sass Packages**:
  * Includes the following Sass packages by default:
    * [Susy v2]( http://susy.oddbird.net/ )
    * [Normalize]( https://github.com/JohnAlbin/normalize-scss )
    * [Breakpoint]( http://breakpoint-sass.com/ )
* **📷 Images**:
  * Image minifying with imagemin
  * Compiles SVG sprites from all SVG files in the `assets/sprite` directory
  * Easy Pug mixin to create `<use>` code for SVG sprite icons
* **🐍 Revisioning / cache busting**:
  Cache busting static assets for production with [gulp-rev](https://github.com/sindresorhus/gulp-rev)

## Usage 👩‍💻
Clone this package to a local folder and run `npm install` to install all the node dependencies.

### Development mode
To start developing, run `gulp` from the terminal. This default command will build all your assets in development mode, starts the watch command and a browsersync server which is available on `127.0.0.1:3000`.

### Production
Run `gulp build:production` to build your production app. This will build and minify your assets into the `/app/build` folder. This will also add a hash to your assets for cachebusting purposes.

### Deployment
Run either `gulp deloy:ftp` or `gulp deply:sftp` to deploy through FTP or SFTP. To configure, create a `.ftppass.json` file in the root of your project(see `.ftppass-example`)  and fill in the right details. In either `/gulpfile.js/tasks/deployFTP` or `/gulpfile.js/tasks/deploySFTP`, rename the line `var ftppass = require('../../.ftppass-example')` to `var ftppass 			= require('../../.ftppass')` and deploy like the wind.

## Tasks
All tasks are defined in `gulpfile.js/tasks`. Most tasks have a corresponding config file in `gulpfile.js/config`. Some share a config file and some just use `gulpfile.js/index.js`

### default
Cleans, builds app and enables watch tasks

### build:production
Builds app with minified assets. Runs the following tasks:
* [`clean`](#clean)
* [`images`](#images)
* [`styles:production`](#stylesproduction)
* [`scripts:standalone`](#scriptsstandalone)
* [`scripts:production`](#scripts)
* [`templates`](#templates)

### watch 👀

Run `gulp watch` to start webserver, watch files and livereload with browsersync. Uses the `gulp-watch` plugin to correctly handle new files while watching.

Runs the tasks:
* [`browsersync`](#browsersync)
* [`setwatch`](#setwatch)
* [`templates`](#templates)

Uses:
* `gulp-watch`

### clean
Deletes entire build folder.

Plugins:
* `del` plugin

### images 📷
Minifies images and distributes them to the build asset folder

Plugins:
* `gulp-images`
* `gulp-changed`

### svg:sprites
Create a SVG sprite from icons in the configured folder

Plugins:
* `gulp-images`
* `gulp-svgstore`

### scripts
Concatenates, uglifies and distributes `.js` files to build folder.
* `gulp-concat`
* `gulp-rename`
* `gulp-uglify`
* `gulp-if`

### scripts:standalone
Distributes standalone scripts to the build folder. Use for modernizr or other scripts that should be included standalone.

Plugins:
* `gulp-changed`

### styles 💃
Compile `/sass` folder to css, autoprefix and add sourcemaps for debugging. In the corresponding config file it's possible to define node modules with `includePaths` to easily define them with `@imports` in your .scss file. By default, the following paths are added"

* `./node_modules/normalize-scss/sass/`
* `./node_modules/susy/sass/`
* `./node_modules/breakpoint-sass/stylesheets/`

Images should be added with the following path: `../../assets/img/test.jpg` due to some unfixed misconfiguration with the rev'ing (see Bugs and Todo's)

Plugins:
* `gulp-sass`
* `gulp-sourcemaps`
* `gulp-autoprefixer`
* `gulp-if`


### styles:production
Compile `/sass` to css and autoprefix. Doesn't minify as the css files will be rev'ed and minified after compilation.

Plugins:
* `gulp-sass`
* `gulp-autoprefixer`
* `gulp-rename`

### templates
Generates html files from pug template. Every pug template prefixed with an underscore will not be built into a html file. To speed up the templating process `gulp-pug-inheritance` is used to check which template is dependent on which partial.

Plugins:
* `gulp-pug`
* `gulp-pug-inheritance`
* `gulp-changed`
* `gulp-if`
* `gulp-filter`

### browsersync
Start browsersync server

Plugins:
* `browser-sync`

### setwatch ➡️👀
Sets a global `isWatching` variable to `true`. Use to execute certain tasks, functions or configurations only when `gulp watch` is running.

## Bugs and to-do's

* Fix reference to background images / revisioned assets
* Add a build task without any revisioning / cache busting.

## Changelog

### v2.3.2
**10/09/2017**
* ⚒ Add `gulp-plumber` to template task to ensure watch task doesn't hang on error. 

### v2.3.1
**10/09/2017**
* ⚒ Fix assetpath in background images for paths without `url()`. 

### v2.3.0
**09/09/2017**
* ⚒ Fix problem with errorHandler notifyer (switched `..args` for `callback` and `arguments`) in `errorHandler.js`
* 🐵 Monkey patched the replacement of images assets in css files. `../img/` will be replaced by `../img/assets/`, the cachebusted version will be added and `../img/assets/` will be turned back to `../img/` again.
* 🚀 Update all packages to the latest versions
* 🛁 Clean up of the gulpfile.js, now even more consistently coded and linted


### v2.2.0
**24/07/2017**
* 🚀 Update all packages to the latest versions
* 🛁 Clean up of the gulpfile.js, now consistently coded and linted
* ⚒ Fix problem with new inline pug variables

### v2.1.0
**02/07/2017**
* Updated all packages to the latest versions, including Susy 3.0 and WebPack 3.0

### v2.0.1
**11/10/2016**
* Temporarily added the optional Dependencies from `gulp-imagemin` to the `package.json` to meet dependencies for [Yarn package manager](https://github.com/yarnpkg/yarn/)

### v2.0.0
**05/10/2016**
Bumped the version to 2.0 as I did some major updates on the plugins/components
* Updated Babel 5 to Babel 6, reconfigured Webpack config
* Updated Jade(deprecated) to Pug
* Updated Node dependencies
* Removed Bower package manager and dependencies
* Added Susy, Normalize-SCSS and Breakpoint-Sass as Node modules

### v1.1.0
**24/01/2016**
* Replaced `gulp-minify-css` with `gulp-cssnano`
* Added a `gulp deploy:ftp` and `gulp deploy:sftp` task

## Credits
Much credit goes out to the [gulp-starter repo](https://github.com/vigetlabs/gulp-starter) from Viget Labs(https://github.com/vigetlabs/).

## Licensing
Copyright (c) 2015 - 2016 Arden de Raaij. Licensed under the [MIT license(MIT)](https://opensource.org/licenses/MIT)
