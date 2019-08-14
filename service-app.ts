import passport from './passports';
import webhooks from './webhooks';

export default (app) => {
  if (process.env.MODE) {
    switch (process.env.MODE) {
      case 'passport':
        passport(app);
        break;
      case 'webhooks':
        webhooks(app);
        break;
      default:
        break;
    }
  } else {
    passport(app);
    webhooks(app);
  }
};
