export interface ProfilePostsResponse {
  success: boolean
  message: string
  data: UserPosts
  meta: Meta
}

export interface UserPosts {
  posts: UserPostsData[]
}

export interface UserPostsData {
  _id: string
  image?: string
  privacy: string
  user: User
  sharedPost: any
  likes: string[]
  createdAt: string
  commentsCount: number
  topComment?: TopComment
  sharesCount: number
  likesCount: number
  isShare: boolean
  id: string
  bookmarked: boolean
  body?: string
}

export interface User {
  _id: string
  name: string
  username: string
  photo: string
}

export interface TopComment {
  _id: string
  image: string
  commentCreator: CommentCreator
  post: string
  parentComment: any
  likes: any[]
  createdAt: string
  content?: string
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
  numberOfPages: number
  limit: number
  total: number
}
