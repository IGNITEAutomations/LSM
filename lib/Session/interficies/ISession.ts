export default interface ISession {
    cookieName: string,
    expireTime: number,
    get(key: string, session?: string): Promise<string | number | boolean | null>,
    set(key: string, value: any): Promise<void>,
    clear(key: string): Promise<void>,
    clearAll(): void
}