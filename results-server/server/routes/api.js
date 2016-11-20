import express from 'express';
import { Questionnaires } from '../model/model';

const router = express.Router();

router.get('/vote', (req, res, next) => {
  Questionnaires.find({}, (err, questionnaire) => {
    const result = questionnaire.map(({ id, title, candidates }) => ({
      candidates: candidates.map(({ name, text, url }) => ({ name, text, url })),
      id,
      title,
    }));

    res.status(200);
    res.send(result);
  });
});

router.get('/vote/results', (req, res, next) => {
  Questionnaires.find({}, (err, questionnaire) => {
    const result = questionnaire.map(({ id, title, candidates }) => ({
      candidates: candidates.map(({ name, count, url }) => ({ name, count, url })),
      id,
      title,
    }));

    res.status(200);
    res.send(result);
  });
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
