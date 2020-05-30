cc.Class({
    extends: cc.Component,

    properties: {
    },

    //设置方块的宽度，以及物理碰撞区域宽度和方块宽度保持一致
    initWidth(blockWidth) {
        this.node.width = blockWidth;
        this.node.getComponent(cc.PhysicsBoxCollider).size.width = blockWidth;
    }

    // onLoad () {},

    // start () {},

    // update (dt) {},
});
