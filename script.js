// EZ Texting TCPA-Compliant Opt-in Form
// Configuration - Update these values with your actual EZ Texting credentials
const EZ_TEXTING_CONFIG = {
    username: 'YOUR_EZ_TEXTING_USERNAME', // Replace with your EZ Texting username
    password: 'YOUR_EZ_TEXTING_PASSWORD', // Replace with your EZ Texting password
    apiUrl: 'https://app.eztexting.com/api',
    listName: 'TCPA_Compliant_Optins', // Your contact list name
    notificationEmail: 'contact@realtycapital.io' // Email to receive opt-in notifications
};

// Phone number formatting
function formatPhoneNumber(phone) {
    // Remove all non-digits
    const cleaned = phone.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    
    return phone; // Return original if not 10 digits
}

// Validate phone number
function validatePhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10;
}

// Show message (success or error)
function showMessage(message, type = 'success') {
    // Remove existing messages
    const existingMessage = document.querySelector('.success-message, .error-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.textContent = message;
    
    const form = document.getElementById('optinForm');
    form.parentNode.insertBefore(messageDiv, form.nextSibling);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Show/hide loading state
function setLoadingState(loading) {
    const submitBtn = document.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    if (loading) {
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-block';
    } else {
        submitBtn.disabled = false;
        btnText.style.display = 'inline-block';
        btnLoading.style.display = 'none';
    }
}

// Add contact to EZ Texting (simulated - replace with actual API call)
async function addContactToEZTexting(contactData) {
    // This is a simulation of the EZ Texting API call
    // In production, you would make an actual HTTP request to EZ Texting's API
    
    return new Promise((resolve, reject) => {
        // Simulate API delay
        setTimeout(() => {
            // Simulate success (90% success rate for demo)
            if (Math.random() > 0.1) {
                resolve({
                    success: true,
                    message: 'Contact added successfully'
                });
            } else {
                reject(new Error('Failed to add contact'));
            }
        }, 2000);
    });
}

// Send notification email to contact@realtycapital.io
async function sendNotificationEmail(contactData) {
    try {
        // In production, this would send an actual email
        // For now, we'll log the notification and simulate the email
        console.log('📧 Sending opt-in notification to contact@realtycapital.io');
        console.log('New opt-in:', {
            name: contactData.name,
            phone: contactData.phone,
            propertyAddress: contactData.propertyAddress,
            optInDate: contactData.optInDate,
            notificationEmail: EZ_TEXTING_CONFIG.notificationEmail
        });
        
        // Simulate email sending (replace with actual email service)
        // Example: SendGrid, Mailgun, or server-side email endpoint
        return Promise.resolve({ success: true });
        
    } catch (error) {
        console.error('Error sending notification email:', error);
        // Don't fail the form submission if email fails
        return Promise.resolve({ success: false });
    }
}

// Handle form submission
async function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Get form values
    const phone = formData.get('phone');
    const name = formData.get('name');
    const propertyAddress = formData.get('property_address');
    const consent = formData.get('consent');
    
    // Validate required fields
    if (!phone || !name || !propertyAddress || !consent) {
        showMessage('Please fill in all required fields and check the consent box.', 'error');
        return;
    }
    
    // Validate phone number
    if (!validatePhone(phone)) {
        showMessage('Please enter a valid 10-digit phone number.', 'error');
        return;
    }
    
    // Format phone number
    const formattedPhone = formatPhoneNumber(phone);
    
    // Show loading state
    setLoadingState(true);
    
    try {
        // Prepare contact data
        const contactData = {
            phone: formattedPhone,
            name: name,
            propertyAddress: propertyAddress,
            optInDate: new Date().toISOString(),
            consentText: 'I agree to receive automated text messages from Start.eth LLC at (346) 615-1552 about my property and real estate opportunities. Message frequency varies. Text HELP for help. Text STOP to opt-out.',
            source: 'TCPA_Compliant_Web_Form'
        };
        
        // Add to EZ Texting
        const result = await addContactToEZTexting(contactData);
        
        if (result.success) {
            // Send notification email to contact@realtycapital.io
            await sendNotificationEmail(contactData);
            
            showMessage('Thank you! You have successfully opted in to receive property updates. You will receive a confirmation text shortly.', 'success');
            form.reset();
        } else {
            showMessage('There was an error processing your request. Please try again.', 'error');
        }
        
    } catch (error) {
        console.error('Error adding contact:', error);
        showMessage('There was an error processing your request. Please try again.', 'error');
    } finally {
        setLoadingState(false);
    }
}

// Phone number input formatting
function handlePhoneInput(event) {
    const input = event.target;
    let value = input.value.replace(/\D/g, '');
    
    // Limit to 10 digits
    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    
    // Format as user types
    if (value.length >= 6) {
        value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
    } else if (value.length >= 3) {
        value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    }
    
    input.value = value;
}

// Initialize form
function initializeForm() {
    const form = document.getElementById('optinForm');
    const phoneInput = document.getElementById('phone');
    
    // Add event listeners
    form.addEventListener('submit', handleFormSubmit);
    phoneInput.addEventListener('input', handlePhoneInput);
    
    // Add focus event for better UX
    phoneInput.addEventListener('focus', function() {
        if (!this.value) {
            this.placeholder = '(555) 123-4567';
        }
    });
    
    // Validate consent checkbox
    const consentCheckbox = document.getElementById('consent');
    consentCheckbox.addEventListener('change', function() {
        const submitBtn = document.querySelector('.submit-btn');
        submitBtn.disabled = !this.checked;
    });
    
    // Initially disable submit button until consent is checked
    document.querySelector('.submit-btn').disabled = true;
}

// Document ready
document.addEventListener('DOMContentLoaded', function() {
    initializeForm();
    
    // Add some helpful console logging for debugging
    console.log('TCPA-Compliant Opt-in Form Loaded');
    console.log('Remember to update EZ_TEXTING_CONFIG with your actual credentials');
});

// Export functions for potential external use
window.TCPAForm = {
    formatPhoneNumber,
    validatePhone,
    showMessage,
    addContactToEZTexting
}; 