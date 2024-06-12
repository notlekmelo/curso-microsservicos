import { NextFunction, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export default (req: Request, res: Response, next: NextFunction) => {
  let { transactionid } = req.headers;
  if (!transactionid) {
    return res.status(400).json({
      status: 400,
      message: "The transactionid header is required.",
    });
  }
  req.headers.serviceid = uuidv4();
  return next();
};