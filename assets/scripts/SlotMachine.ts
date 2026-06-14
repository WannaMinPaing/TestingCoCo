import { _decorator, Component, Node } from 'cc';
import { Reel } from './Reel';

const { ccclass, property } = _decorator;

@ccclass('SlotMachine')
export class SlotMachine extends Component {

    // Drag the node that contains all the Reel nodes (e.g. "ReelContainer") here.
    // Every Reel found under it is collected automatically — including duplicated
    // reels — so you never have to wire the array by hand.
    @property(Node)
    public reelsRoot: Node | null = null;

    // Optional manual list. Used only when reelsRoot is not set.
    @property([Reel])
    public reels: Reel[] = [];

    onLoad() {
        if (this.reelsRoot) {
            this.reels = this.reelsRoot.getComponentsInChildren(Reel);
        }
        console.log("SlotMachine found reels:", this.reels.length);
    }

    startSpin() {
        for (const reel of this.reels) {
            reel?.startSpin();
        }
    }

    stopSpin() {
        for (const reel of this.reels) {
            reel?.stopSpin();
        }
    }
}
