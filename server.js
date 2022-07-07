const express = require('express');
const  graphqlexpress =  require('express-graphql').graphqlHTTP;
const app = express();
app.use("/graphql", graphqlexpress({

}));
app.listen(4000., ()=>{
    console.log("Server is running");
});