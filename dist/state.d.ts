type StateType<T> = T & {
    __listener?: Map<string, Set<(newVal: any) => void>>;
    __subscribe?: (key: string, callback: ((newVal: any) => void)) => void;
};
export declare function subscribe(key: string, callback: () => void): void;
declare const State: <T>(state: StateType<T>) => any;
export declare function useState<T>(defaultState: T): [T, (newVal: T) => void];
export default State;
