import mongoose from "mongoose";

const connectToDb=async()=>{
const connectionURL=""
mongoose.connect(connectionURL).then(()=>{
    console.log('Database Connection Successful');
}).catch(()=>{
    console.log('Database Connection Failed');
})

}
export default connectToDb;