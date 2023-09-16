import Router from "express";
import { Authentication, CheckAuth, LogOut } from "../controllers/AuthController";
import { IsAuthMiddleware } from "../middlewares/IsAuthMiddleware";


const AuthRouter = Router();

AuthRouter.post('/login', Authentication)
AuthRouter.get('/logout', IsAuthMiddleware, LogOut)
AuthRouter.get('/check-auth',IsAuthMiddleware, CheckAuth)

AuthRouter.get('/printcookies', (req, res) => {
    const httpOnlyCookies : any = {};
  
    // Iterate through req.cookies to find HTTP-only cookies
    for (const cookieName in req.cookies) {
      const cookieOptions = req.cookies.authToken;

       // Check if the cookie is HTTP-only
    // if (cookieOptions.httpOnly) {
    //     httpOnlyCookies['AuthToken'] = cookieOptions.value;
    //   }
    console.log(cookieOptions)
    }
  
    res.json(httpOnlyCookies);
});

AuthRouter.get('/clearcookies', (req, res) => {
    const cookies = Object.keys(req.cookies);
  
    // Clear each cookie by setting their expiration to a past date
    cookies.forEach(cookieName => {
      res.clearCookie('authToken');
    });
  
    res.send('Cookies cleared');
});
  

export default AuthRouter;