import { _decorator, Component, Vec3 } from 'cc';
const { ccclass } = _decorator;

@ccclass('Reel')
export class Reel extends Component {

    private startY: number = 0;

    start() {
        this.startY = this.node.position.y;
    }

    update(dt: number) {

        // ✅ clone position (IMPORTANT)
        let pos = new Vec3(this.node.position.x, this.node.position.y, this.node.position.z);

        // move down
        pos.y -= 300 * dt;

        // reset
        if (pos.y < -800) {
            pos.y = this.startY;
        }

        this.node.setPosition(pos);
    }
}