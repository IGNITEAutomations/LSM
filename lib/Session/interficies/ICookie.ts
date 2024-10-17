import {NextRequest} from "next/server";

export default interface ICookie {
    get(name: string, request?: NextRequest): string | null;
    save(key: string, value: string, maxAge: number): void;
    clear(name: string): void;
}