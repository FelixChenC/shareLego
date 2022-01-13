export const categories = [
  {
    name: 'Architecture',
    image: 'https://www.lego.com/cdn/cs/set/assets/bltcfe90df48c18f513/ThemeImage-202111-Architecture.jpg?fit=bounds&format=webply&quality=80&width=420&height=200&dpr=2',
  },
  {
    name: 'Batman',
    image: 'https://www.lego.com/cdn/cs/set/assets/bltba047e83030b34ba/ThemeImage-202107-Batman.jpg?fit=bounds&format=webply&quality=80&width=420&height=200&dpr=2',
  },
  {
    name: 'Boost',
    image: 'https://www.lego.com/cdn/cs/set/assets/bltfaab26fbb2b1f308/ThemeImage-202107-Boost.jpg?fit=bounds&format=webply&quality=80&width=420&height=200&dpr=2',
  },
  {
    name: 'BrickHeadz',
    image: 'https://www.lego.com/cdn/cs/set/assets/blt25fc6a2a5bc83eb6/ThemeImage-202107-Brickheadz.jpg?fit=bounds&format=webply&quality=80&width=420&height=200&dpr=2',
  },
  {
    name: 'Brick Sketches',
    image: 'https://www.lego.com/cdn/cs/set/assets/blt447ce027db218566/ThemeImage-202107-BrickSketches.jpg?fit=bounds&format=webply&quality=80&width=420&height=200&dpr=2',
  },
  {
    name: 'City',
    image: 'https://www.lego.com/cdn/cs/set/assets/bltcb420a5ae55a58da/ThemeImage-202107-City.jpg?fit=bounds&format=webply&quality=80&width=420&height=200&dpr=2',
  },
  {
    name: 'Classic',
    image: 'https://www.lego.com/cdn/cs/set/assets/bltd08fb3a2b6eaed18/ThemeImage-202107-Classic.jpg?fit=bounds&format=webply&quality=80&width=420&height=200&dpr=2',
  },
  {
    name: 'Creator 3-in-1',
    image: 'https://www.lego.com/cdn/cs/set/assets/blt88ac2f3702e045da/ThemeImage-202111-Creator3in1.jpg?fit=bounds&format=webply&quality=80&width=420&height=200&dpr=2',
  }, {
    name: 'Creator Expert',
    image: 'https://www.lego.com/cdn/cs/set/assets/bltf7d5648077058b02/ThemeImage-202111-CreatorExpert.jpg?fit=bounds&format=webply&quality=80&width=420&height=200&dpr=2',
  },
  {
    name: 'DC',
    image: 'https://www.lego.com/cdn/cs/set/assets/bltdcc7ffaa8561bc22/ThemeImage-202107-DC.jpg?fit=bounds&format=webply&quality=80&width=420&height=200&dpr=2',
  }, {
    name: 'Disney',
    image: 'https://www.lego.com/cdn/cs/set/assets/bltfb7085baebd9e2ca/ThemeImage-202107-Disney.jpg?fit=bounds&format=webply&quality=80&width=420&height=200&dpr=2',
  }, {
    name: 'Harry Potter',
    image: 'https://www.lego.com/cdn/cs/set/assets/blt470a49376872ba3d/ThemeImage-202111-HarryPotter.jpg?fit=bounds&format=webply&quality=80&width=420&height=200&dpr=2',
  },
  {
    name: 'Ideas',
    image: 'https://www.lego.com/cdn/cs/set/assets/blt9fb9e9dde23df665/ThemeImage-202111-Ideas.jpg?fit=bounds&format=webply&quality=80&width=420&height=200&dpr=2',
  },
];

export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
      image{
        asset->{
          url
        }
      },
      _id,
      title, 
      about,
      category,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
     save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
      comments[]{
        comment,
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      }
    }`;
  return query;
};

export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
  return query;
};


export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`

  return query
}

export const searchQuery = (searchTerm) => {
  const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
        image{
            asset -> {
                url
            }
        },
        _id,
        destination,
        postedBy -> {
            _id,
            userName,
            image
        },
        save[] {
            _key,
            postedBy -> {
                _id,
                userName,
                image
            },
        },
    }`

  return query
}

export const feedQuery = `*[_type == 'pin'] | order(_createAt desc){
    image{
        asset -> {
            url
        }
    },
    _id,
    destination,
    postedBy -> {
        _id,
        userName,
        image
    },
    save[] {
        _key,
        postedBy -> {
            _id,
            userName,
            image
        },
    },
}`

export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`;
  return query;
};

