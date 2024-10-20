import {SignJWT, jwtVerify, JWTPayload} from 'jose'
import IToken from "@/lib/Session/interficies/IToken";

export default class Token<T> implements IToken<T>{
    private readonly key: Uint8Array;

    constructor(key: string) {
        if (!key) {
            throw new Error("An empty key has been passed")
        }
        this.key = new TextEncoder().encode(key);
    }

    public async encrypt(payload: object, expireTime: number = (12 * 86400)): Promise<string> {
        try {
            return await new SignJWT(payload as JWTPayload)
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setExpirationTime(Date.now() + expireTime)
                .sign(this.key);

        } catch (error) {
            console.error(error)
            throw new Error("The token could not be generated.")
        }
    }

    public async decode(token: string): Promise<T> {
        try {
            const {payload} = await jwtVerify(token, this.key)
            return payload as T;

        } catch (error) {
            console.error(error);
            throw new Error("The token could not be decoded.");
        }
    }
}
