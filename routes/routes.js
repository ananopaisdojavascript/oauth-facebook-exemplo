import express from "express"
import passport from "passport"

const router = express.Router()

const isLoggedIn = (request, response, next) => {
    if (request.isAuthenticated()) {
        return next()
    }
    response.redirect("/")
}

router.get("/", (_request, response) => {
    response.render("pages/index.ejs")
})

router.get("/profile", isLoggedIn, (request, response) => {
    response.render("pages/profile.ejs", {
        user: request.user
    })
})

router.get("/error", isLoggedIn, (_request, response) => {
    response.render("pages/error.ejs")
})

router.get("/auth/facebook", passport.authenticate("facebook", {
    scope: ["public_profile", "email"]
}))

router.get("/auth/facebook/callback", passport.authenticate("facebook", {
    successRedirect: "/profile",
    failureRedirect: "/error"
}))

router.get("/logout", (request, response) => {
    request.logout()
    response.redirect("/")
})

export default router