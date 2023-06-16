import React, { useEffect } from 'react'
import cls from './ImageFiltersContent.module.scss'
import Image from 'next/image'
// import NoImage from '../../../../public/assets/images/no-image-01.png'
import {
    inkwell,
    brooklyn,
    clarendon,
    reyes,
    amaro,
    ashby,
    kelvin,
    slumber
} from 'instagram-filters'
import { LoaderScreen } from '@/shared/ui/Loader/LoaderScreen'

interface PhotoFiltersContentProps {
    imageIsUploading: boolean
    croppedImage: string
    croppedImageForFilter: string
    setCroppedImageForFilter: (image: string) => void
    applyImageFilter: (filterName: any) => void
    applyImageFilterToExample: (imgId: any, filterName: any, stateName: any) => void
    isImageFiltersLoading: boolean
    filterExampleTwo: string
    setFilterExampleTwo: (image: string) => void
    filterExampleThree: string
    setFilterExampleThree: (image: string) => void
    filterExampleFour: string
    setFilterExampleFour: (image: string) => void
    filterExampleFive: string
    setFilterExampleFive: (image: string) => void
    filterExampleSix: string
    setFilterExampleSix: (image: string) => void
    filterExampleSeven: string
    setFilterExampleSeven: (image: string) => void
    filterExampleEight: string
    setFilterExampleEight: (image: string) => void
    filterExampleNine: string
    setFilterExampleNine: (image: string) => void
}

interface ImageFiltersType {
    id: number
    title: string
    imgId: string
    imgExampleSrc: string
    func: () => void
}

export const ImageFiltersContent = ({
    imageIsUploading,
    croppedImage,
    croppedImageForFilter,
    setCroppedImageForFilter,
    applyImageFilter,
    applyImageFilterToExample,
    isImageFiltersLoading,
    filterExampleTwo,
    setFilterExampleTwo,
    filterExampleThree,
    setFilterExampleThree,
    filterExampleFour,
    setFilterExampleFour,
    filterExampleFive,
    setFilterExampleFive,
    filterExampleSix,
    setFilterExampleSix,
    filterExampleSeven,
    setFilterExampleSeven,
    filterExampleEight,
    setFilterExampleEight,
    filterExampleNine,
    setFilterExampleNine
}: PhotoFiltersContentProps) => {
    // сетка с фильтрами
    const imageFilters: ImageFiltersType[] = [
        // {
        //     id: 1,
        //     title: 'normal',
        //     imgSrc: '',
        //     func: () => {
        //         setCroppedImageForFilter(croppedImage)
        //     }
        // },
        {
            id: 2,
            title: 'inkwell',
            imgId: 'filterExampleTwo',
            imgExampleSrc: filterExampleTwo,
            func: () => {
                applyImageFilter(inkwell)
            }
        },
        {
            id: 3,
            title: 'brooklyn',
            imgId: 'filterExampleThree',
            imgExampleSrc: filterExampleThree,
            func: () => {
                applyImageFilter(brooklyn)
            }
        },
        {
            id: 4,
            title: 'clarendon',
            imgId: 'filterExampleFour',
            imgExampleSrc: filterExampleFour,
            func: () => {
                applyImageFilter(clarendon)
            }
        },
        {
            id: 5,
            title: 'reyes',
            imgId: 'filterExampleFive',
            imgExampleSrc: filterExampleFive,
            func: () => {
                applyImageFilter(reyes)
            }
        },
        {
            id: 6,
            title: 'amaro',
            imgId: 'filterExampleSix',
            imgExampleSrc: filterExampleSix,
            func: () => {
                applyImageFilter(amaro)
            }
        },

        {
            id: 7,
            title: 'ashby',
            imgId: 'filterExampleSeven',
            imgExampleSrc: filterExampleSeven,
            func: () => {
                applyImageFilter(ashby)
            }
        },
        {
            id: 8,
            title: 'kelvin',
            imgId: 'filterExampleEight',
            imgExampleSrc: filterExampleEight,
            func: () => {
                applyImageFilter(kelvin)
            }
        },
        {
            id: 9,
            title: 'slumber',
            imgId: 'filterExampleNine',
            imgExampleSrc: filterExampleNine,
            func: () => {
                applyImageFilter(slumber)
            }
        }
    ]

    // применение фильтров к сетке
    useEffect(() => {
        // Promise.all([
        applyImageFilterToExample('filterExampleTwo', inkwell, setFilterExampleTwo)
        applyImageFilterToExample('filterExampleThree', brooklyn, setFilterExampleThree)
        applyImageFilterToExample('filterExampleFour', clarendon, setFilterExampleFour)
        applyImageFilterToExample('filterExampleFive', reyes, setFilterExampleFive)
        applyImageFilterToExample('filterExampleSix', amaro, setFilterExampleSix)
        applyImageFilterToExample('filterExampleSeven', ashby, setFilterExampleSeven)
        applyImageFilterToExample('filterExampleEight', kelvin, setFilterExampleEight)
        applyImageFilterToExample('filterExampleNine', slumber, setFilterExampleNine)
        // ]).then((r) => {
        //     console.log(r)
        // })
    }, [])

    if (imageIsUploading) return <LoaderScreen variant={'circle'} />
    // if (isImageFiltersLoading) return <LoaderScreen variant={'circle'} />

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
                    <div className={cls.item_image}>
                        <Image
                            src={croppedImage}
                            alt={'filter-example-normal'}
                            id={'FilterExampleNormal'}
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className={cls.item_title}>normal</div>
                </div>

                {imageFilters.map((f) => {
                    // const onClickHandler = () => {
                    //     // setCroppedImageForFilter(croppedImage)
                    //     f.func()
                    // }

                    return (
                        <div key={f.id} className={cls.filter_item} onClick={f.func}>
                            <div className={cls.item_image}>
                                <Image
                                    src={f.imgExampleSrc}
                                    alt={'filter-example'}
                                    id={f.imgId}
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <div className={cls.item_title}>{f.title}</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

// *** список доступных фильтров ***
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
