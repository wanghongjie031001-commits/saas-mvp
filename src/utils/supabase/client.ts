import { createBrowserClient, type CookieOptions } from '@supabase/ssr'

export function createBrowserClientWithCookies() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          if (typeof document === 'undefined') return []
          const cookies = document.cookie ? document.cookie.split('; ') : []
          return cookies.map((c) => {
            const [name, ...value] = c.split('=')
            return { name, value: value.join('=') }
          })
        },
        setAll(cookiesToSet) {
          if (typeof document === 'undefined') return
          cookiesToSet.forEach(({ name, value, options }) => {
            const expires = (options as CookieOptions).expires
            let cookieStr = `${name}=${value}`
            if (expires) cookieStr += `; expires=${expires.toUTCString()}`
            if ((options as CookieOptions).path) cookieStr += `; path=${(options as CookieOptions).path}`
            if ((options as CookieOptions).domain) cookieStr += `; domain=${(options as CookieOptions).domain}`
            if ((options as CookieOptions).secure) cookieStr += '; secure'
            if ((options as CookieOptions).sameSite) cookieStr += `; samesite=${(options as CookieOptions).sameSite}`
            document.cookie = cookieStr
          })
        },
      },
    }
  )
}