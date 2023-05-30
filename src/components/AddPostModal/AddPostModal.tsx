import React, { useState } from 'react';
import { CustomModal } from '@/shared/ui/CustomModal/CustomModal';
import cls from './AddPostModal.module.scss';
import { useTranslation } from 'react-i18next';
import { InputFile } from '@/shared/ui/InputFile/InputFile';
import ImageIcon from '../../../public/assets/icons/img-icon.svg';
import { PublicationModal } from '../../components/PublicationModal/PublicationModal'; // Ensure the path is correct

interface AddPostModalProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    header: string;
    extraCallback?: () => void;
    children?: any;
}

export const AddPostModal = (props: AddPostModalProps) => {
    const [screen, setScreen] = useState('initial');
    const [selectedImage, setSelectedImage] = useState(null);
    const [publicationOpen, setPublicationOpen] = useState(false);
    const [userAvatar, setUserAvatar] = useState(null); // Set this from server

    const { t } = useTranslation('add-post-modal');

    const handleFileChange = (event) => {
        setSelectedImage(URL.createObjectURL(event.target.files[0])); // Create object URL for the selected file
        setScreen('next');
    };

    const handleNext = () => {
        props.setOpen(false);
        setPublicationOpen(true);
    }

    const handleClose = () => {
        props.setOpen(false);
        setScreen('initial');
        setSelectedImage(null);
    };

    return (
        <>
            <CustomModal
                open={props.open}
                onClose={handleClose}
            >
                {screen === 'initial' && (
                    <div className={cls.addPostModal_mainBox}>
                        <div className={cls.addPostModal_header}>
                            <div>{props.header}</div>
                            <div
                                className={cls.header_cancel}
                                onClick={handleClose}
                            >
                                X
                            </div>
                        </div>
                        <div className={cls.addPostModal_content}>
                            <div className={cls.content_image}>
                                <ImageIcon width={48} height={48} />
                            </div>
                            <div className={cls.content_addButton}>
                                <InputFile
                                    id={'Upload_Photo'}
                                    title={t('AddPhotoButton')}
                                    onChangeUpload={handleFileChange}
                                />
                            </div>
                        </div>
                    </div>
                )}
                {screen === 'next' && (
                    <div className={cls.addPostModal_mainBox}>
                        <div className={cls.addPostModal_header}>
                            <div>Next</div>
                            <div
                                className={cls.header_cancel}
                                onClick={handleClose}
                            >
                                X
                            </div>
                            <div
                                className={cls.header_next}
                                onClick={handleNext}
                            >
                                Next
                            </div>
                        </div>
                        {selectedImage && (
                            <div className={cls.addPostModal_content}>
                                <img src={selectedImage} alt="Selected" />
                            </div>
                        )}
                    </div>
                )}
            </CustomModal>
            <PublicationModal
                open={publicationOpen}
                setOpen={setPublicationOpen}
                selectedImage={selectedImage}
                userAvatar={userAvatar}
            />
        </>
    );
};
