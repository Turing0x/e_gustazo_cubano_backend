/* eslint-disable no-undef */
const jwt = require('jsonwebtoken')

const UserModel = require('../api/User/domain/user.models')
const sendRes = require('../helpers/send.res')

module.exports = async (req, res, next) => {
  try {
    const token = req.headers['access-token']
    const decoded = jwt.verify(token, process.env.JWT_KEY_APP)

    const { enable, role, username } = await UserModel.findOne({ _id: decoded.user_id })
      .select(['_id', 'username', 'enable', 'role'])
      .populate('role')

    if (enable) {
      res.userData = { ...decoded, role, username }
      return next()
    }
  } catch (error) { return sendRes(res, 200, false, 'server_mess_5', error.message) }
}
