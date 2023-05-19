import React from 'react'
import cls from './Devices.module.scss'
import { ContentBox } from '@/shared/ui/ContentBox/ContentBox'
import { useTranslation } from 'next-i18next'
import styles from '@/components/Forms/FormWrapper/Form.module.scss'
import { Button } from '@/shared/ui/Button/Button'
import { DeviceItem } from '@/components/Profile/Devices/DeviceItem'

export const Devices = () => {
    const { t } = useTranslation('settings-devices')

    return (
        <div className={cls.devices_mainBox}>
            <div className={cls.this_devices}>
                <div className={cls.title}>{t('Devices')}</div>
                <ContentBox divClassName={cls.contentBox}>
                    <DeviceItem isLogout={false} />
                </ContentBox>
                <Button divClassName={cls.terminate_btn} className={styles.btn} theme={'outline'}>
                    {t('Terminate')}
                </Button>
            </div>

            <div className={cls.this_devices}>
                <div className={cls.title}>{t('Sessions')}</div>
                <ContentBox divClassName={cls.contentBox}>
                    <DeviceItem isLogout={true} />
                </ContentBox>
                <ContentBox divClassName={cls.contentBox}>
                    <DeviceItem isLogout={true} />
                </ContentBox>
            </div>
        </div>
    )
}
