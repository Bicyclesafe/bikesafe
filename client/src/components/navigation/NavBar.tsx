import styles from './Navbar.module.css'

const NavBar = () => {
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
                        <li><a href="/login">Log In</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default NavBar