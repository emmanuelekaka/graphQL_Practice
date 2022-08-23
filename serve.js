const express = require("express")
const  {ApolloServer} = require("apollo-server-express")
const  typeDefs = require("./typeDefs")
const  resolvers = require("./resolvers")
const mongoose = require('mongoose')

const startserver= async ()=>{
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
    await mongoose.connect('mongodb://localhost:27017/post_db', {
        useUnifiedTopology:true,
        useNewUrlParser: true
    })
    console.log('mongoose connected ...')
    app.listen(4000, ()=>console.log('server running successfully'))
}
startserver()