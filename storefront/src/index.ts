import express from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';

import indexRouter from './routes/indexRouter';

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(logger('dev'));
app.use('/api', indexRouter);

app.listen(port, () => console.log(`Server is running on port ${port}`));

export default app;
