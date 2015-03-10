var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by xiashishi on 15/1/17.
 */
var DemoObject;
(function (DemoObject) {
    var Ball = (function (_super) {
        __extends(Ball, _super);
        function Ball(radius, color) {
            _super.call(this);
            this.radius = 0;
            this.startX = 0;
            this.startY = 0;
            this.mass = 0;
            this.vx = 0;
            this.vy = 0;
            this.radius = radius || 20;
            this.color = color || 0xff0000;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        }
        Ball.prototype.init = function () {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
            var spr = new egret.Sprite();
            spr.graphics.beginFill(this.color, 0.5);
            spr.graphics.drawCircle(this.startX, this.startY, this.radius);
            spr.graphics.endFill();
            this.addChild(spr);
        };
        return Ball;
    })(egret.Sprite);
    DemoObject.Ball = Ball;
    Ball.prototype.__class__ = "DemoObject.Ball";
    var Segment = (function (_super) {
        __extends(Segment, _super);
        function Segment(segmentWidth, segmentHeight, color) {
            if (color === void 0) { color = 0xffffff; }
            _super.call(this);
            this.vx = 0;
            this.vy = 0;
            this.segmentHeight = segmentHeight;
            this.segmentWidth = segmentWidth;
            this.color = color;
            this.init();
        }
        Segment.prototype.init = function () {
            this.graphics.lineStyle(0);
            this.graphics.beginFill(this.color);
            this.graphics.drawRoundRect(-this.segmentHeight * 0.5, -this.segmentHeight * 0.5, this.segmentHeight + this.segmentWidth, this.segmentHeight, this.segmentHeight, this.segmentHeight);
            this.graphics.endFill();
            this.graphics.lineStyle(1);
            this.graphics.drawCircle(0, 0, 2);
            this.graphics.endFill();
            this.graphics.lineStyle(1);
            this.graphics.drawCircle(this.segmentWidth, 0, 2);
            this.graphics.endFill();
        };
        Segment.prototype.getPoint = function () {
            var angle = this.rotation * Math.PI / 180;
            var posX = this.x + Math.cos(angle) * this.segmentWidth;
            var posY = this.y + Math.sin(angle) * this.segmentHeight;
            return new egret.Point(posX, posY);
        };
        return Segment;
    })(egret.Sprite);
    DemoObject.Segment = Segment;
    Segment.prototype.__class__ = "DemoObject.Segment";
    var Ball3D = (function (_super) {
        __extends(Ball3D, _super);
        function Ball3D(radius, color) {
            if (radius === void 0) { radius = 40; }
            if (color === void 0) { color = 0xff0000; }
            _super.call(this);
            this.xpos = 0;
            this.ypos = 0;
            this.zpos = 0;
            this.vx = 0;
            this.vy = 0;
            this.vz = 0;
            this.mass = 0;
            this.color = color;
            this.radius = radius;
            this.init();
        }
        Ball3D.prototype.init = function () {
            this.graphics.beginFill(this.color);
            this.graphics.drawCircle(0, 0, this.radius);
            this.graphics.endFill();
        };
        return Ball3D;
    })(egret.Sprite);
    DemoObject.Ball3D = Ball3D;
    Ball3D.prototype.__class__ = "DemoObject.Ball3D";
})(DemoObject || (DemoObject = {}));
