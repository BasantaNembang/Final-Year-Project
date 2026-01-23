import { JWTPayload, jwtVerify } from "jose"


interface CustomPayload extends JWTPayload {
    roles?: string,
    userId?: string
}

export const getJwtSecret = () => {
    const secret = process.env.JWT_SECRET_KEY;
    if (!secret || secret.length === 0) {
        throw new Error("Missing JWT_SECRET_KEY .env")
    }
    return secret;
}


export const verifyAuth = async (jwtToken: string) => {

    if (!jwtToken) {
        throw new Error("Missing Jwt-Token")
    }

    try {
        const { payload } = await jwtVerify(jwtToken, new TextEncoder().encode(getJwtSecret()))
        return payload as CustomPayload;
    } catch (error) {
        console.error(error)
        throw new Error("Token Expired")
    }
}

