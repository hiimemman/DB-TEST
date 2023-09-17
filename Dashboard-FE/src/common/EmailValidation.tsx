export function ValidateComplexEmail(email : string) : boolean {
    // Regular expression for a complex email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    // Split the email address into local and domain parts
    const [localPart, domain] = email.split('@');
  
    // Check if the email matches the regex and domain part is not an IP address
    if (emailRegex.test(email) && !/^\d{1,3}(\.\d{1,3}){3}$/.test(domain)) {
      return true;
    }
  
    return false;
  }
  
  