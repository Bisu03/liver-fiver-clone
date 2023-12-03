
import User from "../models/user.model.js";
import createError from "../utils/createError.js";

export const deleteUser = async (req, res, next) => {
    try {
        if (req.userId !== req.params.id) {
            return next(createError(403, "You can delete only your account!"));
        }
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send("deleted.");
    } catch (error) {
        console.log(error)
        return res.next(error)
    }

};

export const getUser = async (req, res, next) => {
    const user = await User.findById(req.params.id);
    res.status(200).send(user);
};