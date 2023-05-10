import Image, { StaticImageData } from 'next/image'
import s from './ConfirmEmailBox.module.scss'
import { Button } from '@/shared/ui/Button/Button'
import { useTranslation } from 'react-i18next'

interface ConfirmEmailBoxType {
    title: string
    text: string
    buttonText: string
    src: StaticImageData
    merge?: boolean
}

export const ConfirmEmailBox = ({ title, text, src, buttonText, merge }: ConfirmEmailBoxType) => {
    const { t } = useTranslation('mergeAccount')

    return (
        <div className={s.container}>
            <h1>{title}</h1>
            <p>{text}</p>
            {merge && (
                <>
                    <Button className={s.button} theme={'outline'}>
                        {t('yes')}
                    </Button>
                    <Button className={s.button} theme={'outline'}>
                        No
                    </Button>
                </>
            )}
            {!merge && (
                <Button className={s.button} theme={'primary'}>
                    {buttonText}
                </Button>
            )}
            <Image src={src} alt={''} />
        </div>
    )
}
