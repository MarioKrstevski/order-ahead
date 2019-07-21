
import mongoose from "mongoose";
import {} from './mockData';
import {} from './mockOwner';

mongoose.connect(DB_URI, { useNewUrlParser: true });

var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));


export default {
    Query: {

    },
    Mutation: {
        
    }
}