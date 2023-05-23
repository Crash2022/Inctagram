import { ChangeEvent } from 'react'

// применение в компоненте
// const uploadAvatarHandler = (event: ChangeEvent<HTMLInputElement>) => {
//     console.log('uploading')
//     uploadImage(event, setAvatar, async (file64) => {
//         uploadAvatar(file64)
//     })
// }

// upload file
export const uploadImage = (
    e: ChangeEvent<HTMLInputElement>,
    setFunction: (file64: string) => void,
    extraFunction?: (file64: string) => void
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
            console.error('Error: ', 'Файл слишком большого размера')
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

// error handler
export const imageErrorHandler = (callback: (isBroken: boolean) => void) => {
    callback(true)
    console.log('Файл с изображением повреждён')
}

// function for local state while uploading file
// domainValue - значение с сервера (если оно есть)
// currentValue - текущее значение (при выборе)
// defaultValue - стандартное значение (из файла)
export const showFileAfterUploading = (
    domainValue: string | undefined,
    currentValue: string | undefined,
    defaultValue: string
) => {
    if (domainValue) {
        if (currentValue === defaultValue) {
            return domainValue
        } else {
            return currentValue
        }
    } else {
        return currentValue
    }
}
