import express from 'express';
import * as routes from './apis/routes';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(express.json());

// home route
app.get('/', (req, res) => {
  res.send('lets start from here');
});

// all routes
app.use(routes.auth);

// 404
app.get('*', (req, res) => {
  res.json({ status: 'failed', message: 'have you lost buddy' });
});

app.listen(port, (err?: any) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server started on port ${port} ...`);
  }
});
