import $ from 'jquery';
import moment from 'moment';
import deepEqual from 'deep-equal';
import 'bootstrap/dist/css/bootstrap.min.css';

export const store = {
  data: {},
};

const getCurrentStatus = () => {
  return fetch('/api/vote/results', {
    method: 'GET',
  })
    .then(res => res.json())
    .then(data => {
      if (!deepEqual(data, store.data)) {
        store.data = data;
        setData();
      }
    })
    .catch(err => console.log(err));
};

getCurrentStatus();
export const intervalId = setInterval(() => getCurrentStatus(), 500);

const setData = () => {
  const container = $('#results-container');
  container.empty();

  if (store.data.map) {
    const elements = store.data.map((vote) => {
      const div = $(`<div class='panel panel-default'>
        <div class='panel-heading'>${vote.title}</div>
        </div>`);

      const body = $(`<div class='panel-body'></div>`);

      const all = Math.max(1, vote.candidates.reduce((sum, candidate) => sum + candidate.count, 0));

      const candidates = vote.candidates.map((candidate) => {

        return `<div class="col-xs-12" style="padding: 10px">
            <div class="col-xs-6">
                <img style="width: 100%; max-height: 200px; object-fit: contain;" src="${candidate.url}">
           </div>
           <div class="col-xs-6">
                <div style="width: 100%; padding-bottom: 20px;">${candidate.name}</div>
                 <div class="progress">
                    <div class="progress-bar" role="progressbar" aria-valuenow="${candidate.count / all * 100}"
                        aria-valuemin="0" aria-valuemax="100" style="width:${candidate.count / all * 100}%">
                        ${candidate.count}
                    </div>
                 </div>
           </div>
        </div>`;
      });

      candidates.forEach(candidate => body.append(candidate));
      div.append(body);

      return div;
    });

    container.append(elements);
  }
};
