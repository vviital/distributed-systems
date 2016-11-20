import express from 'express';
import request from 'request';
import { Vote } from '../model/model';
import { databaseServer } from '../config';

const router = express.Router();

router.get('/vote', (req, res, next) => {
  res.status(200);
  request({
    method: 'GET',
    url: `${databaseServer}/api/vote`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
    .pipe(res);
});

router.get('/vote/status', (req, res, next) => {
  Vote.find({}, (err, vote) => {
    res.status(200);
    res.send(vote);
  });
});

router.patch('/vote', (req, res, next) => {
  Vote.find({ counted: false })
    .then((vote) => {
      const query = vote.map(({ voteId, voteIndex }) => ({ voteId, voteIndex }));
      req.query = query;

      return Vote.update(
        { counted: false },
        { counted: true, countedDate: new Date().getTime() },
        { multi: true }
      );
    })
    .then(() => {
      res.status(200);
      res.send(req.query);
    });
});

router.post('/vote/:id', (req, res, next) => {
  const { ip, body } = req;

  res.status(200);

  const vote = new Vote({
    voteId: body.id,
    voteIndex: body.index,
    counted: false,
    createdDate: new Date().getTime(),
    countedDate: undefined,
    ip,
  });

  vote.save()
    .then(() => res.send(req.body))
    .catch(err => console.log(err));
});

router.put('/vote', (req, res, next) => {
  res.status(201);
  request({
    method: 'PUT',
    url: `${databaseServer}/api/vote`,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body),
  })
    .pipe(res);
});

export default router;
