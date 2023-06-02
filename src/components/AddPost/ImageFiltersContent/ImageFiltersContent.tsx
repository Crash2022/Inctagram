import React from 'react'
import cls from './ImageFiltersContent.module.scss'
import Image from 'next/image'
// import NoImage from '../../../../public/assets/images/no-image-01.png'
import { clarendon, applyPresetOnImage } from 'instagram-filters'

interface PhotoFiltersContentProps {
    croppedImage: string
    setCroppedImage: (value: string) => void
}

export const ImageFiltersContent = ({
    croppedImage,
    setCroppedImage
}: PhotoFiltersContentProps) => {
    const applyClarendonFilter = async () => {
        try {
            const image = document.querySelector('#CroppedImageForFilter')
            // Function 'applyPresetOnImage' is returning a Blob
            const blob = await applyPresetOnImage(image, clarendon())
            // image.src = window.URL.createObjectURL(blob)
            setCroppedImage((image.src = window.URL.createObjectURL(blob)))
        } catch (error) {
            console.log('error filter', error)
        }
    }

    return (
        <div className={cls.photoFiltersModal_content}>
            <div className={cls.content_image}>
                <Image
                    src={croppedImage}
                    alt={'post-photo'}
                    id={'CroppedImageForFilter'}
                    width={500}
                    height={500}
                />
            </div>
            <div className={cls.content_filters}>
                <div className={cls.filter_item} onClick={applyClarendonFilter}>
                    <div className={cls.item_image}></div>
                    <div className={cls.item_title}>Clarendon</div>
                </div>
                <div className={cls.filter_item}>
                    <div className={cls.item_image}>2</div>
                    <div className={cls.item_title}>title</div>
                </div>
                <div className={cls.filter_item}>
                    <div className={cls.item_image}>3</div>
                    <div className={cls.item_title}>title</div>
                </div>
                <div className={cls.filter_item}>
                    <div className={cls.item_image}>1</div>
                    <div className={cls.item_title}>title</div>
                </div>
                <div className={cls.filter_item}>
                    <div className={cls.item_image}>1</div>
                    <div className={cls.item_title}>title</div>
                </div>
                <div className={cls.filter_item}>
                    <div className={cls.item_image}>1</div>
                    <div className={cls.item_title}>title</div>
                </div>
                <div className={cls.filter_item}>
                    <div className={cls.item_image}>1</div>
                    <div className={cls.item_title}>title</div>
                </div>
                <div className={cls.filter_item}>
                    <div className={cls.item_image}>1</div>
                    <div className={cls.item_title}>title</div>
                </div>
                <div className={cls.filter_item}>
                    <div className={cls.item_image}>1</div>
                    <div className={cls.item_title}>title</div>
                </div>
            </div>
        </div>
    )
}

// *** filter-list ***
// Clarendon
// Gingham
// Moon
// Lark
// Reyes
// Juno
// Slumber
// Crema
// Ludwig
// Aden
// Perpetua
// Amaro
// Mayfair
// Rise
// Hudson
// Valencia
// X-Pro II
// Sierra
// Willow
// Lo-Fi
// Inkwell
// Hefe
// Nashville
// Stinson
// Vesper
// Earlybird
// Brannan
// Sutro
// Toaster
// Walden
// 1977
// Kelvin
// Maven
// Ginza
// Skyline
// Dogpatch
// Brooklyn
// Helena
// Ashby
// Charmes
