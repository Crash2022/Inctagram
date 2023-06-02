import React, { ChangeEvent, useState } from 'react'
import Head from 'next/head'
import cls from './ProfileHome.module.scss'
import { NextPageWithLayout } from '@/pages/_app'
// import { useTranslation } from 'next-i18next'
import { getSidebarLayout } from '@/components/SidebarLayout/SidebarLayout'
import { InputFile } from '@/shared/ui/InputFile/InputFile'
import Image from 'next/image'
import { gingham, applyPresetOnImage } from 'instagram-filters'
import { Button } from '@/shared/ui/Button/Button'

const ProfileHome: NextPageWithLayout = () => {
    const [myImage, setMyImage] = useState<string>('')

    const uploadPhotoHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            const file = event.target.files[0]

            if (file && file.size < 1000000) {
                console.log('file uploaded', file)
                const formData = new FormData()
                console.log('formData', formData)
                formData.append('file', file)
                setMyImage(URL.createObjectURL(file))
                console.log('createObjectURL', URL.createObjectURL(file))
            } else {
                console.log('error')
            }
        }
    }

    const applyFilter = () => {
        // const blob = applyPresetOnImage(myImage, gingham())
        // console.log('blob filter', blob)
        const image = document.querySelector('#myImage')
        console.log('image filter', image)
        image.src = window.URL.createObjectURL(blob)
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
