import React, { useCallback, useState } from 'react'
import cls from './ImageCropContent.module.scss'
import Cropper from 'react-easy-crop'
import { useTranslation } from 'react-i18next'
import ExpandScale from '../../../../public/assets/icons/expand-scale.svg'
import ImageIcon24 from '../../../../public/assets/icons/img-icon24.svg'

interface ImageCropContentProps {
    postPhoto: string
}

export const ImageCropContent = ({ postPhoto }: ImageCropContentProps) => {
    const { t } = useTranslation('add-post-modal')

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState<number>(1)
    const [rotation, setRotation] = useState<number>(0)
    const [aspect, setAspect] = useState<number>(1 / 1)
    const [aspectMenu, setAspectMenu] = useState<boolean>(false)

    const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
        console.log(croppedArea, croppedAreaPixels)
    }, [])

    return (
        <div className={cls.imageCropModal_content}>
            <div className={cls.crop_container}>
                <Cropper
                    image={postPhoto}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    aspect={aspect}
                    onCropComplete={onCropComplete}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                />
            </div>

            {aspectMenu ? (
                <div className={cls.aspectMenu}>
                    <div className={cls.aspectMenu_item}>
                        <div>{t('Original')}</div>
                        <div>
                            <ImageIcon24 />
                        </div>
                    </div>
                    <div
                        className={
                            aspect === 1 / 1 ? cls.aspectMenu_item_active : cls.aspectMenu_item
                        }
                        onClick={() => {
                            setAspect(1 / 1)
                        }}
                    >
                        <div>{t('1to1')}</div>
                        <div className={cls.item_1to1_img}></div>
                    </div>
                    <div
                        className={
                            aspect === 3 / 2 ? cls.aspectMenu_item_active : cls.aspectMenu_item
                        }
                        onClick={() => {
                            setAspect(3 / 2)
                        }}
                    >
                        <div>{t('3to2')}</div>
                        <div className={cls.item_3to2_img}></div>
                    </div>
                    <div
                        className={
                            aspect === 16 / 9 ? cls.aspectMenu_item_active : cls.aspectMenu_item
                        }
                        onClick={() => {
                            setAspect(16 / 9)
                        }}
                    >
                        <div>{t('16to9')}</div>
                        <div className={cls.item_16to9_img}></div>
                    </div>
                </div>
            ) : (
                ''
            )}

            <div
                className={cls.aspect}
                onClick={() => {
                    setAspectMenu(!aspectMenu)
                }}
            >
                <ExpandScale />
            </div>

            <div className={cls.controls}>
                <div className={cls.effect_title}>{t('Zoom')}</div>
                <div>
                    <input
                        className={cls.zoom_range}
                        type={'range'}
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        aria-labelledby={'Zoom'}
                        onChange={(e) => {
                            setZoom(Number(e.target.value))
                        }}
                    />
                </div>
            </div>
            <div className={cls.controls} style={{ bottom: '40px' }}>
                <div className={cls.effect_title}>{t('Rotation')}</div>
                <div>
                    <input
                        className={cls.zoom_range}
                        type={'range'}
                        value={rotation}
                        min={0}
                        max={360}
                        step={1}
                        aria-labelledby={'Rotation'}
                        onChange={(e) => {
                            setRotation(Number(e.target.value))
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
