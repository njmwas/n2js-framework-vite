const subscriptions: Map<string, Set<(newVal: any) => any>> = new Map();

export function subscribe(listener: string, callback: (newVal: any) => any) {
    const keys = typeof listener === "string" ? listener.split("|") : [listener as string];

    keys.forEach((key) => {
        if (!subscriptions.has(key)) subscriptions.set(key, new Set());
        subscriptions.set(key, new Set([...subscriptions.get(key) ?? [], callback]));
    });

    // callback();
    return () => keys.forEach((key) => {
        if (subscriptions.has(key)) subscriptions.delete(key);
    });
}

const State = <T>(state: T) => new Proxy(state, {
    set(target: any, key: string, newVal: any) {
        target[key] = newVal;
        if (subscriptions.has(key)) {
            const listeners = subscriptions.get(key);
            listeners?.forEach((sub) => sub(newVal));
        }
        return true;
    }
});

export function useState<T>(defaultState: T): [T, (newVal: T) => void] {
    const state = State({ state_$val: defaultState });
    // subscribe("state_$val", (newVal:T)=>)
    return [state.state_$val, (newState: T) => state.state_$val = newState];
}

export default State;