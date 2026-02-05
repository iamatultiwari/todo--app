import mongoose from "mongoose";
import dotenv from 'dotenv' 


dotenv.config();

const connectDB = async() => {
    try{
      const connectionInstance = await mongoose.connect(`${process.env.MONGO_DB_URL}/${process.env.DB_NAME}`)
        console.log(`\nMogoDB connected Succesfully !! `)
    }catch(error) {
        console.log("mongodb connection failed" ,error);
        process.exit(1);

    }
}

export default connectDB;
