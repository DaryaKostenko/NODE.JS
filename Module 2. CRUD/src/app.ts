import express, { Application, Request, Response } from 'express';
import router from './routes/users.routes';

const port = 3000;
const app: Application = express();

app.listen(port, function () {
    console.log(`App is listening on port ${port}!`);
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api/users', router);

app.use((err: any, req: Request, res: Response) => {
  if(err && err.error && err.error.isJoi) {
    res.status(400).json({
      type: err.type,
      message: err.error.toString()
    });
  }
  res.status(500).send(err);
});

