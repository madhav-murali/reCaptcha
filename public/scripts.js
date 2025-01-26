document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Get reCAPTCHA response
    const recaptchaResponse = grecaptcha.getResponse();
    if (!recaptchaResponse) {
      document.getElementById('responseMessage').textContent = 'Please complete the reCAPTCHA.';
      return;
    }
  
    // Prepare form data
    const formData = new FormData(this);
    formData.append('g-recaptcha-response', recaptchaResponse);
  
    // Send data to the server
    fetch('/submit', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        document.getElementById('responseMessage').textContent = data.message;
        if (data.success) {
          document.getElementById('contactForm').reset();
          grecaptcha.reset(); // Reset reCAPTCHA
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        document.getElementById('responseMessage').textContent = 'An error occurred. Please try again.';
      });
  });