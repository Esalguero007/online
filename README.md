# TCPA-Compliant EZ Texting Opt-in Form

A modern, responsive web form that ensures full TCPA (Telephone Consumer Protection Act) compliance for EZ Texting SMS campaigns.

## 🚀 Features

- **TCPA Compliant**: Includes all required disclosures and consent mechanisms
- **Modern Design**: Beautiful, responsive interface that works on all devices
- **Real-time Validation**: Phone number formatting and validation
- **EZ Texting Integration**: Ready to connect with EZ Texting API
- **Legal Pages**: Complete Terms & Conditions and Privacy Policy
- **Accessibility**: WCAG compliant with proper focus states and screen reader support

## 📋 TCPA Requirements Met

✅ **"Text HELP for help" disclosure**  
✅ **"Text STOP to opt-out" disclosure**  
✅ **Link to Terms & Conditions**  
✅ **Link to Privacy Policy**  
✅ **Message frequency disclosure**  
✅ **Clear sender identification**  
✅ **Express written consent checkbox**  
✅ **Proper opt-in record keeping**

## 🛠️ Setup Instructions

### 1. Download and Extract
```bash
# The files are already in your directory
cd /Users/ernisalguero/ez-texting-tcpa-form
```

### 2. Customize Configuration
Edit `script.js` and update the EZ Texting configuration:

```javascript
const EZ_TEXTING_CONFIG = {
    username: 'YOUR_EZ_TEXTING_USERNAME', // Replace with your actual username
    password: 'YOUR_EZ_TEXTING_PASSWORD', // Replace with your actual password
    apiUrl: 'https://app.eztexting.com/api',
    listName: 'TCPA_Compliant_Optins' // Your contact list name
};
```

### 3. Update Contact Information
Edit the following files to update your business information:

- `index.html`: Update phone number and business name
- `terms.html`: Update contact information and business details
- `privacy.html`: Update contact information and business details

### 4. Deploy to Web Server
Upload all files to your web server or hosting provider.

### 5. Test the Form
1. Open `index.html` in a web browser
2. Fill out the form with test data
3. Verify all TCPA disclosures are present
4. Test the Terms & Conditions and Privacy Policy links

## 📁 File Structure

```
ez-texting-tcpa-form/
├── index.html          # Main opt-in form
├── styles.css          # Modern styling
├── script.js           # Form functionality and EZ Texting integration
├── terms.html          # Terms & Conditions page
├── privacy.html        # Privacy Policy page
└── README.md          # This file
```

## 🔧 EZ Texting API Integration

The form includes a simulated API integration. To connect with the actual EZ Texting API:

1. **Get API Credentials**: Log into your EZ Texting account and obtain API credentials
2. **Update Configuration**: Replace the placeholder credentials in `script.js`
3. **Implement API Calls**: Replace the simulated `addContactToEZTexting` function with actual HTTP requests

Example API call structure:
```javascript
async function addContactToEZTexting(contactData) {
    const response = await fetch(`${EZ_TEXTING_CONFIG.apiUrl}/contacts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa(`${EZ_TEXTING_CONFIG.username}:${EZ_TEXTING_CONFIG.password}`)
        },
        body: JSON.stringify({
            phoneNumber: contactData.phone,
            firstName: contactData.name.split(' ')[0],
            lastName: contactData.name.split(' ').slice(1).join(' '),
            customFields: {
                propertyAddress: contactData.propertyAddress,
                optInDate: contactData.optInDate,
                consentText: contactData.consentText
            }
        })
    });
    
    return response.json();
}
```

## 🎨 Customization

### Colors and Branding
Edit `styles.css` to match your brand colors:
```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --text-color: #2d3748;
    --background-color: #f7fafc;
}
```

### Form Fields
Add or remove fields in `index.html` as needed for your business requirements.

### Message Content
Update the consent text and disclosures to match your specific use case.

## 📱 Mobile Optimization

The form is fully responsive and optimized for mobile devices:
- Touch-friendly buttons and inputs
- Proper font sizes to prevent zoom on iOS
- Optimized layout for small screens

## 🔒 Security Considerations

1. **HTTPS Required**: Always serve the form over HTTPS
2. **API Security**: Store API credentials securely (consider server-side implementation)
3. **Data Validation**: All inputs are validated client-side and should be re-validated server-side
4. **Rate Limiting**: Implement rate limiting to prevent abuse

## 📊 Analytics and Tracking

Consider adding analytics to track form performance:
- Google Analytics for page views and conversions
- Form submission tracking
- Error tracking for failed submissions

## 🚨 Important Legal Notes

1. **Consult Legal Counsel**: Have a lawyer review your specific implementation
2. **State Laws**: Some states have additional requirements beyond TCPA
3. **Industry Regulations**: Real estate has specific regulations regarding cold outreach
4. **Record Keeping**: Maintain detailed records of all opt-ins and opt-outs
5. **Regular Audits**: Periodically audit your compliance procedures

## 🆘 Support

For questions about:
- **TCPA Compliance**: Consult with a legal professional
- **EZ Texting Integration**: Contact EZ Texting support
- **Technical Issues**: Check the browser console for error messages

## 📄 License

This form template is provided as-is for educational and compliance purposes. Customize according to your specific legal and business requirements.

---

**Disclaimer**: This form template is designed to help with TCPA compliance but does not constitute legal advice. Always consult with legal professionals regarding your specific compliance requirements. 