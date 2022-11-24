/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

function getLikes(fields) {
  fetch(`/api/like?freetId=${fields.freetId}`)
    .then(showResponse)
    .catch(showResponse);
}

function likeFreet(fields) {
  fetch('/api/like', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function unlikeFreet(fields) {
  fetch(`/api/like/${fields.freetId}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}
