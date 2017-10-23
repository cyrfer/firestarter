'use strict';

exports.renderFullPage = function (context) {
    return `
<!doctype html>
<html>
    <head>
        <title>Redux Universal Example</title>
        <style id="ssr-styles">${context.styles}</style>
    </head>
    <body>
        <div id="root">${context.html}</div>
        <script>
// WARNING: See the following for security issues around embedding JSON in HTML:
// http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
window.__PRELOADED_STATE__ = ${JSON.stringify(context.preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="${context.bundleRoute}" async></script>
    </body>
</html>
`
};
