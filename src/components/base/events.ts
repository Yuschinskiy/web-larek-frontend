// Хорошая практика даже простые типы выносить в алиасы
// Зато когда захотите поменять это достаточно сделать в одном месте
type EventName = string | RegExp;
type Subscriber<T> = (data: T) => void;
type EmitterEvent = {
    eventName: string;
    data: unknown;
};

export interface IEvents {
    on<T>(event: EventName, callback: Subscriber<T>): void;
    emit<T>(event: string, data?: T): void;
    trigger<T>(event: string, context?: Partial<T>): (data: Partial<T>) => void;
}

export class EventEmitter implements IEvents {
    _events: Map<EventName, Set<Subscriber<unknown>>>;

    constructor() {
        this._events = new Map<EventName, Set<Subscriber<unknown>>>();
    }

    on<T>(eventName: EventName, callback: Subscriber<T>) {
        if (!this._events.has(eventName)) {
            this._events.set(eventName, new Set<Subscriber<unknown>>());
        }
        this._events.get(eventName)?.add(callback as Subscriber<unknown>);
    }

    off(eventName: EventName, callback: Subscriber<unknown>) {
        if (this._events.has(eventName)) {
            this._events.get(eventName)!.delete(callback);
            if (this._events.get(eventName)?.size === 0) {
                this._events.delete(eventName);
            }
        }
    }

    emit<T>(eventName: string, data?: T) {
        this._events.forEach((subscribers, name) => {
            if (name === '*') {
                subscribers.forEach(callback => callback({ eventName, data } as unknown));
            } else if (name instanceof RegExp && name.test(eventName) || name === eventName) {
                subscribers.forEach(callback => callback(data as unknown));
            }
        });
    }

    onAll(callback: Subscriber<EmitterEvent>) {
        this.on("*", callback);
    }

    offAll() {
        this._events = new Map<EventName, Set<Subscriber<unknown>>>();
    }

    trigger<T>(eventName: string, context?: Partial<T>) {
        return (eventData: Partial<T> = {}) => {
            this.emit(eventName, {
                ...eventData,
                ...context
            });
        };
    }
}