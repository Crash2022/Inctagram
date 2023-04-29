import s from './Footer.module.scss';
import Image from 'next/image';

export const Footer = () => {
    return (
        <footer className={s.footer}>
            <div className={s.container}>
                <div>
                    <Image
                        src={'./assets/icons/home-icon.svg'}
                        alt={'home-icon'}
                        width={24}
                        height={24}
                    />
                </div>
                <div>
                    <Image
                        src={'./assets/icons/add-icon.svg'}
                        alt={'add-icon'}
                        width={24}
                        height={24}
                    />
                </div>
                <div>
                    <Image
                        src={'./assets/icons/profile-icon.svg'}
                        alt={'profile-icon'}
                        width={24}
                        height={24}
                    />
                </div>
            </div>
        </footer>
    );
};
