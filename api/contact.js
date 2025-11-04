// Vercel Serverless Function for Contact Form
// This file should be in /api/contact.js

const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { name, email, phone, company, message, service } = req.body;

        // Validate input
        if (!name || !email || !message) {
            return res.status(400).json({ 
                success: false, 
                message: 'Name, email, and message are required' 
            });
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid email address' 
            });
        }

        // Configure email transporter
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: process.env.SMTP_PORT || 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
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

        return res.status(200).json({ 
            success: true, 
            message: 'Thank you! Your message has been sent successfully.' 
        });

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'An error occurred. Please try again later.' 
        });
    }
};
