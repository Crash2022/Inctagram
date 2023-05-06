import cls from './Header.module.scss'
import Image from 'next/image'
import LogoIcon from '../../../public/assets/images/logo.png'
import LogoutIcon from './../../../public/assets/icons/logout-icon.svg'
import { useTranslation } from 'react-i18next'
import { usePush } from '@/shared/hooks/usePush'

export const Header = () => {
    const { t, i18n } = useTranslation('header')
    const push = usePush()

    const toggleLanguage = (language: string): void => {
        void i18n.changeLanguage(language)
    }

    return (
        <header className={cls.headerWrapper}>
            <div className={cls.header}>
                <div
                    className={cls.header_logo}
                    onClick={() => {
                        push('/').then()
                    }}
                >
                    <Image src={LogoIcon} alt={'login-icon'} width={40} height={40} />
                    <div className={cls.title}>{t('Inctagram')}</div>
                </div>

                <div className={cls.lang}>
                    <div onClick={() => toggleLanguage('en')}>EN</div>
                    <div onClick={() => toggleLanguage('ru')}>RU</div>
                </div>

                <div className={cls.auth}>
                    <div>{t('LogOut')}</div>
                    <LogoutIcon />
                </div>
            </div>
        </header>
    )
}
