const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

// 1
`
let links =[{
id: 'link-0',
url: 'www.howtographql.com',
description: 'fullstack tutorial for graphql clone'
}]
let idCount =links.length

// 2
const resolvers = {
  Query: {
    info: () => 'This is the api of the HackerNews CLone',
    feed: (root, args, context, info) => {
	return context.db.query.links({},info)
  },
}
 

},
Mutation :{
post:(root,args,context, info) => {
return context.db.mutation.createLink({
data: {
url:args.url,
description:args.description,
         },
      },info)
     }  ,
    },
 }


 Link: {
 id: (root) => root.id,
 description:(root) => root.description,
 url: (root) => root.url,
 }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
context: req => ({
...req,
 db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://eu1.prisma.sh/public-graytracker-771/hackernews-node/dev',
      secret: 'mysecret123',
      debug: true,
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
