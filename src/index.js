const { GraphQLServer } = require('graphql-yoga')

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
    feed: () => links,

 },
Mutation :{
post:(root,args) => {
const link = {
id: 'link-${idCount++},
description:args.description,
url:args.url,
}
links.push(link)
return link
}
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
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
