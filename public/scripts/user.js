/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 * e.g. for createUser, fields has properites 'username' and 'password'
 */

function createUser(fields) {
  fetch('/api/users', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function changeUsername(fields) {
  fetch('/api/users', {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function changePassword(fields) {
  fetch('/api/users', {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function changeBio(fields) {
  fetch('/api/users', {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function deleteUser(fields) {
  fetch('/api/users', {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}

function signIn(fields) {
  fetch('/api/users/session', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function signOut() {
  fetch('/api/users/session', {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}

//follow
function followUser(fields) {
  fetch('/api/follow', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function unfollowUser(fields) {
  fetch(`/api/follow/${fields.username}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}

function viewFollowersAndFollowing(fields) {
  fetch(`/api/follow?username=${fields.username}`)
    .then(showResponse)
    .catch(showResponse);
}

//favorite

function favoriteUser(fields) {
  fetch('/api/favorite', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function unfavoriteUser(fields) {
  fetch(`/api/favorite/${fields.username}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}

function viewFavoriting(fields) {
  fetch(`/api/favorite?username=${fields.username}`)
    .then(showResponse)
    .catch(showResponse);
}

//friend

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

function viewFriendsandFriending(fields) {
  fetch(`/api/friend?username=${fields.username}`)
    .then(showResponse)
    .catch(showResponse);
}

function viewFeedFreetsSorted(fields) {
  fetch(`/api/feed?name=${fields.name}`)
    .then(showResponse)
    .catch(showResponse);
}

function changeFeedSort(fields) {
  fetch(`/api/feed`, {method: 'PUT', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}


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