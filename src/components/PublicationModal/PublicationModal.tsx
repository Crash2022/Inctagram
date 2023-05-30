import React, { useState, useEffect } from 'react';
import { CustomModal } from '@/shared/ui/CustomModal/CustomModal';
import cls from "./PublicationModal.module.scss";
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import axios from 'axios';

interface PublicationModalProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    selectedImage: any;
}

export const PublicationModal = (props: PublicationModalProps) => {
    const [description, setDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');

    const { t } = useTranslation('publication-modal');

    useEffect(() => {
        if (props.open) {
            // Fetch avatar from the server when the modal is opened
            axios.get('/api/user/avatar') // Replace with your actual API endpoint
                .then(response => setUserAvatar(response.data.avatar))
                .catch(error => console.error('Error fetching avatar:', error));
        }
    }, [props.open]);

    const handleClose = () => {
        props.setOpen(false);
        setDescription('');
    };

    const handlePublish = () => {
        // Handle the publish action here
    };

    return (
        <CustomModal
            open={props.open}
            onClose={handleClose}
        >
            <div className={cls.publicationModal_mainBox}>
                <div className={cls.publicationModal_header}>
                    <div onClick={handleClose}>
                        <Image
                            src="/assets/icons/back-arrow.svg"
                            alt="Back-arrow"
                            width={50} //replace this with your actual width
                            height={50} //replace this with your actual height
                        />
                    </div>
                    <div>Publication</div>
                    <div
                        className={cls.header_publish}
                        onClick={handlePublish}
                    >
                        Publish
                    </div>
                </div>
                <div className={cls.publicationModal_content}>
                    <div className={cls.content_image}>
                        <img src={props.selectedImage} alt="Selected" />
                    </div>
                    <div className={cls.content_right}>
                        <img src={userAvatar} alt="User Avatar" /> {/* Using img tag instead of UserAvatar component */}
                        <div className={cls.content_description}>
                            Add publication description
                        </div>
                        <textarea
                            className={cls.content_textArea}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <div className={cls.content_location}>
                            <Image
                                src="/assets/icons/location.svg"
                                alt="Location"
                                width={50} //replace this with your actual width
                                height={50} //replace this with your actual height
                            />
                            Add location
                        </div>
                    </div>
                </div>
            </div>
        </CustomModal>
    );
};
