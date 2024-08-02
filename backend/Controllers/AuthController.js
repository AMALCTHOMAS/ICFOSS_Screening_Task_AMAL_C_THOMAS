const UserModel = require("../Models/User"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");




const signup = async (req, res) => {
    try {
        const { username,firstname,lastname,email,mobile,password } = req.body;

        const username_e = await UserModel.findOne({ username }); //checking if user already exists
        if (username_e) {
            return res.status(400).json({ message: "User name exists", success: false });
        }

        const user = await UserModel.findOne({ email }); //checking if user already exists
        if (user) {
            return res.status(400).json({ message: "User email already exists, you can login", success: false });
        }

        const userPhone = await UserModel.findOne({ mobile });
        if (userPhone) {
            return res.status(400).json({ message: "Phone number already exists, you can login", success: false });
        }

        const userModel = new UserModel({ username,firstname,lastname,email,mobile,password});
        userModel.password = await bcrypt.hash(password, 10); //hash the password
        await userModel.save();
        res.status(201).json({ message: "User created successfully", success: true });
    } catch (err) {
        res.status(500).json({ message: "Internal Server Error", success: false });
        console.log(err)
    }
};


const login = async (req,res) => {
    try{
        const {username, password} = req.body;
        const user = await UserModel.findOne({ username }); 
        const errorMsg = 'Authentication failed, email or password is wrong'
        if(!user){
            return res.status(403)
                .json({message: errorMsg, success: false});
        }
        const isPassEqual = await bcrypt.compare(password, user.password) //compare both the passwords whether they are equal or not
        if(!isPassEqual){
            return res.status(403)
                .json({message: errorMsg, success: false});
        }

        const jwtToken = jwt.sign(
            {email: user.email, _id: user._id},
            process.env.JWT_SECRET,
            { expiresIn: '24h'}
            
        )

    
        res.status(200)
            .json({
                message: "Login success",
                success: true,
                jwtToken,
                email:user.email
            })
    } catch(err){
        res.status(500)
            .json({ 
                message:"Internal Server Error",
                success: false
            })
    }
}




module.exports={
    signup,
    login,
}