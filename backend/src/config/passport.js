/* eslint-disable no-undef */
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";

// Store user in session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Retrieve user from session
passport.deserializeUser((user, done) => {
  done(null, user);
});

// GitHub OAuth strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/github/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      const user = {
        id: profile.id,
        username: profile.username,
        avatar: profile.photos?.[0]?.value || null,
      };

      return done(null, user);
    }
  )
);

export default passport;
