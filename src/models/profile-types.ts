// временный тип
export interface Photo {
    albumId: number
    id: number
    title: string
    url: string
    thumbnailUrl: string
}

export interface UpdateUserProfile {
    userName: string
    firstName: string
    lastName: string
    city: string
    dateOfBirth: string
    aboutMe: string
}
