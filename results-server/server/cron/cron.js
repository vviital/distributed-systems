import cron from 'node-cron';
import request from 'request';
import { servers } from '../config';

export const createSchedule = (dbConnection) => {
  servers.forEach((server) => {
    //cron.schedule('*/1 * * * *', () => {
      request({
        method: 'PATCH',
        url: `${server}/api/vote`,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }, (err, resp, body) => {
        console.log(body);
      });
   // });
  });
};
