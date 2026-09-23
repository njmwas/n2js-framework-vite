
export type StateTypeEventType<T> = T & {
    __listeners?: Map<string, Set<(newVal: any) => void>>,
    __subscribe?: (key: string, callback: ((newVal: any) => void)) => void
}

function setUpInnerState<T>(obj: StateTypeEventType<T>): T {
    return Object.entries(obj).reduce((a: Record<string, any>, [key, val]: [string | number, any]) => {
        return { ...a, [key]: typeof val === "object" && key !== "__listeners" ? State(setUpInnerState(val)) : val };
    }, {}) as T;
}

export function subscribe(key: string, callback: () => void) {
    console.log("This is deprecated", key, callback)
}

const State = <T>(state: StateTypeEventType<T>) => {
    return new Proxy(setUpInnerState({
        ...state,
        __listeners: new Map(),
        __subscribe(key: string, callback: (newVal: T) => void) {
            // console.log(key)
            if (!this.__listeners) this.__listeners = new Map();
            if (!this.__listeners.has(key)) this.__listeners.set(key, new Set());
            this.__listeners.get(key).add(callback);
        },
    }), {
        set(target: any, key: string, newVal: any) {
            target[key] = typeof newVal == "object" ? setUpInnerState(newVal) : newVal;
            const { __listeners } = target;

            if (__listeners.has("*")) {
                __listeners.get("*")
                    .forEach((sub: (nt: typeof newVal) => void) => sub(target));
            }
            else {
                for (const listenerKey of __listeners.keys()) {
                    const lKeys = listenerKey.split("|");
                    if (lKeys.includes(key)) {
                        __listeners.get(listenerKey)
                            .forEach((sub: (nt: typeof newVal) => void) => sub(target));
                    }
                }
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