var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by xiashishi on 15/2/4.
 */
var Util;
(function (Util) {
    var Paper = (function (_super) {
        __extends(Paper, _super);
        function Paper(width, height) {
            _super.call(this);
            this._lastP = new egret.Point(0, 0);
            this._color = 0xFF0000;
            this._time = 0;
            this.draw_interval = 100;
            this._lineWidth = 20;
            this._drawEnable = false;
            this.createView(width, height);
        }
        Paper.prototype.createView = function (width, height) {
            this.graphics.beginFill(0x666666);
            this.graphics.drawRect(0, 0, width, height);
            this.graphics.endFill();
            this.width = width, this.height = height;
            this.addListeners();
            this.touchEnabled = true;
        };
        Paper.prototype.dispose = function () {
            this.removeListeners();
            this.graphics.clear();
        };
        Paper.prototype.addListeners = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
        };
        Paper.prototype.removeListeners = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
        };
        Paper.prototype.touchHandler = function (e) {
            switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
                    this._time = egret.getTimer();
                    this._lastP.x = e.localX;
                    this._lastP.y = e.localY;
                    this.graphics.moveTo(this._lastP.x, this._lastP.y);
                    this.graphics.lineStyle(this._lineWidth, this._color, 1, true, "normal", "round", "round");
                    this._drawEnable = true;
                    break;
                case egret.TouchEvent.TOUCH_MOVE:
                    var nowTime = egret.getTimer();
                    if (this._drawEnable && nowTime - this._time >= this.draw_interval) {
                        this.graphics.lineStyle(this._lineWidth, this._color, 1, true, "normal", "round", "round");
                        this.graphics.lineTo(e.localX, e.localY);
                        this.graphics.moveTo(e.localX, e.localY);
                        this._lastP.x = e.localX;
                        this._lastP.y = e.localY;
                        this._time = nowTime;
                    }
                    break;
                case egret.TouchEvent.TOUCH_END:
                    this._drawEnable = false;
                    break;
            }
        };
        return Paper;
    })(egret.Sprite);
    Util.Paper = Paper;
    Paper.prototype.__class__ = "Util.Paper";
})(Util || (Util = {}));
