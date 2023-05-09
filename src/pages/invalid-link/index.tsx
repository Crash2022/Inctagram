import Head from "next/head"
import React from "react"
import {getLayout} from "@/components/Layout/Layout"
import {ConfirmEmailBox} from "@/components/ConfirmEmailBox/ConfirmEmailBox"
import waitEmailLink from "../../../public/assets/images/waitEmailLink.png"


const MergeAccount = () => {

    return (
        <>
            <Head>
                <title>Inctagram - Confirm Email</title>
                <meta name='title' content='Confirm' />
            </Head>
            <ConfirmEmailBox
                title={'Email verification link invalid'}
                text={
                'Looks like the verification link has expired. Not to worry, we can send the link again'
            }
                src={waitEmailLink}
                buttonText={'Resend link'}
            />
        </>
    )
}

MergeAccount.getLayout = getLayout
export default MergeAccount
