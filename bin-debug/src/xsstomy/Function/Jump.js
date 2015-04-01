/**
 * Created by xiashishi on 15/4/1.
 */
var Fun;
(function (Fun) {
    var Jump = (function (_super) {
        __extends(Jump, _super);
        function Jump(jumper) {
            _super.call(this);
            this.startSpeed = -20;
            this.gravity = 0.98; //重力
            this._jumper = jumper;
            this.init();
        }
        var __egretProto__ = Jump.prototype;
        __egretProto__.init = function () {
            this.width = egret.MainContext.instance.stage.stageWidth;
            this.height = egret.MainContext.instance.stage.stageHeight;
            this._jumper.x = this.width * 0.5;
            this._jumper.y = this.height * 0.5;
            this.startLine = this.height * 0.5;
            if (this._jumper)
                this.addChild(this._jumper);
        };
        __egretProto__.active = function () {
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.jump, this);
        };
        __egretProto__.jump = function () {
            this._vy = this.startSpeed;
            if (!this.hasEventListener(egret.Event.ENTER_FRAME))
                this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        };
        __egretProto__.onEnterFrame = function (evt) {
            this._vy += this.gravity;
            this._jumper.y += this._vy;
            this.isFloor();
        };
        __egretProto__.isFloor = function () {
            if (this._jumper.y > this.startLine) {
                this._jumper.y = this.startLine;
                this._vy = 0;
                this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            }
        };
        __egretProto__.hitTest = function () {
            _super.prototype.hitTest.call(this, 0, 0, true);
        };
        return Jump;
    })(egret.Sprite);
    Fun.Jump = Jump;
    Jump.prototype.__class__ = "Fun.Jump";
})(Fun || (Fun = {}));
