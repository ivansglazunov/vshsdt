const config = require('./config');

const express = require('express');
const next = require('next');

const dev = config.ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get('*', (req, res) => handle(req, res));

    server.listen(config.PORT, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${config.PORT}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
