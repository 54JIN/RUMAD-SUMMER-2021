require('./db/mongoose')
const User = require('./models/user')

const PORT = process.env.PORT;
console.log(PORT);

const functionTrial = async () => {
    const user = new User({
        name: 'Kermit Pissed',
        password: 'Hibblehobble'
    })
    try{
        await user.save()
        console.log('Saved');
    } catch {
        console.log('Error Saving')
    }
}

functionTrial();