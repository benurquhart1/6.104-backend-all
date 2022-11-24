/* eslint-disable @typescript-eslint/restrict-template-expressions */

function createContentGroup(fields) {
  fetch(`/api/contentGroup`, {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function deleteContentGroup(fields) {
  fetch(`/api/contentGroup/${fields.name}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}

function getContentGroup(fields) {
  fetch(`/api/contentGroup?name=${fields.name}`)
    .then(showResponse)
    .catch(showResponse);
}

function updateContentGroup(fields) {
  fetch(`/api/contentGroup/${fields.name}`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}