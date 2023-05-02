import cls from './Header.module.scss';
import Image from 'next/image';
import LogoIcon from '../../../public/assets/images/logo.png';
import { useTranslation } from 'react-i18next';

export const Header = () => {
    const { t, i18n } = useTranslation('header');

    const toggleLanguage = (language: string): void => {
        void i18n.changeLanguage(language);
    };

    return (
        <header className={cls.headerWrapper}>
            <div className={cls.header}>
                <div className={cls.header_logo}>
                    <div className={cls.logo}>
                        <Image src={LogoIcon} alt={'home-icon'} width={40} height={40} />
                    </div>
                    <div className={cls.title}>{t('Inctagram')}</div>
                </div>
                <div className={cls.auth}>
                    <div onClick={() => toggleLanguage('en')}>EN</div>
                    <div onClick={() => toggleLanguage('ru')}>RU</div>
                    <div className={cls.auth} style={{ width: '100px' }}>
                        {t('AuthBlock')}
                    </div>
                </div>
            </div>
        </header>
    );
};
