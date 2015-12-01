/**
 * Created by xiashishi on 15/1/17.
 */
var Animation;
(function (Animation) {
    /**
     * 用户交互第一个demo
     * actionsrcipt 转egret
     *
     */
    var Throwing = (function (_super) {
        __extends(Throwing, _super);
        function Throwing() {
            _super.call(this);
            this.bounce = -0.7;
            this.gravity = 0.5;
            this.init();
        }
        var __egretProto__ = Throwing.prototype;
        __egretProto__.init = function () {
            this.ball = new DemoObject.Ball();
            this.ball.x = Const.Const.stageWidth * 0.5;
            this.ball.y = Const.Const.stageHeigth * 0.5;
            this.vx = Math.random() * 10 - 5;
            this.vy = -10;
            this.width = Const.Const.stageWidth;
            this.height = Const.Const.stageHeigth;
            this.touchEnabled = true;
            this.addChild(this.ball);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        };
        __egretProto__.onEnterFrame = function (evt) {
            this.vy += this.gravity;
            this.ball.x += this.vx;
            this.ball.y += this.vy;
            var left = 0;
            var right = Const.Const.stageWidth;
            var top = 0;
            var bottom = Const.Const.stageHeigth;
            if (this.ball.x + this.ball.radius > right) {
                this.ball.x = right - this.ball.radius;
                this.vx *= this.bounce;
            }
            else if (this.ball.x - this.ball.radius < left) {
                this.ball.x = left + this.ball.radius;
                this.vx *= this.bounce;
            }
            if (this.ball.y + this.ball.radius > bottom) {
                this.ball.y = bottom - this.ball.radius;
                this.vy *= this.bounce;
            }
            else if (this.ball.y - this.ball.radius < top) {
                this.ball.y = top + this.ball.radius;
                this.vy *= this.bounce;
            }
        };
        __egretProto__.onTouchBegin = function (evt) {
            this.vx = 0;
            this.vy = 0;
            this.oldX = this.ball.x;
            this.oldY = this.ball.y;
            this.oldStageX = evt.stageX;
            this.oldStageY = evt.stageY;
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.trackVelocity, this);
        };
        __egretProto__.onTouchMove = function (evt) {
            this.ball.x += evt.stageX - this.oldStageX;
            this.ball.y += evt.stageY - this.oldStageY;
            this.oldStageX = evt.stageX;
            this.oldStageY = evt.stageY;
        };
        __egretProto__.onTouchEnd = function (evt) {
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.trackVelocity, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        };
        __egretProto__.trackVelocity = function (evt) {
            this.vx = this.ball.x - this.oldX;
            this.vy = this.ball.y - this.oldY;
            this.oldX = this.ball.x;
            this.oldY = this.ball.y;
        };
        return Throwing;
    })(egret.Sprite);
    Animation.Throwing = Throwing;
    Throwing.prototype.__class__ = "Animation.Throwing";
    /**
     * 弹性
     * 二维弹性
     * 弹性链
     */
    var Spring = (function (_super) {
        __extends(Spring, _super);
        function Spring() {
            _super.call(this);
            this.numBalls = 5;
            this.spring = 0.1;
            this.vx = 0;
            this.vy = 0;
            this.friction = 0.95;
            this.gravity = 0.5;
            this.mass = 10;
            this.touchX = Const.Const.stageWidth * 0.5;
            this.touchY = Const.Const.stageHeigth * 0.5;
            this.isTouching = false;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        }
        var __egretProto__ = Spring.prototype;
        __egretProto__.init = function () {
            this.width = Const.Const.stageWidth;
            this.height = Const.Const.stageHeigth;
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
            this.balls = [];
            for (var i = 0; i < this.numBalls; i++) {
                var b = new DemoObject.Ball();
                this.addChild(b);
                this.balls.push(b);
            }
            //this.ball = new DemoObject.Ball();
            //this.ball.x = this.width*0.5;
            //this.ball.y = this.height*0.5;
            this.spr = new egret.Sprite();
            //this.addChild( this.ball );
            this.addChild(this.spr);
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        };
        __egretProto__.onTouchBegin = function (evt) {
            this.isTouching = true;
            this.touchX = evt.stageX;
            this.touchY = evt.stageY;
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        };
        __egretProto__.onTouchMove = function (evt) {
            this.touchX = evt.stageX;
            this.touchY = evt.stageY;
        };
        __egretProto__.onTouchEnd = function (evt) {
            this.isTouching = false;
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        };
        __egretProto__.onEnterFrame = function (evt) {
            /* 多个小球事例*/
            if (this.isTouching) {
                this.touchX = this.touchX || Const.Const.stageWidth * 0.5;
                this.touchY = this.touchY || Const.Const.stageHeigth * 0.5;
            }
            //else
            //{
            //    this.touchX = Math.random()*Const.Const.stageWidth;
            //    this.touchY = Math.random()*Const.Const.stageHeigth;
            //}
            this.spr.graphics.clear();
            this.spr.graphics.lineStyle(2, 0xff0000);
            this.spr.graphics.moveTo(this.touchX, this.touchY);
            this.moveBall(this.balls[0], this.touchX, this.touchY);
            this.spr.graphics.lineTo(this.balls[0].x, this.balls[0].y);
            for (var i = 1; i < this.numBalls; i++) {
                var b1 = this.balls[i - 1];
                var b2 = this.balls[i];
                this.moveBall(b2, b1.x, b1.y);
                this.spr.graphics.lineTo(b2.x, b2.y);
            }
        };
        /**
         * 物体缓冲移动实现
         * @param ball
         * @param targetX
         * @param targetY
         */
        __egretProto__.moveBall = function (ball, targetX, targetY) {
            ball.vx = (targetX - ball.x) * this.spring;
            ball.vy = (targetY - ball.y) * this.spring;
            ball.vy += this.mass * this.gravity;
            ball.vx *= this.friction;
            ball.vy *= this.friction;
            ball.x += ball.vx;
            ball.y += ball.vy;
        };
        /**
         * 一个小球的列子
         */
        __egretProto__.oneBall = function () {
            var dx = this.touchX - this.ball.x;
            var dy = this.touchY - this.ball.y;
            var ax = dx * this.spring;
            var ay = dy * this.spring;
            this.vx += ax;
            this.vy += ay;
            this.vy += this.gravity * this.mass;
            this.vx *= this.friction;
            this.vy *= this.friction;
            this.ball.x += this.vx;
            this.ball.y += this.vy;
            this.spr.graphics.clear();
            this.spr.graphics.lineStyle(2, 0xff0000);
            this.spr.graphics.moveTo(this.ball.x, this.ball.y);
            this.spr.graphics.lineTo(this.touchX, this.touchY);
        };
        return Spring;
    })(egret.Sprite);
    Animation.Spring = Spring;
    Spring.prototype.__class__ = "Animation.Spring";
    /**
     * 弹性贴加2个物体
     */
    var DoubleSpring = (function (_super) {
        __extends(DoubleSpring, _super);
        function DoubleSpring() {
            _super.call(this);
            this.ball0Dragging = false;
            this.ball1Dragging = false;
            this.spring = 0.1;
            this.friction = 0.95;
            this.springLength = 100;
            this.timer = 60;
            this.oldTimer = 0;
            this.newTimer = 0;
            this.ball0OldX = 0;
            this.ball0OldY = 0;
            this.ball1OldX = 0;
            this.ball1OldY = 0;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        }
        var __egretProto__ = DoubleSpring.prototype;
        __egretProto__.init = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
            this.touchEnabled = true;
            this.width = Const.Const.stageWidth;
            this.height = Const.Const.stageHeigth;
            this.ball0 = new DemoObject.Ball();
            this.ball0.x = Math.random() * Const.Const.stageWidth;
            this.ball0.y = Math.random() * Const.Const.stageHeigth;
            this.ball0.width = this.ball0.height = 40;
            this.ball0.touchEnabled = true;
            this.ball0.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.addChild(this.ball0);
            this.ball1 = new DemoObject.Ball();
            this.ball1.x = Math.random() * Const.Const.stageWidth;
            this.ball1.y = Math.random() * Const.Const.stageHeigth;
            this.ball1.width = this.ball1.height = 40;
            this.ball1.touchEnabled = true;
            this.ball1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.addChild(this.ball1);
            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        };
        __egretProto__.onEnterFrame = function (evt) {
            this.newTimer = Date.now();
            if (this.newTimer - this.oldTimer > this.timer) {
                this.oldTimer = this.newTimer;
            }
            else {
                return;
            }
            this.squeueBall(this.ball0, -0.1);
            this.squeueBall(this.ball1, -0.1);
            if (!this.ball0Dragging) {
                this.springTo(this.ball0, this.ball1);
            }
            if (!this.ball1Dragging) {
                this.springTo(this.ball1, this.ball0);
            }
            this.graphics.clear();
            this.graphics.lineStyle(2, 0xff0000);
            this.graphics.moveTo(this.ball0.x, this.ball0.y);
            this.graphics.lineTo(this.ball1.x, this.ball1.y);
        };
        /**
         * 限制显示区域
         * @param ball
         * @param bounce
         */
        __egretProto__.squeueBall = function (ball, bounce) {
            var left = 0;
            var right = Const.Const.stageWidth;
            var top = 0;
            var bottom = Const.Const.stageHeigth;
            bounce = bounce || -1;
            if (ball.x + ball.radius > right) {
                ball.x = right - ball.radius;
                ball.vx *= bounce;
            }
            else if (ball.x - ball.radius < left) {
                ball.x = left + ball.radius;
                ball.vx *= bounce;
            }
            if (ball.y + ball.radius > bottom) {
                ball.y = bottom - ball.radius;
                ball.vy *= bounce;
            }
            else if (ball.y - ball.radius < top) {
                ball.y = top + ball.radius;
                ball.vy *= bounce;
            }
        };
        __egretProto__.springTo = function (balla, ballb) {
            var dx = ballb.x - balla.x;
            var dy = ballb.y - ballb.y;
            var angle = Math.atan2(dy, dx);
            var targetx = ballb.x - Math.cos(angle) * this.springLength;
            var targety = ballb.y - Math.sin(angle) * this.springLength;
            balla.vx += (targetx - balla.x) * this.spring;
            balla.vy += (targety - balla.y) * this.spring;
            balla.x += balla.vx * this.friction;
            balla.y += balla.vy * this.friction;
        };
        __egretProto__.onTouchBegin = function (evt) {
            if (evt.target == this.ball0) {
                this.ball0OldX = evt.stageX;
                this.ball0OldY = evt.stageY;
                this.ball0Dragging = true;
                this.ball0.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            }
            if (evt.target == this.ball1) {
                this.ball1OldX = evt.stageX;
                this.ball1OldY = evt.stageY;
                this.ball1Dragging = true;
                this.ball1.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            }
        };
        __egretProto__.onTouchMove = function (evt) {
            if (evt.target == this.ball0) {
                this.ball0.x += evt.stageX - this.ball0OldX;
                this.ball0OldX = evt.stageX;
                this.ball0.y += evt.stageY - this.ball0OldY;
                this.ball0OldY = evt.stageY;
            }
            if (evt.target == this.ball1) {
                this.ball1.x += evt.stageX - this.ball1OldX;
                this.ball1OldX = evt.stageX;
                this.ball1.y += evt.stageY - this.ball1OldY;
                this.ball1OldY = evt.stageY;
            }
        };
        __egretProto__.onTouchEnd = function (evt) {
            this.ball0.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.ball1.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.ball0Dragging = false;
            this.ball1Dragging = false;
        };
        return DoubleSpring;
    })(egret.Sprite);
    Animation.DoubleSpring = DoubleSpring;
    DoubleSpring.prototype.__class__ = "Animation.DoubleSpring";
    /**
     * 多物体弹性碰撞
     * 碰撞检测
     */
    var Bubbles = (function (_super) {
        __extends(Bubbles, _super);
        function Bubbles() {
            _super.call(this);
            this.numBalls = 30;
            this.bounce = -0.5;
            this.spring = 0.05;
            this.gravity = 0.1;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        }
        var __egretProto__ = Bubbles.prototype;
        __egretProto__.init = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
            this.balls = [];
            for (var i = 0; i < this.numBalls; i++) {
                var ball = new DemoObject.Ball(Math.random() * 30 + 20, Math.random() * 0xffffff);
                ball.x = Math.random() * Const.Const.stageWidth;
                ball.y = Math.random() * Const.Const.stageHeigth;
                ball.vx = Math.random() * 6 - 3;
                ball.vy = Math.random() * 6 - 3;
                this.addChild(ball);
                this.balls.push(ball);
            }
            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        };
        __egretProto__.onEnterFrame = function (evt) {
            for (var i = 0; i < this.numBalls - 1; i++) {
                var ball0 = this.balls[i];
                for (var j = i + 1; j < this.numBalls; j++) {
                    var ball1 = this.balls[j];
                    var dx = ball1.x - ball0.x;
                    var dy = ball1.y - ball0.y;
                    var dist = Math.sqrt(dy * dy + dx * dx);
                    var minDist = ball0.radius + ball1.radius;
                    if (dist < minDist) {
                        var tx = ball0.x + dx / dist * minDist;
                        var ty = ball0.y + dy / dist * minDist;
                        var ax = (tx - ball1.x) * this.spring;
                        var ay = (ty - ball1.y) * this.spring;
                        ball0.vx -= ax;
                        ball0.vy -= ay;
                        ball1.vx += ax;
                        ball1.vy += ay;
                    }
                }
            }
            for (var i = 0; i < this.numBalls; i++) {
                var ball = this.balls[i];
                this.move(ball);
            }
        };
        /**
         * 限制显示范围
         * @param ball
         */
        __egretProto__.move = function (ball) {
            ball.vy += this.gravity;
            ball.x += ball.vx;
            ball.y += ball.vy;
            var left = 0;
            var right = Const.Const.stageWidth;
            var top = 0;
            var bottom = Const.Const.stageHeigth;
            if (ball.x + ball.radius > right) {
                ball.x = right - ball.radius;
                ball.vx *= this.bounce;
            }
            else if (ball.x - ball.radius < left) {
                ball.x = left + ball.radius;
                ball.vx *= this.bounce;
            }
            if (ball.y + ball.radius > bottom) {
                ball.y = bottom - ball.radius;
                ball.vy *= this.bounce;
            }
            else if (ball.y - ball.radius < top) {
                ball.y = top + ball.radius;
                ball.vy *= this.bounce;
            }
        };
        return Bubbles;
    })(egret.Sprite);
    Animation.Bubbles = Bubbles;
    Bubbles.prototype.__class__ = "Animation.Bubbles";
    /**
     * 坐标旋转
     */
    var Rotate = (function (_super) {
        __extends(Rotate, _super);
        function Rotate() {
            _super.call(this);
            this.numBalls = 10;
            this.vr = 0.05;
            this.touchX = 0;
            this.touchY = 0;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        }
        var __egretProto__ = Rotate.prototype;
        __egretProto__.init = function (evt) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
            this.width = Const.Const.stageWidth;
            this.height = Const.Const.stageHeigth;
            this.balls = [];
            for (var i = 0; i < this.numBalls; i++) {
                var ball = new DemoObject.Ball(Math.random() * 20 + 5, Math.random() * 0xffffff);
                this.balls.push(ball);
                this.addChild(ball);
                ball.x = Math.random() * Const.Const.stageWidth;
                ball.y = Math.random() * Const.Const.stageHeigth;
            }
            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        };
        __egretProto__.onTouchBegin = function (evt) {
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        };
        __egretProto__.onTouchMove = function (evt) {
            this.touchX = evt.stageX;
            this.touchY = evt.stageY;
        };
        __egretProto__.onTouchEnd = function (evt) {
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        };
        __egretProto__.onEnterFrame = function (evt) {
            var angle = (this.touchX - Const.Const.stageWidth * 0.5) * 0.001;
            var cos = Math.cos(angle);
            var sin = Math.sin(angle);
            for (var i = 0; i < this.numBalls; i++) {
                var ball = this.balls[i];
                var x1 = ball.x - Const.Const.stageWidth * 0.5;
                var y1 = ball.y - Const.Const.stageHeigth * 0.5;
                var x2 = cos * x1 - sin * y1;
                var y2 = cos * y1 + sin * x1;
                ball.x = Const.Const.stageWidth * 0.5 + x2;
                ball.y = Const.Const.stageHeigth * 0.5 + y2;
            }
        };
        return Rotate;
    })(egret.Sprite);
    Animation.Rotate = Rotate;
    Rotate.prototype.__class__ = "Animation.Rotate";
    /**
     * 角度回弹
     */
    var AngleBounce = (function (_super) {
        __extends(AngleBounce, _super);
        function AngleBounce() {
            _super.call(this);
            this.gravity = 0.3;
            this.bounce = -0.6;
            this.touchX = 0;
            this.touchY = 0;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        }
        var __egretProto__ = AngleBounce.prototype;
        __egretProto__.init = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
            this.ball = new DemoObject.Ball();
            this.addChild(this.ball);
            this.width = Const.Const.stageWidth;
            this.height = Const.Const.stageHeigth;
            this.ball.x = 100;
            this.ball.y = 10;
            this.line = new egret.Sprite();
            this.line.graphics.lineStyle(2, 0xff0000);
            this.line.graphics.lineTo(300, 0);
            this.addChild(this.line);
            this.line.x = 50;
            this.line.y = 200;
            this.line.rotation = 30;
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        };
        __egretProto__.onTouchBegin = function (evt) {
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        };
        __egretProto__.onTouchMove = function (evt) {
            this.touchX = evt.stageX;
            this.touchY = evt.stageY;
        };
        __egretProto__.onTouchEnd = function (evt) {
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        };
        __egretProto__.onEnterFrame = function (evt) {
            this.ball.vy += this.gravity;
            this.ball.x += this.ball.vx;
            this.ball.y += this.ball.vy;
            this.line.rotation = (Const.Const.stageWidth * 0.5 - this.touchX) * 0.1;
            this.angle = this.line.rotation * Math.PI / 180;
            this.cos = Math.cos(this.angle);
            this.sin = Math.sin(this.angle);
            var x1 = this.ball.x - this.line.x;
            var y1 = this.ball.y - this.line.y;
            var x2 = this.cos * x1 + this.sin * y1;
            var y2 = this.cos * y1 - this.sin * x1;
            var vx1 = this.cos * this.ball.vx + this.sin * this.ball.vy;
            var vy1 = this.cos * this.ball.vy - this.sin * this.ball.vx;
            if (this.ball.x < this.line.x || this.ball.x > this.line.x + this.cos * 300) {
                this.move(this.ball);
                return;
            }
            if (y2 > 0 && y2 < vy1) {
                y2 = 0;
                vy1 *= this.bounce;
                x1 = this.cos * x2 - this.sin * y2;
                y1 = this.cos * y2 + this.sin * x2;
                this.ball.vx = this.cos * vx1 - this.sin * vy1;
                this.ball.vy = this.cos * vy1 + this.sin * vx1;
                this.ball.x = this.line.x + x1;
                this.ball.y = this.line.y + y1;
            }
            this.move(this.ball);
        };
        /**
         * 限制显示范围
         * @param ball
         */
        __egretProto__.move = function (ball) {
            //ball.vy += this.gravity;
            //ball.x += ball.vx;
            //ball.y += ball.vy;
            var left = 0;
            var right = Const.Const.stageWidth;
            var top = 0;
            var bottom = Const.Const.stageHeigth;
            if (ball.x + ball.radius > right) {
                ball.x = right - ball.radius;
                ball.vx *= this.bounce;
            }
            else if (ball.x - ball.radius < left) {
                ball.x = left + ball.radius;
                ball.vx *= this.bounce;
            }
            if (ball.y + ball.radius > bottom) {
                ball.y = bottom - ball.radius;
                ball.vy *= this.bounce;
            }
            else if (ball.y - ball.radius < top) {
                ball.y = top + ball.radius;
                ball.vy *= this.bounce;
            }
        };
        return AngleBounce;
    })(egret.Sprite);
    Animation.AngleBounce = AngleBounce;
    AngleBounce.prototype.__class__ = "Animation.AngleBounce";
    /**
     * 多物体角度回弹
     */
    var MultiAngleBounce = (function (_super) {
        __extends(MultiAngleBounce, _super);
        function MultiAngleBounce() {
            _super.call(this);
            this.numLines = 5;
            this.gravity = 0.3;
            this.bounce = -0.6;
            this.angle = 1;
            this.cos = 0;
            this.sin = 0;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        }
        var __egretProto__ = MultiAngleBounce.prototype;
        __egretProto__.init = function (evt) {
            this.ball = new DemoObject.Ball();
            this.addChild(this.ball);
            this.ball.x = 100;
            this.ball.y = 10;
            this.lines = [];
            for (var i = 0; i < this.numLines; i++) {
                var line = new egret.Sprite();
                line.graphics.lineStyle(2, 0xff0000);
                line.graphics.moveTo(-50, 0);
                line.graphics.lineTo(50, 0);
                this.addChild(line);
                this.lines.push(line);
            }
            this.lines[0].x = 100;
            this.lines[0].y = 100;
            this.lines[0].rotation = 30;
            this.lines[1].x = 100;
            this.lines[1].y = 230;
            this.lines[1].rotation = 45;
            this.lines[2].x = 200;
            this.lines[2].y = 180;
            this.lines[2].rotation = -30;
            this.lines[3].x = 150;
            this.lines[3].y = 330;
            this.lines[3].rotation = 10;
            this.lines[4].x = 230;
            this.lines[4].y = 350;
            this.lines[4].rotation = -30;
            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        };
        __egretProto__.onEnterFrame = function (evt) {
            this.ball.vy += this.gravity;
            this.ball.x += this.ball.vx;
            this.ball.y += this.ball.vy;
            this.move(this.ball);
            for (var i = 0; i < this.numLines; i++) {
                this.checkLine(this.lines[i]);
            }
        };
        /**
         * 限制显示范围
         * @param ball
         */
        __egretProto__.move = function (ball) {
            //ball.vy += this.gravity;
            //ball.x += ball.vx;
            //ball.y += ball.vy;
            var left = 0;
            var right = Const.Const.stageWidth;
            var top = 0;
            var bottom = Const.Const.stageHeigth;
            if (ball.x + ball.radius > right) {
                ball.x = right - ball.radius;
                ball.vx *= this.bounce;
            }
            else if (ball.x - ball.radius < left) {
                ball.x = left + ball.radius;
                ball.vx *= this.bounce;
            }
            if (ball.y + ball.radius > bottom) {
                ball.y = bottom - ball.radius;
                ball.vy *= this.bounce;
            }
            else if (ball.y - ball.radius < top) {
                ball.y = top + ball.radius;
                ball.vy *= this.bounce;
            }
        };
        /**
         * 检测每条线的碰撞
         * @param line
         */
        __egretProto__.checkLine = function (line) {
            this.angle = line.rotation * Math.PI / 180;
            this.cos = Math.cos(this.angle);
            this.sin = Math.sin(this.angle);
            var x1 = this.ball.x - line.x;
            var y1 = this.ball.y - line.y;
            var x2 = this.cos * x1 + this.sin * y1;
            var y2 = this.cos * y1 - this.sin * x1;
            //
            var vx1 = this.cos * this.ball.vx + this.sin * this.ball.vy;
            var vy1 = this.cos * this.ball.vy - this.sin * this.ball.vx;
            /*判断是否碰撞*/
            if (this.ball.x < line.x || this.ball.x > line.x + this.cos * 100) {
                this.move(this.ball);
                return;
            }
            if (y2 > 0 && y2 < vy1) {
                y2 = 0;
                vy1 *= this.bounce;
                x1 = this.cos * x2 - this.sin * y2;
                y1 = this.cos * y2 + this.sin * x2;
                this.ball.vx = this.cos * vx1 - this.sin * vy1;
                this.ball.vy = this.cos * vy1 + this.sin * vx1;
                this.ball.x = line.x + x1;
                this.ball.y = line.y + y1;
            }
            //this.move( this.ball );
        };
        return MultiAngleBounce;
    })(egret.Sprite);
    Animation.MultiAngleBounce = MultiAngleBounce;
    MultiAngleBounce.prototype.__class__ = "Animation.MultiAngleBounce";
    /**
     * 台球物理动量守恒定律
     */
    var Billiard = (function (_super) {
        __extends(Billiard, _super);
        function Billiard() {
            _super.call(this);
            this.bounce = -1;
            this.addEventListener(egret.Event.ENTER_FRAME, this.init, this);
        }
        var __egretProto__ = Billiard.prototype;
        __egretProto__.init = function (evt) {
            this.removeEventListener(egret.Event.ENTER_FRAME, this.init, this);
            this.width = Const.Const.stageWidth;
            this.height = Const.Const.stageHeigth;
            this.ball0 = new DemoObject.Ball(50, 0x00ff00);
            this.ball0.mass = 2;
            this.ball0.x = Const.Const.stageWidth - 200;
            this.ball0.y = Const.Const.stageHeigth - 200;
            this.ball0.vx = Math.random() * 10 - 5;
            this.ball0.vy = Math.random() * 10 - 5;
            this.addChild(this.ball0);
            this.ball1 = new DemoObject.Ball(20);
            this.ball1.mass = 1;
            this.ball1.x = 100;
            this.ball1.y = 100;
            this.ball1.vx = Math.random() * 10 - 5;
            this.ball1.vy = Math.random() * 10 - 5;
            this.addChild(this.ball1);
            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        };
        __egretProto__.onEnterFrame = function (evt) {
            this.ball0.x += this.ball0.vx;
            this.ball0.y += this.ball0.vy;
            this.ball1.x += this.ball1.vx;
            this.ball1.y += this.ball1.vy;
            this.checkCollision(this.ball0, this.ball1);
            this.checkWalls(this.ball0);
            this.checkWalls(this.ball1);
        };
        /**
         * 两球碰撞检测
         * @param ball0
         * @param ball1
         */
        __egretProto__.checkCollision = function (ball0, ball1) {
            var dx = ball0.x - ball1.x;
            var dy = ball0.y - ball1.y;
            var dis = Math.sqrt(dx * dx + dy * dy);
            /*碰撞处理*/
            if (dis < ball0.radius + ball1.radius) {
                var angle = Math.atan2(dy, dx);
                var sin = Math.sin(angle);
                var cos = Math.cos(angle);
                //var pos0:egret.Point = new egret.Point(0,0);
                //var pos1:egret.Point = this.rotate(dx,dy,sin,cos,true);
                var vel0 = this.rotate(ball0.vx, ball0.vy, sin, cos, true);
                var vel1 = this.rotate(ball1.vx, ball1.vy, sin, cos, true);
                var vxTotal = vel0.x - vel1.x;
                vel0.x = ((ball0.mass - ball1.mass) * vel0.x + 2 * ball1.mass * vel1.x) / (ball0.mass + ball1.mass);
                vel1.x = vxTotal + vel0.x;
                //pos0.x += vel0.x;
                //pos1.x += vel1.x;
                var vyTotal = vel0.y - vel1.y;
                vel0.y = ((ball0.mass - ball1.mass) * vel0.y + 2 * ball1.mass * vel1.y) / (ball0.mass + ball1.mass);
                vel1.y = vyTotal + vel0.y;
                //pos0.y += vel0.y;
                //pos1.y += vel1.y;
                //var pos0F:egret.Point = this.rotate(pos0.x,pos0.y,sin,cos,false);
                //var pos1F:egret.Point = this.rotate(pos1.x,pos1.y,sin,cos,false);
                var vel0F = this.rotate(vel0.x, vel0.y, sin, cos, false);
                var vel1F = this.rotate(vel1.x, vel1.y, sin, cos, false);
                ball0.vx = vel0F.x;
                ball0.vy = vel0F.y;
                ball1.vx = vel1F.x;
                ball1.vy = vel1F.y;
            }
        };
        __egretProto__.rotate = function (x, y, sin, cos, reverse) {
            var result = new egret.Point();
            if (reverse) {
                result.x = x * cos + y * sin;
                result.y = y * cos - x * sin;
            }
            else {
                result.x = x * cos - y * sin;
                result.y = y * cos + x * sin;
            }
            return result;
        };
        /**
         * 检测与四周环境碰撞
         * @param ball
         */
        __egretProto__.checkWalls = function (ball) {
            var left = 0;
            var right = Const.Const.stageWidth;
            var top = 0;
            var bottom = Const.Const.stageHeigth;
            if (ball.x + ball.radius > right) {
                ball.x = right - ball.radius;
                ball.vx *= this.bounce;
            }
            else if (ball.x - ball.radius < left) {
                ball.x = left + ball.radius;
                ball.vx *= this.bounce;
            }
            if (ball.y + ball.radius > bottom) {
                ball.y = bottom - ball.radius;
                ball.vy *= this.bounce;
            }
            else if (ball.y - ball.radius < top) {
                ball.y = top + ball.radius;
                ball.vy *= this.bounce;
            }
        };
        return Billiard;
    })(egret.Sprite);
    Animation.Billiard = Billiard;
    Billiard.prototype.__class__ = "Animation.Billiard";
    /**
     * 粒子引力和重力
     */
    var Particle = (function (_super) {
        __extends(Particle, _super);
        function Particle() {
            _super.call(this);
            this.bounce = -1;
            this.numParticle = 3;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        }
        var __egretProto__ = Particle.prototype;
        __egretProto__.init = function (evt) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
            this.width = Const.Const.stageWidth;
            this.height = Const.Const.stageHeigth;
            this.particles = [];
            for (var i = 0; i < this.numParticle; i++) {
                var size = Math.random() * 25 + 5;
                var particle = new DemoObject.Ball(size);
                particle.x = Math.random() * Const.Const.stageWidth;
                particle.y = Math.random() * Const.Const.stageHeigth;
                particle.mass = size;
                this.addChild(particle);
                this.particles.push(particle);
            }
            this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        };
        __egretProto__.onEnterFrame = function (evt) {
            for (var i = 0; i < this.numParticle; i++) {
                var particle = this.particles[i];
                particle.x += particle.vx;
                particle.y += particle.vy;
                this.checkWalls(particle);
            }
            for (var i = 0; i < this.numParticle - 1; i++) {
                var partA = this.particles[i];
                for (var j = i + 1; j < this.numParticle; j++) {
                    var partB = this.particles[j];
                    this.checkCollision(partA, partB);
                    this.gravitate(partA, partB);
                }
            }
        };
        /**
         * 检测与四周环境碰撞
         * @param ball
         */
        __egretProto__.checkWalls = function (ball) {
            var left = 0;
            var right = Const.Const.stageWidth;
            var top = 0;
            var bottom = Const.Const.stageHeigth;
            if (ball.x + ball.radius > right) {
                ball.x = right - ball.radius;
                ball.vx *= this.bounce;
            }
            else if (ball.x - ball.radius < left) {
                ball.x = left + ball.radius;
                ball.vx *= this.bounce;
            }
            if (ball.y + ball.radius > bottom) {
                ball.y = bottom - ball.radius;
                ball.vy *= this.bounce;
            }
            else if (ball.y - ball.radius < top) {
                ball.y = top + ball.radius;
                ball.vy *= this.bounce;
            }
        };
        /**
         * 计算两物体之间引力
         * @param ballA
         * @param ballB
         */
        __egretProto__.gravitate = function (ballA, ballB) {
            var dx = ballB.x - ballA.x;
            var dy = ballB.y - ballA.y;
            var distSQ = dx * dx + dy * dy;
            var dist = Math.sqrt(distSQ);
            var force = ballA.mass * ballB.mass / distSQ;
            var ax = force * dx / dist;
            var ay = force * dy / dist;
            ballA.vx += ax / ballA.mass;
            ballA.vy += ay / ballA.mass;
            ballB.vx -= ax / ballB.mass;
            ballB.vy -= ay / ballB.mass;
        };
        /**
         * 两球碰撞检测
         * @param ball0
         * @param ball1
         */
        __egretProto__.checkCollision = function (ball0, ball1) {
            var dx = ball0.x - ball1.x;
            var dy = ball0.y - ball1.y;
            var dis = Math.sqrt(dx * dx + dy * dy);
            /*碰撞处理*/
            if (dis < ball0.radius + ball1.radius) {
                var angle = Math.atan2(dy, dx);
                var sin = Math.sin(angle);
                var cos = Math.cos(angle);
                //var pos0:egret.Point = new egret.Point(0,0);
                //var pos1:egret.Point = this.rotate(dx,dy,sin,cos,true);
                var vel0 = this.rotate(ball0.vx, ball0.vy, sin, cos, true);
                var vel1 = this.rotate(ball1.vx, ball1.vy, sin, cos, true);
                var vxTotal = vel0.x - vel1.x;
                vel0.x = ((ball0.mass - ball1.mass) * vel0.x + 2 * ball1.mass * vel1.x) / (ball0.mass + ball1.mass);
                vel1.x = vxTotal + vel0.x;
                //pos0.x += vel0.x;
                //pos1.x += vel1.x;
                var vyTotal = vel0.y - vel1.y;
                vel0.y = ((ball0.mass - ball1.mass) * vel0.y + 2 * ball1.mass * vel1.y) / (ball0.mass + ball1.mass);
                vel1.y = vyTotal + vel0.y;
                //pos0.y += vel0.y;
                //pos1.y += vel1.y;
                //var pos0F:egret.Point = this.rotate(pos0.x,pos0.y,sin,cos,false);
                //var pos1F:egret.Point = this.rotate(pos1.x,pos1.y,sin,cos,false);
                var vel0F = this.rotate(vel0.x, vel0.y, sin, cos, false);
                var vel1F = this.rotate(vel1.x, vel1.y, sin, cos, false);
                ball0.vx = vel0F.x;
                ball0.vy = vel0F.y;
                ball1.vx = vel1F.x;
                ball1.vy = vel1F.y;
            }
        };
        __egretProto__.rotate = function (x, y, sin, cos, reverse) {
            var result = new egret.Point();
            if (reverse) {
                result.x = x * cos + y * sin;
                result.y = y * cos - x * sin;
            }
            else {
                result.x = x * cos - y * sin;
                result.y = y * cos + x * sin;
            }
            return result;
        };
        return Particle;
    })(egret.Sprite);
    Animation.Particle = Particle;
    Particle.prototype.__class__ = "Animation.Particle";
})(Animation || (Animation = {}));
