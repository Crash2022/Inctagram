import React, { useState } from 'react';
import { CustomModal } from '@/shared/ui/CustomModal/CustomModal';
import s from './MessageModal.module.scss';
import { Button } from '@/shared/ui/Button/Button';

export const MessageModal = () => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <CustomModal
            open={open}
            onClose={() => {
                setOpen(false);
            }}
        >
            <div className={s.messageModal_mainBox}>
                <div className={s.messageModal_title}>Здесь будет текст</div>
                <div className={s.messageModal_buttons}>
                    <Button onClick={() => {}}>Подтвердить</Button>
                    <div className={s.messageModal_cancelButton}>
                        <Button
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            Отмена
                        </Button>
                    </div>
                </div>
            </div>
        </CustomModal>
    );
};
