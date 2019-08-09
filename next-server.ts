import * as express from 'express';
import * as next from 'next';

if (!process.env.NEXT_PORT) throw new Error('!process.env.NEXT_PORT');

const dev = process.env.ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get('*', (req, res) => handle(req, res));

    server.listen(process.env.NEXT_PORT, (error) => {
      if (error) throw error;
      console.log(`> Ready on http://localhost:${process.env.NEXT_PORT}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
