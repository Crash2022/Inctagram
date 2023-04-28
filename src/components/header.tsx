import s from '@/styles/Header.module.scss'

export const Header = () => {

    return (
        <header className={s.header}>
            <div className={s.container}>

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

            </div>
        </header>
    )
}