const Post = require('./models/Post.model')
const  resolvers = {
    Query: {
        // Sample code
        // hello: ()=>{
        //     return 'Hello Emma'
        // },
        getAllPosts:async()=>{
            return await Post.find()
        },
        getPost:async (_parent, {id}, _context, _info)=>{
            return await Post.findById(id)
        },
    },
    Mutation:{
        createPost:async (parent, args, context, info)=>{
            const {title, description} = args.post
            const post  = new Post({title, description})
            await post.save();
            return post
        },
        updatePost:async (parent, args, context, info)=>{
            const {id} = args.id
            const updates = {}
         
            if (args.post.title !== undefined){
                updates.title = args.post.title
                
            }
            if (args.post.description !== undefined){
                updates.description = args.post.description
                   

            }
            console.log(updates) 
            const post = await Post.findOneAndUpdate(id,updates, {new:true});
            return post
            
            
        },
        deletePost:async (_parent, {id}, _context, _info)=>{
            await Post.findByIdAndDelete(id)
            return `post with id:${id} has been deleted successfully `
        },
    }
}
module.exports = resolvers