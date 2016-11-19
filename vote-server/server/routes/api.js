import express from 'express';
import { Vote, Questionnaires } from '../model/model';

const router = express.Router();

router.get('/vote', (req, res, next) => {
  Questionnaires.find({}, (err, questionnaire) => {
    res.status(200);
    res.send(questionnaire);
  });
});

router.get('/vote/status', (req, res, next) => {
  Vote.find({}, (err, vote) => {
    res.status(200);
    res.send(vote);
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
  const { body } = req;

  res.status(201);

  const questionnaires = new Questionnaires({
    id: body.id,
    title: body.title,
    candidates: body.candidates,
  });

  questionnaires.save()
    .then(() => res.send(body));
});

export default router;
