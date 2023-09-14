import mongoose  from 'mongoose';



const userSchema =  new mongoose.Schema({
    fullname: {
      type: String,
      default: 'firstname',
      index: true, // Create an index on the email field
      required: true
    },
    email: {
      type: String,
      default: 'test@gmail.com',
      unique: true, // Ensure email addresses are unique
      index: true, // Create an index on the email field
      required: true
    },
    hashed_password: {
      type: String,
      default: 'test',
      index: true, // Create an index on the email field
      required: true
    },
    access_token: {
      type: String,
      default: null,
      index: true, // Create an index on the email field
    },
  },
  );
  
  const UserModel  = mongoose.model('User', userSchema);
  export default UserModel;
