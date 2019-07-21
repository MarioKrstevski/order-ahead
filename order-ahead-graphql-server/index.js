const { ApolloServer} = require("apollo-server");

import resolvers from "./resolvers";
import typeDefs from "./schema";


const server = new ApolloServer({ typeDefs, resolvers });


// This `listen` method launches a web-server.  
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
