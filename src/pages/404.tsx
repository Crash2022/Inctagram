import Link from 'next/link'
import {useEffect} from 'react'
import {useRouter} from 'next/router'

const NotFoundPage = () => {

    const router = useRouter()

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            router.push('/').then()
        }, 5000)

        return () => {
            clearTimeout(timeoutID)
        }
    }, [])

    return (
        <div className='notFound'>
            <div className='notFound_title'>
                Ooops...! Error 404: Page Not Found
            </div>
            <div className='notFound_text'>
                <span>You will be redirect automatically to </span>
                    <Link href='/'>
                        Home Page
                    </Link>
                <span> after 5 seconds...</span>
            </div>
            {/*<div className='notFoundImage'>*/}
            {/*    <img src='/images/error404.jpg' alt='page404'/>*/}
            {/*</div>*/}
        </div>
    )
}

export default NotFoundPage;