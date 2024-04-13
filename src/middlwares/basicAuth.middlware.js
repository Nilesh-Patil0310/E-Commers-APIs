import UserModel from "../features/user/user.model.js";
const basicAuthorizer = (req,res,next)=>{
    // check if authorization header is empty.

    const authHeader = req.headers['authorization'];

    if(!authHeader){
        return res.status(401).send('No authorization details found')
    }
    
    console.log(authHeader);
    // Extracting credentials. [Basic hdkhfhkjjfrjogji]

    const base64Credentials = authHeader.replace('Basic','');
    console.log(base64Credentials);

    // decode credentials
    const decodeCredentials = Buffer.from(base64Credentials,'base64').toString('utf8');
    console.log(decodeCredentials);

    const credentials = decodeCredentials.split(':');

    const user = UserModel.getAll().find(u=> u.email === credentials[0] && u.password === credentials[1]);

    if(user){
        next()
    }else{
        return res.status(401).send('Invalid credentials')
    }

}

export default basicAuthorizer;