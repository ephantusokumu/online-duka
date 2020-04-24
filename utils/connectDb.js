import mongoose from 'mongoose'

const connection = {}

async function connectDb() {
    if(connection.isConnected){
        console.log("Using the existing connection")
        return;


    }
    //use new database
    const db = await mongoose.connect(process.env.MONGO_SRV,{
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    console.log("DB connected")
    connection.isConnected = db.connections[0].readyState;

}

export default connectDb;