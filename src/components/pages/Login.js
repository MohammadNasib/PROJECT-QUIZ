import Illustration from '../Illustration';
import LoginForm from '../LoginForm';

export default function Login() {
    return (
        <div>
            <h1>Login to your account</h1>
            <div className='column'>
                <Illustration />
                <LoginForm />
            </div>
        </div>
    );
}
