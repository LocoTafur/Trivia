import { register as register_service } from "../services/auth.service.js"
import { constants } from "../services/utils/constants.js"

const {status, message} = constants.response

const register = async (req, res) => {
    
    const user_db = await register_service(req.body)
    return res.status(status.OK).json(user_db)
}

const login = (req, res) => {
    
}

export {
    register,
    login
}