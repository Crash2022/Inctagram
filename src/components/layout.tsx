import React from 'react'
import {ReactNode} from 'react'
import {Header} from '@/components/header'
import {Footer} from '@/components/footer'
import s from '../styles/Layout.module.scss'

type LayoutPropsType = {
    children: ReactNode
}

export const Layout: React.FC<LayoutPropsType> = ({children}) => {

    return (
        <div className={s.layoutContainer}>
            <div className={s.layoutContent}>
                <div>
                    <Header/>
                </div>
                <div>
                    {children}
                </div>
            </div>

            <div>
                <Footer/>
            </div>
        </div>
    )
}