import React from 'react'
import cls from './ImageFiltersContent.module.scss'
import Image from 'next/image'
// import NoImage from '../../../../public/assets/images/no-image-01.png'

interface PhotoFiltersContentProps {
    croppedImage: string
    croppedImageForFilter: string
    setCroppedImageForFilter: (image: string) => void
    applyClarendonFilter: () => void
}

export const ImageFiltersContent = ({
    croppedImage,
    croppedImageForFilter,
    setCroppedImageForFilter,
    applyClarendonFilter
}: PhotoFiltersContentProps) => {
    // const filters = [
    //     { id: 1, title: 'Clarendon', img: '', func: () => {} }
    // ]

    return (
        <div className={cls.photoFiltersModal_content}>
            <div className={cls.content_image}>
                <Image
                    src={croppedImageForFilter}
                    alt={'post-photo'}
                    id={'CroppedImageForFilter'}
                    width={500}
                    height={500}
                />
            </div>
            <div className={cls.content_filters}>
                <div
                    className={cls.filter_item}
                    onClick={() => {
                        setCroppedImageForFilter(croppedImage)
                    }}
                >
                    <div className={cls.item_image}>1</div>
                    <div className={cls.item_title}>Normal</div>
                </div>
                <div className={cls.filter_item} onClick={applyClarendonFilter}>
                    <div className={cls.item_image}>2</div>
                    <div className={cls.item_title}>Clarendon</div>
                </div>
                <div className={cls.filter_item}>
                    <div className={cls.item_image}>3</div>
                    <div className={cls.item_title}>Moon</div>
                </div>
                <div className={cls.filter_item}>
                    <div className={cls.item_image}>4</div>
                    <div className={cls.item_title}>Reyes</div>
                </div>
                <div className={cls.filter_item}>
                    <div className={cls.item_image}>5</div>
                    <div className={cls.item_title}>Amaro</div>
                </div>
                <div className={cls.filter_item}>
                    <div className={cls.item_image}>6</div>
                    <div className={cls.item_title}>Mayfair</div>
                </div>
                <div className={cls.filter_item}>
                    <div className={cls.item_image}>7</div>
                    <div className={cls.item_title}>Lo-Fi</div>
                </div>
                <div className={cls.filter_item}>
                    <div className={cls.item_image}>8</div>
                    <div className={cls.item_title}>1977</div>
                </div>
                <div className={cls.filter_item}>
                    <div className={cls.item_image}>9</div>
                    <div className={cls.item_title}>Slumber</div>
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
