export declare function subscribe(listener: string, callback: (newVal: any) => any): () => void;
declare const State: <T>(state: T) => any;
export declare function useState<T>(defaultState: T): [T, (newVal: T) => void];
export default State;
