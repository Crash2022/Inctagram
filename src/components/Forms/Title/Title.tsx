interface TitlePropsType {
    className: string
    title: string
}

export const Title = ({ title, className }: TitlePropsType) => {
    return <h2 className={className}>{title}</h2>
}
