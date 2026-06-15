export type MockUser = {
  id: string
  name: string
  username: string
  avatar: string
  followers: number
  following: number
  hoursLogged: number
  isPro: boolean
  bio: string
  memberSince: string
  isFollowing?: boolean
}

export type MockAlbum = {
  id: string
  title: string
  artist: string
  year: number
  genre: string
  duration: string
  cover: string
  rating: number
}

export type MockFeedItem = {
  id: string
  user: MockUser
  album: MockAlbum
  rating: number
  timestamp: string
  review: string
  likes: number
  comments: number
}

export type MockDiaryItem = {
  id: string
  date: string
  album: MockAlbum
  rating: number
  isRelisten: boolean
}

const maleAvatar =
  "https://images.unsplash.com/photo-1639747279286-c07eecb47a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwcm9maWxlJTIwcGljdHVyZSUyMHNtaWxlfGVufDF8fHx8MTc3MzA5ODM1N3ww&ixlib=rb-4.1.0&q=80&w=1080"

const femaleAvatar =
  "https://images.unsplash.com/photo-1554780336-390462301acf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2ZpbGUlMjBwaWN0dXJlJTIwc21pbGV8ZW58MXx8fHwxNzczMDk4MzU3fDA&ixlib=rb-4.1.0&q=80&w=1080"

export const currentUser: MockUser = {
  id: "u1",
  name: "Alex Rivet",
  username: "@alexrivet",
  avatar: maleAvatar,
  followers: 1240,
  following: 450,
  hoursLogged: 3500,
  isPro: true,
  bio: "\"Se está muito alto, você está muito velho.\"",
  memberSince: "2021",
  isFollowing: false,
}

export const MOCK_USERS: MockUser[] = [
  {
    id: "u2",
    name: "Jordan M.",
    username: "@jordan_m",
    avatar: maleAvatar,
    followers: 12400,
    following: 620,
    hoursLogged: 4200,
    isPro: true,
    bio: "\"Riff bom é riff que parece uma parede caindo.\"",
    memberSince: "2020",
    isFollowing: true,
  },
  {
    id: "u3",
    name: "Sarah Sound",
    username: "@sarahsound",
    avatar: femaleAvatar,
    followers: 8700,
    following: 512,
    hoursLogged: 2900,
    isPro: false,
    bio: "\"Entre sintetizadores, refrões tristes e discos que salvam dias ruins.\"",
    memberSince: "2022",
    isFollowing: false,
  },
  {
    id: "u4",
    name: "MetalHead_99",
    username: "@metalhead_99",
    avatar: maleAvatar,
    followers: 15300,
    following: 730,
    hoursLogged: 6100,
    isPro: true,
    bio: "\"Thrash, prog, doom e qualquer coisa com bateria absurda.\"",
    memberSince: "2019",
    isFollowing: true,
  },
  {
    id: "u5",
    name: "VinylViking",
    username: "@vinylviking",
    avatar: maleAvatar,
    followers: 5600,
    following: 388,
    hoursLogged: 2400,
    isPro: false,
    bio: "\"Colecionando vinis, descobrindo clássicos e defendendo lado B.\"",
    memberSince: "2023",
    isFollowing: false,
  },
  {
    id: "u6",
    name: "Lyrical_Lara",
    username: "@lyrical_lara",
    avatar: femaleAvatar,
    followers: 9300,
    following: 801,
    hoursLogged: 3700,
    isPro: true,
    bio: "\"Eu presto atenção na letra antes do refrão grudar.\"",
    memberSince: "2021",
    isFollowing: true,
  },
]

export const MOCK_ALBUMS: MockAlbum[] = [
  {
    id: "a1",
    title: "72 Seasons",
    artist: "Metallica",
    year: 2023,
    genre: "Heavy Metal",
    duration: "77 min",
    cover:
      "https://images.unsplash.com/photo-1542577731-7f6eabdf59ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwaGVhdnklMjBtZXRhbCUyMGNvbmNlcnR8ZW58MXx8fHwxNzczMDk4MzU3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.5,
  },
  {
    id: "a2",
    title: "Impera",
    artist: "Ghost",
    year: 2022,
    genre: "Hard Rock",
    duration: "46 min",
    cover:
      "https://images.unsplash.com/photo-1676068368612-1c8b3e2afed0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxhYnN0cmFjdCUyMGNvbG9yZnVsJTIwYWxidW0lMjBjb3ZlcnxlbnwxfHx8fDE3NzMwOTgzNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.0,
  },
  {
    id: "a3",
    title: "Take Me Back To Eden",
    artist: "Sleep Token",
    year: 2023,
    genre: "Alternative Metal",
    duration: "63 min",
    cover:
      "https://images.unsplash.com/photo-1683363520390-bbe428d9be58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxlbGVjdHJvbmljJTIwc3ludGhlc2l6ZXIlMjBuZW9ufGVufDF8fHx8MTc3MzA5ODM1N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 5.0,
  },
  {
    id: "a4",
    title: "Fortitude",
    artist: "Gojira",
    year: 2021,
    genre: "Prog Metal",
    duration: "51 min",
    cover:
      "https://images.unsplash.com/photo-1763705859946-7e7e9e6d3a45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxqYXp6JTIwY2x1YiUyMHNheG9waG9uZXxlbnwxfHx8fDE3NzMwOTgzNTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.8,
  },
  {
    id: "a5",
    title: "Acoustic Nights",
    artist: "The Chillers",
    year: 2020,
    genre: "Acoustic",
    duration: "42 min",
    cover:
      "https://images.unsplash.com/photo-1771616504964-d32261275f58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxjYWxtJTIwYWNvdXN0aWMlMjBndWl0YXJ8ZW58MXx8fHwxNzczMDk4MzU3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 3.8,
  },
]

export const MOCK_FEED: MockFeedItem[] = [
  {
    id: "f1",
    user: MOCK_USERS[0],
    album: MOCK_ALBUMS[0],
    rating: 4.5,
    timestamp: "há 2h",
    review:
      "Um dos lançamentos mais consistentes deles em anos. A produção está impecável e o James soa incrivelmente motivado. Lux Æterna é uma pancada absoluta!",
    likes: 242,
    comments: 18,
  },
  {
    id: "f2",
    user: MOCK_USERS[1],
    album: MOCK_ALBUMS[2],
    rating: 5.0,
    timestamp: "há 5h",
    review:
      "Uma obra-prima do metal moderno que mistura R&B, pop e riffs pesados de forma impecável.",
    likes: 512,
    comments: 42,
  },
]

export const MOCK_DIARY: MockDiaryItem[] = [
  {
    id: "d1",
    date: "24 Out, 2023",
    album: MOCK_ALBUMS[0],
    rating: 4.5,
    isRelisten: true,
  },
  {
    id: "d2",
    date: "23 Out, 2023",
    album: MOCK_ALBUMS[1],
    rating: 4.0,
    isRelisten: false,
  },
  {
    id: "d3",
    date: "21 Out, 2023",
    album: MOCK_ALBUMS[2],
    rating: 5.0,
    isRelisten: true,
  },
  {
    id: "d4",
    date: "20 Out, 2023",
    album: MOCK_ALBUMS[3],
    rating: 4.8,
    isRelisten: false,
  },
]