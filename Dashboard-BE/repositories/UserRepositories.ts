import UserModel from '../models/UserModel';

export interface IUser{
    fullname: string,
    email: string,
    hashed_password: string,
    access_token: string
}


class UserRepository{

    async getAllUser(){
        try{
            return await UserModel.find()
            .lean();
        }catch(e){
            console.error("Repository error: ",e)
        }
       
    }

    async getUserByID(id : string ){    
       
        try{
            return await UserModel.findById(id);
        }catch(e){
            console.error("Repository error: ",e)
        }

    }

    async addUser(data : IUser){

        try{
            const user = new UserModel(data);
            const userSave = await user.save();
            return true
        }catch(e){
            console.error("Repository error: ",e)
            return false
        }
        
    }

    async updateUserByID(id : string, data : IUser){
      
        try{
           
            return await UserModel.findByIdAndUpdate(id, data, {new: true});
        }catch(e){
            console.error("Repository error: ",e)
        }

    }
    
    async deleteUser(id: string){

        try{
            return await UserModel.findByIdAndRemove(id);
        }catch(e){
            console.error("Repository error: ",e)
        }
        
    }

}

export const userRepo = new UserRepository();