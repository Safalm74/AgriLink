import { Response, NextFunction } from "express";
import { Request } from "../interface/auth";
import * as testmodel from "../model/test"

export async function test(req:Request,res:Response){
    const {body}=req;

    testmodel.TestModel.create(body);

    res.json(body)
}