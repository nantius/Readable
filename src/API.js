let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const api = 'http://localhost:3001'

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getCategories = () =>
    fetch(`${api}/categories`, {headers})
    .then(res => res.json())
    .then(data => data.categories)

export const getPosts = () =>
    fetch(`${api}/posts`, {headers})
    .then(res => res.json())

export const getCategPosts = (cat) =>
  fetch(`${api}/${cat}/posts`, {headers})
  .then(res => res.json())

export const addPost = (body) =>
fetch(`${api}/posts`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
}).then(res => res.json())

export const editPost = (body, id) =>
fetch(`${api}/posts/${id}`, {
  method: 'PUT',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
}).then(res => res.json())

export const deletePost = (id) =>
  fetch(`${api}/posts/${id}`, {method: 'DELETE', headers}
  ).then(res => res.json())

export const votePost = (vote, id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option: vote})
  }).then(res => res.json())

  export const addComment = (body) =>
fetch(`${api}/comments`, {
  method: 'POST',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
}).then(res => res.json())

  export const getComments = (id) =>
  fetch(`${api}/posts/${id}/comments`, {headers})
  .then(res => res.json())

  export const voteComment = (vote, id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option: vote})
  }).then(res => res.json())

  export const deleteComment = (id) =>
  fetch(`${api}/comments/${id}`, {method: 'DELETE', headers}
  ).then(res => res.json())

  export const editComment = (body, id) =>
fetch(`${api}/comments/${id}`, {
  method: 'PUT',
  headers: {
    ...headers,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
}).then(res => res.json())




