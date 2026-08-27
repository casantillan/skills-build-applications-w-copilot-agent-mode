const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8080.app.github.dev/api`
  : 'http://localhost:8080/api'
const localApiBaseUrl = '/api'

export async function fetchCollection(resource) {
  try {
    const response = await fetch(`${apiBaseUrl}/${resource}/`)

    if (!response.ok) {
      throw new Error(`No se pudo cargar ${resource} (${response.status})`)
    }

    const payload = await response.json()
    if (Array.isArray(payload)) return payload
    if (Array.isArray(payload.results)) return payload.results
    if (Array.isArray(payload.data)) return payload.data
    if (Array.isArray(payload.items)) return payload.items
    return []
  } catch (error) {
    if (apiBaseUrl === localApiBaseUrl) throw error

    const fallbackResponse = await fetch(`${localApiBaseUrl}/${resource}/`)
    if (!fallbackResponse.ok) {
      throw new Error(`No se pudo cargar ${resource} (${fallbackResponse.status})`, { cause: error })
    }

    const payload = await fallbackResponse.json()
    if (Array.isArray(payload)) return payload
    if (Array.isArray(payload.results)) return payload.results
    if (Array.isArray(payload.data)) return payload.data
    if (Array.isArray(payload.items)) return payload.items
    return []
  }
}
