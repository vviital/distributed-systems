import $ from 'jquery';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';

export const store = {
  data: {},
};

const getCurrentStatus = () => {
  return fetch('/api/vote/status', {
    method: 'GET',
  })
    .then(res => res.json())
    .then(data => store.data = data)
    .then(() => setData())
    .catch(err => console.log(err));
};

getCurrentStatus();
export const intervalId = setInterval(() => getCurrentStatus(), 500);

const setData = () => {
  const container = $('#table-body');
  container.empty();

  if (store.data.map) {
    const body = store.data.map((item, index) => {
      return `<tr>
            <th>${index + 1}</th>
            <th>${item.voteId}</th>
            <th>${item.voteIndex}</th>
            <th>${item.counted}</th>
            <th>${item.createdDate ? moment(item.createdDate).format('MMMM Do YYYY, h:mm:ss a') : ''}</th>
            <th>${item.countedDate ? moment(item.countedDate).format('MMMM Do YYYY, h:mm:ss a') : ''}</th>
            <th>${item.ip}</th>
        </tr>`;
    });

    container.append(body);
  }
};
