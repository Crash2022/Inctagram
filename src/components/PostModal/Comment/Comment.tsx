import React from 'react'
import cls from '@/components/PostModal/Comment/Comment.module.scss'
import Image from 'next/image'
import DefaultProfileAvatar from '../../../../public/assets/images/default-avatar.png'
import Like from '../../../../public/assets/icons/like.svg'
import RedLike from '../../../../public/assets/icons/red-like.svg'

export const Comment = (props: CommentPropsType) => {
    return (
        <div className={cls.commentBlock}>
            <div className={cls.userAvatar}>
                <Image
                    src={props.avatar}
                    alt={'user-avatar'}
                    width={35}
                    height={35}
                    quality={100}
                />
            </div>
            <div className={cls.commentItems}>
                <div className={cls.comment}>
                    <span className={cls.commentUserName}>{props.userName}</span>{' '}
                    <span className={cls.commentText}>{props.text}</span>
                </div>
                <div className={cls.commentSubText}>
                    <span className={cls.commentDate}>{props.date}</span>
                    {(!props.your || !props.desc) && (
                        <span className={cls.answerButton}>Answer</span>
                    )}
                    {props.likeCount > 0 && !props.desc && (
                        <span className={cls.commentLikeCount}>Like: {props.likeCount}</span>
                    )}
                </div>
            </div>
            <div className={cls.likeButton}>
                {!props.desc && !props.likeButton && <Like width={20} height={20} />}
                {!props.desc && props.likeButton && <RedLike width={20} height={20} />}
            </div>
        </div>
    )
}

interface CommentPropsType {
    your?: boolean
    desc?: boolean
    avatar: any
    userName: string
    text: string
    date: string
    likeButton: boolean
    likeCount: number
}
