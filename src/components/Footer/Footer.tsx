import s from '../../styles/Footer.module.scss'
import Image from 'next/image'

export const Footer = () => {

    return (
        <footer className={s.footer}>
            <div className={s.container}>

                <div>
                    <Image src={'./assets/icons/home-icon.svg'} width={24} height={24}/>
                </div>
                <div>
                    <Image src={'./assets/icons/add-icon.svg'} width={24} height={24}/>
                </div>
                <div>
                    <Image src={'./assets/icons/profile-icon.svg'} width={24} height={24}/>
                </div>

            </div>
        </footer>
    )
}