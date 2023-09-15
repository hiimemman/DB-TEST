import { Request, Response } from "express";
import { GetCurrentDateSTR} from "../common/GetCurrentDate";
import { IUser, userRepo } from "../repositories/UserRepositories";
import AuthServices from "../services/AuthServices";

interface IResponseMessage{
    responseContent: any,
    responseStatus: number,
    responseDateTime: string,
}

interface IUserAuth{
    email: string,
    hashed_password: string
}


export async function Authentication( request: Request, response: Response){

    let responseData : IResponseMessage ={
        responseContent: [],
        responseStatus: 201,
        responseDateTime:  GetCurrentDateSTR(),

    }

    try{

        const authUser = await AuthServices.CheckIfUserMatch(request.body);

        if(authUser === true){
            const token = request.body.email;
            console.log(token)
           response.cookie('authToken',token, {
            httpOnly: true,
            maxAge: 3600000, 
            // sameSite: "none",
            // secure: false,
            path: '/', // Set to '/' to make it accessible from all paths
            domain: 'localhost', // Set to the appropriate domain
        })
        
        responseData ={
            
            responseContent: "Succesfull",
            responseStatus: 200,
            responseDateTime : GetCurrentDateSTR(),
           
         }
        
        }
        
        response.json(responseData);

    }catch(e){
        console.log("Error in auth controller: ",e)
        const responseData : IResponseMessage = {
            responseContent: e,
            responseStatus: 500,
            responseDateTime:  GetCurrentDateSTR(),
        }
        response.json(responseData);
    }

}

export async function LogOut(request: Request, response: Response){

    let responseData : IResponseMessage ={
        responseContent: [],
        responseStatus: 201,
        responseDateTime:  GetCurrentDateSTR(),

    }

    try{

    response.clearCookie('authToken');

    response.status(200).json({message: "Succesfully Logout"})
    }catch(e){
        responseData = {
            responseContent: "Error in auth controller: "+e,
            responseStatus: 500,
            responseDateTime: GetCurrentDateSTR(),
        }
        response.json()
    }

}

export async function CheckAuth( request: Request, response :Response){

    try{
       
        response.status(200).json({message: "Already logged in"})

    }catch(e){
        response.status(500)
    }

}