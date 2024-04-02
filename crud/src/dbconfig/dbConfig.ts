import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL!)
        const connection = mongoose.connection
        connection.on('connected' , ()=>{
            console.log('MongoDB connected')
        })

        connection.on('error' , (err)=>{
            console.log('error while connecting mongoDB' + err)
            process.exit()
        })
    } catch (error) {
        console.log("database connection Error");
        console.log(error)
    }
}