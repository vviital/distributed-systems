import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import uuid from 'node-uuid';

export const store = {
  tab1: {},
  tab2: {},
};

const getVotes = () => {
  return fetch('/api/vote', {
    method: 'GET',
  })
    .then(res => res.json())
    .then(data => store.tab1 = data)
    .then(() => setData())
    .catch(err => console.log(err));
};

const poll = (options) => {
  const { id } = options;

  fetch(`/api/vote/${id}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(options),
  })
};

getVotes();
export const intervalId = setInterval(() => getVotes(), 15000);

let events = [];

const unsubscribe = (events) => {
  events.forEach((event) => {
    $(event.element).off(event.type);
  });
  events = [];
};

const setData = () => {
  unsubscribe(events);
  const container = $('#vote-container');
  container.empty();


  if (store.tab1.map) {
    const elements = store.tab1.map((vote) => {
      const div = $(`<div class='panel panel-default'>
        <div class='panel-heading'>${vote.title}</div>
        </div>`);

      const body = $(`<div class='panel-body'></div>`);
      const { id } = vote;

      const candidates = vote.candidates.map((candidate, index) => {
        const currentId = uuid.v4();
        events.push({ element: `#${currentId}`, type: 'click', options: { id, index }});

        return `<div class="col-xs-12" style="padding: 10px">
            <div class="col-xs-6">
                <img style="width: 100%; max-height: 200px" src="${candidate.url}">
           </div>
           <div class="col-xs-6">
                <div style="width: 100%;">${candidate.name}</div>
                <div style="width: 100%; height: 150px; overflow-y: auto">${candidate.text}</div>
                <input type="button" class="btn btn-info pull-right" value="Vote" id="${currentId}" style="width: 100px">
           </div>
        </div>`;
      });

      candidates.forEach(candidate => body.append(candidate));
      div.append(body);

      return div;
    });

    elements.forEach(element => container.append(element));
    events.forEach(event => $(event.element).on(event.type, () => poll(event.options)));
  }
};

let candidatesIds = [];
let candidatesEvents = [];

const clearVoteFormContent = () => {
  $('#vote-form-content').empty();
  $('#vote-title').val('');
  unsubscribe(candidatesEvents);
  candidatesIds = [];

};

const getCandidateName = (id) => {
  const name = $(`#candidate-name-${id}`).val();

  return name;
};

const getTitle = () => {
  const title = $(`#vote-title`).val();

  return title;
};

const getCandidateDescription = (id) => {
  const description = $(`#candidate-description-${id}`).val();

  return description;
};

const getUrl = (id) => {
  const url = $(`#image-preview-${id}`).attr('src');

  return url;
};

const getCandidatesInfo = () => {
  const info = candidatesIds.map(id => ({
    name: getCandidateName(id),
    text: getCandidateDescription(id),
    url: getUrl(id),
  }));

  return {
    id: uuid.v4(),
    title: getTitle(),
    candidates: info,
  };
};

export const submitCandidates = () => {
  const dto = getCandidatesInfo();

  fetch('/api/vote', {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dto),
  })
    .then(() => {
      getVotes();
      clearVoteFormContent();
    });
};

export const readUrl = (input, id) => {
  if (input.files && input.files[0]) {
    const reader = new FileReader();

    reader.onload = (e) => $(`#image-preview-${id}`).attr('src', e.target.result);

    reader.readAsDataURL(input.files[0]);
  }
};

export const addCandidate = () => {
  console.log('this');
  const container = $('#vote-form-content');

  const id = uuid.v4();

  candidatesIds.push(id);

  const div = `<div>
     <div class="form-group">
       <label for="candidate-name-${id}">Name</label>
       <input type="text" class="form-control" id="candidate-name-${id}" placeholder="Name">
       <small id="vote-title-help" class="form-text text-muted">Enter candidate name</small>
     </div>
      <div class="form-group">
        <label for="candidate-description-${id}">Candidate description</label>
        <textarea class="form-control" id="candidate-description-${id}" rows="3"></textarea>
      </div>
      <div>
      <div class="form-group">
        <label for="candidate-image-${id}">File input</label>
        <input type="file" class="form-control-file" id="candidate-image-${id}">
        <small id="fileHelp" class="form-text text-muted">Candidate image</small>
      </div>
      <div>
          <img id="image-preview-${id}" style="max-width: 300px; max-height: 300px;" />
      </div>
      </div>
    </div>`;

  container.append(div);

  candidatesEvents.push({ element: `#candidate-image-${id}`, type: 'change' });
  $(`#candidate-image-${id}`).change(function() {
    readUrl(this, id);
  });
};
