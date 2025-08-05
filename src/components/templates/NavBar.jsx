import React from 'react';
import styles from './NavBar.module.css';

function NavBar() {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navList}>
                <li><a className={styles.navLink} href="/">Home</a></li>
                <li><a className={styles.navLink} href="/">Send Money</a></li>
                <li><a className={styles.navLink} href="/about">Tools</a></li>
                <li><a className={styles.navLink} href="/about">About</a></li>
                <li><a className={styles.navLink} href="/contact">Contact</a></li>
            </ul>
        </nav>
    )
}

export default NavBar