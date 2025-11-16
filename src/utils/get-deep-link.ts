import type { Routers } from "solid-navigation/dist/src/types"

export const getDeepLink = (path = "") => {
  const scheme = "solidnslaunch"
  const host = "my-host"
  const prefix = global.isAndroid ? `${scheme}://${host}/` : `${scheme}://`
  return prefix + path
}

export const parseDeepLink = (url: string): keyof Routers["Default"] => {
  try {
    const parsedUrl = new URL(url)

    let candidatePath = "Home"

    if (global.isAndroid) {
      // scheme://host/<path>
      candidatePath = parsedUrl.pathname as keyof Routers["Default"]
    } else {
      candidatePath = parsedUrl.hostname as keyof Routers["Default"]
    }

    const finalPath = candidatePath.startsWith("/") ? candidatePath.slice(1) : candidatePath

    return finalPath as keyof Routers["Default"]
  } catch (err) {
    return "Home"
  }
}

export const parseDeepLinkParams = (url: string): Record<string, string> => {
  try {
    const parsedUrl = new URL(url)
    const params: Record<string, string> = {}

    if (global.isAndroid) {
      // Android: scheme://host/path?auth_code=...
      parsedUrl.searchParams.forEach((value, key) => {
        params[key] = value
      })
    } else {
      // iOS: scheme://host/?auth_code=...
      parsedUrl.searchParams.forEach((value, key) => {
        params[key] = value
      })
    }

    return params
  } catch (err) {
    return {}
  }
}
