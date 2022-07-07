const express = require('express')
const  graphqlexpress =  require('express-graphql').graphqlHTTP
const {GraphQLSchema, GraphQLObjectType,GraphQLString} = require('graphql')
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

const BookType = new GraphQLSchema({
    query:new GraphQLObjectType({
        name:'Book',
        fields:()=>({
            // id:{type:GraphQLString},
            name:{type:GraphQLString, resolve:()=>'This is Emma Emma'},
            genre:{type:GraphQLString}
        })
    })
})
const app = express()
app.use("/graphql", graphqlexpress({
    schema:BookType,
    graphiql: true


}))
app.listen(4000., ()=>{
    console.log("Server is running")
})