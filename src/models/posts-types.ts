export interface AddPostsResponse {
    id: number
    description: string
    location: string
    images: [
        {
            url: string
            width: number
            height: number
            fileSize: number
            uploadId: string
        }
    ]
    createdAt: string
    updatedAt: string
}

export interface GetPostsResponse {
    totalCount: number
    pagesCount: number
    page: number
    pageSize: number
    items: AddPostsResponse[]
}
