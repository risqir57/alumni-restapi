import mongoose from 'mongoose';
import request from 'supertest';
import App, { InitRouter } from '../app';
import UsersRoute from '../routes/users.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Users', () => {
  describe('GET /users', () => {
    it('response All Users', () => {
      const usersRoute = new UsersRoute();
      const routers: InitRouter = {
        path: 'v1',
        routes: [
          usersRoute
        ]
      }
      usersRoute.usersController.userService.users.find = jest.fn().mockReturnValue(
        Promise.resolve([
          {
            email: 'example@gmail.com',
            password: 'q1w2e3r4!',
          },
        ]),
      );

      (mongoose as any).connect = jest.fn();
      const app = new App(routers);
      return request(app.getServer()).get(`${usersRoute.path}`).expect(200);
    });
  });
});
