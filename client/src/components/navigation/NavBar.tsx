import styles from './Navbar.module.css'
import { useAuth } from '../../hooks/useAuth'
import { signOut } from 'firebase/auth'
import { auth } from '../../services/google_authentication'

const NavBar = () => {
    const { user } = useAuth()

    const logOut = async () => {
        await signOut(auth)
        console.log("Logged out")
    }

    return (
        <header className={styles['header']}>
            <div className={styles['nav-container']}>
                <div className={styles['nav-logo']}>
                    <a href="/">Bike safe</a>
                </div>
                <nav>
                    <ul className={styles['nav-links']}>
                        <li><a href="/">Home</a></li>
                        <li><a href="/">About</a></li>
                        {user
                            ? <li><button onClick={logOut}>Log out</button></li>
                            : <li><a href="/login">Log In</a></li>
                        }
                        
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default NavBar