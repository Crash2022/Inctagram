import s from '@/styles/Header.module.scss'
import Link from 'next/link'

export const Header = () => {

    return (
        <header className={s.header}>
            <div className={s.header_logo}>
                <div>
                    <img src='/assets/images/logo.png' alt='header-logo'/>
                </div>
                <div>
                    Inctagram
                </div>
            </div>
            <div className={s.header_login}>
                Логин
            </div>
        </header>
    )
}