import { Request, Response } from "express";
import { GetCurrentDateSTR } from "../common/GetCurrentDate";
import UserService from "../services/UserServices";

interface IResponseMessage{
    responseContent: any,
    responseStatus: number,
    responseDateTime: string,
}

export async function GetAllUser(request: Request, response: Response){

    try{

    const getUsers = await UserService.GetAllUser();
    
    const responseData : IResponseMessage ={
        responseContent: getUsers,
        responseStatus: 200,
        responseDateTime:  GetCurrentDateSTR(),

    }

    response.json(responseData)
    }catch(e){
        const reponseData : IResponseMessage ={
            responseContent: "error: "+e,
            responseStatus: 500,
            responseDateTime:  GetCurrentDateSTR(),
    
        }
        response.json(reponseData)
    }
    

}

export async function AddUser(request: Request, response: Response){

    try{
        let responseData : IResponseMessage ={
            responseContent: "succesfully added new user",
            responseStatus: 200,
            responseDateTime:  GetCurrentDateSTR(),
    
        }
        const addUser = await UserService.AddUser(request.body);

        if(addUser === false){
            responseData = { 
                responseContent : "Failed to add user",
                responseStatus: 201,
                responseDateTime: GetCurrentDateSTR()
            }
        }

        response.json(responseData);
    }catch(e){
        const responseData : IResponseMessage = {
            responseContent: e,
            responseStatus: 500,
            responseDateTime:  GetCurrentDateSTR(),
        }
        response.json(responseData);
    }

}

export async function DeleteUserById(request : Request, response: Response){

    let responseData : IResponseMessage ={
        responseContent: "succesfull deleted",
        responseStatus: 200,
        responseDateTime:  GetCurrentDateSTR(),

    }

    try{

        const delUser = await UserService.DeleteUser(request.params.id);

        if(delUser !== true){
            responseData = {
                responseContent: "Failed to delete a user",
                responseStatus: 201,
                responseDateTime: GetCurrentDateSTR(),
            }
        }
       
        response.json(responseData);

    }catch(e){
        const responseData : IResponseMessage = {
            responseContent: e,
            responseStatus: 500,
            responseDateTime:  GetCurrentDateSTR(),
        }
        response.json(responseData);
    }

}

export async function GetUserById(request: Request, response : Response){

    let responseData : IResponseMessage ={
        responseContent: [],
        responseStatus: 201,
        responseDateTime:  GetCurrentDateSTR(),

    }
    try{
        
        const getUserById = await UserService.GetUserById(request.params.id);

        if(getUserById.response === true){

            responseData  ={
                responseContent: getUserById.users,
                responseStatus: 200,
                responseDateTime:  GetCurrentDateSTR(),
        
            }

        }else{
        
            responseData  ={
                responseContent: [],
                responseStatus: 201,
                responseDateTime:  GetCurrentDateSTR(),
        
            }
            
        }

        response.json(responseData);

    }catch(e){
        const responseData : IResponseMessage = {
            responseContent: e,
            responseStatus: 500,
            responseDateTime:  GetCurrentDateSTR(),
        }
        response.json(responseData);
    }

}

export async function UpdateUserByIdBody( request: Request, response: Response) {

    let responseData : IResponseMessage ={
        responseContent: "User: "+request.body.fullname+" information has been updated",
        responseStatus: 200,
        responseDateTime:  GetCurrentDateSTR(),

    }

    try{

        const updateUserById = await UserService.UpdateUserById(request.body.id, request.body)

        if(updateUserById === false){
            responseData = {
                responseContent: "User failed to update",
                responseStatus: 201,
                responseDateTime:  GetCurrentDateSTR(),
        
            }
        }

        response.json(responseData);
    }catch(e){

        const responseData : IResponseMessage = {
            responseContent: e,
            responseStatus: 500,
            responseDateTime:  GetCurrentDateSTR(),
        }
        response.json(responseData);

    }

}

export async function UpdateUserById(request : Request, response: Response){

    let responseData : IResponseMessage ={
        responseContent: "User: "+request.body.fullname+" information has been updated",
        responseStatus: 200,
        responseDateTime:  GetCurrentDateSTR(),

    }

    try{
        const updateUserById = await UserService.UpdateUserById(request.params.id, request.body)

        if(updateUserById === false){
            responseData = {
                responseContent: "User failed to update",
                responseStatus: 201,
                responseDateTime:  GetCurrentDateSTR(),
        
            }
        }

        response.json(responseData);
    }catch(e){

        const responseData : IResponseMessage = {
            responseContent: e,
            responseStatus: 500,
            responseDateTime:  GetCurrentDateSTR(),
        }
        response.json(responseData);

    }

}