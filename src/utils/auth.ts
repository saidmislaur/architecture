export function setToken(token: string): void {
    localStorage.setItem('admin_token', token)
}

export function getToken():string | null {
    return localStorage.getItem('admin_token')
}

export function removeItem(): void {
    localStorage.removeItem('admin_token')
}