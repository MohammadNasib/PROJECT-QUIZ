import { Link } from 'react-router-dom';
import logo from '../assets/images/logo-svg.svg';
import classes from '../styles/Nav.module.css';
import Account from './Account';

export default function Nav() {
    return (
        <nav className={classes.nav}>
            <ul>
                <li>
                    <Link to='/'>
                        <img
                            src={logo}
                            style={{ width: '11rem', marginLeft: '10px' }}
                            alt='PROJECT QUIZ LOGO'
                        />
                    </Link>
                </li>
            </ul>

            <Account />
        </nav>
    );
}
