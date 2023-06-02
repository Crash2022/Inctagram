import cls from './PostContent.module.scss'
import Image from 'next/image'
import { useGetProfileDataQuery } from '@/services/UserProfileService'
import DefaultProfileAvatar from '../../../../../public/assets/images/default-avatar.png'
import { DottedMenu } from '@/shared/ui/DottedMenu/DottedMenu'
import EditIcon from '../../../../../public/assets/icons/edit-icon.svg'
import TrashIcon from '../../../../../public/assets/icons/trash-icon.svg'
import Like from '../../../../../public/assets/icons/like.svg'
import Send from '../../../../../public/assets/icons/send.svg'
import AddToFavorite from '../../../../../public/assets/icons/addToFavorite1.svg'
import { ControlledInput } from '@/shared/ui/Controlled/ControlledInput'
import { useForm } from 'react-hook-form'
import { Button } from '@/shared/ui/Button/Button'
import { Comment } from '@/components/PostModal/Comment/Comment'
import { useTranslation } from 'react-i18next'

interface PostContentProps {
    setUpdate?: (update: boolean) => void
}
export const PostContent = ({ setUpdate }: PostContentProps) => {
    const { t } = useTranslation('post-modal')

    const { data: profileData, isLoading: profileDataIsLoading } = useGetProfileDataQuery()

    const menuItems = [
        {
            id: 1,
            icon: EditIcon,
            title: 'EditPost',
            func: () => {
                setUpdate(true)
            }
        },
        {
            id: 2,
            icon: TrashIcon,
            title: 'DeletePost',
            func: () => {
                alert('Delete Post')
            }
        }
    ]

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<any>({
        defaultValues: {}
    })

    return (
        <>
            <div className={cls.postModal_mainBox}>
                <div className={cls.postModal_image}></div>
                <div className={cls.postModal_items}>
                    <div className={cls.header}>
                        <div className={cls.headerTitle}>
                            <div className={cls.profileData}>
                                <div className={cls.userAvatar}>
                                    <Image
                                        src={
                                            profileData && profileData.avatars.length === 0
                                                ? DefaultProfileAvatar
                                                : profileData.avatars[0].url
                                        }
                                        alt={'profile-avatar'}
                                        width={35}
                                        height={35}
                                        quality={100}
                                    />
                                </div>
                                <div className={cls.userName}>{profileData?.userName}</div>
                            </div>
                            <DottedMenu menuItems={menuItems} />
                        </div>
                    </div>
                    <div className={cls.commentsBlock}>
                        <Comment
                            your
                            desc
                            avatar={
                                profileData && profileData.avatars.length === 0
                                    ? DefaultProfileAvatar
                                    : profileData.avatars[0].url
                            }
                            userName={'test user Name'}
                            text={
                                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, perferendis.'
                            }
                            date={'2 hours age'}
                            likeButton={false}
                            likeCount={0}
                        />
                        <Comment
                            avatar={DefaultProfileAvatar}
                            userName={'test user Name'}
                            text={
                                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, perferendis.'
                            }
                            date={'2 hours age'}
                            likeButton={true}
                            likeCount={3}
                        />
                        <Comment
                            avatar={DefaultProfileAvatar}
                            userName={'test user Name'}
                            text={
                                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, perferendis.'
                            }
                            date={'2 hours age'}
                            likeButton={false}
                            likeCount={4}
                        />
                    </div>
                    <div className={cls.likesBlock}>
                        <div className={cls.buttonItems}>
                            <div className={cls.firstButtonBlock}>
                                <div className={cls.bigLikeButton}>
                                    <Like width={30} height={30} />
                                </div>
                                <div className={cls.sendButton}>
                                    <Send width={30} height={30} />
                                </div>
                            </div>
                            <div className={cls.secondButtonBlock}>
                                <div className={cls.addToFavorite}>
                                    <AddToFavorite width={30} height={30} />
                                </div>
                            </div>
                        </div>
                        <div className={cls.likesCountBlock}>
                            <div className={cls.avatarsLikers}>
                                <div className={cls.firstAvatar}>
                                    <Image
                                        src={DefaultProfileAvatar}
                                        alt={'user-avatar'}
                                        width={35}
                                        height={35}
                                        quality={100}
                                    />
                                </div>
                                <div className={cls.secondAvatar}>
                                    <Image
                                        src={DefaultProfileAvatar}
                                        alt={'user-avatar'}
                                        width={35}
                                        height={35}
                                        quality={100}
                                    />
                                </div>
                                <div className={cls.thirdAvatar}>
                                    <Image
                                        src={DefaultProfileAvatar}
                                        alt={'user-avatar'}
                                        width={35}
                                        height={35}
                                        quality={100}
                                    />
                                </div>
                                <span className={cls.likesCount}>2243 {t('Likes')}</span>
                            </div>
                            <div className={cls.postDate}>July 3, 2021</div>
                        </div>
                    </div>
                    <form className={cls.addComentBlock}>
                        <div className={cls.input}>
                            <ControlledInput
                                name={'add-comment'}
                                placeholder={t('AddComment')}
                                control={control}
                            />
                        </div>
                        <div className={cls.button}>
                            <Button type={'submit'} theme={'clear'}>
                                {t('Publish')}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
