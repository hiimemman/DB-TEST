import { IUser, userRepo } from "../repositories/UserRepositories";
import { GenerateHashPassword } from "../common/BcryptPassword";

class UserService{

    async GetAllUser() {
       
        try{
            const getUsers = await userRepo.getAllUser();
            return getUsers;
        }catch(e){
            console.error("Error in user services: ",e);
            return false
        }

    }

    async AddUser(data: IUser){
        
        try{

            const generatePass = await GenerateHashPassword(data.hashed_password)

            data = {...data, hashed_password: generatePass}

            const addUser = await userRepo.addUser(data);
            
            return addUser;
        }catch(e){
            console.error("Error in user services: ",e);
            return false
        }
    
    }

    async DeleteUser(id: string){
        
        try{
            const deleteUser = await userRepo.deleteUser(id);
            return true
        }catch(e){
            console.error("Error in user services: ",e);
            return false
        }
        
    }

    async GetUserById(id : string){

        try{
            const getUserById = await userRepo.getUserByID(id);
            return {response: true, "users":getUserById}
        }catch(e){
            console.error("Error in user services: ",e);
            return {response: false}
        }

    }

    async UpdateUserById(id : string, data: IUser){

        try{

            const updateUserById = await userRepo.updateUserByID(id, data);

            return true

        }catch(e){
            console.error("Error in user service ", e)
            return false
        }

    }

}

export default new UserService();