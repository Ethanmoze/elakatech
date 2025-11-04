// Serverless Function for Contact Form
// Deploy this to Netlify Functions or Vercel

const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' })
        };
    }

    try {
        const data = JSON.parse(event.body);
        const { name, email, phone, company, message, service } = data;

        // Validate input
        if (!name || !email || !message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ 
                    success: false, 
                    message: 'Name, email, and message are required' 
                })
            };
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ 
                    success: false, 
                    message: 'Invalid email address' 
                })
            };
        }

        // Configure email transporter
        // For production, use environment variables for credentials
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: process.env.SMTP_PORT || 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER, // Your email
                pass: process.env.SMTP_PASS  // Your email password or app password
            }
        });

        // Email to company
        const companyMailOptions = {
            from: process.env.SMTP_USER,
            to: process.env.COMPANY_EMAIL || 'elakatech1@gmail.com',
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #FF3366;">New Contact Form Submission</h2>
                    <div style="background: #f5f5f5; padding: 20px; border-radius: 10px; margin: 20px 0;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
                        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
                        ${service ? `<p><strong>Service Interested:</strong> ${service}</p>` : ''}
                        <p><strong>Message:</strong></p>
                        <p style="background: white; padding: 15px; border-left: 4px solid #FF3366;">${message}</p>
                    </div>
                    <p style="color: #666; font-size: 12px;">Submitted on: ${new Date().toLocaleString()}</p>
                </div>
            `
        };

        // Auto-reply to customer
        const customerMailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Thank you for contacting Elaka Technologies',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <div style="background: linear-gradient(135deg, #FF3366, #4D7CFF); padding: 40px; text-align: center; border-radius: 10px 10px 0 0;">
                        <h1 style="color: white; margin: 0;">Elaka Technologies</h1>
                    </div>
                    <div style="padding: 40px; background: #f9f9f9;">
                        <h2 style="color: #333;">Thank you for reaching out, ${name}!</h2>
                        <p style="color: #666; line-height: 1.6;">
                            We've received your message and our team will get back to you within 24 hours.
                        </p>
                        <div style="background: white; padding: 20px; border-radius: 10px; margin: 20px 0;">
                            <p style="color: #999; font-size: 14px; margin: 0;">Your message:</p>
                            <p style="color: #333; margin: 10px 0 0 0;">${message}</p>
                        </div>
                        <p style="color: #666;">
                            Best regards,<br>
                            <strong>Elaka Technologies Team</strong>
                        </p>
                    </div>
                    <div style="background: #333; padding: 20px; text-align: center; border-radius: 0 0 10px 10px;">
                        <p style="color: #999; margin: 0; font-size: 12px;">
                            © 2025 Elaka Technologies. All rights reserved.
                        </p>
                    </div>
                </div>
            `
        };

        // Send emails
        await transporter.sendMail(companyMailOptions);
        await transporter.sendMail(customerMailOptions);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ 
                success: true, 
                message: 'Thank you! Your message has been sent successfully.' 
            })
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                success: false, 
                message: 'An error occurred. Please try again later.' 
            })
        };
    }
};


