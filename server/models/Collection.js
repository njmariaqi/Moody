const mongoose = require( 'mongoose');
const Schema = mongoose.Schema

const collectionSchema = new Schema({
  name: String,
  images: [Number],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Collection = mongoose.model('Collection', collectionSchema)

module.exports = Collection;