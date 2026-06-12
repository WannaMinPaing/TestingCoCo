import { _decorator, Component, Node, Vec3 } from 'cc';
const { ccclass } = _decorator;

@ccclass('Reel')
export class Reel extends Component {

    private speed = 300;

    update(dt: number) {
        this.scroll(dt);
    }

    scroll(dt: number) {
        const children = this.node.children;

        for (let i = 0; i < children.length; i++) {
            let item = children[i];

            let pos = item.position.clone();
            pos.y -= this.speed * dt;

            item.setPosition(pos);

            // ❗ အောက်ကျသွားရင် recycle
            if (pos.y < -300) {
                this.recycleItem(item);
            }
        }
    }

    recycleItem(item: Node) {
        const children = this.node.children;

        // အပေါ်ဆုံး symbol ရှာ
        let top = children.reduce((a, b) =>
            a.position.y > b.position.y ? a : b
        );

        let pos = top.position.clone();

        // အပေါ်မှာတစ်ခုတင်
        item.setPosition(pos.x, pos.y + 150, pos.z);
    }
}