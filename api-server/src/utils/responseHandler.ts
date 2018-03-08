
import { Request, Response } from "express";
import { now } from "microtime";


export const responseSuccess = function (statusCode: number, msg: string, data: any, ): ApiDataResponse {
    return {
        success: true,
        statusCode: statusCode,
        message: msg,
        data: data,
        timestamp: now()
    };
};

export const responseFail = function (statusCode: number, msg: string): ApiDataResponse {
    return {
        success: false,
        statusCode: statusCode,
        message: msg,
        data: undefined,
        timestamp: now()
    }
}

interface ApiDataResponse {
    success: boolean,
    statusCode: number,
    message: string
    data: any,
    timestamp: number
}