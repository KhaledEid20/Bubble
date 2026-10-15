export interface CommentsResponse {
    success: boolean
    message: string
    data: CommentsData
    meta: Meta
}

export interface CommentsData {
    comments: Comment[]
}

export interface Comment {
    _id: string
    content: string
    commentCreator: CommentCreator
    post: string
    parentComment: any
    likes: any[]
    createdAt: string
    repliesCount: number
    image?: string
}

export interface CommentCreator {
    _id: string
    name: string
    username: string
    photo: string
}

export interface Meta {
    pagination: Pagination
}

export interface Pagination {
    currentPage: number
    limit: number
    total: number
    numberOfPages: number
}