export interface ApiSuccessResponse<T> {
    status: 'success',
    message: string,
    data: T
}
export interface ApiErrorResponse<T> {
    status: 'fail',
    message: string,
    detail?: T
}