import bcrypt from "bcrypt";
import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import createError from "../utils/createError.js";

/**
 * @function register
 * @description for user registration.
 * @return {message}
 */
export const register = async (req, res, next) => {
    try {
        const { username,
            email,
            country,
            isSeller,
            desc,
            img } = req.body
        const hash = bcrypt.hashSync(req.body.password, 5);
        await User.create({
            username,
            email,
            country,
            isSeller,
            desc,
            img,
            password: hash,
        });
        return next(createError(201, "Register Successfully"));
    } catch (err) {
        console.log(err);
        return next(err)
    }

}

/**
 * @function login
 * @description for user login.
 * @return {message}
 */
export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            return next(createError(404, "user not found"));

        }
        const isCorrectPass = bcrypt.compareSync(req.body.password, user.password)
        if (!isCorrectPass) {
            return next(createError(400, "invalid crediential"));
        }
        const token = jwt.sign({ id: user._id, isSeller: user.isSeller }, process.env.JWT_KEY, {
            expiresIn: "30d",
        });
        const { password, ...info } = user._doc;
        res.cookie("accessToken", token, {
            httpOnly: true
        }).status(201).send(info)
    } catch (err) {
        console.log(err);
        return next(err)
    }

}

/**
 * @function logout
 * @description for user logout.
 * @return {token}
 */
export const logout = async (req, res) => {

    res
        .clearCookie("accessToken", {
            sameSite: "none",
            secure: true,
        })
        .status(200)
        .send("User has been logged out.");

}