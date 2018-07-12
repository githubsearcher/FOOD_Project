import * as express from 'express';
import { Router } from 'express';

export class ApiRouterFactory {
    private constructor() {}

  static getApiRouter () {
    const router: Router = express.Router();
   
        return router;
  }
}