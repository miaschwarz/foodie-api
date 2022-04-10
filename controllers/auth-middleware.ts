import { User } from '../models/user';

export const authMiddleware = async (req, res, next) => {
  try {

    let tokenX = 'y';
    if (req.query.token) {
      tokenX = req.query.token;
    } else {
      let { token } = req.body
      tokenX = token;
    }

    let existing = await User.findOne({
      where: {
        token: tokenX
      }
    });

    if (!existing) {
      throw 'Not Authenticated!'
    }
    next();
  } catch (e) {
    res.status(401)
    res.send({ error: e })
  }
}
