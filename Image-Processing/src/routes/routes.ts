import express from 'express';
import imageRoute from './api/imageroute';
const routes = express.Router();

routes.use('/', imageRoute);

export default routes;
