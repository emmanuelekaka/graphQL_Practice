const express = require('express')
const  graphqlexpress =  require('express-graphql').graphqlHTTP
const {GraphQLSchema, GraphQLObjectType,
    GraphQLString, GraphQLList, GraphQLInt, GraphQLNonNull} = require('graphql')
const authors = [
    {id:1, name:"Mitkin"},
    {id:2, name:"Dair"},
    {id:3, name:"ominic"},
    {id:4, name:"Dominic"},
]
const books=[
    {id:1,name:"Harray Potter", genre:"Magic", authorId:1},
    {id:2,name:"Morbious", genre:"Vampire Stories", authorId:3},
    {id:3,name:"Avengers", genre:"Sci-Fi", authorId:2},
    {id:4,name:"Mask", genre:"Commedy", authorId:4}
]

const BookType = new GraphQLObjectType({
        name:'Book',
        description:'Its a book',
        fields:()=>({
            id:{type:new GraphQLNonNull(GraphQLInt)},
            name:{type:new GraphQLNonNull(GraphQLString)},
            genre:{type:new GraphQLNonNull(GraphQLString)},
            authorId:{type:new GraphQLNonNull(GraphQLInt)},
            author:{type:AuthorType,
                resolve: (Book)=>{
                    return authors.find(author=>author.id === Book.authorId)
                }
            }

        })
})
const AuthorType = new GraphQLObjectType({
        name:'Author',
        description:'Is an Author',
        fields:()=>({
            id:{type:new GraphQLNonNull(GraphQLInt)},
            name:{type:new GraphQLNonNull(GraphQLString)}      
        })
})


// advancing
const RootQuery = new GraphQLObjectType({
    name: "Query",
    description: 'Root Query',
    fields: ()=>({
        books:{
            type:new GraphQLList(BookType),
            description:'List of all Books',
            resolve: ()=>books
         },
        authors:{
            type:new GraphQLList(AuthorType),
            description:'List of all Authors',
            resolve: ()=>authors
        }
    })
})
const schema = new GraphQLSchema({
    query:RootQuery
})

const app = express()
app.use("/graphql", graphqlexpress({
    schema:schema,
    graphiql: true


}))
app.listen(4000., ()=>{
    console.log("Server is running")
})