import cls from './Header.module.scss';
import Image from 'next/image';
import LogoIcon from '../../../public/assets/images/logo.png'

export const Header = () => {

    return (
        <header className={cls.headerWrapper}>
            <div className={cls.header}>
                <div className={cls.header_logo}>
                    <div className={cls.logo}>
                        I

                        {/*<img src={LogoIcon} alt="logo-icon"/>*/}

                        {/*<Image*/}
                        {/*    src={'/../../public/assets/images/logo.png'}*/}
                        {/*    alt={'home-icon'}*/}
                        {/*    width={24}*/}
                        {/*    height={24}*/}
                        {/*/>*/}
                    </div>
                    <div className={cls.title}>Inctagram</div>
                </div>
                <div className={cls.auth}>
                    AuthBlock
                </div>
            </div>
        </header>
    );
};
