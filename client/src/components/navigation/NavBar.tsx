import styles from './Navbar.module.css'
import { useAuth } from '../../hooks/useAuth'
import { signOut } from 'firebase/auth'
import { auth } from '../../services/google_authentication'
import { useState } from 'react'
import logout from "../../assets/logout-svgrepo-com.svg"

const NavBar = () => {
    const { user } = useAuth()
    const [menuOpen, setMenuOpen] = useState(false)

    const logOut = async () => {
        await signOut(auth)
        console.log("Logged out")
    }

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev)
    }

    return (
        <header className={styles['header']}>
            <div className={styles['nav-container']}>
                <div className={styles['nav-logo']}>
                    <a href="/">Bike safe</a>
                </div>
                <button
									className={styles['hamburger']}
									onClick={toggleMenu}
									>
									☰
                </button>
								<nav className={`${styles['nav']} ${menuOpen ? styles['open'] : ''}`}>
										<button className={styles['close-button']} onClick={toggleMenu}>
                        ×
                    </button>
											<ul className={styles['nav-links']}>
                        <li><a href="/">Home</a></li>
                        <li><a href="/">About</a></li>
                        {user
                            ? <li>
																<button className={styles['logout-button']} id="logout-button" onClick={logOut}>
																	<img src={logout}/>
                                	Log out
                              	</button>
															</li>
                            : <li><a href="/login">Log In</a></li>
                        }
                        
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default NavBar

