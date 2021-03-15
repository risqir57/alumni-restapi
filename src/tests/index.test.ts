import request from 'supertest';
import App, { InitRouter } from '../app';
import IndexRoute from '../routes/index.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Index', () => {
  describe('[GET] /', () => {
    it('response statusCode 200', () => {
      const indexRoute = new IndexRoute();
      const routers: InitRouter = {
        path: 'v1',
        routes: [
          indexRoute
        ]
      }
      
      const app = new App(routers);

      return request(app.getServer()).get(`${indexRoute.path}`).expect(200);
    });
  });
});
