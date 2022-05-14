const { AuthenticationError } = require('apollo-server-express');
const { User, Collection } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async() => {
      return User.find().populate('collections')
    },
    userId: async(parent, {userId}) =>{
      return User.findOne({_id: userId}).populate('collections')
    },
  //   allCollections: async (parent, args, context) => {
  //     if (context.user) {
  //       return User.findOne({ _id: context.user._id }).populate('collections');
  //     }
  //     throw new AuthenticationError('You need to be logged in!');
  //   }
  // },
    collection: async(parent, {collectionId}) =>{
      return Collection.findOne({_id: collectionId}).populate('user')
    },
    user: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('collections');
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  },

  Mutation: {
    addUser: async (parent, { firstName, lastName, email, password }) => {
      const user = await User.create({ firstName, lastName, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email }).populate('collections');
      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addCollection: async (parent, {name, images}, context) =>{
      if(context.user){
        const collection = await Collection.create({
          name:name, 
          user: context.user._id,
          images: images
          });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { collections: collection._id } }
        );
        return collection;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addImage: async(parent, {collectionId, imageId}, context) => {
      if (context.user) {
        const image = await Collection.findOneAndUpdate(
          {_id: collectionId},
          {$addToSet: {images: imageId}}
        )
        return image;
      }
      throw new AuthenticationError('You need to be logged in!'); 
    },
    removeCollection: async(parent, {collectionId}, context) =>{
      if (context.user) {
        const collection = Collection.findOneAndDelete({collectionId})
        await User.findOneAndUpdate({_id: context.user._id},{$pull: {collections: collectionId}})
        return collection;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeImage: async(parent, {collectionId, imageId}, context) =>{
      if(context.user){
        return Collection.findOneAndUpdate(
          {_id: collectionId},
          {$pull: {images: imageId}}
        )
      }
      throw new AuthenticationError('You need to be logged in!');
    }
    }
  }

  module.exports = resolvers;
