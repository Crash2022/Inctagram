import React, { useCallback, useState } from 'react'
import cls from './ImageCropContent.module.css'
import Cropper from 'react-easy-crop'

interface ImageCropContentProps {
    postPhoto: string
}

export const ImageCropContent = ({ postPhoto }: ImageCropContentProps) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
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
                    aspect={aspect}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                />
            </div>
            <div className={cls.controls}>
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
    )
}
