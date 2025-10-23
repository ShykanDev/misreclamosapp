import type { Timestamp } from 'firebase/firestore'

export interface IAnswer {
  uidTo: string
  answer: string
  date: Timestamp
  uidFrom: string
  answeringToName: string
  answeringFromName: string
  isCompany: boolean
  image?: string
}

export interface IComplaint {
  createdAt: Timestamp
  title: string
  category: string
  service: string
  id: string
  content: string
  answers?: IAnswer[]
  image?: string
  userName: string
  userUid: string
}
