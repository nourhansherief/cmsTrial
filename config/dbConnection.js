const mongoose = require('mongoose')

const connectToDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_CONNECTION_STRING)
        console.log("MongoDB is Connected Successfully!")
        return connection.connections
    } catch (error) {
        console.log("Something Went Wrong While Connecting To MongoDB")
    }
}

module.exports = {connectToDb}