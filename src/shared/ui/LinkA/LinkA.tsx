import Link from 'next/link'

interface LinkProps {
    href: string
    text: string
    className?: any
}

export default function ({ href, text, className }: LinkProps) {
    return (
        <Link href={href} className={className}>
            {text}
        </Link>
    )
}
