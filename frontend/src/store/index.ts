import { atom } from 'jotai'

export const user = atom<any>({})
export const isLoggedIn = atom(false)