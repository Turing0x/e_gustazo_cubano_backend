/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

import { MESSAGES } from './messages.defines';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export const badResponse = (
  res: Response,
  message: string,
  data: any = '',
  status?: number) => {
  
  res.status(status ?? 500).json({
    api_message: MESSAGES[message],
    data
  }).end()
}

export const goodResponse = (
  res: Response,
  message: string,
  data: any = '' ) => {
  
  res.status(200).json({
    api_message: MESSAGES[message],
    data
  }).end()
}

