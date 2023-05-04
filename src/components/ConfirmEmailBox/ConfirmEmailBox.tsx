import Image, { StaticImageData } from 'next/image'
import s from './ConfirmEmailBox.module.scss'
import { Button } from '@/shared/ui/Button/Button'

interface ConfirmEmailBoxType {
    title: string
    text: string
    buttonText: string
    src: StaticImageData
    merge?: boolean
}

export const ConfirmEmailBox = ({ title, text, src, buttonText, merge }: ConfirmEmailBoxType) => {
    return (
        <div className={s.container}>
            <h1>{title}</h1>
            <p>{text}</p>
            {merge && (
                <>
                    <Button className={s.button} theme={'outline'}>
                        Yes, merge
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
