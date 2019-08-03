import * as express from 'express';
// import * as chalk from 'chalk';
import * as passport from 'passport';
import strategies from './auth/strategies';

if (!process.env.PORT) throw new Error(`!process.env.PORT`);

const app = express();

app.set('host', '0.0.0.0');
app.set('port', process.env.PORT);
app.set('json spaces', 2); // number of spaces for indentation
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

strategies(app);

app.listen(app.get('port'), error => {
  if (error) throw error;
  console.log(`> Ready on http://localhost:${process.env.PORT}`);
});