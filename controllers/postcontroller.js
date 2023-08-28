const User = require("../model/userModel");
const PostModal = require("../model/postModal");

const addpost = async (req) => {
    return PostModal.create({
        ...req.body,userId:req.userId
    })
}

const getpost = async(req) => {
    const posts = await  PostModal.find({});
    const userArr = posts.map(e => {
        return User.findById(e.userId)
    });
    const users = await Promise.allSettled(userArr);
    console.log(users);
    let arr =  posts.map((e,i) => {
        return {
            ...e._doc, user: users[i].value
        }
    })
    console.log(arr);
    return arr;
};

const deletepost = async(req) => {
    return PostModal.findByIdAndDelete(req.params.postId)
}


module.exports = { addpost, getpost, deletepost};