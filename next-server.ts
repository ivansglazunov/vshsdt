import * as express from 'express';
import * as passport from 'passport';
import * as next from 'next';
import serviceApp from './service-app';

if (!process.env.NEXT_PORT) throw new Error('!process.env.NEXT_PORT');

const dev = process.env.ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const app = express();

    app.set('json spaces', 2);
    app.use(express.json());
    app.use(passport.initialize());
    app.use(passport.session());

    serviceApp(app);

    app.get('*', (req, res) => handle(req, res));

    app.listen(process.env.NEXT_PORT, (error) => {
      if (error) throw error;
      console.log(`> Ready on http://localhost:${process.env.NEXT_PORT}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
