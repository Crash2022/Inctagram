import {Button} from "@/shared/ui/Button/Button";
import Link from "next/link";
import styles from "@/styles/Form.module.scss";
import Image from "next/image";
import google from "public/assets/icons/googleIcon.svg";
import git from "public/assets/icons/gitIcon.svg";
import {Title} from "@/components/Forms/components/Title";
import {Input} from "@/components/Forms/components/Input";
import eye from "public/assets/icons/eye.svg"
import eyeOff from "public/assets/icons/eye-off.svg"
import {useState} from "react";

export const LoginForm = () => {
    const [isLock, setIsLock] = useState(false)

    const lockHandler = () => {
        setIsLock(!isLock)
    }

    return (
        <form className={styles.form}>
            <Title
                title={"Sign In"}
                className={styles.title}
            />

            <div className={styles.imgBody}>
                <Image className={styles.img} src={google} alt={'logo-google'}/>
                <Image className={styles.img} src={git} alt={'logo-git'}/>
            </div>

            <div className={styles.inputContainer}>
                <Input
                    type={"email"}
                    placeholder={"Email"}
                    className={styles.input}
                    inputBodyClass={styles.inputBody}
                />

                <Input
                    type={isLock ? "text" : "password"}
                    placeholder={"Password"}
                    className={styles.input}
                    inputBodyClass={styles.inputBody}
                >
                    <Image
                        className={styles.img}
                        src={isLock ? eyeOff : eye}
                        onClick={lockHandler}
                        alt={""}
                    />
                </Input>
            </div>

            <Link className={styles.forgot} href={"/forgot-password"}> Forgot Password</Link>

            <div>
                <Button className={styles.btn} theme={'primary'}>Sign Up</Button>
                <h3 className={styles.subtitle}> Don&apos;t have an account?</h3>
                <Link className={styles.link} href={"/registration"}> Sign Up</Link>
            </div>
        </form>
    );
};
