cc.Class({
    extends: cc.Component,

    properties: {
        ballNode: {
            default: null,
            type: cc.Node
        },
        blockAreaNode: {
            default: null,
            type: cc.Node
        },
        blockPrefab: {
            default: null,
            type: cc.Prefab
        },
        scoreLabel: {
            default: null,
            type: cc.Label
        }
    },

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.ballDrop, this);
        this.initGameStatus();
        this.initPhys();
        this.initBlock();
    },

    initGameStatus() {
        //0未开始 1进行中
        this.gameStatus = 0;
        this.score = 0;
        this.ballNode.getComponent('ball').game = this;
    },

    initPhys() {
        this.phys = cc.director.getPhysicsManager();
        this.phys.enabled = true;
        this.phys.gravity = cc.v2(0, -2400);
    },

    //点击，小球加速下落
    ballDrop() {
        let ballRigidBody = this.ballNode.getComponent(cc.RigidBody);
        if (this.ballNode.getComponent('ball').initVelocity) {
            ballRigidBody.linearVelocity = cc.v2(0, -2200);
            this.gameStatus = 1;
        }
    },

    //初始化底部方块
    initBlock() {
        //下个方块的x坐标
        this.nextBlockX = this.ballNode.x;
        //方块的y坐标
        this.nextBlockY = -200;
        //生成方块时，两个方块间的距离
        this.blockSpaceWidth = 300;
        this.blockNodeArr = [];
        for (let i = 0; i < 10; i++) {
            let blockNode = cc.instantiate(this.blockPrefab);
            blockNode.y = -200;
            blockNode.x = this.nextBlockX;
            this.blockAreaNode.addChild(blockNode);
            let randWidth = this.randBlockWidth();
            blockNode.getComponent('block').initWidth(randWidth);
            this.nextBlockX += this.blockSpaceWidth;
            this.blockNodeArr.push(blockNode);
        }
    },

    //随机方块宽度
    randBlockWidth() {
        let randWidth = 120 + (Math.random() - 0.5) * 60;
        return randWidth;
    },

    //加分
    addPoints(num) {
        if (this.gameStatus == 1) {
            this.score += num;
            this.scoreLabel.string = this.score;
        }
    },

    start() { },

    update(dt) {
        if (this.gameStatus) {
            for (let blockNode of this.blockNodeArr) {
                blockNode.x += -dt * 540;
                if (blockNode.x < -cc.winSize.width / 2 - blockNode.width / 2) {
                    blockNode.x = this.nextBlockX + this.blockSpaceWidth - cc.winSize.width / 2 - blockNode.width / 2;
                }
            }
            //-400的目的是让其下落到一定的程度才重新开始游戏
            if (this.ballNode.y < this.nextBlockY - 400) {
                cc.director.loadScene('game');
            }
        }
    },

    onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.ballDrop, this);
    },
});
