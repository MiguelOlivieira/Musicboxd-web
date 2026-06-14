import { currentUser as fallbackCurrentUser, MOCK_ALBUMS, MOCK_FEED, MOCK_USERS } from "../data/mock"

export type User = {
  id: string
  name: string
  username: string
  avatar: string
  followers?: number
  following?: number
  isFollowing?: boolean
}

export type Album = {
  id: string
  title: string
  artist: string
  year: number
  genre: string
  duration: string
  cover: string
  rating: number
}

export type FeedItem = {
  id: string
  user: User
  album: Album
  rating: number
  timestamp: string
  review: string
  likes: number
  comments: number
}

export type CurrentUser = typeof fallbackCurrentUser

export const apiBase = import.meta.env.VITE_API_BASE?.replace(/\/$/, "") ?? ""

async function fetcher<T>(path: string): Promise<T> {
  if (!apiBase) {
    throw new Error("API base não configurada")
  }

  const url = path.startsWith("http") ? path : `${apiBase}${path}`
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    throw new Error(`Erro na requisição ${response.status}: ${response.statusText}`)
  }

  return response.json()
}

async function fetchWithFallback<T>(path: string, fallback: T): Promise<T> {
  if (!apiBase) {
    return fallback
  }

  try {
    return await fetcher<T>(path)
  } catch (error) {
    console.warn("API request failed, using local fallback data.", error)
    return fallback
  }
}

export async function getCurrentUser(): Promise<CurrentUser> {
  return fetchWithFallback<CurrentUser>("/user/current", fallbackCurrentUser)
}

export async function getFeaturedAlbums(): Promise<Album[]> {
  return fetchWithFallback<Album[]>("/albums?featured=true", MOCK_ALBUMS)
}

export async function getFeed(): Promise<FeedItem[]> {
  return fetchWithFallback<FeedItem[]>("/feed", MOCK_FEED)
}

export async function getUsers(): Promise<User[]> {
  return fetchWithFallback<User[]>("/users", MOCK_USERS)
}

export const fallbackAlbums = MOCK_ALBUMS
export const fallbackFeed = MOCK_FEED
export const fallbackUsers = MOCK_USERS
export const fallbackUser = fallbackCurrentUser
