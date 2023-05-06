import s from '@/styles/Home.module.scss'
import LinkA from '@/shared/ui/LinkA/LinkA'
import { NextPageWithLayout } from '@/pages/_app'
import { getLayout } from '@/components/Layout/Layout'
import { Button } from '@/shared/ui/Button/Button'
import { Input } from '@/shared/ui/Input/Input'
import { SearchInput } from '@/shared/ui/SearchInput/SearchInput'
import { useTranslation } from 'react-i18next'
import { Textarea } from '@/shared/ui/Textarea/Textarea'

const Home: NextPageWithLayout = () => {
    const { t } = useTranslation('home')

    // пример i18n через useContext
    // const lang = useContext('en') // обернуть App
    // const allPageData = content['en'] // импортировать в компоненте (вместо content любое название импорта)
    // <div>{allPageData.title}</div> // вставить в разметку

    return (
        <>
            <div className={s.main}>
                <LinkA href={'/registration'} text={t('Registration')} />
                <LinkA href={'/login'} text={t('Login')} />
                <LinkA href={'/forgot-password'} text={t('ForgotPassword')} />
                <LinkA href={'/profile'} text={t('Profile')} />

                <div style={{ marginTop: '20px' }}>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <div
                            style={{
                                display: 'flex',
                                width: '200px',
                                flexDirection: 'column',
                                gap: '20px'
                            }}
                        >
                            <Button theme={'primary'}>Button</Button>
                            <Button theme={'primaryWhite'}>Button</Button>
                            <Button theme={'outline'}>Button</Button>
                            <Button theme={'clear'}>Button</Button>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                width: '200px',
                                flexDirection: 'column',
                                gap: '20px'
                            }}
                        >
                            <Button disabled theme={'primary'}>
                                Button
                            </Button>
                            <Button disabled theme={'primaryWhite'}>
                                Button
                            </Button>
                            <Button disabled theme={'outline'}>
                                Button
                            </Button>
                            <Button disabled theme={'clear'}>
                                Button
                            </Button>
                        </div>
                    </div>
                </div>

                <div style={{ marginBottom: '25px', width: '450px' }}>
                    <Input id={'Email'} placeholder={'Email'} />
                </div>
                <div style={{ marginBottom: '25px', width: '450px' }}>
                    <SearchInput placeholder={'Search input'} />
                </div>
                <div style={{ marginBottom: '25px', width: '450px' }}>
                    <Input id={'Password'} placeholder={'Password'} password />
                </div>
                <div style={{ marginBottom: '25px', width: '450px' }}>
                    <Input
                        id={'PasswordError'}
                        placeholder={'Password'}
                        error={'Error Text'}
                        password
                    />
                </div>
                <div style={{ marginBottom: '25px', width: '450px' }}>
                    <SearchInput placeholder={'Search input'} error={'Error Text'} />
                </div>

                <Textarea />
            </div>
        </>
    )
}

Home.getLayout = getLayout
export default Home
