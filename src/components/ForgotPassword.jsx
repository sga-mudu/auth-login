import React, { useRef, useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom'; // <-- useNavigate instead of useHistory

export default function ForgotPassword() {

    const emailRef = useRef();
    const {resetPassword} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    async function handleSubmit(e){
        e.preventDefault();

        if (!emailRef.current) {
            return setError("Please fill out all fields");
        }
    
        try{
            setMessage('');
            setLoading(true);
            setError('');
            await resetPassword(emailRef.current.value);
            setMessage('Check your inbox for further instructions');
        }catch(err){
            setError('Failed to reset password');
        }
        setLoading(false);
    }
 
  return(<>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Password reset</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}

                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required  />
                    </Form.Group>


                    <Button disabled={loading}
                    className='w-100 mt-5' type="submit">
                        Reset password
                    </Button>
                </Form>
                <div className='w-100 text-center mt-2'>
                    <Link to="/login">Login</Link>
                </div>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            Need an account? 
            <Link to="/signup">Sign up</Link>
        </div>
    </>);
}