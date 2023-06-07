import { NEXT_PUBLIC_RECAPTCHA_SITE_KEY } from '@/shared/api/recaptcha-site-key'

const validateCaptcha = async (response_key: string) => {
    return await new Promise((resolve, reject) => {
        // const secret_key: string = process.env.RECAPTCHA_SECRET
        const secret_key: string = NEXT_PUBLIC_RECAPTCHA_SITE_KEY

        const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${response_key}`

        fetch(url, {
            method: 'post'
        })
            .then(async (response) => await response.json())
            .then((google_response: any) => {
                if (google_response.success === true) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            })
            .catch((err) => {
                console.log(err)
                resolve(false)
            })
    })
}
