import express from 'express';
import request from 'request';
import { servers } from '../config';

const router = express.Router();

router.get('/vote', (req, res, next) => {
  res.status(200);
  request({
    method: 'GET',
    url: `${servers[0]}/api/vote`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
    .pipe(res);
});

router.post('/vote/:id', (req, res, next) => {
  const { id } = req.params;
  res.status(200);
  request({
    method: 'POST',
    url: `${servers[0]}/api/vote/${id}`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body),
  })
    .pipe(res);
});

router.put('/vote', (req, res, next) => {
  res.status(201);
  request({
    method: 'PUT',
    url: `${servers[0]}/api/vote`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body),
  })
    .pipe(res);
});

export default router;
