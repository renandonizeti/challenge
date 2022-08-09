import axios from 'axios'

const USER = 'takenet'
const LANGUAGE = 'C#'
const MAX_REPOSITORIES = 5

const github = axios.create({
  baseURL: `https://api.github.com/users/`,
})

export async function fetchRespositories() {
  const { data } = await github.get(
    `${USER}/repos`,

    {
      params: {
        sort: 'created',
        direction: 'asc',
      },
    }
  )

  return data
}

export function filterRepositories(repositories) {
  return repositories
    .filter((repository) => repository.language === LANGUAGE)
    .slice(0, MAX_REPOSITORIES)
}

export function asCarousel(repositories) {
  const items = repositories.map((repository) => ({
    header: {
      type: 'application/vnd.lime.media-link+json',
      value: {
        title: repository.name,
        text: repository.description,
        type: 'image/png',
        uri: repository.owner.avatar_url,
        aspectRatio: '1:1',
      },
    },
  }))

  return {
    itemType: 'application/vnd.lime.document-select+json',
    items,
  }
}
