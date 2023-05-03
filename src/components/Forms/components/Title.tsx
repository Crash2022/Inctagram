interface IPropsType {
    className: string
    title: string
}

export const Title = ({title, className}: IPropsType) => {
    return <h2 className={className}>{title}</h2>
};
