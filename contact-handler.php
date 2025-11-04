<?php
// Contact Form Handler
// This script processes contact form submissions and sends emails

// Configuration
$to_email = "elakatech1@gmail.com"; // Your business email address
$from_email = "noreply@yourdomain.com"; // Replace with your domain email
$subject_prefix = "Contact Form Submission - ";

// Check if form was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Sanitize and validate input data
    $name = isset($_POST['name']) ? trim(strip_tags($_POST['name'])) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $subject = isset($_POST['subject']) ? trim(strip_tags($_POST['subject'])) : '';
    $message = isset($_POST['message']) ? trim(strip_tags($_POST['message'])) : '';
    
    // Validation
    $errors = array();
    
    if (empty($name)) {
        $errors[] = "Name is required";
    }
    
    if (empty($email)) {
        $errors[] = "Email is required";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Invalid email format";
    }
    
    if (empty($message)) {
        $errors[] = "Message is required";
    }
    
    // If no errors, send email
    if (empty($errors)) {
        
        // Prepare email content
        $email_subject = $subject_prefix . ($subject ? $subject : "General Inquiry");
        
        $email_body = "
        New contact form submission from your website:
        
        Name: " . $name . "
        Email: " . $email . "
        Subject: " . ($subject ? $subject : "General Inquiry") . "
        
        Message:
        " . $message . "
        
        ---
        This message was sent from your website contact form.
        ";
        
        // Email headers
        $headers = array(
            'From: ' . $from_email,
            'Reply-To: ' . $email,
            'X-Mailer: PHP/' . phpversion(),
            'Content-Type: text/plain; charset=UTF-8'
        );
        
        // Send email
        if (mail($to_email, $email_subject, $email_body, implode("\r\n", $headers))) {
            // Success - redirect back with success message
            header("Location: " . $_SERVER['HTTP_REFERER'] . "?status=success");
            exit();
        } else {
            // Error sending email
            header("Location: " . $_SERVER['HTTP_REFERER'] . "?status=error");
            exit();
        }
        
    } else {
        // Validation errors - redirect back with error message
        $error_message = implode(", ", $errors);
        header("Location: " . $_SERVER['HTTP_REFERER'] . "?status=error&message=" . urlencode($error_message));
        exit();
    }
    
} else {
    // Not a POST request - redirect to home page
    header("Location: index.html");
    exit();
}
?>
