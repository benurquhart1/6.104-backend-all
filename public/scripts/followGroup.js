/**
 * Fields is an object mapping the names of the form inputs to the values typed in
 */

function followGroup(fields) {
  fetch('/api/followGroup', {method: 'POST', body: JSON.stringify(fields), headers: {'Content-Type': 'application/json'}})
    .then(showResponse)
    .catch(showResponse);
}

function unfollowGroup(fields) {
  fetch(`/api/followGroup/${fields.name}`, {method: 'DELETE'})
    .then(showResponse)
    .catch(showResponse);
}

function viewGroupsFollowing(fields) {
  fetch(`/api/followGroup?username=${fields.username}`)
    .then(showResponse)
    .catch(showResponse);
}

// export {
//   viewFollowersAndFollowing,
//   followUser,
//   unfollowUser
// }