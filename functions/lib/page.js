'use strict';

exports.renderFullPage = function (styles, html, bundleRoute, preloadedState) {
    return `
<!doctype html>
<html>
    <head>
        <title>Redux Universal Example</title>
        <style>${styles}</style>
    </head>
    <body>
        <div id="root">${html}</div>
        <script>
// WARNING: See the following for security issues around embedding JSON in HTML:
// http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="${bundleRoute}"></script>
    </body>
</html>
`
};
