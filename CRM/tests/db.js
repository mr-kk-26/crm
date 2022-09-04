/**
 *  This file will be used to initiate the connection with
 *  mongodb memory server (which we have installed as npm dependency)
 */

const mongoose = require("mongoose");
const {MongoMemoryServer} = require("mongodb-memory-server");

let mongod ;
/**
 * 
 *  Connecting to the DB
 */
module.exports.connect = async ()=>{
    if(!mongod){
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        const mongoseOpts = {
            useUnifedTopology : true,
            maxPoolSize : 10
        }
        mongoose.connect(uri, mongoseOpts); // mongoose is now connected to mongodb

    }
}

/**
 * 
 *  Disconnecting  the DB and closing all the connections
 *  
 *  whole testing is completed
 */

module.exports.closeDatabase = async () =>{
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();

    if(mongod){
        await mongod.stop();
    }
}
/**
 * 
 *  Clear the db, remove all the records after the testing is complete
 * 
 *  when each individual test is completed.
 */

module.exports.clearDatabase = () =>{
    const collections = mongoose.connection.collections ;
    for(const key in collections){
        const collection = collections[key];
        collection.deleteMany(); // delete all the documents from this collection
    }
}