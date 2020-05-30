cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        this.initVelocity = 0;
    },

    onBeginContact(contact, selfCollider, otherCollider) {
        this.game.addPoints(1);//执行加分
        let ballRigidBody = selfCollider.node.getComponent(cc.RigidBody);
        if (this.initVelocity) {
            //碰装之后，恢复到原始时的线性速度
            ballRigidBody.linearVelocity = cc.v2(0, this.initVelocity);
        } else {
            //初次碰撞时，记录原始的线性速度
            this.initVelocity = ballRigidBody.linearVelocity.y;
        }
    },


    // start () {},

    // update (dt) {},
});
