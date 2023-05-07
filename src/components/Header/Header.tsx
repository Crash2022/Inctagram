import cls from './Header.module.scss'
import Image from 'next/image'
import LogoIcon from '../../../public/assets/images/logo.png'
import LogoutIcon from './../../../public/assets/icons/logout-icon.svg'
// import { useTranslation } from 'react-i18next'
import { useTranslation } from 'next-i18next'
import { usePush } from '@/shared/hooks/usePush'
import { useLogoutMutation } from '@/services/AuthService'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const Header = () => {
    const { t, i18n } = useTranslation('header')
    const { locale, locales, push } = useRouter()
    const pushHook = usePush()
    // const [activeLang, setActiveLang] = useState<string>('en')
    // const [logout, { onSuccess, error, isError, isLoading }] = useLogoutMutation()

    // const toggleLanguage = (language: string): void => {
    //     // setActiveLang(activeLang === 'ru' ? 'en' : 'ru')
    //     // void i18n.changeLanguage(language)
    // }

    const toggleLanguageNew = (l: string): void => {
        push('/', undefined, { locale: l }).then()
    }

    return (
        <header className={cls.headerWrapper}>
            <div className={cls.header}>
                <div
                    className={cls.header_logo}
                    onClick={() => {
                        pushHook('/').then()
                    }}
                >
                    <Image src={LogoIcon} alt={'login-icon'} width={40} height={40} />
                    <div className={cls.title}>{t('Inctagram')}</div>
                </div>

                <div className={cls.lang}>
                    <div>NOW={locale}</div>
                    {locales &&
                        locales.map((l) => {
                            return (
                                <div
                                    key={l}
                                    // onClick={() => toggleLanguage(l)}
                                    onClick={() => toggleLanguageNew(l)}
                                    // className={activeLang === l ? cls.active : ''}
                                >
                                    {l.toUpperCase()}
                                </div>
                            )
                        })}
                </div>

                <div
                    className={cls.auth}
                    // onClick={async () => {
                    //     await logout()
                    // }}
                >
                    <div>{t('LogOut')}</div>
                    <LogoutIcon />
                </div>
            </div>
        </header>
    )
}
