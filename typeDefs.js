const  {gql} = require ("apollo-server-express")
const  typeDefs =  gql`
    type Post{
        id:ID
        title:String
        description:String
    }
    type Query {
        hello:String!
        getAllPosts:[Post]
        getPost(id:ID):Post
        
    }
    # Bug is used to make sure that the field should be provided whereever it is going to be used.
    input PostInput{
        title:String
        description:String

    }
    type Mutation{
        createPost(post:PostInput):Post
        deletePost(id:ID):String!
        updatePost(id:ID, post: PostInput):Post
    }
`
module.exports = typeDefs
