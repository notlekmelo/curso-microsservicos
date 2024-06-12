import jwt from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode'
import { Request, Response } from "express";

export interface MyToken {
    userCode: string;
    userName: string;
}

//Token deveria puxar do env
export function ValidaToken(req: Request, res: Response,next: Function) {
    const token = <string>req.headers['x-access-token'];
    var erro : string;
    erro = "";
    if (!token) {
        return res.status(401).json({
            "auth": false,
            "message": 'Token não inserido'
        });
    }
    try {
        jwt.verify(token, String(process.env.SECRET || '5GEFEBCR6P24EF16E026D410FPKZ3S1A'), function (err) {
            if (err) {
                erro = err.message;
                return res.status(401).json({
                    "auth": false,
                    "message": 'Falha na Autenticação do token.'
                });
            }
            else {
                const response = jwtDecode<MyToken>(token)
                req.query.token = response.userCode;
                req.query.userName = response.userName;
            }
        });
        if (erro == ""){
            next(); 
        }
    }catch(E) {
        if (E instanceof Error) {
            E.message
        }
    }

}