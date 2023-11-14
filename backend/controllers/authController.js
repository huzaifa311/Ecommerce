const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../model/userSchema');
const nodemailer = require('nodemailer');
const EmailVerfication = require('../templates/verification');
const otpModel = require('../model/otpSchema');

const signupController = async (req, res) => {
    
    try {
        const body = req.body;
        console.log(body);

        const { fullName, email, password } = body;

        if (!fullName || !email || !password) {
            res.json({
                message: "Required fields are missing!",
                status: false,
                data: null
            });
            return
        };

        console.log('realPassword', password);
        const hashPassword = await bcrypt.hash(password, 10);

        const objToSend = {
            full_name: fullName,
            email,
            password: hashPassword
        };

        const emailExist = await userModel.findOne({ email });
        console.log('emailExist', emailExist);

        if (emailExist) {
            res.json({
                message: 'Email already exists',
                status: false,
                data: null
            });
            return
        };

        
        const OTPCODE = Math.floor(100000 + Math.random() * 900000);
        
        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });
        const emailData = await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: "Email Verfication",
            html: EmailVerfication(fullName, OTPCODE),
        });
        
        await otpModel.create({
            opt_code: OTPCODE,
            email
        })

        const userSave = await userModel.create(objToSend);

        res.json({
            message: 'Please check your Gmail Inbox',
            status: true,
            data: userSave
        });

    } catch (error) {
        res.json({
            message: error.message,
            status: false,
            data: null
        });
    };
};

const loginController = async (req, res) => {

    const { email, password } = req.body;
    console.log(`email:${email}`, `password:${password}`);

    const emailExist = await userModel.findOne({ email });
    console.log('emailExist', emailExist);

    if (!emailExist) {
        res.json({
            message: "Invalid Credentials",
            status: true,
            data: null
        });
        return
    }

    const comparePass = await bcrypt.compare(password, emailExist.password)

    if (comparePass) {
        var token = jwt.sign({ email: emailExist.email }, "PRIVATEKEY");
        console.log('token', token);

        res.json({
            message: "user login successful",
            status: true,
            data: emailExist,
            token
        })
        return
    } else {
        res.json({
            message: "Invalid Credential",
            status: false,
            data: null,
        })
        return
    }
}

module.exports = {
    signupController,
    loginController
}