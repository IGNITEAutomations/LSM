import {errors, JWTPayload, jwtVerify, SignJWT} from 'jose';

interface JWToken extends JWTPayload {
    session: string;
}

export default class SessionToken<T extends JWTPayload = JWToken> {
    private static readonly EXPIRE_IN = "12d";
    private static readonly ALGORITHM = 'HS256';

    private readonly secretKey: Uint8Array;

    constructor(secretKey?: string) {
        const key = secretKey || process.env.JWT_SECRET_KEY;
        if (!key) {
            throw new Error("JWT_SECRET_KEY no se encuentra en las variables de entorno");
        }
        this.secretKey = new TextEncoder().encode(key);
    }

    public get expireTime(): string {
        return SessionToken.EXPIRE_IN;
    }

    public async generateToken(payload: T): Promise<string> {
        return new SignJWT(payload)
            .setProtectedHeader({alg: SessionToken.ALGORITHM})
            .setIssuedAt()
            .setExpirationTime(SessionToken.EXPIRE_IN)
            .sign(this.secretKey);
    }

    public async decodeToken(token: string): Promise<T> {
        try {
            const {payload} = await jwtVerify(token, this.secretKey);
            return payload as T;
        } catch (error) {
            if (error instanceof errors.JWTExpired) {
                throw new Error('El token ha expirado');
            } else if (error instanceof errors.JWTInvalid) {
                throw new Error('El token es inválido');
            } else if (error instanceof errors.JOSEError) {
                throw new Error(`Error al verificar el token: ${error.message}`);
            } else {
                throw new Error('Error desconocido al decodificar el token');
            }
        }
    }
}
