import s from './Footer.module.scss'
import HomeIcon from './../../../public/assets/icons/home-icon.svg'
import AddIcon from './../../../public/assets/icons/add-icon.svg'
import ProfileIcon from './../../../public/assets/icons/profile-icon.svg'
import { InctagramPath } from '@/shared/api/path'
import { useRouter } from 'next/router'
import { AddPostModal } from '@/components/AddPost/AddPostModal/AddPostModal'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'

export const Footer = () => {
    const { t } = useTranslation('sidebar')
    const router = useRouter()
    const [open, setOpen] = useState<boolean>(false)

    return (
        <footer className={s.footer}>
            <div className={s.container}>
                <AddPostModal open={open} setOpen={setOpen} header={t('AddPhotoModal')} />

                <div className={s.items}>
                    <div
                        onClick={() => {
                            void router.push(InctagramPath.PROFILE.HOME)
                        }}
                    >
                        <HomeIcon />
                    </div>
                    <div
                        onClick={() => {
                            setOpen(true)
                        }}
                    >
                        <AddIcon />
                    </div>
                    <div
                        onClick={() => {
                            void router.push(InctagramPath.PROFILE.PROFILE)
                        }}
                    >
                        <ProfileIcon />
                    </div>
                </div>
            </div>
        </footer>
    )
}
