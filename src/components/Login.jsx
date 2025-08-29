import React, { useRef, useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom'; // <-- useNavigate instead of useHistory

export default function Login() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const {login} = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // <-- useNavigate

    async function handleSubmit(e){
        e.preventDefault();

        if (
        !emailRef.current ||
        !passwordRef.current
        ) {
            return setError("Please fill out all fields");
        }
    
        try{
            setLoading(true);
            setError('');
            await login(emailRef.current.value, passwordRef.current.value);
            navigate("/"); // <-- use navigate
        }catch(err){
            setError('Failed to sign in');
        }
        setLoading(false);
    }
 
  return(<>
        <Card>
            <Card.Body>
                <h2 className='text-center mb-4'>Login</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required  />
                    </Form.Group>

                    <Form.Group id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required  />
                    </Form.Group>

                    <Button disabled={loading}
                    className='w-100 mt-5' type="submit">
                        Login
                    </Button>
                </Form>
                <div className='w-100 text-center mt-2'>
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
            Need an account? 
            <Link to="/signup">Sign up</Link>
        </div>
    </>);
}