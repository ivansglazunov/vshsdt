import bearer from './webhooks/bearer';

export default app => {
  bearer(app);
  console.log(`webhooks`);
};
