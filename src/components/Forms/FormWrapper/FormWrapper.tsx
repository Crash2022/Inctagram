import { ReactNode } from 'react'
import styles from '@/components/Forms/FormWrapper/FormWrapper.module.scss'

interface Props {
    children: ReactNode
    marginTop: number
}

export const FormWrapper = ({ children, marginTop }: Props) => {
    return (
        <div className={styles.container} style={{ marginTop: `${marginTop}px` }}>
            {children}
        </div>
    )
}
