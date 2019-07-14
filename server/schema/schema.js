const graphql = require('graphql');
const_ = require('lodash');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt} = graphql;

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type:GraphQLID },
    name: {type: GraphQLString},
    genre: {type: GraphQLString}
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type:GraphQLID },
    name: {type: GraphQLString},
    age: {type: GraphQLInt}
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: {type: GraphQLID}},
      resolve(parent, args){

        //code to get the data from db/other source
        console.log(typeof(args.id));
        return _.find(books, {id: args.id});
      }
    },
    author: {
      type: AuthorType,
      age: {id:{type:GraphQLID}},
      resolve(parent, args){
        return _.find(authors, {id: args.id});
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
