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
            genre:{type:GraphQLString},
            authorId:{type:new GraphQLNonNull(GraphQLInt)},
            author:{type:AuthorType}

        })
})
// const BookType = new GraphQLSchema({
//     query:new GraphQLObjectType({
//         name:'Book',
//         fields:()=>({
//             // id:{type:GraphQLString},
//             name:{type:GraphQLString, resolve:()=>'This is Emma Emma'},
//             genre:{type:GraphQLString}
//         })
//     })
// })



// advancing
const RootQuery = new GraphQLObjectType({
    name: "Query",
    description: 'Root Query',
    fields: ()=>({
        books:{
            type:new GraphQLList(BookType),
            description:'List of all Books',
            resolve: ()=>book
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