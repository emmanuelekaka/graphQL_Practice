const express = require("express");
const {ApolloServer,  gql} = require('apollo-server-express');

const  typeDefs =  gql`
    type Query {
        hello:String!
    }
`
const  resolvers = {
    Query: {
        hello: ()=>{
            return 'Hello Emma'
        },
    },
}

async function startserver(){
    const  app = express()
    const  apolloserver = new ApolloServer({
        typeDefs,
        resolvers
    })
    await apolloserver.start()
    // we can add in a custome link to apollo server
    apolloserver.applyMiddleware({app:app})
    app.use((req, res)=>{
        res.send('Hello there')
    })
    app.listen(4000, ()=>console.log('server running successfully'))
}
startserver()