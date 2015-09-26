/**
 * Created by xiashishi on 15/2/8.
 */
var ThreeD;
(function (ThreeD) {
    /**
     * 3d透视
     */
    var Perspective = (function (_super) {
        __extends(Perspective, _super);
        function Perspective() {
            _super.call(this);
            this.xpos = Const.Const.stageWidth / 2;
            this.ypos = Const.Const.stageHeigth / 2;
            this.zpos = 0;
            this.fl = 250;
            this.vpX = Const.Const.stageWidth / 2;
            this.vpY = Const.Const.stageHeigth / 2;
            this.touchX = Const.Const.stageWidth / 2;
            this.touchY = Const.Const.stageHeigth / 2;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        }
        var __egretProto__ = Perspective.prototype;
        __egretProto__.init = function (evt) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
            this.width = Const.Const.stageWidth;
            this.height = Const.Const.stageHeigth;
            this.ball = new DemoObject.Ball();
            this.addChild(this.ball);
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        };
        __egretProto__.onTouchBegin = function (evt) {
            this.touchX = evt.stageX;
            //this.touchY = evt.stageY;
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        };
        __egretProto__.onTouchMove = function (evt) {
            this.touchX = evt.stageX;
            //this.touchY = evt.stageY;
        };
        __egretProto__.onTouchEnd = function (evt) {
            this.touchX = evt.stageX;
            //this.touchY = evt.stageY;
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        };
        __egretProto__.onEnterFrame = function (evt) {
            this.xpos = this.touchX - this.vpX;
            this.ypos = this.touchY - this.vpY;
            this.zpos = Math.sqrt(this.xpos * this.xpos + this.ypos * this.ypos);
            //this.zpos = Math.min(Math.abs(this.xpos),Math.abs(this.ypos));
            var scale = this.fl / (this.fl + this.zpos);
            this.ball.scaleX = this.ball.scaleY = scale;
            this.ball.x = this.vpX + this.xpos * scale;
            this.ball.y = this.vpY + this.ypos * scale;
            this.graphics.clear();
            this.graphics.lineStyle(2, 0xff0000);
            this.graphics.moveTo(this.vpX, this.vpY);
            this.graphics.lineTo(this.ball.x, this.ball.y);
        };
        return Perspective;
    })(egret.Sprite);
    ThreeD.Perspective = Perspective;
    Perspective.prototype.__class__ = "ThreeD.Perspective";
    /**
     * 3d代码回弹
     */
    var Bounce3D = (function (_super) {
        __extends(Bounce3D, _super);
        function Bounce3D() {
            _super.call(this);
            this.xpos = 0;
            this.ypos = 0;
            this.zpos = 0;
            this.vx = Math.random() * 10 - 5;
            this.vy = Math.random() * 10 - 5;
            this.vz = Math.random() * 10 - 5;
            this.fl = 250;
            this.vpX = Const.Const.stageWidth * 0.5;
            this.vpY = Const.Const.stageHeigth * 0.5;
            this.top = -100;
            this.bottom = 100;
            this.left = -100;
            this.right = 100;
            this.front = 100;
            this.back = -100;
            this.bounce = 1;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        }
        var __egretProto__ = Bounce3D.prototype;
        __egretProto__.init = function (evt) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
            this.width = Const.Const.stageWidth;
            this.height = Const.Const.stageHeigth;
            this.ball = new DemoObject.Ball();
            this.addChild(this.ball);
            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        };
        __egretProto__.onEnterFrame = function (evt) {
            this.xpos += this.vx;
            this.ypos += this.vy;
            this.zpos += this.vz;
            var radius = this.ball.radius;
            if (this.xpos + radius > this.right) {
                this.xpos = this.right - radius;
                this.vx *= -this.bounce;
            }
            else if (this.xpos - radius < this.left) {
                this.xpos = this.left + radius;
                this.vx *= -this.bounce;
            }
            if (this.ypos + radius > this.bottom) {
                this.ypos = this.bottom - radius;
                this.vy *= -this.bounce;
            }
            else if (this.ypos - radius < this.top) {
                this.ypos = this.top + radius;
                this.vy *= -this.bounce;
            }
            if (this.zpos + radius > this.front) {
                this.zpos = this.front - radius;
                this.vz *= -this.bounce;
            }
            else if (this.zpos - radius < this.back) {
                this.zpos = this.back + radius;
                this.vz *= -this.bounce;
            }
            if (this.zpos > -this.fl) {
                var scale = this.fl / (this.fl + this.zpos);
                this.ball.scaleX = this.ball.scaleY = scale;
                this.ball.x = this.vpX + this.xpos * scale;
                this.ball.y = this.vpY + this.ypos * scale;
                this.ball.visible = true;
            }
            else {
                this.ball.visible = false;
            }
        };
        return Bounce3D;
    })(egret.Sprite);
    ThreeD.Bounce3D = Bounce3D;
    Bounce3D.prototype.__class__ = "ThreeD.Bounce3D";
    /**
     * 3d多物体回弹
     */
    var MultiBounce3D = (function (_super) {
        __extends(MultiBounce3D, _super);
        function MultiBounce3D() {
            _super.call(this);
            this.numBalls = 50;
            this.fl = 250; //透视初始距离 scale ＝ fl/( fl + z )
            this.vpX = Const.Const.stageWidth * 0.5; //视点X轴位置
            this.vpY = Const.Const.stageHeigth * 0.5; //视点Y轴位置
            this.top = -400;
            this.bottom = 400;
            this.left = -240;
            this.right = 240;
            this.front = 100;
            this.back = -100;
            this.bounce = 1;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        }
        var __egretProto__ = MultiBounce3D.prototype;
        __egretProto__.init = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
            this.width = Const.Const.stageWidth;
            this.height = Const.Const.stageHeigth;
            this.balls = [];
            for (var i = 0; i < this.numBalls; i = i + 1) {
                var ball = new DemoObject.Ball3D(15, Math.random() * 0xffffff);
                this.balls.push(ball);
                ball.vx = Math.random() * 10 - 5;
                ball.vy = Math.random() * 10 - 5;
                ball.vz = Math.random() * 10 - 5;
                this.addChild(ball);
            }
            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        };
        __egretProto__.onEnterFrame = function (evt) {
            for (var i = 0; i < this.numBalls; i = i + 1) {
                var ball = this.balls[i];
                this.move(ball);
            }
            //this.arraySort(this.balls);
            this.sortZ();
        };
        /**
         * 路径移动规则
         * @param ball
         */
        __egretProto__.move = function (ball) {
            ball.xpos += ball.vx;
            ball.ypos += ball.vy;
            ball.zpos += ball.vz;
            var radius = ball.radius;
            if (ball.xpos + radius > this.right) {
                ball.xpos = this.right - radius;
                ball.vx *= -this.bounce;
            }
            else if (ball.xpos - radius < this.left) {
                ball.xpos = this.left + radius;
                ball.vx *= -this.bounce;
            }
            if (ball.ypos + radius > this.bottom) {
                ball.ypos = this.bottom - radius;
                ball.vy *= -this.bounce;
            }
            else if (ball.ypos - radius < this.top) {
                ball.ypos = this.top + radius;
                ball.vy *= -this.bounce;
            }
            if (ball.zpos + radius > this.front) {
                ball.zpos = this.front - radius;
                ball.vz *= -this.bounce;
            }
            else if (ball.zpos - radius < this.back) {
                ball.zpos = this.back + radius;
                ball.vz *= -this.bounce;
            }
            if (ball.zpos > -this.fl) {
                var scale = this.fl / (this.fl + ball.zpos);
                ball.scaleX = ball.scaleY = scale;
                ball.x = this.vpX + ball.xpos * scale;
                ball.y = this.vpY + ball.ypos * scale;
                ball.visible = true;
            }
            else {
                ball.visible = false;
            }
        };
        /**
         * z轴排序
         */
        __egretProto__.sortZ = function () {
            this.arraySort(this.balls);
            for (var i = 0; i < this.numBalls; i = i + 1) {
                var ball = this.balls[i];
                this.setChildIndex(ball, i);
            }
        };
        /**
         * 数组中对象的某一属性排序
         * @param array
         */
        __egretProto__.arraySort = function (array, property) {
            var z = 0;
            var ball;
            for (var i = 0; i < array.length; i = i + 1) {
                for (var j = i + 1; j < array.length; j = j + 1) {
                    if (this.balls[j - 1].zpos > this.balls[j].zpos) {
                        ball = this.balls[j];
                        this.balls[j] = this.balls[j - 1];
                        this.balls[j - 1] = ball;
                    }
                }
            }
        };
        return MultiBounce3D;
    })(egret.Sprite);
    ThreeD.MultiBounce3D = MultiBounce3D;
    MultiBounce3D.prototype.__class__ = "ThreeD.MultiBounce3D";
    /**
     * 3d烟花效果
     */
    var Fireworks = (function (_super) {
        __extends(Fireworks, _super);
        function Fireworks() {
            _super.call(this);
            this.numBalls = 100;
            this.fl = 250;
            this.vpX = Const.Const.stageWidth * 0.5;
            this.vpY = Const.Const.stageHeigth * 0.5;
            this.gravity = 0.2;
            this.floor = 200;
            this.bounce = -0.6;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        }
        var __egretProto__ = Fireworks.prototype;
        __egretProto__.init = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
            this.width = Const.Const.stageWidth;
            this.height = Const.Const.stageHeigth;
            this.balls = [];
            for (var i = 0; i < this.numBalls; i = i + 1) {
                var ball = new DemoObject.Ball3D(3, Math.random() * 0xffffff);
                this.balls.push(ball);
                ball.vx = Math.random() * 6 - 3;
                ball.vy = Math.random() * 6 - 10;
                ball.vz = Math.random() * 6 - 3;
                this.addChild(ball);
            }
            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        };
        __egretProto__.onEnterFrame = function (evt) {
            for (var i = 0; i < this.numBalls; i = i + 1) {
                var ball = this.balls[i];
                this.move(ball);
            }
            //this.arraySort(this.balls);
            this.sortZ();
        };
        /**
         * 路径移动规则
         * @param ball
         */
        __egretProto__.move = function (ball) {
            ball.vy += this.gravity;
            ball.xpos += ball.vx;
            ball.ypos += ball.vy;
            ball.zpos += ball.vz;
            if (ball.ypos > this.floor) {
                ball.ypos = this.floor;
                ball.vy *= this.bounce;
            }
            if (ball.zpos > -this.fl) {
                var scale = this.fl / (this.fl + ball.zpos);
                ball.scaleX = ball.scaleY = scale;
                ball.x = this.vpX + ball.xpos * scale;
                ball.y = this.vpY + ball.ypos * scale;
                ball.visible = true;
            }
            else {
                ball.visible = false;
            }
        };
        /**
         * z轴排序
         */
        __egretProto__.sortZ = function () {
            this.arraySort(this.balls);
            for (var i = 0; i < this.numBalls; i = i + 1) {
                var ball = this.balls[i];
                this.setChildIndex(ball, i);
            }
        };
        /**
         * 数组中对象的某一属性排序
         * @param array
         */
        __egretProto__.arraySort = function (array, property) {
            var ball;
            for (var i = 0; i < array.length; i = i + 1) {
                for (var j = i + 1; j < array.length; j = j + 1) {
                    if (array[j - 1].zpos > array[j].zpos) {
                        ball = array[j];
                        array[j] = array[j - 1];
                        array[j - 1] = ball;
                    }
                }
            }
        };
        return Fireworks;
    })(egret.Sprite);
    ThreeD.Fireworks = Fireworks;
    Fireworks.prototype.__class__ = "ThreeD.Fireworks";
    /**
     * 森林
     */
    var Trees = (function (_super) {
        __extends(Trees, _super);
        function Trees() {
            _super.call(this);
            this.numTrees = 100;
            this.fl = 250;
            this.vpX = 0;
            this.vpY = 0;
            this.floor = 50;
            this.vz = 0;
            this.friction = 0.98;
            this.init();
        }
        var __egretProto__ = Trees.prototype;
        __egretProto__.init = function () {
            this.width = egret.MainContext.instance.stage.stageWidth;
            this.height = egret.MainContext.instance.stage.stageHeight;
            this.vpX = this.width * 0.5;
            this.vpY = this.height * 0.5;
            this.trees = [];
            for (var i = 0, tree; i < this.numTrees; i = i + 1) {
                tree = new DemoObject.Tree(Math.random() * 0xffffff);
                this.trees.push(tree);
                tree.xPos = Math.random() * 2000 - 1000;
                tree.yPos = this.floor;
                tree.zPos = Math.random() * 10000;
                this.addChild(tree);
            }
            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        };
        __egretProto__.onEnterFrame = function (evt) {
            for (var i = 0, tree; i < this.numTrees; i = i + 1) {
                tree = this.trees[i];
                this.move(tree);
            }
            this.vz *= this.friction;
            this.sortZ();
            this.vz += 1;
            if (this.vz > 100)
                this.vz = -100;
        };
        __egretProto__.onTouchBegin = function (evt) {
            this.vz -= 10;
        };
        __egretProto__.onTouchEnd = function (evt) {
            this.vz += 10;
        };
        __egretProto__.move = function (tree) {
            tree.zPos += this.vz;
            if (tree.zPos < -this.fl) {
                tree.zPos += 10000;
            }
            if (tree.zPos > 10000 - this.fl) {
                tree.zPos -= 10000;
            }
            var scale = this.fl / (this.fl + tree.zPos);
            tree.scaleX = tree.scaleY = scale;
            tree.x = this.vpX + tree.xPos * scale;
            tree.y = this.vpY + tree.yPos * scale;
            tree.alpha = scale * 0.7 + 0.3;
        };
        /**
         * 数组中对象的某一属性排序
         * @param array
         */
        __egretProto__.arraySort = function (array, property) {
            var ball;
            for (var i = 0; i < array.length; i = i + 1) {
                for (var j = i + 1; j < array.length; j = j + 1) {
                    if (array[j - 1].zpos > array[j].zpos) {
                        ball = array[j];
                        array[j] = array[j - 1];
                        array[j - 1] = ball;
                    }
                }
            }
        };
        __egretProto__.sortZ = function () {
            this.arraySort(this.trees);
            for (var i = 0, tree; i < this.numTrees; i = i + 1) {
                tree = this.trees[i];
                this.setChildIndex(tree, i);
            }
        };
        return Trees;
    })(egret.Sprite);
    ThreeD.Trees = Trees;
    Trees.prototype.__class__ = "ThreeD.Trees";
})(ThreeD || (ThreeD = {}));
