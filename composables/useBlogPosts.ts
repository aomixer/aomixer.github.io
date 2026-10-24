import { POST_PAGE_SIZE } from '~/utils/site'

export async function useBlogPosts() {
  const { data: posts } = await useAsyncData('blog-posts', () =>
    queryCollection('blog').order('pubDate', 'DESC').all(),
  )

  return computed(() => posts.value ?? [])
}

export function paginatePosts<T>(posts: T[], page: number, pageSize = POST_PAGE_SIZE) {
  const totalPages = Math.max(1, Math.ceil(posts.length / pageSize))
  const currentPage = Math.min(Math.max(page, 1), totalPages)
  const start = (currentPage - 1) * pageSize
  return {
    items: posts.slice(start, start + pageSize),
    currentPage,
    totalPages,
  }
}
