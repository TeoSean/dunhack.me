import React, { useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import styles from '../styles/sidebar.module.scss';
import { useRouter } from 'next/router';

export default function SidebarNavigation() {
  const { data: session, status } = useSession();
  const { asPath, pathname } = useRouter();
  const path = pathname.split('/');
  const [active, setActive] = useState(path[1]);
  return (
    <nav className={styles.sidebar}>
      <img className={styles.img} src='/Logo.png' />
      <ul className={styles.nav}>
        <li>
          <Link
            href='/'
            onClick={() => setActive('')}
            className={active === '' ? styles.selected : styles.text}>Home
          </Link>
        </li>

        <li>
          <Link
            href='/challenges'
            onClick={() => setActive('challenges')}
            className={
              active === 'challenges' ? styles.selected : styles.text
            }>Challenges
          </Link>
        </li>

        <li>
          <Link
            href='/scoreboard'
            onClick={() => setActive('scoreboard')}
            className={
              active === 'scoreboard' ? styles.selected : styles.text
            }>
            Scoreboard
          </Link>
        </li>
        {session && (
          <li>
            <Link
              href='/profile'
              onClick={() => setActive('profile')}
              className={
                active === 'profile' || active === 'login'
                  ? styles.selected
                  : styles.text
              }>Profile
            </Link>
          </li>
        )}
        {session && (
          <li>
            <a
              onClick={() => {
                setActive('signout');
                signOut({ callbackUrl: `${window.location.origin}` });
              }}
              className={
                active === 'signout' ? styles.selected : styles.text
              }>Sign Out
            </a>
          </li>
        )}
        {!session && (
          <li>
            <Link
              href='/login'
              onClick={() => setActive('login')}
              className={
                active === 'login' ? styles.selected : styles.text
              }>Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
