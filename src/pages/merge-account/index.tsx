import Head from "next/head"
import React from "react"
import mergeAccount from "../../../public/assets/images/mergeAccount.png"
import {getLayout} from "@/components/Layout/Layout"
import {ConfirmEmailBox} from "@/components/ConfirmEmailBox/ConfirmEmailBox"


const MergeAccount = () => {

    return (
        <>
            <Head>
                <title>Inctagram - Confirm Email</title>
                <meta name='title' content='Confirm' />
            </Head>
            <ConfirmEmailBox
                title={'Merger of Accounts'}
                text={
                'The user with email Epam@epam.com is already in the system. Could we merge this accounts?'
            }
                src={mergeAccount}
                buttonText={''}
                merge={true}
            />
        </>
    )
}

MergeAccount.getLayout = getLayout
export default MergeAccount
