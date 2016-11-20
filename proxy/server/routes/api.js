import express from 'express';
import request from 'request';
import { servers } from '../config';

const getServer = () => {
  const rnd = Math.floor(Math.random()*servers.length);

  console.log(rnd);
  console.log(servers[rnd]);
  return servers[rnd];
};

const router = express.Router();

router.get('/vote', (req, res, next) => {
  res.status(200);
  request({
    method: 'GET',
    url: `${getServer()}/api/vote`,
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
    url: `${getServer()}/api/vote/${id}`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...req.body, ip: req.ip }),
  })
    .pipe(res);
});

router.put('/vote', (req, res, next) => {
  res.status(201);
  request({
    method: 'PUT',
    url: `${getServer()}/api/vote`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body),
  })
    .pipe(res);
});

export default router;
