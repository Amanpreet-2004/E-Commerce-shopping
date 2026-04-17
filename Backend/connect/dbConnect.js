import mongoose from "mongoose";

const dbConnect = async()=>{
    try {
        await mongoose.connect("mongodb+srv://amanpreetkaur:preetkaur@cluster0.moo4y8l.mongodb.net/kaur");
        console.log("Database is connected.")
        
    } catch (error) {
        console.log(error)
    }
}

export default dbConnect;
// username/password/databasename