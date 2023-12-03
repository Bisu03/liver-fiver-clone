import jwt from "jsonwebtoken"
import createError from "../utils/createError.js";

export const userMiddleware = async (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) {
        return next(createError(404, "Unauthorized"));
    }
    if (
        token
    ) {
        try {
            const payload = jwt.verify(token, process.env.JWT_KEY)
            req.userId = payload.id
            req.isSeller = payload.isSeller;
            next()
        } catch (error) {
            return next(error)
        }
    }
}