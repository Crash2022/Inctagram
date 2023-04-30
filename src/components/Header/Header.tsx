import cls from './Header.module.scss';

export const Header = () => {
    return (
        <header className={cls.headerWrapper}>
            <div className={cls.header}>
                <span>Inctagram</span>
            </div>
        </header>
    );
};
