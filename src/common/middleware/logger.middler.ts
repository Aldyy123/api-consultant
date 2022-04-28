import {NestMiddleware, Injectable} from '@nestjs/common'
import {Response, Request, NextFunction} from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        console.log('request')
        next('route')
    }
}