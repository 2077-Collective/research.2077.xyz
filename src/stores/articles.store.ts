import { atom } from 'nanostores'
import type { Article } from '../types/article'

export const articles = atom<Article[]>([])

export function setArticles(a: Article[]) {
    articles.set(a)
}
