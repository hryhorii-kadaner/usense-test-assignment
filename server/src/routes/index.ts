import { Router } from 'express';
import newsRoutes from './news';

const router = Router();

router.use('/news', newsRoutes);

export default router;
