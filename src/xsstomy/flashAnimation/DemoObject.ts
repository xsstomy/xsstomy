/**
 * Created by xiashishi on 15/1/17.
 */
module DemoObject
{
    export class Ball extends egret.Sprite
    {
        public constructor(radius?:number,color?:any)
        {
            super();
            this.radius = radius||20;
            this.color = color||0xff0000;
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
        }
        public radius:number = 0;
        public startX:number = 0;
        public startY:number = 0;
        public mass:number = 0;
        public vx:number = 0;
        public vy:number = 0;
        public color:any;
        private init():void
        {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
            var spr:egret.Sprite  = new egret.Sprite();
            spr.graphics.beginFill(this.color,0.5);
            spr.graphics.drawCircle(this.startX,this.startY,this.radius);
            spr.graphics.endFill();
            this.addChild(spr);
        }
    }

    export class Segment extends egret.Sprite
    {
        public segmentWidth:number;
        public segmentHeight:number;
        public color:any;
        public vx:number = 0;
        public vy:number = 0;
        public constructor(segmentWidth:number,segmentHeight:number,color:any = 0xffffff)
        {
            super();
            this.segmentHeight = segmentHeight;
            this.segmentWidth = segmentWidth;
            this.color = color;
            this.init();
        }

        private init():void
        {
            this.graphics.lineStyle(0);
            this.graphics.beginFill(this.color);
            this.graphics.drawRoundRect(-this.segmentHeight*0.5,
            -this.segmentHeight*0.5,
            this.segmentHeight+this.segmentWidth,
            this.segmentHeight,
            this.segmentHeight,
            this.segmentHeight);
            this.graphics.endFill();
            this.graphics.lineStyle(1);
            this.graphics.drawCircle(0,0,2);
            this.graphics.endFill();
            this.graphics.lineStyle(1);
            this.graphics.drawCircle(this.segmentWidth,0,2);
            this.graphics.endFill();
        }

        public getPoint():egret.Point
        {
            var angle:number = this.rotation*Math.PI/180;
            var posX:number = this.x +Math.cos(angle)*this.segmentWidth;
            var posY:number = this.y + Math.sin(angle)*this.segmentHeight;
            return new egret.Point(posX,posY);
        }
    }

    /**
     * 3d球
     */
    export class Ball3D extends egret.Sprite
    {
        public constructor(radius:number = 40,color:any = 0xff0000)
        {
            super();
            this.color = color;
            this.radius = radius;
            this.init();
        }

        public radius:number;
        private color:any;
        public xpos:number = 0;
        public ypos:number = 0;
        public zpos:number = 0;
        public vx:number = 0;
        public vy:number = 0;
        public vz:number = 0;
        public mass:number = 0;

        public init()
        {
            this.graphics.beginFill(this.color);
            this.graphics.drawCircle(0,0,this.radius);
            this.graphics.endFill();
        }
    }

    /**
     * 树
     */
    export class Tree extends egret.Sprite
    {
         xPos:number = 0;
         yPos:number = 0;
         zPos:number = 0;
        private _color:any;
        constructor(color:any = 0xffffff)
        {
            super();
            this._color = color;
            this.init();
        }

        private init()
        {
            this.graphics.lineStyle(2,this._color);
            this.graphics.lineTo(0,-140 - Math.random()*20);
            this.graphics.moveTo(0,-30 - Math.random()*30 );
            this.graphics.lineTo(Math.random() * 80 - 40, -100 - Math.random() * 40 );
            this.graphics.moveTo( 0, -60 - Math.random() * 40 );
            this.graphics.lineTo( Math.random() * 60 - 30, -110 - Math.random() * 20 );
        }
    }
}