import { GameElement, GameElementProps } from "./BaseClass";

interface Props extends GameElementProps {}

export class Img extends GameElement {
    constructor(props: Props) {
        super(props);
    }

    onEachTime = () => {};
}
