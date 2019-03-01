# karma-static

Serve a directory of static files on the Karma server.

This middleware can be used to prevent 404s on files not normally served by
Karma.  For instance, application components under test may load image files via
`<img>` elements.

This middleware will probably be easier to use than specifying `files` patterns,
and trying to work around the `/base/` prefix added to all asset paths.

## Install

Add it to your project:

```
npm i -D karma-static
```

## Configure

Say that your project directory structure looks like this:

```
project/
├── public/
│   ├── tests.js
│   ├── icon.png
└── karma.conf.js
```

Configure Karma to use the middleware:

```js
var path = require('path');
module.exports = function (config) {
  config.set({
    files: ['public/tests.js'],
    middleware: ['static'],
    static: {
      path: path.join(__dirname, 'public')
    }
  });
};
```

Now files in the `public` directory like `icon.png` will be served by the web
server, and will no longer throw 404s when requested by components in
`tests.js`.

## License

MIT
