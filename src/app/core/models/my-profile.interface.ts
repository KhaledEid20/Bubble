
export interface MyProfileResponse {
  success: boolean
  message: string
  data: MyProfileData
}

export interface MyProfileData {
  isFollowing: boolean
  user: UserProfile
}

export interface UserProfile {
  _id: string
  name: string
  username: string
  email: string
  dateOfBirth: string
  gender: string
  photo: string
  cover: string
  followers: Follower[]
  following: Following[]
  createdAt: string
  followersCount: number
  followingCount: number
  bookmarksCount: number
  id: string
}

export interface Follower {
  _id: string
  name: string
  photo: string
  followersCount: number
  followingCount: number
  bookmarksCount: number
  id: string
}

export interface Following {
  _id: string
  name: string
  photo: string
  followersCount: number
  followingCount: number
  bookmarksCount: number
  id: string
}
