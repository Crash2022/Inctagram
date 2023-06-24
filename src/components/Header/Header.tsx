import cls from './Header.module.scss'
import Image from 'next/image'
import LogoIcon from '../../../public/assets/images/logo.png'
// import LogoutIcon from './../../../public/assets/icons/logout-icon.svg'
// import LoginIcon from './../../../public/assets/icons/login-icon.svg'
import RuFlag from './../../../public/assets/icons/flag-ru.svg'
import UkFlag from './../../../public/assets/icons/flag-uk.svg'
import { useTranslation } from 'next-i18next'
import { useMeQuery } from '@/services/AuthService'
import { useRouter } from 'next/router'
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// import { InctagramPath } from '@/shared/api/path'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'
import React from 'react'

export const Header = () => {
    const { t, i18n } = useTranslation('header')
    const { locale, locales, push } = useRouter()
    const router = useRouter()
    // const [activeLang, setActiveLang] = useState<string>('en')
    const { data: meData, isLoading } = useMeQuery({})
    // const [logout, { isSuccess, error, isError, isLoading: logoutIsLoading }] = useLogoutMutation()

    // const toggleLanguage = (language: string): void => {
    //     setActiveLang(activeLang === 'ru' ? 'en' : 'ru')
    //     void i18n.changeLanguage(language)
    // }

    const toggleLanguageNew = (l: string): void => {
        push('/', undefined, { locale: l }).then()
    }

    if (isLoading) return <LoaderScreen variant={'circle'} />

    return (
        <header className={cls.headerWrapper}>
            <div className={cls.header}>
                <div
                    className={cls.header_logo}
                    onClick={() => {
                        void router.push('/')
                    }}
                >
                    <Image src={LogoIcon} alt={'login-icon'} width={40} height={40} />
                    <div className={cls.title}>{t('Inctagram')}</div>
                </div>

                <div className={cls.lang}>
                    {/* <div>NOW={locale}</div> */}
                    {locales?.map((l) => {
                            return (
                                <div
                                    key={l}
                                    // onClick={() => toggleLanguage(l)}
                                    onClick={() => {
                                        toggleLanguageNew(l)
                                    }}
                                    className={cls.lang_item}
                                    // className={activeLang === l ? cls.active : ''}
                                >
                                    {/* {l.toUpperCase()} */}
                                    {l === 'ru' ? (
                                        <RuFlag width={50} height={40} />
                                    ) : (
                                        <UkFlag width={50} height={40} />
                                    )}
                                </div>
                            )
                        })}
                </div>

                {/* {meData && localStorage.getItem('accessToken') ? ( */}
                {/*    <div */}
                {/*        className={cls.auth} */}
                {/*        onClick={async () => { */}
                {/*            await logout().then((res) => { */}
                {/*                console.log('logout', res) */}
                {/*                localStorage.removeItem('accessToken') */}
                {/*                router.push(InctagramPath.AUTH.LOGIN) */}
                {/*            }) */}
                {/*        }} */}
                {/*    > */}
                {/*        <div>{t('LogOut')}</div> */}
                {/*        <LogoutIcon /> */}
                {/*    </div> */}
                {/* ) : ( */}
                {/*    '' */}
                {/* )} */}
            </div>
        </header>
    )
}

// export async function getStaticProps({ locale }) {
//     return {
//         props: {
//             ...(await serverSideTranslations(locale, ['header']))
//         }
//     }
// }
