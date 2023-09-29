import React, { useState } from 'react';

const initialFormDataSignUp = {
  email: "",
  password: "",
};

const Signup = () => {
    const [formData, setFormData] = useState(initialFormDataSignUp);
    
    return (
        <div>Signup</div>
    )
}

export default Signup