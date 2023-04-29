import Link from 'next/link';

export default function ({ href, text }) {
    return (
        <Link href={href} style={{ color: 'white' }}>
            {text}
        </Link>
    );
}
