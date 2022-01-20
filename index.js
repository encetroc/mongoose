const mongoose = require('mongoose')

// user schema for mongoose
const userSchema = mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: 1,
    max: 100,
    // custom validation object
    validate: {
      // validator function
      validator: (value) => {
        return value % 2 === 0
      },
      // validation error message
      message: (props) => {
        return `${props.value} is not even`
      },
    },
  },
  email: {
    type: String,
    minLength: 10,
    maxLength: 100,
    required: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  // reference to another user
  bestFriend: mongoose.SchemaTypes.ObjectId,
  // array for hobbies
  hobbies: [String],
  address: {
    number: Number,
    street: String,
    city: String,
  },
})

// the user model for mongoose, equivalent to a collection
const User = mongoose.model('User', userSchema)

// connexion to mongo db
mongoose.connect('mongodb://localhost/my-db', () => {
  console.log('connexion successful')
})

async function run() {
  /* const user = new User({ name: 'john', age: 28, email: 'testemail@gmail.com' })
  // promise resolve with .then()
  // user.save().then(user => console.log(user))

  // promise resolve with async await
  const userRes = await user.save() */

  // create a user in database with the create method
  // with error handling
  /* try {
    const user = await User.create({
      name: 'john doe',
      age: 50,
      email: 'test2@mail.com',
      //bestFriend: '61e9a942397b6649efb78b69',
      hobbies: ['3D modeling'],
      address: {
        number: 10,
        street: 'other st',
      },
    })
    console.log(user)
  } catch (error) {
    console.log(error)
  } */

  // reading values from database
  // reading multiple values
  /* const users = await User.find({ hobbies: { $in: ['cycling'] } })
    .sort({ age: -1 })
    .skip(1)
    .limit(2)
    .select(['age', 'email'])
  // changing the age for the first user in the results
  users[0].age = 44
  await users[0].save()
  console.log(users) */

  // finding a specific user
  // and chaning the age of that user
  /* const user = await User.findById('61e9bd37cc8aeb4edf5b3606')
  user.age = 50
  await user.save()
  console.log(user) */

  await User.findByIdAndDelete('61e9bd06faefc5afbea9ffdc')
}
run()
