import mongoose from "mongoose";

export const connectdb = async () => {
    await mongoose.connect('mongodb+srv://avinash:readytogo10@cluster0food.okl4goy.mongodb.net/foodies').then(() => console.log('DB connected...'))
}

