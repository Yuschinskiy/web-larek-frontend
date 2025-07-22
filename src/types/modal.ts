// types/modal.ts
export interface IModal {
    open(content: HTMLElement): void;
    close(): void;
    isOpen(): boolean;
}