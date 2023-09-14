import { CheckHashPassword } from "../common/BcryptPassword";
import UserModel from "../models/UserModel";
import { IUser, userRepo } from "../repositories/UserRepositories";

interface IUserData {
    email: string,
    hashed_password: string
}

class AuthService{

    async CheckIfUserMatch(data : IUserData){

        let isAuth = false;
        
        try{
            

            const getUserPerEmail = await UserModel.findOne({ email: data.email });
            
            if(getUserPerEmail){
                
                isAuth = await CheckHashPassword(data.hashed_password, getUserPerEmail.hashed_password);

            }

            return isAuth

        }catch(e){
            console.log("Error in authservice: ",e)
            return isAuth;
        }
    
    }

}

export default new AuthService();