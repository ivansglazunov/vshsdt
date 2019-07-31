import config from './config';

import * as express from 'express';
import * as next from 'next';

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
