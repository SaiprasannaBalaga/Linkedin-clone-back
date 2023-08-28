const { Router } = require("express");
const { register, login, loggedInUser } = require("../controllers/usercontroller");

const userRouter = Router();

userRouter.post("/register", async (req, res) => {
    try{
        const data = await register(req);
        res.send(data);
    } catch(error) {
        console.log(error);
    res.send({ err: error.message });
    }
});

userRouter.post("/login",async (req, res) => {
    try{
        const data = await login(req);
        res.send(data);
    }catch(error){
        res.send({err: error.message});
    }
});

userRouter.get("/loggedInUser", async (req, res) => {
    try{
        if(!req.isAuth) throw new Error("Unauthenticated");
        const data = await loggedInUser(req);
        res.send(data);
    }catch (error) {
        res.send({err: error.message});
    }
}); 
module.exports = userRouter;
