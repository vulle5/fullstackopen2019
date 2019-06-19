const notes = [
  {
    likes: 12,
    title: 'Elixir',
    author: 'Hän',
    url: 'www.google.com',
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'Vulle',
      name: 'Severi'
    }
  },
  {
    likes: 12,
    title: 'Java',
    author: 'Minä',
    url: 'www.google.com',
    user: {
      _id: '5cfe48a3b321cb0f24f596f1',
      username: 'Vulle',
      name: 'Severi'
    }
  },
  {
    likes: 12,
    title: 'JavaScript',
    author: 'Sinä',
    url: 'www.google.com',
    user: {
      _id: '5cfe5bb4787de90d141c82db',
      username: 'Vulle',
      name: 'Severi'
    }
  }
]

const getAll = () => {
  return Promise.resolve(notes)
}

export default { getAll }
