// Middleware Error Handler Genérico

import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import DatabaseError from "../models/errors/database.error.model";
import ForbiddenError from '../models/errors/forbidden.error.model';

function errorHandler(error: any, req: Request, res: Response, next: NextFunction){

    if(error instanceof DatabaseError){
        res.send(StatusCodes.BAD_REQUEST); 
    }else if(error instanceof ForbiddenError){
        res.send(StatusCodes.FORBIDDEN);

    }else{
        res.send(StatusCodes.INTERNAL_SERVER_ERROR); 
    } 
}
export default errorHandler;