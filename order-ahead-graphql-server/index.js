const { ApolloServer } = require("apollo-server");
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import {} from "./mockData";
import { users } from "./mockData";


import resolvers from "./resolvers";
import typeDefs from "./schema";

const server = new ApolloServer({
  cors: { origin: true, credentials: true },
  typeDefs,
  resolvers
});

// This `listen` method launches a web-server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
