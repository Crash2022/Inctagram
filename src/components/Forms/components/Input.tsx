import {PropsWithChildren} from "react";

interface IPropsType {
    type: string
    className: string
    children? : PropsWithChildren
    placeholder?: string
    placeholderClass?: string
    inputBodyClass?: string
    onChangeCbHandler?: () => void
}

export const Input = ({type, className, placeholder, placeholderClass, inputBodyClass, children}: IPropsType) => {
    return <div className={inputBodyClass}>
        <h3 className={placeholderClass}>{placeholder}</h3>
        <input type={type} className={className}/>
        {children}
    </div>
};
