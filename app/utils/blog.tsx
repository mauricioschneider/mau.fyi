export function getPostList() {
  return [
    {
      id: 'test-blog-post',
    },
  ]
}

export function formatAuthors(authors: Array<string>) {
  if (!authors.length) {
    return 'Mauricio Schneider'
  }

  if (authors.length === 1) {
    return authors[0]
  }

  if (authors.length === 2) {
    return authors.join(' and ')
  }

  return authors.slice(0, -1).join(', ') + ', and ' + authors.slice(-1)
}
