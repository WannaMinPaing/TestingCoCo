import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass } = _decorator;

enum ReelState {
    IDLE,
    SPINNING,
    STOPPING
}

@ccclass('Reel')
export class Reel extends Component {

    private speed = 0;
    private maxSpeed = 1200;
    private acceleration = 2000;

    private state: ReelState = ReelState.IDLE;

    startSpin() {
        this.state = ReelState.SPINNING;
    }

    stopSpin() {
        this.state = ReelState.STOPPING;
    }

    update(dt: number) {
        this.updateSpeed(dt);
        this.scroll(dt);
    }

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

    scroll(dt: number) {
        const children = this.node.children;

        for (let i = 0; i < children.length; i++) {
            let item = children[i];

            let pos = item.position.clone();
            pos.y -= this.speed * dt;

            item.setPosition(pos);

            if (pos.y < -300) {
                this.recycleItem(item);
            }
        }
    }

    recycleItem(item: Node) {
        const children = this.node.children;

        let top = children.reduce((a, b) =>
            a.position.y > b.position.y ? a : b
        );

        let pos = top.position.clone();
        item.setPosition(pos.x, pos.y + 150, pos.z);
    }
}