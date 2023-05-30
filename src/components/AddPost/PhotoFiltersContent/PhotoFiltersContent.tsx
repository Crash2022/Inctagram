import React from 'react'
import cls from './PhotoFiltersContent.module.scss'
import Image from 'next/image'

interface PhotoFiltersContentProps {
    postPhoto: string
}

export const PhotoFiltersContent = ({ postPhoto }: PhotoFiltersContentProps) => {
    return (
        <div className={cls.photoFiltersModal_content}>
            <div className={cls.content_image}>
                <Image src={postPhoto} alt={'post-photo'} width={500} height={500} />
            </div>
            <div className={cls.content_filters}>
                <div className={cls.filter_item}>
                    <div className={cls.item_image}>1</div>
                    <div className={cls.item_title}>title</div>
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
