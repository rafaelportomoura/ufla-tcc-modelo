import { Router } from 'express';
import { example_routes } from './example';

const router = Router();
router.use('/example', example_routes);

export { router };
