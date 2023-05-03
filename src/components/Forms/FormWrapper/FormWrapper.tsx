import {PropsWithChildren} from "react";
import styles from "@/styles/FormWrapper.module.scss";

export const FormWrapper = ({children, top}: PropsWithChildren & number) => {
    return (
        <div className={styles.container} style ={{marginTop: `${top}px`}}>
            {children}
        </div>
    );
};
