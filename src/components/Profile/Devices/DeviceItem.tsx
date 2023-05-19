import React from 'react'
import cls from './DeviceItem.module.scss'
import GoogleChrome from '../../../../public/assets/icons/google-chrome.svg'
import LogoutIcon from '../../../../public/assets/icons/logout-icon.svg'
import { useTranslation } from 'next-i18next'

interface DeviceItemProps {
    isLogout: boolean
}

export const DeviceItem = ({ isLogout }: DeviceItemProps) => {
    const { t } = useTranslation('settings-devices')

    return (
        <div className={cls.item}>
            <div className={cls.left}>
                <div className={cls.item_image}>
                    <GoogleChrome />
                </div>
                <div className={cls.item_info}>
                    <div>Chrome</div>
                    <div>IP: 22.345.345.12</div>
                    <div>{t('Online')}</div>
                </div>
            </div>

            {isLogout ? (
                <div className={cls.right}>
                    <div>
                        <LogoutIcon />
                    </div>
                    <div>{t('LogOut')}</div>
                </div>
            ) : (
                ''
            )}
        </div>
    )
}
