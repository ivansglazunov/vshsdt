import bearer from './strategies/bearer';
import password from './strategies/password';

export default app => {
  bearer(app);
  password(app);
};
