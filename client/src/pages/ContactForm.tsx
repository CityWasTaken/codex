import axios from 'axios';
import { useState } from 'react';

// const accessKey = '0fb7743e-3ac6-49a2-b9fa-5e38787c34e7'; // move to .env?
const url = 'https://api.web3forms.com/submit'; // move to .env?
const initialState = {
	// access_key: accessKey,
	// subject: 'New Submission from CodeX User',
	full_name: '',
	email: '',
	message: ''
}

function ContactForm() {

	const [formData, setFormData] = useState(initialState);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		await axios.post(url, formData);

		setFormData({ ...initialState });
	}

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value
		});
	}

	return (
<section className="contact-section">
  <div className="contact-intro">
	<h2 className="contact-title">Contact the CodeX Team</h2>
	<p className="contact-description">
	  Fill out the form below and we'll get back to you as soon as possible.
	</p>
  </div>
  <form className="col-4 mx-auto" onSubmit={handleSubmit} id="contact">

  <form className="contact-form" action="https://api.web3forms.com/submit" method="POST">


	<input type="hidden" name="access_key" value="0fb7743e-3ac6-49a2-b9fa-5e38787c34e7" />
	<input type="hidden" name="subject" value="New Contact Form Submission from CodeX User" />
	<input type="hidden" name="from_name" value="CodeX Contact Page" />

	<div className="form-group-container">
	  <div className="form-group">
		<label htmlFor="name" className="form-label">Name</label>
		<input onChange={handleInputChange} value={formData.full_name} name="full_name" className="form-input" placeholder="Your name" type="text" />
	  </div>
	  <div className="form-group">
		<label htmlFor="email" className="form-label">Email</label>
		<input onChange={handleInputChange} value={formData.email}  name="email" className="form-input" placeholder="Your email" type="email" />
	  </div>
	  <div className="form-group">
		<label htmlFor="phone" className="form-label">Phone</label>
		<input id="phone" name="phone" className="form-input" placeholder="+1 (234) 56789" type="text" />
	  </div>
	  <div className="form-group">
		<label htmlFor="message" className="form-label">Message</label>
		<textarea onChange={handleInputChange} value={formData.message} name="message" placeholder="Your message"></textarea>
	  </div>
	</div>
	<button className="form-submit" type="submit">Send Message</button>
  </form>
  </form>

</section>
	)
}

export default ContactForm;