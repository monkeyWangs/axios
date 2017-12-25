const storageKeyPrefix = 'project_name_cache_'
let userId = null

export function cacheSet (key, value) {
  window.localStorage.setItem(`${storageKeyPrefix}${userId}_${key}`, value)
}

export function cacheGet (key) {
  return window.localStorage.getItem(`${storageKeyPrefix}${userId}_${key}`)
}

export default function cache (config, Axios) {
  userId = config.headers.userId
  const cached = JSON.parse(cacheGet('request') || '{}')
  const cacheData = config.cacheData
  delete config.cacheData
  const cacheURL = config.url + JSON.stringify(config.params)

  function fetch () {
    return Axios.request(config).then(data => {
      cached[cacheURL] = JSON.stringify(data)
      cacheSet('request', JSON.stringify(cached))
      return Promise.resolve(data)
    }, err => Promise.reject(err))
  }

  // 缓存优先
  if (cacheData === 1) {
    if (cached[cacheURL]) {
      fetch()
      return Promise.resolve(JSON.parse(cached[cacheURL]))
    }
    return fetch()
  }
  // 请求优先
  if (cacheData === 2) {
    return fetch().then(data => Promise.resolve(data), error => {
      if (cached[cacheURL]) {
        return Promise.resolve(JSON.parse(cached[cacheURL]))
      }
      return Promise.reject(error)
    })
  }

  return Axios.request(config)
}
