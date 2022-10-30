/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 */

function friendUser(fields) {
  fetch('/api/friend', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function unfriendUser(fields) {
  fetch(`/api/friend/${fields.username}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}

function viewFriendsAndFriending(fields) {
  fetch(`/api/friend?username=${fields.username}`)
    .then(showResponse)
    .catch(showResponse);
}