export abstract class GameElement {
    constructor(
        public name: string,
        public x: number,
        public y: number,
        public width: number
    ) {}

    abstract onEachTime: () => void;

    abstract renderElement: ({
        playtime,
    }: {
        playtime: number;
    }) => JSX.Element | null;
}
