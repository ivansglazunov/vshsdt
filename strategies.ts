import password from './strategies/password';

export default (app) => {
  password(app);
  console.log('strategies');
};
