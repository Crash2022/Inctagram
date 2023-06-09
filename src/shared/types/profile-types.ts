export interface UserProfile {
    id: number
    userName: string
    firstName: string
    lastName: string
    city: string
    dateOfBirth: string
    aboutMe: string
    avatars: UserAvatar[]
}

export interface UpdateUserProfile {
    userName: string
    firstName: string
    lastName: string
    city: string
    dateOfBirth: string
    aboutMe: string
}

export interface UserAvatar {
    url: string
    width: number
    height: number
    fileSize: number
}
