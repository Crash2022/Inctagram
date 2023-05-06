export interface ErrorResponseType {
    statusCode: number
    messages: [
        {
            message: string
            field: string
        }
    ]
    error: string
}
