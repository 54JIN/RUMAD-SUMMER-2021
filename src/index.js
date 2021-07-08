require('./db/mongoose')
const express = require('express')
const app = express()
const User = require('./models/user')

const PORT = process.env.PORT;
console.log(PORT);

app.use(express.json())

const functionTrial = async (name, password, userName, bio) => {
    const user = new User({
        name,
        password,
        userName,
        profileInfo: {
            bDay: 9,
            bMonth: 10,
            bYear: 1985,
            locationToVisit: 'bahamas',
            bio
        }
    })
    try{
        await user.save()
        console.log('Saved');
    } catch {
        console.log('Error Saving')
    }
}

functionTrial('Kermit Pissed', 'Hibblehobble', 'KermitTheGoblin','thats crazy');
functionTrial('Twin Kermit', 'pasttheFuture', 'noway','that is quite insane');

app.get('/', (req,res) => {
    console.log("hello world");
})

app.listen(PORT, () => {
    console.log(`listening at ${PORT}`);
})