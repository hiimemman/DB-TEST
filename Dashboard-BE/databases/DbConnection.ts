import mongoose from "mongoose";

export default function connectToMongoDB(connectionString : string){
  mongoose.connect(connectionString)
  const db = mongoose.connection;
  db.on('error', (error) => console.error(error))
  db.once('open', () => console.log("Connected to database"))
}
