
export type StateTypeEventType = {
    __listener?: Map<string, Set<(newVal: any) => void>>,
    __subscribe?: (key: string, callback: ((newVal: any) => void)) => void
}

function setUpInnerState<T>(obj: T & StateTypeEventType): T {
    return Object.entries(obj).reduce((a: Record<string, any>, [key, val]: [string | number, any]) => {
        return { ...a, [key]: typeof val === "object" && key !== "__listeners" ? State(setUpInnerState(val)) : val };
    }, {}) as T;
}

export function subscribe(key: string, callback: () => void) {
    console.log("This is deprecated", key, callback)
}

const State = <T>(state: T & StateTypeEventType) => {
    return new Proxy(setUpInnerState({
        ...state,
        __listeners: new Map(),
        __subscribe(key: string, callback: ((newVal: T) => void)) {
            if (!this.__listeners.has(key)) this.__listeners.set(key, new Set());
            this.__listeners.get(key).add(callback);
        }
    }), {
        set(target: any, key: string, newVal: any) {
            target[key] = typeof newVal == "object" ? setUpInnerState(newVal) : newVal;
            const { __listeners } = target;
            if (__listeners.has(key)) {
                __listeners.get(key).forEach((sub: (nt: typeof newVal) => void) => sub(newVal));
            }
            return true;
        }
    });
}

/* export function useState<T>(defaultState: T): [T, (newVal: T) => void] {
    const state = State({ state_$val: defaultState });
    return [state.state_$val, (newState: T) => state.state_$val = newState];
} */

export default State;