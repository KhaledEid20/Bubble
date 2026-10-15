export interface ProfileResponse {
  success: boolean
  message: string
  data: ProfileData
}

export interface ProfileData {
  user: ProfileUserData
}

export interface ProfileUserData {
  _id: string
  name: string
  username: string
  email: string
  dateOfBirth: string
  gender: string
  photo: string
  cover: string
  bookmarks: any[]
  followers: any[]
  following: any[]
  createdAt: string
  followersCount: number
  followingCount: number
  bookmarksCount: number
}
