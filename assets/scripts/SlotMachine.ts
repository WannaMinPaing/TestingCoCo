import { _decorator, Component } from 'cc';
import { Reel } from './Reel';

const { ccclass, property } = _decorator;



@ccclass('SlotMachine')
export class SlotMachine extends Component {

    private result = [
        ["A", "K", "Q", "J", "10"],
        ["K", "Q", "J", "10", "A"],
        ["Q", "J", "10", "A", "K"],
        ["J", "10", "A", "K", "Q"],
        ["10", "A", "K", "Q", "J"],
    ];

    @property([Reel])
    public reels: Reel[] = [];

    startSpin() {

        for (const reel of this.reels) {
            reel.startSpin();
        }

        // ⏱ 3 seconds နောက် stop
        this.scheduleOnce(() => {
            this.stopSpin();
        }, 3);
    }

    async stopSpin() {

        for (let i = 0; i < this.reels.length; i++) {

            await this.delay(300);

            this.reels[i].stopSpinWithResult(this.result[i]);
        }
    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}