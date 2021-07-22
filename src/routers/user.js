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

//returns all users with the same country to visit
router.get('/users/:country', async (req,res) => {
    try{
        //get all the users with profileInfo
        const user = await User.find({}).select("profileInfo");
        //filter through the users with the right country
        let matchingUsers = user.filter(user => {
            if(user.profileInfo.locationToVisit.country === req.params.country){
                return user
            }
        })
        let id = new Array();
        //storing matched users id in an empty array
        matchingUsers.forEach(mUser => {
            id.push(mUser._id);
        })
        //using the array of ids to return all properties associated to them
        const result = await User.find({
            '_id': { $in: id}
        })
        //returning the result
        res.send(result);
    } catch (e) {
        //catching any errors
        res.status(500).send(e);
    }
})

router.get('/users/:id', async (req, res) => {
    try{
        //getting the user from collection
        const user = await User.findById(req.params.id);
        //setting individual variables
        const {country, state} = user.profileInfo.locationToVisit;
        const {bio, bDay, bMonth, bYear} = user.profileInfo;
        const {userName, name} = user;
        //calculating age
        const today = new Date();
        const birthDate = new Date(bYear, bMonth-1, bDay);
        //gets the pottential correct age
        let age = today.getFullYear() - birthDate.getFullYear();
        //calculates how far off the month is from birthday
        const m = today.getMonth() - birthDate.getMonth();
        //checks if the age is to be lower or stay the same
        //if the current day is less than the birthDay lower age
        if(m < 0 || (m === 0 && today.getDate() < birthDate.getDate())){
            age--;
        }
        //make an object thats organized
        const result = {
            userName,
            name,
            bDay,
            bMonth,
            bYear,
            age,
            country,
            state,
            bio,
        }
        //return the result
        res.send(result);
    } catch (e) {
        res.status(401).send(e);
    }
})

//returns all the bookmarked users
router.get('/users/bookmarked/:id', async (req,res) => {
    try{
        //get the user with the correct id
        const user = await User.findById(req.params.id);
        /*
            1.) gain access to the users matched ids of other users
            2.) return the matched users first and last name, age, location to visit, and image if any already integrated.
        */
        
    } catch (e) {
        res.status(401).send(e);
    }
})

module.exports = router;
