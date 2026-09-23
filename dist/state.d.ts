export declare function subscribe(key: string, callback: () => void): void;
declare const State: <T>(state: T & {}) => any;
export declare function useState<T>(defaultState: T): [T, (newVal: T) => void];
export default State;
