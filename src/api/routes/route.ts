import { Router, Request, Response, Application } from "express";

import authRoute from './auth.route';

interface IRoute {
  path: string;
  handler: Router | ((res: Response, req?: Request, ) => void);
}

const routes: IRoute[] = [
  {
    path: '/api/auth',
    handler: authRoute
  },
  {
    path: '/',
    handler: (res: Response) => {
      res.status(200).json({
        msg: `Server running properly`
      })
    }
  }
];

export default (app: Application): void => {
  routes.forEach(route => {
    if (route.path == '/') {
      app.get(route.path, route.handler);
    } else {
      app.use(route.path, route.handler);
    }
  })
} 