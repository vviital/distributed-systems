import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import api from './routes/api';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', api);

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err,
  });
});

export default app;
