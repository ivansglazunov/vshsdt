import express from 'express';
import passport from 'passport';
import next from 'next';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import serviceApp from './service-app';

dotenv.config();

if (!process.env.PORT) throw new Error('!process.env.PORT');

const dev = process.env.ENV !== 'production';
// TODO wtf with next typing?
// @ts-ignore
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const app = express();

    app.set('json spaces', 2);
    app.use(express.json());
    app.use(cookieParser())
    app.use(passport.initialize());
    app.use(passport.session());

    serviceApp(app);

    app.get('*', (req, res) => {
      return handle(req, res);
    });

    app.listen(process.env.PORT, (error) => {
      if (error) throw error;
      console.log(`> Ready on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
