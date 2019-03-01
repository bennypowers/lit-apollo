export interface Observer {
    (value: any, old: any): void;
}
export declare const observer: (observer: Observer) => (proto: any, propName: string | number | symbol) => void;
