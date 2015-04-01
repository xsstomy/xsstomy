/**
 * Created by xiashishi on 15/4/1.
 */

module Fun
{
    export class Jump extends egret.Sprite
    {
        private _jumper:any;
        private _vy:number ;
        constructor(jumper:any)
        {
            super();
            this._jumper = jumper;
            this.init();
        }
        private startSpeed:number = -20;
        private gravity:number = 0.98;//重力
        private startLine:number ;//起跳线
        private init()
        {
            this.width = egret.MainContext.instance.stage.stageWidth;
            this.height = egret.MainContext.instance.stage.stageHeight;

            this._jumper.x = this.width * 0.5;
            this._jumper.y = this.height * 0.5;
            this.startLine = this.height * 0.5;
            if(this._jumper)
            this.addChild(this._jumper);
        }

        active()
        {
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.jump,this);
        }
        private jump()
        {
            this._vy = this.startSpeed;

            if(!this.hasEventListener(egret.Event.ENTER_FRAME))
            this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
        }

        private onEnterFrame(evt:egret.Event)
        {
            this._vy += this.gravity;
            this._jumper.y += this._vy;
            this.isFloor();
        }
        private isFloor()
        {
            if( this._jumper.y > this.startLine)
            {
                this._jumper.y = this.startLine;
                this._vy = 0;
                this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
            }
        }


    }
}