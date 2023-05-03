import React from 'react';
import styles from "@/styles/Form.module.scss";
import {Title} from "@/components/Forms/components/Title";
import {Input} from "@/components/Forms/components/Input";
import Link from "next/link";
import {Button} from "@/shared/ui/Button/Button";
import Image from "next/image";
import captcha from "public/assets/icons/reCaotcha.svg";

export const ForgotPassword = () => {
    return (
        <form className={styles.form}>
            <Title title={"Forgot Password"} className={styles.title}/>
            <div className={styles.inputContainer} style={{marginBottom: "54px"}}>
                <Input
                    type={"email"}
                    className={styles.input}
                    placeholder={"Email"}
                    inputBodyClass={styles.inputBody}
                />
                <p>Enter your email address and we will send you further instructions </p>
            </div>

            <Button className={styles.btn} theme={'primary'} >Send Link</Button>
            <Link className={styles.link} href={"/login"}>Back to Sign Ip</Link>

            <div className={styles.captcha}>
                <div className={styles.checkboxBody}>
                    <input type="checkbox"/>
                    <span>I&apos;m not a robot</span>
                </div>

                <Image className={styles.img} src={captcha} alt={'captcha'}/>
            </div>
        </form>
    );
};
