const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

/**
 * Retorna uma URL de imagem do TMDB
 */
export function getTmdbImage(path?: string | null, options?: { fallback?: string }): string {
  if (!path) return options?.fallback ?? ''

  return `${IMAGE_BASE_URL}${path}`;
}
