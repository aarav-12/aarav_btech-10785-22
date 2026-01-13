import express from "express";
import passport from "passport";

const router = express.Router();

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    // success → send user back to frontend
    res.redirect("http://localhost:5173");
  }
);

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.status(200).send("Logged out");
  });
});

export default router;
