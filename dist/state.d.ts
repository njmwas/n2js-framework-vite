export type StateTypeEventType = {
    __listener?: Map<string, Set<(newVal: any) => void>>;
    __subscribe?: (key: string, callback: ((newVal: any) => void)) => void;
};
export declare function subscribe(key: string, callback: () => void): void;
declare const State: <T>(state: T & StateTypeEventType) => any;
export default State;
