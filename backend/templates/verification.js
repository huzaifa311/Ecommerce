const EmailVerfication = (user, otp) => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100vh;
            }
    
            .container {
                background-color: #fff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                max-width: 400px;
                width: 100%;
            }
    
            h2 {
                color: #333;
            }
    
            p {
                color: #555;
            }
    
            .otp-code {
                display: inline-block;
                padding: 8px 12px;
                font-size: 18px;
                background-color: #4caf50;
                color: #fff;
                border-radius: 4px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Email Verification</h2>
            <p>Dear user,${user}</p>
            <p>Thank you for signing up. To complete your registration, please use the following OTP code:</p>
            <div class="otp-code">${otp}</div>
            <p>If you didn't request this code, please ignore this email.</p>
            <p>Best regards,<br>Your Company Name</p>
        </div>
    </body>
    </html>
    `
}

module.exports = EmailVerfication