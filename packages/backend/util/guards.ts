import {NextFunction} from "connect";
import {Request, Response} from "express";

export function isAuthenticatedGuard(req: Request, res: Response, next: NextFunction) {
    if (req.user) {
        return next();
    }

    return res.status(401).json({
        error: 'Not authenticated'
    });
}