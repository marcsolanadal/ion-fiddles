module.exports = {
  users: {
    'mario': {
      password: 'qwerty',
      songs: [
        {
          id: '1234',
          title: 'song of storms',
          length: 3.50,
          playable: true
        },
        {
          id: '4321',
          title: 'darude sandstorm',
          length: 5.20,
          playable: true
        },
        {
          id: '6789',
          title: 'misty mountains cold',
          length: 3.20,
          playable: true
        },
        {
          id: '4333',
          title: 'the place I will return someday',
          length: 2.40,
          playable: false
        }
      ],
      posts: [
        {
          id: '1111',
          title: 'Such wow',
          body: 'This song is amazing!'
        },
        {
          id: '2222',
          title: 'Lolz',
          body: 'Loooooolzzz this one is horrible.'
        }
      ]
    },
    'luigi': {
      songs: [],
      posts: []
    }
  }
}
