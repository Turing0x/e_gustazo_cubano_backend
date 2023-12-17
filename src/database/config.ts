import mongoose from 'mongoose';

export function dbConnection() {
  try {
    mongoose.set('strictQuery', true)
    
    mongoose.connect(process.env.MONGO_URL)
    console.clear()
    console.log('Base de datos Online')
  } catch (error) {
    console.log(error)
    throw new Error('Error en la base de datos')
  }
}