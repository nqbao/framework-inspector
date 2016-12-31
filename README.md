# Framework Inspector

Detect web applications and javascript libraries run on browsing website.

This is a chrome extension will help web developer to inspect web framework / CMS and javascript library running on current browsing website. An icon will appear on address bar indicates the detected framework. Version detecting is being implemented.
Currently, this extension can detect more than 100 popular CMS and javascript libraries, and more will be added in future releases. Visit extension website for more detail.

This extension originally named ChromeSniffer / AppSpector.

## How to test this extension

Run `npm run build` to build the extension. It will result the built extension under `build` folder. Then you can follow this [link](https://developer.chrome.com/extensions/getstarted#unpacked) to load unpacked extension.

You can also use `npm run build:watch` to tell the build tool to automatically build when there is new change from the source.
