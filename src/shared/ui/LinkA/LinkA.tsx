import Link from 'next/link'

interface LinkProps {
    href: string
    text: string
}

export default function ({ href, text }: LinkProps) {
    return (
        <Link href={href} style={{ color: 'white' }}>
            {text}
        </Link>
    )
}
