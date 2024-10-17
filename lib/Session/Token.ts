import {SignJWT, jwtVerify, JWTPayload} from 'jose'
import IToken from "@/lib/Session/interficies/IToken";

export default class Token implements IToken{
    private readonly key: Uint8Array;

    constructor(key: string) {
        if (!key) {
            throw new Error("An empty key has been passed")
        }
        this.key = new TextEncoder().encode(key);
    }

    public async encrypt(payload: object, expireTime: number = 86400): Promise<string> {
        try {
            return await new SignJWT(payload as JWTPayload)
                .setProtectedHeader({ alg: 'HS256' })
                //.setJti(JSON.stringify(payload))
                .setIssuedAt()
                .setExpirationTime('2h')
                .sign(this.key);

        } catch (error) {
            console.error(error)
            throw new Error("The token could not be generated.")
        }
    }

    public async decode(token: string): Promise<object> {
        try {
            const {payload} = await jwtVerify(token, this.key)
            return payload as object;

        } catch (error) {
            console.error(error);
            throw new Error("The token could not be decoded.");
        }
    }
}
