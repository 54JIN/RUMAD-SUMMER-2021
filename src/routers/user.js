const express = require('express');
const router = new express.Router();
const User = require('../models/user');

//returns all users within the user collection of mongoose
router.get('/users', async (req, res) => {
    try{
        const user = await User.find({})
        res.send(user);
    } catch (e) {
        res.send(e);
    }
})

//creates a new user into the user collection and then returns that users data
router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try{
        await user.save();
        res.status(201).send(user);
    } catch (e) {
        res.status(400).send(e);
    }
})

//updates a particular user with allowed updates and returns the new version
router.patch('/users', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['userId', 'name', 'email', 'password', 'userName','age', 'bDay', 'bMonth', 'bYear', 'bio', 'country', 'state', 'county'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update) )

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }
    
    try{
        const user = await User.findById(req.body.userId);

        updates.forEach((update) => {
            if(update==='bDay' || update==='bMonth' || update==='bYear' || update==='bio'){
                console.log(user['profileInfo'][update]);
                user['profileInfo'][update] = req.body[update];
            }
            else if(update==='country' || update==='state' || update==='county'){
                user['profileInfo']['locationToVisit'][update] = req.body[update];
            }
            user[update] = req.body[update];
        });
        
        await user.save()

        res.send(await User.findById(req.body.userId));
    } catch (e) {
        res.status(400).send(e);
    }
})

//delets a particular user from the user collection
router.delete('/users', async (req,res) => {
    try{
        const user = await User.findById(req.body.userId)
        await User.findOneAndRemove({_id:req.body.userId})
        res.send(user);
    } catch (e) {
        res.status(500).send(e);
    }
})

module.exports = router;