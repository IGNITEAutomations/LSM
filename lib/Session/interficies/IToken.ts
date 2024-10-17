export default interface IToken {
    encrypt(payload: object, expireTime?: number): Promise<string>;
    decode(token: string): Promise<object>
}