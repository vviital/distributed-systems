import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import api from './routes/api';

const port = +(process.env.PORT || '3000');

mongoose.connect(`mongodb://localhost/vote-system-${port}`);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use((req, res, next) => {
  req.dbconnection =  db;
  next();
});
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
