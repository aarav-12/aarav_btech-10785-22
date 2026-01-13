/* eslint-disable no-undef */
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(
  new GitHubStrategy(
    {
      // eslint-disable-next-line no-undef
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/github/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // keep it simple: pass GitHub profile through
      return done(null, {
        id: profile.id,
        username: profile.username,
        avatar: profile.photos?.[0]?.value,
      });
    }
  )
);

export default passport;
