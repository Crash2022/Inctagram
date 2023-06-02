import React, { ChangeEvent, useState } from 'react'
import Head from 'next/head'
import cls from './ProfileHome.module.scss'
import { NextPageWithLayout } from '@/pages/_app'
// import { useTranslation } from 'next-i18next'
import { getSidebarLayout } from '@/components/SidebarLayout/SidebarLayout'
import { InputFile } from '@/shared/ui/InputFile/InputFile'
import Image from 'next/image'
import { clarendon, applyPresetOnImage } from 'instagram-filters'
import { Button } from '@/shared/ui/Button/Button'

const ProfileHome: NextPageWithLayout = () => {
    const [myImage, setMyImage] = useState<string>('')

    const uploadPhotoHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            const file = event.target.files[0]

            if (file && file.size < 1000000) {
                console.log('file uploaded', file)
                const formData = new FormData()
                formData.append('file', file)
                setMyImage(URL.createObjectURL(file))
                console.log('createObjectURL in upload', URL.createObjectURL(file))
            } else {
                console.log('error upload')
            }
        }
    }

    const applyFilter = async () => {
        try {
            // const { url } = await applyPresetOnImage(myImage, gingham())
            // console.log('url', url)
            // setMyImage(await url)
            //
            // On existing image
            const image = document.querySelector('#myImage')
            // Function `applyPresetOnImage` is returning a Blob
            const blob = applyPresetOnImage(image, clarendon())
            image.src = window.URL.createObjectURL(blob) // execute 'createObjectURL' on 'URL'
            // setMyImage((image.srcObject = blob)) // pending
            //
            // From URL
            // const blob = applyPresetOnImage(myImage, clarendon())
            // const image = document.querySelector('#myImage')
            // image.src = window.URL.createObjectURL(blob)
            console.log('image filter', image)
            console.log('blob filter', blob)
            //
            // Using preset of filters manually
            // const canvas = document.querySelector('#myImage')
            // const context = canvas.getContext('2d')
            // // Retrieve canvas pixels
            // const pixels = context.getImageData(0, 0, canvas.width, canvas.height)
            // // Transform canvas pixels with the "clarendon" filter
            // const filteredPixels = clarendon()(pixels)
            //
            // // Replace pixels on the canvas
            // context.putImageData(filteredPixels, 0, 0)
        } catch (error) {
            console.log('error filter', error)
        }
    }

    return (
        <>
            <Head>
                <title>Inctagram Index</title>
                <meta name='title' content='Profile Home' />
            </Head>
            <div className={cls.profilePageHome}>
                <div>Profile Home</div>
                <div style={{ marginBottom: '20px' }}>
                    <InputFile
                        id={'Filters_Photo'}
                        title={'Add Photo'}
                        onChangeUpload={uploadPhotoHandler}
                        accept={'image/*'}
                    />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <Button theme={'primary'} onClick={applyFilter}>
                        Apply Filter
                    </Button>
                </div>
                <div>
                    <Image
                        src={myImage}
                        alt={'filter-photo'}
                        id={'myImage'}
                        width={220}
                        height={220}
                    />
                </div>
            </div>
        </>
    )
}

ProfileHome.getLayout = getSidebarLayout
export default ProfileHome
