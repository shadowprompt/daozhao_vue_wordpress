const server = require('express')();
const { createBundleRenderer } = require('vue-server-renderer');
const createApp = require('./app');

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, // 推荐
  // template, // （可选）页面模板
});

server.get('*', (req, res) => {
  const context = { url: req.url };

  createApp(context).then((app) => {
    renderer.renderToString(app, (err, html) => {
      if (err) {
        if (err.code === 404) {
          res.status(404).end('Page not found');
        } else {
          res.status(500).end('Internal Server Error');
        }
      } else {
        res.end(html);
      }
    });
  });
});

server.listen(9898);
console.log('listening -> ', 9898);
