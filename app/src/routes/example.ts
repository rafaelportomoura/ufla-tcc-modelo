import { Router } from 'express';
import { getExampleController } from '../controllers/get';

const example_routes = Router();

example_routes.get('/uai', getExampleController);

export { example_routes };
