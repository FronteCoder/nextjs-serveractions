import mongoose from "mongoose";

const connectToDb=async()=>{
const connectionURL=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.awucexv.mongodb.net/`
mongoose.connect(connectionURL).then(()=>{
    console.log('Database Connection Successful');
}).catch(()=>{
    console.log('Database Connection Failed');
})

}
export default connectToDb;