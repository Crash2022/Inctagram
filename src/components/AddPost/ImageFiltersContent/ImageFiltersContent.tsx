import React from 'react'
import cls from './ImageFiltersContent.module.scss'
import Image from 'next/image'
// import NoImage from '../../../../public/assets/images/no-image-01.png'

interface PhotoFiltersContentProps {
    croppedImage: string
    applyClarendonFilter: () => void
}

export const ImageFiltersContent = ({
    croppedImage,
    applyClarendonFilter
}: PhotoFiltersContentProps) => {
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
