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
    {id:4,name:"Mask", genre:"Commedy", authorId:4},
    {id:5,name:"1000words", genre:"Commedy", authorId:4},
    {id:6,name:"million lies", genre:"Commedy", authorId:4},
    {id:7,name:"Dream", genre:"Action Thriller", authorId:4}
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
            name:{type:new GraphQLNonNull(GraphQLString)},
            books:{
                type:new GraphQLList(BookType),
                resolve: (Author)=>{
                    return books.filter(book=>book.authorId === Author.id)
                }
            }      
        })
})


// advancing
const RootMutationType = new GraphQLObjectType({
    name:"Mutation",
    description:'Modification of data',
    fields: ()=>({
        addBook:{
            type: BookType,
            description: 'Addition of a book',
            args:{
                name:{type:new GraphQLNonNull(GraphQLString)},
                genre:{type:new GraphQLNonNull(GraphQLString)},
                authorId:{type:new GraphQLNonNull(GraphQLInt)},
            },
            resolve:(parent,  args)=>{
                const book = {id:books.length+1, name:args.name, genre:args.genre, authorId: args.authorId}
                books.push(book)
                return book
            }
        }
    })

})
const RootQuery = new GraphQLObjectType({
    name: "Query",
    description: 'Root Query',
    fields: ()=>({
        book:{
            type:BookType,
            description:'Single Book',
            args:{
                id:{type: GraphQLInt}
            },
            resolve: (parent, args)=>books.find(book=>book.id ===args.id)
         },
        books:{
            type:new GraphQLList(BookType),
            description:'List of all Books',
            resolve: ()=>books
         },
        authors:{
            type:new GraphQLList(AuthorType),
            description:'List of all Authors',
            resolve: ()=>authors
        },
         author:{
            type:AuthorType,
            description:'Single Author',
            args:{
                id:{type: GraphQLInt}
            },
            resolve: (parent, args)=>authors.find(author=>author.id ===args.id)
         },
    })
})
const schema = new GraphQLSchema({
    query:RootQuery,
    mutation: RootMutationType,
    
        
})

const app = express()
app.use("/graphql", graphqlexpress({
    schema:schema,
    graphiql: true


}))
app.listen(4000., ()=>{
    console.log("Server is running")
})