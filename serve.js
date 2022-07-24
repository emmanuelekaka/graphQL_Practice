import express from 'express'
import  {ApolloServer,  gql} from 'apollo-server-express'

const  typeDefs =  gql`
    type:query{
        hello:String!
    }
`
const  resolvers = {
    Query:{
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
    apolloserver.applyMiddleware({app:app})
    app.use((req, res)=>{
        res.send('Hello there')
    })
    app.listen(4000, ()=>console.log('server running successfully'))
}
startserver()