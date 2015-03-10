/**
 * Created by xiashishi on 15/2/4.
 */
module Util
{
    /**
     * 原生绘制，绘制一张绘图画布
     * 需要初始绘图画布的宽高
     */
    export class Paper extends egret.Sprite {

        private _lastP: egret.Point = new egret.Point(0, 0);
        private _color: number = 0xFF0000;
        private _time: number = 0;
        private draw_interval: number = 100;
        private _lineWidth: number = 20;
        private _drawEnable: boolean = false;


        public constructor(width:number, height:number) {
            super();
            this.createView(width, height);

        }

        private createView(width: number, height: number): void {

            this.graphics.beginFill(0x666666);
            this.graphics.drawRect(0, 0, width, height);
            this.graphics.endFill();
            this.width = width, this.height = height;

            this.addListeners();
            this.touchEnabled = true;
        }

        public dispose(): void {
            this.removeListeners();
            this.graphics.clear();

        }

        private addListeners(): void {
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
        }

        private removeListeners(): void {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchHandler, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchHandler, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchHandler, this);
        }

        private touchHandler(e: egret.TouchEvent): void {
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
                    var nowTime: number = egret.getTimer();
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
        }
    }
}