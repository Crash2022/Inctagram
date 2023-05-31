// import React from 'react'
// import cls from './ImageCropModal.module.scss'
// import { CustomModal } from '@/shared/ui/CustomModal/CustomModal'
// import { useTranslation } from 'react-i18next'
//
// interface ImageCropModalProps {
//     open: boolean
//     setOpen: (value: boolean) => void
//     headerTitle: string
//     setIsAddPostOpen: (value: boolean) => void
// }
//
// export const ImageCropModal = (props: ImageCropModalProps) => {
//     const { t } = useTranslation('add-post-modal')
//
//     return (
//         <CustomModal
//             open={props.open}
//             onClose={() => {
//                 props.setOpen(false)
//             }}
//         >
//             <div className={cls.imageCropModal_mainBox}>
//                 <div className={cls.imageCropModal_header}>
//                     <div
//                         className={cls.header_button}
//                         onClick={() => {
//                             props.setOpen(false)
//                             props.setIsAddPostOpen(true)
//                         }}
//                     >
//                         {'<'}
//                     </div>
//                     <div className={cls.header_title}>{t(props.headerTitle)}</div>
//                     <div className={cls.header_button}>{t('Next')}</div>
//                 </div>
//                 <div className={cls.imageCropModal_content}>Content</div>
//             </div>
//         </CustomModal>
//     )
// }

export default {}
