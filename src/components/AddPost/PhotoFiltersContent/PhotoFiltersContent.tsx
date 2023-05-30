import React from 'react'
import cls from './PhotoFiltersContent.module.scss'
import Image from 'next/image'
import FilterImage from '../../../../public/assets/images/FilterImage-01.jpg'

export const PhotoFiltersContent = () => {
    return (
        <div className={cls.photoFiltersModal_content}>
            <div className={cls.content_image}>
                <Image src={FilterImage} alt={'post-photo'} width={500} height={500} />
            </div>
            <div className={cls.content_filters}>
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
