import localforage from "./localforageconfig";
import uuid from "react-native-uuid";
import { Repository } from ".";

export class LocalStorage<T extends { id?: string }> implements Repository<T> {
    private _store: LocalForage;
    constructor(storeName: string) {
        this._store = localforage.createInstance({
            storeName
        });
    }
    async get(id: string) {
        return this._store.getItem(id) as Promise<T>;
    }
    async save(data: T) {
        if (!data) return;
        data.id ||= uuid.v4().toString();
        return this._store.setItem(data.id, data) as Promise<T>;
    }
    async delete(id: string) {
        return this._store.removeItem(id) as Promise<void>;
    }
}

export type User = {
    id?: string;
    user: any;
}
export class UsersLocalStorage extends LocalStorage<User> {
    constructor() {
        super("users");
    }
}
