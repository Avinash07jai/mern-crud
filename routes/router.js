
const express = require("express");
const router = express.Router();
const users = require("../model/UserSchema");

//  router.get("/", (req, res) =>{
//     console.log("connect")
//  });

router.post("/register", async (req, res) => {
    // console.log(req.body)
    const { name, email, age, mobile, work, address, desc } = req.body;
    if (!name || !email || !age || !mobile || !work || !address || !desc) {
        res.status(404).json("Plzz Fill the Data");
    }
    try {
        const preuser = await users.findOne({ email: email });
        console.log(preuser)

        if (preuser) {
            res.status(404).json("this user is already Registered");
        } else {
            const adduser = new users({
                name, email, age, mobile, work, address, desc
            });
            await adduser.save();
            res.status(201).json(adduser);
            console.log(adduser)
        }

    } catch (error) {
        res.status(404).json(error)
    }
});

// get user data
router.get("/getdata", async (req, res) => {
    try {
        const userdata = await users.find();
        res.status(201).json(userdata)
        console.log(userdata);
    } catch (error) {
        res.status(404).json(error);
    }
});

// get individual or single user data
router.get("/getuser/:id", async (req, res) => {
    try {
        console.log(req.params)
        const { id } = req.params;

        const usersingle = await users.findById({ _id: id });
        console.log(usersingle);
        res.status(201).json(usersingle)
    } catch (error) {
        res.status(404).json(error)
    }
});

// Updata user data

router.patch("/updatedata/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const updateuser = await users.findByIdAndUpdate(id, req.body, {
            new: true
        });
        console.log(updateuser);
        res.status(201).json(updateuser);
    } catch (error) {
        res.status(404).json(error);
    }
});

// delete user data

router.delete("/deletedata/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deleteuser = await users.findByIdAndDelete({_id:id});
        console.log(deleteuser);
        res.status(201).json(deleteuser);
    } catch (error) {
        res.status(404).json(error);
    }
})

module.exports = router;