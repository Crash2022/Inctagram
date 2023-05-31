import React, { useCallback, useState } from 'react'
import cls from './ImageCropContent.module.css'
import Cropper from 'react-easy-crop'
import { useTranslation } from 'react-i18next'

interface ImageCropContentProps {
    postPhoto: string
}

export const ImageCropContent = ({ postPhoto }: ImageCropContentProps) => {
    const { t } = useTranslation('add-post-modal')

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState<number>(1)
    const [rotation, setRotation] = useState<number>(0)
    const [aspect, setAspect] = useState(3 / 2)

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
            <div className={cls.controls}>
                <div>{t('Zoom')}</div>
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
                <div>{t('Rotation')}</div>
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
