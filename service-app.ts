import strategies from './strategies';
import webhooks from './webhooks';

export default (app) => {
  if (process.env.MODE) {
    switch (process.env.MODE) {
      case 'strategies':
        strategies(app);
        break;
      case 'webhooks':
        webhooks(app);
        break;
      default:
        break;
    }
  } else {
    strategies(app);
    webhooks(app);
  }
};
