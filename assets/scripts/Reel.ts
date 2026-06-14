import { _decorator, Component, Node, Vec3 } from 'cc';

const { ccclass, property } = _decorator;

enum ReelState {
    IDLE,
    SPINNING,
    STOPPING
}

@ccclass('SymbolData')
class SymbolData {
    public name: string = "";
}

@ccclass('Reel')
export class Reel extends Component {

    private speed = 0;
    private maxSpeed = 500;
    private acceleration = 2000;

    private itemHeight = 100;

    private state: ReelState = ReelState.IDLE;

    private targetY: number = 0;
    private isSnapping = false;

    // 👉 Inspector မှာ assign လုပ်မယ်
    @property([SymbolData])
    public symbolData: SymbolData[] = [];

    // -------------------------
    // SPIN
    // -------------------------
    startSpin() {
        this.state = ReelState.SPINNING;
    }

    stopSpin() {
        this.state = ReelState.STOPPING;
    }

    // -------------------------
    // STOP WITH RESULT
    // -------------------------
    stopSpinWithResult(result: string[]) {

        this.state = ReelState.STOPPING;

        const targetSymbol = result[0];

        const index = this.symbolData.findIndex(s => s.name === targetSymbol);

        this.targetY = this.getTargetY(index);

        this.isSnapping = true;

        console.log("Snap to:", targetSymbol, "Y:", this.targetY);
    }

    // -------------------------
    // UPDATE LOOP
    // -------------------------
    update(dt: number) {

        this.updateSpeed(dt);
        this.scroll(dt);

        if (this.isSnapping) {
            this.snapToTarget(dt);
        }
    }

    // -------------------------
    // SPEED CONTROL
    // -------------------------
    updateSpeed(dt: number) {

        if (this.state === ReelState.SPINNING) {
            this.speed += this.acceleration * dt;

            if (this.speed > this.maxSpeed) {
                this.speed = this.maxSpeed;
            }
        }

        if (this.state === ReelState.STOPPING) {
            this.speed -= this.acceleration * dt;

            if (this.speed < 0) {
                this.speed = 0;
                this.state = ReelState.IDLE;
            }
        }
    }

    // -------------------------
    // SCROLL
    // -------------------------
    scroll(dt: number) {

        const children = this.node.children;

        for (let item of children) {

            let pos = item.position.clone();

            pos.y -= this.speed * dt;

            item.setPosition(pos);

            if (pos.y < -400) {
                this.recycleItem(item);
            }
        }
    }

    // -------------------------
    // RECYCLE (infinite loop)
    // -------------------------
    recycleItem(item: Node) {

        const children = this.node.children;

        let top = children.reduce((a, b) =>
            a.position.y > b.position.y ? a : b
        );

        let pos = top.position.clone();

        item.setPosition(pos.x, pos.y + this.itemHeight, pos.z);
    }

    // -------------------------
    // SYMBOL POSITION
    // -------------------------
    getTargetY(index: number): number {
        return index * -this.itemHeight;
    }

    // -------------------------
    // SNAP SYSTEM (FINAL STOP)
    // -------------------------
    snapToTarget(dt: number) {

        const children = this.node.children;

        for (let item of children) {

            let pos = item.position.clone();

            pos.y += (this.targetY - pos.y) * 10 * dt;

            item.setPosition(pos);
        }

        // stop condition
        if (Math.abs(children[0].position.y - this.targetY) < 1) {

            this.isSnapping = false;
            this.state = ReelState.IDLE;
            this.speed = 0;
        }
    }
}