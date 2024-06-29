import Joi from "joi"
import { response } from "./utils/response.js"
import User from "../models/User.js"
import bcrypt from 'bcrypt'



const user_regex = Joi.object({
    name: Joi.string().min(4).max(16).required(),
    nickname: Joi.string().min(4).max(16).required(),
    cel: Joi.string().min(10).max(15).required(),
    password: Joi.string().min(6).max(256).required(),
    confirm_password: Joi.ref('password'),
    email: Joi.string().min(5).max(24).email()
})

const register = async (user_req) => {

    const { error } = user_regex.validate(user_req)
    if (error) {
        return response(false, error.details[0].message)
    }

    const is_nickname = await User.findOne({ nickname: user_req.nickname })
    if (is_nickname) { 
        return response(false, 'nickname already exist') 
    }

    const is_cel = await User.findOne({ cel: user_req.cel })
    if (is_nickname) {
        return response(false, 'celular already exist') 
    }

    delete user_req.confirm_password

    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(user_req, salt)

    user_req = {
        ...user_req,
        password: hash
    }

    const user_db = new User(user_req)

    const new_user = await user_db.save()

    return response(true, 'user created', new_user)

}

const login = () => {

}

export {
    register,
    login
}