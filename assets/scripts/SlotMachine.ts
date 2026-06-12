import { _decorator, Component } from 'cc';
import { Reel } from './Reel';

const { ccclass, property } = _decorator;

@ccclass('SlotMachine')
export class SlotMachine extends Component {

    @property(Reel)
    public reel: Reel = null;

    startSpin() {
        this.reel.startSpin();
    }

    stopSpin() {
        this.reel.stopSpin();
    }
}