import mongoose from "mongoose";

const connectToDb=async()=>{
const connectionURL="mongodb+srv://shivammishrapython:mango123@cluster0.awucexv.mongodb.net/"
mongoose.connect(connectionURL).then(()=>{
    console.log('Database Connection Successful');
}).catch(()=>{
    console.log('Database Connection Failed');
})

}
export default connectToDb;