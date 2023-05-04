import Head from "next/head";
import React, {useState} from "react";
import ConfirmEmailBox from "@/components/ConfirmEmailBox/ConfirmEmailBox";
import congratulations from "../../../public/assets/images/congratulations.png"
import waitEmailLink from "../../../public/assets/images/waitEmailLink.png"
import mergeAccount from "../../../public/assets/images/mergeAccount.png"
import {getLayout} from "@/components/Layout/Layout";
import ConfirmEmailModal from "@/components/ConfirmEmailBox/ConfirmEmailModal/ConfirmEmailModal";

const ConfirmEmail = () => {

    const [emailStatus, setEmailStatus] = useState<EmailStatusType>("merged")

    const onChangeHandler = (e) => {
        setEmailStatus(e.currentTarget.value as EmailStatusType)
    }
        return (
            <>
                <Head>
                    <title>Inctagram - Confirm Email</title>
                    <meta name="title" content="Confirm"/>
                </Head>
                {emailStatus === 'confirmed' && <ConfirmEmailBox title={"Congratulations!"} text={"Your email has been confirmed"}
                                  src={congratulations}
                                  buttonText={"Sign In"}/>}
                {emailStatus === 'expired' && <ConfirmEmailBox title={"Email verification link expired"}
                                                                 text={"Looks like the verification link has expired. Not to worry, we can send the link again"}
                                                                 src={waitEmailLink}
                                                                 buttonText={"Resend verification link"}/>}
                {emailStatus === 'invalid' && <ConfirmEmailBox title={"Email verification link invalid"}
                                                               text={"Looks like the verification link has expired. Not to worry, we can send the link again"}
                                                               src={waitEmailLink}
                                                               buttonText={"Resend link"}/>}
                {emailStatus === 'merged' && <ConfirmEmailBox title={"Merger of Accounts"}
                                                               text={"The user with email Epam@epam.com is already in the system. Could we merge this accounts?"}
                                                               src={mergeAccount}
                                                               buttonText={""}
                                                              merge={true}
                />}
                <select style={{color: "white", backgroundColor: 'black'}} onChange={onChangeHandler}>
                    <option value={'merged'}>merged</option>
                    <option value={'confirmed'}>confirmed</option>
                    <option value={"expired"}>expired</option>
                    <option value={'invalid'}>invalid</option>
                </select>
                <ConfirmEmailModal/>
            </>
        )
}

ConfirmEmail.getLayout = getLayout;
export default ConfirmEmail


// types
type EmailStatusType = "merged" | "confirmed" | "expired" | "invalid"
