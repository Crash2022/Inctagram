import cls from './Header.module.scss';
import Image from 'next/image';
import LogoIcon from '../../../public/assets/images/logo.png';

export const Header = () => {
    return (
        <header className={cls.headerWrapper}>
            <div className={cls.header}>
                <div className={cls.header_logo}>
                    <div className={cls.logo}>
                        <Image src={LogoIcon} alt={'home-icon'} width={40} height={40} />
                    </div>
                    <div className={cls.title}>Inctagram</div>
                </div>
                <div className={cls.auth}>AuthBlock</div>
            </div>
        </header>
    );
};
