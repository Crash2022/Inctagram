import cls from './PostContent.module.scss'
import Image from 'next/image'
import { useGetProfileDataQuery } from '@/services/UserProfileService'
import DefaultProfileAvatar from '../../../../public/assets/images/default-avatar.png'
import React, { useState } from 'react'
import { DottedMenu } from '@/shared/ui/DottedMenu/DottedMenu'

import EditIcon from '../../../../public/assets/icons/edit-icon.svg'
import TrashIcon from '../../../../public/assets/icons/trash-icon.svg'
import RedLike from '../../../../public/assets/icons/red-like.svg'
import Like from '../../../../public/assets/icons/like.svg'
import Send from '../../../../public/assets/icons/send.svg'
import AddToFavorite from '../../../../public/assets/icons/addToFavorite1.svg'
import { ControlledInput } from '@/shared/ui/Controlled/ControlledInput'
import { useForm } from 'react-hook-form'
import { LoginPayloadType } from '@/models/auth-types'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from '@/shared/ui/Button/Button'

export const PostContent = () => {
    const { data: profileData, isLoading: profileDataIsLoading } = useGetProfileDataQuery()

    const [menuItems, setMenuItems] = useState([
        {
            id: 1,
            icon: EditIcon,
            title: 'EditPost',
            func: () => {
                alert('Edit Post')
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
    ])

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginPayloadType>({
        defaultValues: {
            email: '',
            password: ''
        }
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
                                <div className={cls.userName}>{profileData.userName}</div>
                            </div>
                            <DottedMenu menuItems={menuItems} />
                        </div>
                    </div>
                    <div className={cls.commentsBlock}>
                        <div className={cls.commentBlock}>
                            <div className={cls.userAvatar}>
                                <Image
                                    src={DefaultProfileAvatar}
                                    alt={'user-avatar'}
                                    width={35}
                                    height={35}
                                    quality={100}
                                />
                            </div>
                            <div className={cls.commentItems}>
                                <div className={cls.comment}>
                                    <span className={cls.commentUserName}>Test user name</span>{' '}
                                    <span className={cls.commentText}>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Dolor, nesciunt?
                                    </span>
                                </div>
                                <div className={cls.commentSubText}>
                                    <span className={cls.commentDate}>2 hours ago</span>
                                </div>
                            </div>
                        </div>
                        <div className={cls.commentBlock}>
                            <div className={cls.userAvatar}>
                                <Image
                                    src={DefaultProfileAvatar}
                                    alt={'user-avatar'}
                                    width={35}
                                    height={35}
                                    quality={100}
                                />
                            </div>
                            <div className={cls.commentItems}>
                                <div className={cls.comment}>
                                    <span className={cls.commentUserName}>Test user name</span>{' '}
                                    <span className={cls.commentText}>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Dolor, nesciunt?
                                    </span>
                                </div>
                                <div className={cls.commentSubText}>
                                    <span className={cls.commentDate}>2 hours ago</span>
                                    <span className={cls.answerButton}>Answer</span>
                                </div>
                            </div>
                            <div className={cls.likeButton}>
                                <Like width={20} height={20} />
                            </div>
                        </div>
                        <div className={cls.commentBlock}>
                            <div className={cls.userAvatar}>
                                <Image
                                    src={DefaultProfileAvatar}
                                    alt={'user-avatar'}
                                    width={35}
                                    height={35}
                                    quality={100}
                                />
                            </div>
                            <div className={cls.commentItems}>
                                <div className={cls.comment}>
                                    <span className={cls.commentUserName}>Test user name</span>{' '}
                                    <span className={cls.commentText}>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Dolor, nesciunt?
                                    </span>
                                </div>
                                <div className={cls.commentSubText}>
                                    <span className={cls.commentDate}>2 hours ago</span>
                                    <span className={cls.answerButton}>Answer</span>
                                    <span className={cls.commentLikeCount}>Like: 1</span>
                                </div>
                            </div>
                            <div className={cls.likeButton}>
                                <RedLike width={20} height={20} />
                            </div>
                        </div>
                        <div className={cls.commentBlock}>
                            <div className={cls.userAvatar}>
                                <Image
                                    src={DefaultProfileAvatar}
                                    alt={'user-avatar'}
                                    width={35}
                                    height={35}
                                    quality={100}
                                />
                            </div>
                            <div className={cls.commentItems}>
                                <div className={cls.comment}>
                                    <span className={cls.commentUserName}>Test user name</span>{' '}
                                    <span className={cls.commentText}>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Dolor, nesciunt?
                                    </span>
                                </div>
                                <div className={cls.commentSubText}>
                                    <span className={cls.commentDate}>2 hours ago</span>
                                    <span className={cls.answerButton}>Answer</span>
                                    <span className={cls.commentLikeCount}>Like: 1</span>
                                </div>
                            </div>
                            <div className={cls.likeButton}>
                                <RedLike width={20} height={20} />
                            </div>
                        </div>
                        <div className={cls.commentBlock}>
                            <div className={cls.userAvatar}>
                                <Image
                                    src={DefaultProfileAvatar}
                                    alt={'user-avatar'}
                                    width={35}
                                    height={35}
                                    quality={100}
                                />
                            </div>
                            <div className={cls.commentItems}>
                                <div className={cls.comment}>
                                    <span className={cls.commentUserName}>Test user name</span>{' '}
                                    <span className={cls.commentText}>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                        Dolor, nesciunt?
                                    </span>
                                </div>
                                <div className={cls.commentSubText}>
                                    <span className={cls.commentDate}>2 hours ago</span>
                                    <span className={cls.answerButton}>Answer</span>
                                    <span className={cls.commentLikeCount}>Like: 1</span>
                                </div>
                            </div>
                            <div className={cls.likeButton}>
                                <RedLike width={20} height={20} />
                            </div>
                        </div>
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
                                <span className={cls.likesCount}>2243 "Like"</span>
                            </div>
                            <div className={cls.postDate}>July 3, 2021</div>
                        </div>
                    </div>
                    <form className={cls.addComentBlock}>
                        <div className={cls.input}>
                            <ControlledInput
                                name={'add-comment'}
                                placeholder={'Add a Comment'}
                                control={control}
                            />
                        </div>
                        <div className={cls.button}>
                            <Button type={'submit'} theme={'clear'}>
                                Publish
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
