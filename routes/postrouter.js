const { Router } = require("express");
const { addpost, getpost, deletepost } = require("../controllers/postcontroller");

const postRouter = Router();

postRouter.post("/addpost", async (req, res) => {
    try{
        const data = await addpost(req);
        res.send(data);
    } catch(error) {
        console.log(error);
    res.send({ err: error.message });
    }
});

postRouter.get("/getpost", async(req,res) => {
    try{
        const data = await getpost(req);
        res.send(data);
    } catch(error){
        console.log(error);
        res.send({err: error.message});
    }
});

postRouter.delete("/deletepost/:postId",async(req,res) => {
   try {
        const data = await deletepost(req);
        res.send(data);
   } catch (error) {
        console.log(error);
        res.send({err: error.message});
   }
})

module.exports = postRouter;
