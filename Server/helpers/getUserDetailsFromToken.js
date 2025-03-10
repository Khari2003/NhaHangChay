const jwt = require('jsonwebtoken')
const UserModel = require('../models/user.model')

async function getUserDetailsFromToken(token) {
    if(!token){
        return {
            message: 'session out',
            logout:true
        }
    }

    const decode = await jwt.verify(token, process.env.JWT_SECREAT_KEY)

    const user = await UserModel.findById(decode.id).select('-password')

    return user
}

module.exports = getUserDetailsFromToken