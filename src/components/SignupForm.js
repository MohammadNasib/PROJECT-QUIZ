import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from './Button';
import Checkbox from './Checkbox';
import Form from './Form';
import TextInput from './TextInput';

export default function SignupForm() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agree, setAgree] = useState('');
    const [error, setError] = useState();
    const [loading, setLoading] = useState();

    const { signup } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        if (password !== confirmPassword) {
            return setError(`Passwords don't match !`);
        }

        try {
            setError('');
            setLoading(true);
            await signup(email, password, userName);
            navigate('/');
        } catch (err) {
            console.log(err);
            setLoading(false);
            setError('failed to create and accout');
        }
    }

    return (
        <Form onSubmit={handleSubmit} style={{ height: '500px' }}>
            <TextInput
                type='text'
                placeholder='Enter your name'
                icon='person'
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
            />

            <TextInput
                type='text'
                placeholder='Enter email'
                icon='alternate_email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <TextInput
                type='password'
                placeholder='Enter password'
                icon='lock'
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <TextInput
                type='password'
                placeholder='Confirm password'
                icon='lock_clock'
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Checkbox
                type='checkbox'
                text='I agree to the Terms &amp; Conditions'
                required
                value={agree}
                onChange={(e) => setAgree(e.target.value)}
            />

            <Button  type='submit' disabled={loading}>
                <span>Submit now</span>
            </Button>

            {error && <p className='error'>{error}</p>}

            <div className='info'>
                Already have an account? <Link to='/login'>Login</Link> instead.
            </div>
        </Form>
    );
}
