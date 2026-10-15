
export interface BookMarksResponse {
  success: boolean
  message: string
  data: BookMarksData
  meta: Meta
}

export interface BookMarksData {
  bookmarks: any[]
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
