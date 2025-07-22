// Хорошая практика даже простые типы выносить в алиасы
// Зато когда захотите поменять это достаточно сделать в одном месте
type EventName = string | RegExp;
<<<<<<< HEAD
type Subscriber = Function;
type EmitterEvent = {
    eventName: string,
    data: unknown
};

export interface IEvents {
    on<T extends object>(event: EventName, callback: (data: T) => void): void;
    emit<T extends object>(event: string, data?: T): void;
    trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}

/**
 * Брокер событий, классическая реализация
 * В расширенных вариантах есть возможность подписаться на все события
 * или слушать события по шаблону например
 */
export class EventEmitter implements IEvents {
    _events: Map<EventName, Set<Subscriber>>;

    constructor() {
        this._events = new Map<EventName, Set<Subscriber>>();
    }

    /**
     * Установить обработчик на событие
     */
    on<T extends object>(eventName: EventName, callback: (event: T) => void) {
        if (!this._events.has(eventName)) {
            this._events.set(eventName, new Set<Subscriber>());
        }
        this._events.get(eventName)?.add(callback);
    }

    /**
     * Снять обработчик с события
     */
    off(eventName: EventName, callback: Subscriber) {
=======
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
>>>>>>> master
        if (this._events.has(eventName)) {
            this._events.get(eventName)!.delete(callback);
            if (this._events.get(eventName)?.size === 0) {
                this._events.delete(eventName);
            }
        }
    }

<<<<<<< HEAD
    /**
     * Инициировать событие с данными
     */
    emit<T extends object>(eventName: string, data?: T) {
        this._events.forEach((subscribers, name) => {
            if (name === '*') subscribers.forEach(callback => callback({
                eventName,
                data
            }));
            if (name instanceof RegExp && name.test(eventName) || name === eventName) {
                subscribers.forEach(callback => callback(data));
=======
    emit<T>(eventName: string, data?: T) {
        this._events.forEach((subscribers, name) => {
            if (name === '*') {
                subscribers.forEach(callback => callback({ eventName, data } as unknown));
            } else if (name instanceof RegExp && name.test(eventName) || name === eventName) {
                subscribers.forEach(callback => callback(data as unknown));
>>>>>>> master
            }
        });
    }

<<<<<<< HEAD
    /**
     * Слушать все события
     */
    onAll(callback: (event: EmitterEvent) => void) {
        this.on("*", callback);
    }

    /**
     * Сбросить все обработчики
     */
    offAll() {
        this._events = new Map<string, Set<Subscriber>>();
    }

    /**
     * Сделать коллбек триггер, генерирующий событие при вызове
     */
    trigger<T extends object>(eventName: string, context?: Partial<T>) {
        return (event: object = {}) => {
            this.emit(eventName, {
                ...(event || {}),
                ...(context || {})
            });
        };
    }
}

=======
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
>>>>>>> master
