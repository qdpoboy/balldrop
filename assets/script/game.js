cc.Class({
    extends: cc.Component,

    properties: {
        ballNode: {
            default: null,
            type: cc.Node
        }
    },

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.ballDrop, this);
        this.initPhys();
    },

    ballDrop() {
        let ballRigidBody = this.ballNode.getComponent(cc.RigidBody);
        ballRigidBody.linearVelocity = cc.v2(0, -2200);
        console.log('加速下落');
    },

    initPhys() {
        this.phys = cc.director.getPhysicsManager();
        this.phys.enabled = true;
        this.phys.gravity = cc.v2(0, -2400);
    },

    start() { },

    // update (dt) {},

    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.ballDrop, this);
    },
});
