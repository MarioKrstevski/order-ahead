// const { ApolloServer } = require("apollo-server");
const { ApolloServer } = require("apollo-server-express");
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import {} from "./mockData";
import { users } from "./mockData";
import config from "./config.json";



import resolvers from "./resolvers";
import typeDefs from "./schema";
import { start } from "repl";

const startServer = async () => {


  const app = express()
  
const server = new ApolloServer({
  cors: { origin: true, credentials: true },
  typeDefs,
  resolvers
}); 

server.applyMiddleware({app})

const DB_URI = config.dbUri;
await mongoose.connect(DB_URI, { useNewUrlParser: true });

var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));


// This `listen` method launches a web-server.
app.listen({port: 4000}, () => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});
}

startServer();
