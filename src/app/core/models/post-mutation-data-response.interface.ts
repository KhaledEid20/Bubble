export interface PostMutationDataResponse {
  success: boolean
  message: string
  data: PostData
}

export interface PostData {
  post: Post
}

export interface Post {
  body: string
  privacy: string
  user: string
  sharedPost: any
  likes: any[]
  _id: string
  createdAt: string
  likesCount: number
  isShare: boolean
  id: string
}
