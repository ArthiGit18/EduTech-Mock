import React from 'react'

const Contact = () => {

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    try {
      const res = await fetch('https://edutech-backend-znpm.onrender.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      alert(data.message || 'Message sent successfully!');
    } catch (err) {
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <div className='contact_wrapper'>
      <div className='container'>
        <h2>Contact Us</h2>
        <p style={{color:"white", marginBottom:"10px"}}>We’d Love to Hear From You!</p>
        <form className='contact_form' onSubmit={handleSubmit}>
          <label htmlFor='name'>Name:</label>
          <input type='text' id='name' name='name' required />

          <label htmlFor='email'>Email:</label>
          <input type='email' id='email' name='email' required />

          <label htmlFor='message'>Message:</label>
          <textarea id='message' name='message' rows='4' required></textarea>

          <button type='submit'>Send Message</button>
        </form>
      </div>
    </div>
  )
}

export default Contact