import cors from 'cors';
import express, { Application } from 'express';
import { carRouter } from './app/modules/car/car.route';

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use('/api/cars', carRouter);

app.get('/', (req, res) => {
  res.send('Hello Worldssssssssssssssss!');
});

export default app;
