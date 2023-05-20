import React, { useEffect, useState } from 'react'
import cls from './Management.module.scss'
import { ContentBox } from '@/shared/ui/ContentBox/ContentBox'
import { useTranslation } from 'next-i18next'
import { RadioButton } from '@/shared/ui/RadioButton/RadioButton'
import PaypalIcon from '../../../../public/assets/icons/pay-paypal.svg'
import StripeIcon from '../../../../public/assets/icons/pay-stripe.svg'
import { MessageModal } from '@/components/MessageModal/MessageModal'

type RadioAccountTypes = 'Personal' | 'Business'
type RadioCostsTypes = '10' | '50' | '100'

export const Management = () => {
    const { t } = useTranslation('settings-management')

    const [openError, setOpenError] = useState<boolean>(false)
    const [openSuccess, setOpenSuccess] = useState<boolean>(false)

    const radioAccountOptions = [t('Personal'), t('Business')]
    const [radioAccTypeButton, setRadioAccTypeButton] = useState<RadioAccountTypes>('Personal')

    const radioCostsOptions = [t('10PM'), t('50PM'), t('100PY')]
    const [radioCostButton, setRadioCostButton] = useState<RadioCostsTypes>('10')

    // const isError = true
    // const isSuccess = true

    // useEffect(() => {
    //     if (isError) setOpenError(true)
    //     if (isSuccess) setOpenSuccess(true)
    // }, [])

    const messageModalErrorHandler = () => {
        setOpenError(false)
    }
    const messageModalSuccessHandler = () => {
        setOpenSuccess(false)
    }

    return (
        <div className={cls.devices_mainBox}>
            <MessageModal
                open={openError}
                setOpen={setOpenError}
                header={t('Error')}
                text={t('Failed')}
                buttonTitleOK={t('BackButton')}
                extraCallbackOK={messageModalErrorHandler}
                longButton
            />

            <MessageModal
                open={openSuccess}
                setOpen={setOpenSuccess}
                header={t('Success')}
                text={t('Successful')}
                buttonTitleOK={t('OkButton')}
                extraCallbackOK={messageModalSuccessHandler}
                longButton
            />

            <div className={cls.account_types}>
                <div className={cls.title}>{t('AccountType')}</div>
                <ContentBox divClassName={cls.contentBox}>
                    <RadioButton
                        options={radioAccountOptions}
                        value={radioAccTypeButton}
                        onChangeOption={setRadioAccTypeButton}
                    />
                </ContentBox>
            </div>
            {radioAccTypeButton === 'Business' ? (
                <>
                    <div className={cls.account_types}>
                        <div className={cls.title}>{t('Costs')}</div>
                        <ContentBox divClassName={cls.contentBox}>
                            <RadioButton
                                options={radioCostsOptions}
                                value={radioCostButton}
                                onChangeOption={setRadioCostButton}
                            />
                        </ContentBox>
                    </div>
                    <div className={cls.pay_system}>
                        <div>
                            <PaypalIcon />
                        </div>
                        <div>{t('Or')}</div>
                        <div>
                            <StripeIcon />
                        </div>
                    </div>
                </>
            ) : (
                ''
            )}
        </div>
    )
}
