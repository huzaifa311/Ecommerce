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
            otp_code: OTPCODE,
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

    if (!email || !password) {
        res.json({
            message: "Required fields are missing!",
            status: false,
            data: null,
            isVerify: false
        });
        return
    };
    console.log(`email:${email}`, `password:${password}`);

    const emailExist = await userModel.findOne({ email });
    console.log('emailExist', emailExist);

    if (!emailExist) {
        res.json({
            message: "Invalid Credentials",
            status: false,
            data: null,
            isVerify: false
        });
        return
    }



    const comparePass = await bcrypt.compare(password, emailExist.password)

    if (comparePass) {

        if(!emailExist.isVerify){
            res.json({
                message: "Please Verify Your Account",
                status: true,
                isVerify: false,
                data: null,
            });
            return
        }

        var token = jwt.sign({ email: emailExist.email }, "PRIVATEKEY");
        console.log('token', token);

        res.json({
            message: "user login successful",
            status: true,
            data: emailExist,
            token,
            isVerify: true
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

const OTPVerify = async (req, res) => {
    try {
        const { email, otpCode } = req.body
        if (!email || !otpCode) {
            res.json({
                message: "Required fields are missing",
                status: false,
                data: null,
            });
            return
        }

        const isValid = await otpModel.findOne({
            otp_code: otpCode,
            email,
            isUsed: false,
        })
        if (!isValid) {
            res.json({
                message: "Invalid OTP",
                status: false,
                data: null,
            });
            return;
        }

        await otpModel.updateOne(
            {
                otp_code: otpCode,
                email,
                isUsed: false,
            },
            { isUsed: true }
        );

        await userModel.updateOne(
            {
                email,
            },
            { isVerify: true }
        );
        res.json({
            message: "User Successfully Signup",
            status: true,
            data: null,
        });
        console.log("isValid", isValid);
    } catch (error) {
        res.json({
            message: error.message,
            data: null,
            status: false
        })
    }
}

module.exports = {
    signupController,
    loginController,
    OTPVerify
}