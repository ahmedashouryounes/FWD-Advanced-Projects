import express from 'express';
import routes from './routes/routes';

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('assets'));
app.get("/",(req,res)=>{
    res.status(200).send("Image Processing API");
});
app.use('/api', routes);

app.listen(port, () => console.log('Server running on port ' + port));

export default app;
