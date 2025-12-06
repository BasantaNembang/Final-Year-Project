
export interface authData {
    jwtToken: string | null,
    refreshToken: string | null,
    saveToken(jwtToken: string, refreshToken: string, role: string): void,
    removeToken(): void,
    role: string | null
}

