import AppError from '../../errors/AppError'
import { NextFunction, Response, Request } from 'express'

export default (
  error: Error,
  _request: Request,
  response: Response,
  _: NextFunction
) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    })
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
}