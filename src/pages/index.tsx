import s from '@/styles/Home.module.scss'
import { NextPageWithLayout } from '@/pages/_app'
import { getHeaderLayout } from '@/components/HeaderLayout/HeaderLayout'
// import { useTranslation } from 'react-i18next'
// import { useTranslation } from 'next-i18next' // использовать эту библиотеку!
import { useMeQuery } from '@/services/AuthService'
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { InctagramPath } from '@/shared/api/path'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'

const Home: NextPageWithLayout = () => {
    // const { t } = useTranslation('home')
    const router = useRouter()

    const { data: meData, isLoading } = useMeQuery({})

    useEffect(() => {
        if (meData) {
            void router.push(InctagramPath.PROFILE.PROFILE)
        } else {
            void router.push(InctagramPath.AUTH.LOGIN)
        }
    }, [router, meData])

    if (meData) void router.push(InctagramPath.PROFILE.PROFILE)
    if (isLoading) return <LoaderScreen variant={'circle'} />

    return (
        <>
            <div className={s.main}>{/* Main */}</div>
        </>
    )
}

Home.getLayout = getHeaderLayout
export default Home
