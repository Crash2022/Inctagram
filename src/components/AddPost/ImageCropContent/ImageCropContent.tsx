import React from 'react'
import cls from './ImageCropContent.module.scss'
import Image from 'next/image'

interface ImageCropContentProps {
    postPhoto: string
}

export const ImageCropContent = ({ postPhoto }: ImageCropContentProps) => {
    return (
        <div className={cls.imageCropModal_content}>
            <Image src={postPhoto} alt={'post-photo'} width={500} height={500} />
        </div>
    )
}
