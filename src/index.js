require('./db/mongoose')
const User = require('./models/user')

const PORT = process.env.PORT;
console.log(PORT);

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