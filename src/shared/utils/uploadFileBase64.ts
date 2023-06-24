import { ChangeEvent } from 'react'

// применение в компоненте
// const uploadAvatarHandler = (event: ChangeEvent<HTMLInputElement>) => {
//     console.log('uploading')
//     uploadImage(event, setAvatar, async (file64) => {
//         uploadAvatar(file64)
//     })
// }

// upload file
export const uploadFileBase64 = (
    e: ChangeEvent<HTMLInputElement>,
    setFunction: (file64: string) => void, // загрузка изображения в стейт
    extraFunction?: (file64: string) => void // запрос на загрузку на сервер
) => {
    if (e.target.files && e.target.files.length) {
        const file = e.target.files[0]

        if (file.size < 4000000) {
            convertFileToBase64(file, (file64: string) => {
                setFunction(file64)
                if (extraFunction) {
                    extraFunction(file64)
                }
            })
        } else {
            console.error('Файл слишком большого размера')
        }
    }
}

// convert file to base64
export const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
    const reader = new FileReader()

    reader.onloadend = () => {
        const file64 = reader.result as string
        callBack(file64)
    }
    reader.readAsDataURL(file)
}

// image error handler
export const imageErrorHandler = (callback: (err: Error | null, isBroken?: boolean) => void) => {
    callback(new Error('Файл с изображением повреждён'), true)
}



