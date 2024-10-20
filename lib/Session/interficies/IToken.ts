export default interface IToken<T> {
    encrypt(payload: object, expireTime?: number): Promise<string>;
    decode(token: string): Promise<T>
}