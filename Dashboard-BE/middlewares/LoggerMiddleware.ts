import {Request, Response, NextFunction } from 'express';

// a middleware that prints the request received
export default function LoggerMiddleware (request : Request, response : Response, next : NextFunction){
    console.log(`Request received: ${request.method} ${request.url} Request body : ${JSON.stringify(request.body)}`);

    next();
};

