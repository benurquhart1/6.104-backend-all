/* eslint-disable @typescript-eslint/restrict-template-expressions */

/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

function viewFeedFreetsSorted(fields) {
  fetch(`/api/feed?name=${fields.name}?sort=${fields.sort}`)
    .then(showResponse)
    .catch(showResponse);
}

function changeFeedSort(fields) {
  fetch(`/api/feed/${fields.name}`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

// function editFreet(fields) {
//   fetch(`/api/freets/${fields.id}`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
//     .then(showResponse)
//     .catch(showResponse);
// }

