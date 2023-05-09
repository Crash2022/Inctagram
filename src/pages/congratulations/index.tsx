import Head from "next/head"
import React from "react"
import {getLayout} from "@/components/Layout/Layout"
import {ConfirmEmailBox} from "@/components/ConfirmEmailBox/ConfirmEmailBox"
import congratulations from "../../../public/assets/images/congratulations.png"


const MergeAccount = () => {

    return (
        <>
            <Head>
                <title>Inctagram - Confirm Email</title>
                <meta name='title' content='Confirm' />
            </Head>
            <ConfirmEmailBox
                title={'Congratulations!'}
                text={'Your email has been confirmed'}
                src={congratulations}
                buttonText={'Sign In'}
            />
        </>
    )
}

MergeAccount.getLayout = getLayout
export default MergeAccount
