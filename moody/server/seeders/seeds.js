const db = require('../config/connection');
const {User, Collection} = require('../models/index') ;

db.once('open', async()=>{
  await User.deleteMany();
  await Collection.deleteMany();

  await User.create(
    [
      {
        "firstName": "Maria",
        "lastName": "Qi",
        "email": "maria@test.com",
        "password": "test1234",
        },
        {
          "firstName": "Alvin",
          "lastName": "Ng",
          "email": "alvin@test.com",
          "password": "test1234"
        }
    ]
  );
  console.log('users seeded')

  await Collection.create(
    [
      {
        "name": "ocean",
        "images": [
          189349,
          1001682,
          533923
        ],
      },
      {
        "name": "nature",
        "images": [
          3408744,
          572897
        ]
      },
      {
        "name": "cat",
        "images": [
          1170986,
          38867
        ]
      }
    ]
  );
  console.log('collections seeded')
  
  const collection1= await Collection.findOne({name: "ocean"});
  const collection2= await Collection.findOne({name: "nature"});
  const collection3= await Collection.findOne({name: "cat"});
  const user1 = await User.findOne({firstName: "Maria"});
  const user2 = await User.findOne({firstName: "Alvin"});


  await User.findOneAndUpdate(
    {email: "maria@test.com"},
    { $set: {collections: [collection1._id, collection2._id]}}
  )
  
  await User.findOneAndUpdate(
    {email: "alvin@test.com"},
    { $set: {collections: [collection3._id]}}
  )
  
  await Collection.findOneAndUpdate(
    {name: "ocean"},
    { $set: {user: user1._id}}
  )

  await Collection.findOneAndUpdate(
    {name: "nature"},
    { $set: {user: user1._id}}
  )
  
  await Collection.findOneAndUpdate(
    {name: "cat"},
    { $set: {user: user2._id}}
  )

  process.exit();
})