import React from 'react'
import Nav from './Nav'
import Footer from './Footer'

const ContactSe = () => {

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
        <>
            <Nav />
            <div className='contact_wrapper'>
                {/* <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.916911160184!2d80.25535207505804!3d13.072707787248244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52660f7b9636c7%3A0x3bcd543e4780ef96!2sEgmore%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1718629987451!5m2!1sen!2sin"
                    style={{ width: "100%", height: "300px", border: "0", marginTop: "100px" }}
                    // style="border:0;"
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade">
                </iframe> */}
                <div className='container' style={{ marginTop: "70px" }}>
                    <h2>Contact Us</h2>
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
            <Footer />
        </>
    )
}

export default ContactSe