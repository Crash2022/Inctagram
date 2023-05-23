import s from '@/styles/Home.module.scss'
import { NextPageWithLayout } from '@/pages/_app'
import { getHeaderLayout } from '@/components/HeaderLayout/HeaderLayout'
import { useTranslation } from 'react-i18next'
// import { useTranslation } from 'next-i18next'
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useMeQuery } from '@/services/AuthService'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { InctagramPath } from '@/shared/api/path'

const Home: NextPageWithLayout = () => {
    const { t } = useTranslation('home')
    const router = useRouter()

    // пример i18n через useContext
    // const lang = useContext('en') // обернуть App
    // const allPageData = content['en'] // импортировать в компоненте (вместо content любое название импорта)
    // <div>{allPageData.title}</div> // вставить в разметку

    const { data: meData, isLoading } = useMeQuery()

    useEffect(() => {
        if (meData) {
            void router.push(InctagramPath.PROFILE.PROFILE)
        } else {
            void router.push(InctagramPath.AUTH.LOGIN)
        }
    }, [router, meData])

    if (isLoading) return <LoaderScreen variant={'loader'} />
    if (meData) void router.push(InctagramPath.PROFILE.PROFILE)

    return (
        <>
            <div className={s.main}>{/*Main*/}</div>
        </>
    )
}

Home.getLayout = getHeaderLayout
export default Home

// export async function getStaticProps({ locale }) {
//     return {
//         props: {
//             ...(await serverSideTranslations(locale, ['header', 'home']))
//         }
//     }
// }
