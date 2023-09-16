import {Request, Response, NextFunction } from 'express';

export default function CorsMiddleware(request: Request, response: Response, next: NextFunction) {
  
        response.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); 
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        response.setHeader('Access-Control-Allow-Credentials', 'true');
    

        next();
}