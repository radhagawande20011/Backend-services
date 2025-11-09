import { Strategy, ExtractJwt } from 'passport-jwt';
import db from '../../models';
import { JWT_SECRET_FOR_ACCESS_TOKEN } from '../../config/db.config';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET_FOR_ACCESS_TOKEN,
};

export const jwtStrategy = new Strategy(opts, async (jwt_payload: any, done: any) => {
  try {
    const user = await db.user.findByPk(jwt_payload.userId, { include: [{ model: db.role }] });
    if (user) return done(null, user);
    return done(null, false);
  } catch (err) {
    done(err, false);
  }
});
