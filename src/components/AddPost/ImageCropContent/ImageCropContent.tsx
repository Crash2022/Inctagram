import React, { SVGProps, useCallback, useState } from 'react'
import cls from './ImageCropContent.module.scss'
import Cropper from 'react-easy-crop'
import { useTranslation } from 'react-i18next'
import ExpandScale from '../../../../public/assets/icons/expand-scale.svg'
// import ImageIcon24 from '../../../../public/assets/icons/img-icon24.svg'
import SquareIcon from '../../../../public/assets/icons/rectangle-square.svg'
import RectangleIcon32 from '../../../../public/assets/icons/rectangle-2.svg'
import RectangleIcon169 from '../../../../public/assets/icons/rectangle-1.svg'

interface ImageCropContentProps {
    postPhoto: string
}

interface AspectMenuTypes {
    id: number
    aspect: number
    title: string
    icon: React.FC<SVGProps<SVGSVGElement>>
}

interface CropType {
    x: number
    y: number
}
interface CroppedAreaType extends CropType {
    height: number
    width: number
}

export const ImageCropContent = ({ postPhoto }: ImageCropContentProps) => {
    const { t } = useTranslation('add-post-modal')

    const [crop, setCrop] = useState<CropType>({ x: 0, y: 0 })
    const [zoom, setZoom] = useState<number>(1)
    const [rotation, setRotation] = useState<number>(0)
    const [aspect, setAspect] = useState<number>(1 / 1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaType | null>(null)
    const [croppedImage, setCroppedImage] = useState(null)

    const [isAspectMenuShow, setIsAspectMenuShow] = useState<boolean>(false)
    const aspectMenu: AspectMenuTypes[] = [
        // { id: 1, aspect: 1 / 1, title: 'Original', icon: ImageIcon24 },
        { id: 2, aspect: 1 / 1, title: '1to1', icon: SquareIcon },
        { id: 3, aspect: 3 / 2, title: '3to2', icon: RectangleIcon32 },
        { id: 4, aspect: 16 / 9, title: '16to9', icon: RectangleIcon169 }
    ]

    const onCropComplete = useCallback(
        (croppedArea: CroppedAreaType, croppedAreaPixels: CroppedAreaType) => {
            // console.log('croppedArea', croppedArea)
            // console.log('croppedAreaPixels', croppedAreaPixels)
            setCroppedAreaPixels(croppedAreaPixels)
        },
        []
    )

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

            {isAspectMenuShow ? (
                <div className={cls.aspectMenu}>
                    {aspectMenu.map((menu) => {
                        return (
                            <div
                                key={menu.id}
                                className={
                                    menu.aspect === aspect
                                        ? cls.aspectMenu_item_active
                                        : cls.aspectMenu_item
                                }
                                onClick={() => {
                                    setAspect(menu.aspect)
                                }}
                            >
                                <div>{t(menu.title)}</div>
                                <div className={cls.item_img}>
                                    {<menu.icon width={24} height={24} />}
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                ''
            )}

            <div
                className={cls.aspect}
                onClick={() => {
                    setIsAspectMenuShow(!isAspectMenuShow)
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
