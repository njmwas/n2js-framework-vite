export type StateTypeEventType<T> = T & {
    __listeners?: Map<string, Set<(newVal: any) => void>>;
    __subscribe?: (key: string, callback: ((newVal: any) => void)) => void;
};
export declare function subscribe(key: string, callback: () => void): void;
declare const State: <T>(state: StateTypeEventType<T>) => any;
export default State;
