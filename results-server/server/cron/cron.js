import cron from 'node-cron';
import request from 'request';
import { servers } from '../config';
import { Questionnaires, Candidates } from '../model/model';

export const createSchedule = (dbConnection) => {
  cron.schedule('*/1 * * * *', () => {
      console.log('schedule');
      console.log(new Date());
      console.log();
      let array = [];
      let cnt = 0;

      servers.forEach((server) => {
        request({
          method: 'PATCH',
          url: `${server}/api/vote`,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        }, (err, resp, rawBody) => {
          console.log(rawBody);
          array = array.concat(JSON.parse(rawBody));
          cnt++;
          if (cnt == servers.length) {
            const body = array;
            console.log(body);
            if (body && body.reduce) {
              body.reduce((previous, {voteId, voteIndex}) => {
                return previous.then(() => (
                  Questionnaires.find({ id: voteId })
                    .then(result => {
                      result[0].candidates[voteIndex].count++;
                      return Questionnaires.update(
                        { id: voteId },
                        result[0],
                      )
                    })
                    .catch(err => console.log(err))
                ))
              }, Promise.resolve())
            }
          }
      });
    });
  });
};
