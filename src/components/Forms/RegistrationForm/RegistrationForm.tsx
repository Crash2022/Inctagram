import styles from "@/styles/Form.module.scss";
import {Title} from "@/components/Forms/components/Title";
import Image from "next/image";
import {Input} from "@/components/Forms/components/Input";
import Link from "next/link";
import {Button} from "@/shared/ui/Button/Button";
import google from "public/assets/icons/googleIcon.svg";
import git from "public/assets/icons/gitIcon.svg";
import eye from "public/assets/icons/eye.svg"
import eyeOff from "public/assets/icons/eye-off.svg"
import {useState} from "react";

export const RegistrationForm = () => {
    const [isPassword, setIsPassword] = useState(false)
    const [isConfirm, setIsConfirm] = useState(false)

    const lockPasswordHandler = () => {
        setIsPassword(!isPassword)
    }

    const lockConfirmHandler = () => {
        setIsConfirm(!isConfirm)
    }

    return (
        <form className={styles.form}>
            <Title title={"Sign Up"} className={styles.title}/>

            <div className={styles.imgBody}>
                <Image className={styles.img} src={google} alt={''}/>
                <Image className={styles.img} src={git} alt={''}/>
            </div>

            <div className={styles.inputContainer}>
                <Input
                    type={"text"}
                    placeholder={"Username"}
                    className={styles.input}
                    inputBodyClass={styles.inputBody}
                />

                <Input
                    type={"email"}
                    placeholder={"Email"}
                    className={styles.input}
                    inputBodyClass={styles.inputBody}
                />

                <Input
                    type={isPassword ? "text" : "password"}
                    placeholder={"Password"}
                    className={styles.input}
                    inputBodyClass={styles.inputBody}
                >
                    <Image
                        className={styles.img}
                        src={isPassword ? eyeOff : eye}
                        onClick={lockPasswordHandler}
                        alt={''}
                    />
                </Input>

                <Input
                    type={isConfirm ? "text" : "password"}
                    placeholder={"Password confirmation"}
                    className={styles.input}
                    inputBodyClass={styles.inputBody}
                >
                    <Image
                        className={styles.img}
                        src={isConfirm ? eyeOff : eye}
                        onClick={lockConfirmHandler} alt={''}/>
                </Input>
            </div>

            <div>
                <Button className={styles.btn} theme={'primary'}>Sign Up</Button>
                <h3 className={styles.subtitle}> Do you have an account?</h3>
                <Link className={styles.link} href={"/login"}> Sign In</Link>
            </div>
        </form>
    );
};
