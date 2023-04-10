const ContactForm = () => {
    
    const handleSubmit = () => {
        console.log("Form submitted");
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <input 
                    type="text"
                    id="name"
                    placeholder="Name"
                    required
                />
            </div>
            <div>
                <input 
                    type="email"
                    id="email" 
                    placeholder="Email Address"
                
                />
            </div>
            <div>
                <textarea id="message" rows="5" placeholder="Message"></textarea>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default ContactForm;