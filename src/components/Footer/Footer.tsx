import s from './Footer.module.scss'
import Image from 'next/image'
import HomeIcon from './../../../public/assets/icons/home-icon.svg'
import AddIcon from './../../../public/assets/icons/add-icon.svg'
import ProfileIcon from './../../../public/assets/icons/profile-icon.svg'

export const Footer = () => {
    return (
        <footer className={s.footer}>
            <div className={s.container}>
                <div>
                    <HomeIcon />
                    {/*<Image*/}
                    {/*    src={'./assets/icons/login-icon.svg'}*/}
                    {/*    alt={'login-icon'}*/}
                    {/*    width={24}*/}
                    {/*    height={24}*/}
                    {/*/>*/}
                </div>
                <div>
                    <AddIcon />
                    {/*<Image*/}
                    {/*    src={'./assets/icons/add-icon.svg'}*/}
                    {/*    alt={'add-icon'}*/}
                    {/*    width={24}*/}
                    {/*    height={24}*/}
                    {/*/>*/}
                </div>
                <div>
                    <ProfileIcon />
                    {/*<Image*/}
                    {/*    src={'./assets/icons/profile-icon.svg'}*/}
                    {/*    alt={'profile-icon'}*/}
                    {/*    width={24}*/}
                    {/*    height={24}*/}
                    {/*/>*/}
                </div>
            </div>
        </footer>
    )
}
