const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const loginUser = async (email, password, req) => {
    try{
        const user = await User.findOne({email: email.toLowerCase()})
        if (!user) {
            return false;
        }
        if (user) {
            const isPasswordMatched = await isPasswordMatch(user, password);
            if (isPasswordMatched) {
              let token = await generateTokenManually({ email, user });
              const userToReturn = {
                    email: user.email,
                    token
                }
                return userToReturn;
              } else {
                throw new Error(apiMessages.auth.passwordWrong)
            }
        } 
    } catch (error){
        logger.error("Error - loginUser", error);
        throw new Error(error);
    }
};

const generateToken = async (user, email, secret, expires = "10m") => {
    return jwt.sign(
        {
            id: user.id,
            email: email,
        },
        secret,
        {
            expiresIn: expires,
        }
    );
};

const generateTokenManually = async (params) => {
    try {
        const user = params.user;
        const authToken = await generateToken(
            { id: params.user._id },
            params.email,
            process.env.JWT_SECRET,
            process.env.JWT_EXPIRESIN
        );
        const date = new Date();
        date.setDate(date.getDate() + 30);
        const pushData = {
            token: authToken,
            validateTill: date,
        };
        await User.updateOne(
            { _id: user._id },
            { $push: { tokens: pushData } }
        );
        return authToken;
    } catch (error) {
        logger.error("Error - generateTokenManually", error);
        throw new Error(error);
    }
};

const registerUser = async (data) => {
    try {
        const user = await User.findOne({ "email": data.email })
        if (user) {
            throw new Error(apiMessages.auth.alreadyRegister)
        } else {             
            data.password = await bcrypt.hash(data.password, 8);
            const createdUser = await User.create(data);
            return createdUser;
        }
    } catch (error) {
        throw new Error(error);
    }
}

const isPasswordMatch = async function (user, password) {
    return (bcrypt.compare(password, user.password));
};

module.exports = {
    loginUser,
    registerUser
};
