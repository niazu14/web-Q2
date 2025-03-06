function toggleForms() {
    const signinContainer = document.getElementById('signin-container');
    const signupContainer = document.getElementById('signup-container');
    
    if (signinContainer.style.display === 'none') {
      signinContainer.style.display = 'block';
      signupContainer.style.display = 'none';
      resetForm('signin-form');
    } else {
      signinContainer.style.display = 'none';
      signupContainer.style.display = 'block';
      resetForm('signup-form');
    }
  }
  
  function togglePasswordVisibility(inputId, toggleElement) {
    const passwordInput = document.getElementById(inputId);
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      toggleElement.textContent = 'Hide';
    } else {
      passwordInput.type = 'password';
      toggleElement.textContent = 'Show';
    }
  }
  
  function resetForm(formId) {
    const form = document.getElementById(formId);
    form.reset();
    
    const errorElements = form.querySelectorAll('.has-error');
    errorElements.forEach(element => {
      element.classList.remove('has-error');
    });
    
    const successMessage = form.querySelector('.success-message');
    if (successMessage) {
      successMessage.style.display = 'none';
    }
  }
  
  function setError(inputId, errorMessage = null) {
    const inputElement = document.getElementById(inputId);
    const formGroup = inputElement.closest('.form-group');
    const errorElement = document.getElementById(`${inputId}-error`);
    
    formGroup.classList.add('has-error');
    if (errorMessage && errorElement) {
      errorElement.textContent = errorMessage;
    }
    
    return false;
  }
  
  function clearError(inputId) {
    const inputElement = document.getElementById(inputId);
    const formGroup = inputElement.closest('.form-group');
    
    if (formGroup) {
      formGroup.classList.remove('has-error');
    }
    
    return true;
  }
  
  function validateNotEmpty(value, inputId, errorMessage = 'This field is required') {
    if (!value.trim()) {
      return setError(inputId, errorMessage);
    }
    return clearError(inputId);
  }
  
  function validateUsername(value, inputId) {
    if (!value.trim()) {
      return setError(inputId, 'Username is required');
    }
    
    const usernameRegex = /^[a-zA-Z0-9]{4,20}$/;
    if (!usernameRegex.test(value)) {
      return setError(inputId, 'Username must be 4-20 characters, alphanumeric only');
    }
    
    return clearError(inputId);
  }
  
  function validatePassword(value, inputId) {
    if (!value) {
      return setError(inputId, 'Password is required');
    }
    
    if (inputId === 'signin-password') {
      return clearError(inputId);
    }
    
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(value)) {
      return setError(inputId, 'Password must be at least 8 characters with at least one letter, one number, and one special character');
    }
    
    return clearError(inputId);
  }
  
  function validateConfirmPassword(password, confirmPassword, inputId) {
    if (password !== confirmPassword) {
      return setError(inputId, 'Passwords do not match');
    }
    return clearError(inputId);
  }
  
  function validateEmail(value, inputId) {
    if (!value.trim()) {
      return setError(inputId, 'Email is required');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return setError(inputId, 'Please enter a valid email address');
    }
    
    return clearError(inputId);
  }
  
  function validateAge(value, inputId) {
    if (!value) {
      return setError(inputId, 'Age is required');
    }
    
    const age = parseInt(value);
    if (isNaN(age) || age < 18 || age > 120) {
      return setError(inputId, 'Age must be between 18 and 120');
    }
    
    return clearError(inputId);
  }
  
  function validatePhone(value, inputId) {
    if (!value.trim()) {
      return setError(inputId, 'Phone number is required');
    }
    
    const phoneRegex = /^[\d\s\-+()]{10,15}$/;
    if (!phoneRegex.test(value)) {
      return setError(inputId, 'Please enter a valid phone number');
    }
    
    return clearError(inputId);
  }
  
  function validateSelect(value, inputId) {
    if (!value) {
      return setError(inputId, 'Please make a selection');
    }
    return clearError(inputId);
  }
  
  function validateCheckbox(checked, inputId) {
    if (!checked) {
      return setError(inputId, 'You must check this box to continue');
    }
    return clearError(inputId);
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('signin-form').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const username = document.getElementById('signin-username').value;
      const password = document.getElementById('signin-password').value;
      
      let isValid = true;
      
      isValid = validateNotEmpty(username, 'signin-username') && isValid;
      
      isValid = validateNotEmpty(password, 'signin-password') && isValid;
      
      if (isValid) {
        document.getElementById('signin-success').style.display = 'block';
      }
    });
    
    document.getElementById('signup-form').addEventListener('submit', function(e) {
      e.preventDefault();
      
      const fullName = document.getElementById('full-name').value;
      const email = document.getElementById('email').value;
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirm-password').value;
      const age = document.getElementById('age').value;
      const phone = document.getElementById('phone').value;
      const country = document.getElementById('country').value;
      const terms = document.getElementById('terms').checked;
      
      let isValid = true;
      
      isValid = validateNotEmpty(fullName, 'full-name') && isValid;
      isValid = validateEmail(email, 'email') && isValid;
      isValid = validateUsername(username, 'username') && isValid;
      isValid = validatePassword(password, 'password') && isValid;
      isValid = validateConfirmPassword(password, confirmPassword, 'confirm-password') && isValid;
      isValid = validateAge(age, 'age') && isValid;
      isValid = validatePhone(phone, 'phone') && isValid;
      isValid = validateSelect(country, 'country') && isValid;
      isValid = validateCheckbox(terms, 'terms') && isValid;
      
      if (isValid) {
        document.getElementById('signup-success').style.display = 'block';
      }
    });
    
    const inputFields = document.querySelectorAll('input, select');
    inputFields.forEach(field => {
      field.addEventListener('input', function() {
        if (field.type === 'checkbox') {
          clearError(field.id);
        } else {
          const formGroup = field.closest('.form-group');
          if (formGroup && formGroup.classList.contains('has-error')) {
            clearError(field.id);
          }
        }
      });
    });
  });