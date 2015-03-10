/**
 * Created by xiashishi on 15/1/17.
 */
module Animation{
    /**
     * 用户交互第一个demo
     * actionsrcipt 转egret
     *
     */
    export class Throwing extends egret.Sprite
    {
        public constructor()
        {
            super();
            this.init();
        }
        private ball:DemoObject.Ball;
        private  vx:number;
        private  vy:number;
        private bounce:number = -0.7;
        private gravity:number = 0.5;
        private oldX:number;
        private oldY:number;

        private init():void
        {
            this.ball = new DemoObject.Ball();
            this.ball.x = Const.Const.stageWidth*0.5;
            this.ball.y = Const.Const.stageHeigth*0.5;

            this.vx = Math.random()*10 - 5;
            this.vy = -10;
            this.width = Const.Const.stageWidth;
            this.height = Const.Const.stageHeigth;
            this.touchEnabled = true;
            this.addChild( this.ball );
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
            this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
        }

        private onEnterFrame(evt:egret.TouchEvent):void
        {
            this.vy += this.gravity;
            this.ball.x += this.vx;
            this.ball.y += this.vy;

            var left:number = 0;
            var right:number = Const.Const.stageWidth;
            var top:number = 0;
            var bottom:number = Const.Const.stageHeigth;

            if(this.ball.x +this.ball.radius > right)
            {
                this.ball.x = right - this.ball.radius;
                this.vx *= this.bounce;
            }
            else if( this.ball.x - this.ball.radius < left)
            {
                this.ball.x = left+this.ball.radius;
                this.vx *= this.bounce;
            }

            if( this.ball.y + this.ball.radius >bottom)
            {
                this.ball.y = bottom - this.ball.radius;
                this.vy *= this.bounce;
            }
            else if( this.ball.y - this.ball.radius < top)
            {
                this.ball.y = top + this.ball.radius;
                this.vy *= this.bounce;
            }
        }

        private oldStageX:number;
        private oldStageY:number;
        private onTouchBegin(evt:egret.TouchEvent):void
        {
            this.vx = 0;
            this.vy = 0;
            this.oldX = this.ball.x;
            this.oldY = this.ball.y;
            this.oldStageX = evt.stageX;
            this.oldStageY = evt.stageY;
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
            this.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
            this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
            this.addEventListener(egret.Event.ENTER_FRAME,this.trackVelocity,this);
        }

        private onTouchMove(evt:egret.TouchEvent):void
        {

            this.ball.x += evt.stageX - this.oldStageX;
            this.ball.y += evt.stageY - this.oldStageY;
            this.oldStageX = evt.stageX;
            this.oldStageY = evt.stageY;
        }

        private onTouchEnd(evt:egret.TouchEvent):void
        {

            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
            this.removeEventListener(egret.Event.ENTER_FRAME,this.trackVelocity,this);
            this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
        }

        private trackVelocity(evt:egret.TouchEvent):void
        {
            this.vx = this.ball.x - this.oldX;
            this.vy = this.ball.y - this.oldY;
            this.oldX = this.ball.x;
            this.oldY = this.ball.y;
        }
    }
    /**
     * 弹性
     * 二维弹性
     * 弹性链
     */
    export class Spring extends egret.Sprite
    {
        public constructor()
        {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
        }
        private ball:DemoObject.Ball;
        private balls:Array<DemoObject.Ball>;
        private numBalls:number = 5;
        private spring:number = 0.1;
        private vx:number = 0;
        private vy:number = 0;
        private friction:number = 0.95;
        private gravity:number = 0.5;
        private mass:number = 10;
        private touchX:number = Const.Const.stageWidth*0.5;
        private touchY:number = Const.Const.stageHeigth*0.5;
        private spr:egret.Sprite;
        private isTouching:boolean = false;
        public init():void
        {
            this.width = Const.Const.stageWidth;
            this.height = Const.Const.stageHeigth;
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
            this.balls = [];
            for(var i:number = 0; i<this.numBalls; i++)
            {
                var b:DemoObject.Ball = new DemoObject.Ball();
                this.addChild( b );
                this.balls.push( b );
            }

            //this.ball = new DemoObject.Ball();
            //this.ball.x = this.width*0.5;
            //this.ball.y = this.height*0.5;
            this.spr = new egret.Sprite();
            //this.addChild( this.ball );
            this.addChild( this.spr );

            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);

            this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
        }

        private onTouchBegin(evt:egret.TouchEvent):void
        {
            this.isTouching = true;
            this.touchX = evt.stageX;
            this.touchY = evt.stageY;
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
            this.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
        }

        private onTouchMove(evt:egret.TouchEvent):void
        {
            this.touchX = evt.stageX;
            this.touchY = evt.stageY;
        }

        private onTouchEnd(evt:egret.TouchEvent):void
        {
            this.isTouching = false;
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
        }
        private onEnterFrame(evt:egret.Event):void
        {
            /* 多个小球事例*/
            if( this.isTouching )
            {
                this.touchX = this.touchX||Const.Const.stageWidth*0.5;
                this.touchY = this.touchY||Const.Const.stageHeigth*0.5;
            }
            //else
            //{
            //    this.touchX = Math.random()*Const.Const.stageWidth;
            //    this.touchY = Math.random()*Const.Const.stageHeigth;
            //}

            this.spr.graphics.clear();
            this.spr.graphics.lineStyle(2,0xff0000);
            this.spr.graphics.moveTo(this.touchX,this.touchY);
            this.moveBall(this.balls[0],this.touchX,this.touchY);
            this.spr.graphics.lineTo(this.balls[0].x,this.balls[0].y);

            for(var i:number = 1; i<this.numBalls;i++)
            {
                var b1:DemoObject.Ball = this.balls[i-1];
                var b2:DemoObject.Ball = this.balls[i];
                this.moveBall(b2,b1.x,b1.y);
                this.spr.graphics.lineTo(b2.x,b2.y);
            }

        }

        /**
         * 物体缓冲移动实现
         * @param ball
         * @param targetX
         * @param targetY
         */
        private moveBall(ball:DemoObject.Ball,targetX:number,targetY:number):void
        {
            ball.vx = (targetX - ball.x )*this.spring;
            ball.vy = (targetY - ball.y )*this.spring;

            ball.vy += this.mass*this.gravity;

            ball.vx *= this.friction;
            ball.vy *= this.friction;

            ball.x += ball.vx;
            ball.y += ball.vy;
        }
        /**
         * 一个小球的列子
         */
        private oneBall():void
        {
            var dx:number = this.touchX - this.ball.x;
            var dy:number = this.touchY - this.ball.y;

            var ax:number = dx*this.spring;
            var ay:number = dy*this.spring;

            this.vx += ax;
            this.vy += ay;

            this.vy += this.gravity*this.mass;

            this.vx *= this.friction;
            this.vy *= this.friction;

            this.ball.x += this.vx;
            this.ball.y += this.vy;

            this.spr.graphics.clear();
            this.spr.graphics.lineStyle(2,0xff0000);
            this.spr.graphics.moveTo(this.ball.x,this.ball.y);
            this.spr.graphics.lineTo(this.touchX,this.touchY);
        }
    }
    /**
     * 弹性贴加2个物体
     */
    export class DoubleSpring extends  egret.Sprite
    {
        public constructor()
        {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
        }
        private ball0:DemoObject.Ball;
        private ball1:DemoObject.Ball;
        private ball0Dragging:boolean = false;
        private ball1Dragging:boolean = false;
        private spring:number = 0.1;
        private friction:number = 0.95;
        private springLength:number = 100;
        private init():void
        {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
            this.touchEnabled = true;
            this.width = Const.Const.stageWidth;
            this.height = Const.Const.stageHeigth;

            this.ball0 = new DemoObject.Ball();
            this.ball0.x = Math.random()*Const.Const.stageWidth;
            this.ball0.y = Math.random()*Const.Const.stageHeigth;
            this.ball0.width = this.ball0.height = 40;
            this.ball0.touchEnabled = true;
            this.ball0.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
            this.addChild( this.ball0 );


            this.ball1 = new DemoObject.Ball();
            this.ball1.x = Math.random()*Const.Const.stageWidth;
            this.ball1.y = Math.random()*Const.Const.stageHeigth;
            this.ball1.width = this.ball1.height = 40;
            this.ball1.touchEnabled = true;
            this.ball1.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
            this.addChild( this.ball1 );


            this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
            this.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
        }
        private timer:number = 60;
        private oldTimer:number = 0;
        private newTimer:number = 0;
        private onEnterFrame(evt:egret.TouchEvent):void
        {
            this.newTimer = Date.now();
            if(this.newTimer - this.oldTimer>this.timer)
            {
                this.oldTimer = this.newTimer;
            }
            else
            {
                return ;
            }
            this.squeueBall(this.ball0,-0.1);
            this.squeueBall(this.ball1,-0.1);
            if(!this.ball0Dragging )
            {
                this.springTo(this.ball0,this.ball1);
            }
            if(!this.ball1Dragging )
            {
                this.springTo(this.ball1,this.ball0);
            }

            this.graphics.clear();
            this.graphics.lineStyle(2,0xff0000);
            this.graphics.moveTo(this.ball0.x,this.ball0.y);
            this.graphics.lineTo(this.ball1.x,this.ball1.y);
        }

        /**
         * 限制显示区域
         * @param ball
         * @param bounce
         */
        private squeueBall(ball:DemoObject.Ball,bounce?:number):void
        {
            var left:number = 0;
            var right:number = Const.Const.stageWidth;
            var top:number = 0;
            var bottom:number = Const.Const.stageHeigth;
            bounce = bounce||-1;
            if(ball.x +ball.radius > right)
            {
                ball.x = right - ball.radius;
                ball.vx *= bounce;
            }
            else if( ball.x - ball.radius < left)
            {
                ball.x = left+ball.radius;
                ball.vx *= bounce;
            }

            if( ball.y + ball.radius >bottom)
            {
                ball.y = bottom - ball.radius;
                ball.vy *= bounce;
            }
            else if( ball.y - ball.radius < top)
            {
                ball.y = top + ball.radius;
                ball.vy *= bounce;
            }
        }
        private springTo(balla:DemoObject.Ball,ballb:DemoObject.Ball):void
        {
            var dx:number = ballb.x - balla.x;
            var dy:number = ballb.y - ballb.y;

            var angle:number = Math.atan2(dy,dx);

            var targetx:number = ballb.x - Math.cos(angle)*this.springLength;
            var targety:number = ballb.y - Math.sin(angle)*this.springLength;

            balla.vx +=( targetx - balla.x)*this.spring;
            balla.vy +=( targety - balla.y)*this.spring;

            balla.x += balla.vx*this.friction;
            balla.y += balla.vy*this.friction;
        }
        private ball0OldX:number = 0;
        private ball0OldY:number = 0;
        private ball1OldX:number = 0;
        private ball1OldY:number = 0;
        private onTouchBegin(evt:egret.TouchEvent):void
        {
            if(evt.target == this.ball0 )
            {
                this.ball0OldX = evt.stageX;
                this.ball0OldY = evt.stageY;
                this.ball0Dragging = true;
                this.ball0.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
            }
            if(evt.target == this.ball1)
            {
                this.ball1OldX = evt.stageX;
                this.ball1OldY = evt.stageY;
                this.ball1Dragging = true;
                this.ball1.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
            }
        }

        private onTouchMove(evt:egret.TouchEvent):void
        {
            if(evt.target == this.ball0)
            {
                this.ball0.x += evt.stageX - this.ball0OldX;
                this.ball0OldX = evt.stageX;
                this.ball0.y += evt.stageY - this.ball0OldY;
                this.ball0OldY = evt.stageY;
            }

            if(evt.target == this.ball1 )
            {
                this.ball1.x += evt.stageX - this.ball1OldX;
                this.ball1OldX = evt.stageX;
                this.ball1.y += evt.stageY - this.ball1OldY;
                this.ball1OldY = evt.stageY;
            }
        }

        private onTouchEnd(evt:egret.TouchEvent):void
        {
            this.ball0.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
            this.ball1.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
            this.ball0Dragging = false;
            this.ball1Dragging = false;
        }
    }
    /**
     * 多物体弹性碰撞
     * 碰撞检测
     */
    export class Bubbles extends egret.Sprite
    {
        public constructor()
        {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
        }

        private balls:Array<DemoObject.Ball>;
        private numBalls:number = 30;
        private bounce:number = -0.5;
        private spring:number = 0.05;
        private gravity:number = 0.1;

        private init():void
        {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
            this.balls = [];
            for(var i:number = 0 ; i< this.numBalls; i++)
            {
                var ball:DemoObject.Ball = new DemoObject.Ball(Math.random()*30+20,Math.random()*0xffffff);
                ball.x = Math.random()*Const.Const.stageWidth;
                ball.y = Math.random()*Const.Const.stageHeigth;

                ball.vx = Math.random()*6-3;
                ball.vy = Math.random()*6-3;
                this.addChild( ball );
                this.balls.push( ball );

            }

            this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
        }

        private onEnterFrame(evt:egret.Event):void
        {

            for( var i:number = 0; i < this.numBalls-1; i++)
            {
                var ball0:DemoObject.Ball = this.balls[i];

                for(var  j:number = i+1; j< this.numBalls;j++)
                {
                    var ball1:DemoObject.Ball = this.balls[j];
                    var dx:number = ball1.x - ball0.x;
                    var dy:number = ball1.y - ball0.y;
                    var dist:number = Math.sqrt(dy*dy + dx*dx);
                    var minDist:number = ball0.radius+ball1.radius;

                    if( dist < minDist )
                    {
                        var tx:number = ball0.x + dx/dist*minDist;
                        var ty:number = ball0.y + dy/dist*minDist;
                        var ax:number = (tx - ball1.x)*this.spring;
                        var ay:number = (ty - ball1.y)*this.spring;

                        ball0.vx -= ax;
                        ball0.vy -= ay;
                        ball1.vx += ax;
                        ball1.vy += ay;
                    }
                }
            }

            for(var i:number = 0; i< this.numBalls; i++)
            {
                var ball:DemoObject.Ball = this.balls[i];
                this.move(ball);
            }

        }

        /**
         * 限制显示范围
         * @param ball
         */
        private move(ball:DemoObject.Ball):void
        {
            ball.vy += this.gravity;
            ball.x += ball.vx;
            ball.y += ball.vy;

            var left:number = 0;
            var right:number = Const.Const.stageWidth;
            var top:number = 0;
            var bottom:number = Const.Const.stageHeigth;
            if(ball.x +ball.radius > right)
            {
                ball.x = right - ball.radius;
                ball.vx *= this.bounce;
            }
            else if( ball.x - ball.radius < left)
            {
                ball.x = left+ball.radius;
                ball.vx *= this.bounce;
            }

            if( ball.y + ball.radius >bottom)
            {
                ball.y = bottom - ball.radius;
                ball.vy *= this.bounce;
            }
            else if( ball.y - ball.radius < top)
            {
                ball.y = top + ball.radius;
                ball.vy *= this.bounce;
            }
        }
    }
    /**
     * 坐标旋转
     */
    export class Rotate extends egret.Sprite
    {
        public constructor()
        {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
        }
        private balls:Array<DemoObject.Ball>;
        private numBalls:number = 10;
        private vr:number = 0.05;
        private init(evt:egret.Event):void
        {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
            this.width = Const.Const.stageWidth;
            this.height = Const.Const.stageHeigth;
            this.balls = [];
            for(var i:number = 0;i<this.numBalls;i++)
            {
                var ball:DemoObject.Ball = new DemoObject.Ball(Math.random()*20+5,Math.random()*0xffffff);
                this.balls.push(ball);
                this.addChild( ball );
                ball.x = Math.random()*Const.Const.stageWidth;
                ball.y = Math.random()*Const.Const.stageHeigth;
            }

            this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
        }

        private onTouchBegin(evt:egret.TouchEvent):void
        {
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
            this.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
        }

        private onTouchMove(evt:egret.TouchEvent):void
        {
            this.touchX = evt.stageX;
            this.touchY = evt.stageY;
        }
        private onTouchEnd(evt:egret.TouchEvent):void
        {
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
        }
        private touchX:number = 0;
        private touchY:number = 0;
        private onEnterFrame(evt:egret.Event):void
        {
            var angle:number = (this.touchX - Const.Const.stageWidth*0.5)*0.001;
            var cos:number = Math.cos(angle);
            var sin:number = Math.sin(angle);

            for(var i:number = 0; i< this.numBalls; i++)
            {
                var ball:DemoObject.Ball = this.balls[i];
                var x1:number = ball.x - Const.Const.stageWidth*0.5;
                var y1:number = ball.y - Const.Const.stageHeigth*0.5;

                var x2:number = cos*x1 - sin*y1;
                var y2:number = cos*y1 + sin*x1;

                ball.x = Const.Const.stageWidth*0.5+x2;
                ball.y = Const.Const.stageHeigth*0.5+y2;
            }
        }
    }
    /**
     * 角度回弹
     */
    export class AngleBounce extends egret.Sprite
    {
        public constructor()
        {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
        }
        private ball:DemoObject.Ball;
        private line:egret.Sprite;
        private gravity:number = 0.3;
        private bounce:number = -0.6;

        private init():void
        {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
            this.ball = new DemoObject.Ball();
            this.addChild( this.ball );

            this.width = Const.Const.stageWidth;
            this.height = Const.Const.stageHeigth;

            this.ball.x = 100;
            this.ball.y = 10;

            this.line = new egret.Sprite();
            this.line.graphics.lineStyle(2,0xff0000);
            this.line.graphics.lineTo(300,0);
            this.addChild( this.line );
            this.line.x = 50;
            this.line.y = 200;
            this.line.rotation = 30;

            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);

            this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
        }

        private onTouchBegin(evt:egret.TouchEvent):void
        {
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
            this.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
        }

        private onTouchMove(evt:egret.TouchEvent):void
        {
            this.touchX = evt.stageX;
            this.touchY = evt.stageY;
        }
        private onTouchEnd(evt:egret.TouchEvent):void
        {
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
        }
        private touchX:number = 0;
        private touchY:number = 0;

        private angle:number ;
        private cos:number;
        private sin:number;
        private onEnterFrame(evt:egret.Event):void
        {
            this.ball.vy += this.gravity;
            this.ball.x += this.ball.vx;
            this.ball.y += this.ball.vy;

            this.line.rotation = (Const.Const.stageWidth*0.5 - this.touchX)*0.1;
            this.angle = this.line.rotation*Math.PI/180;
            this.cos = Math.cos(this.angle);
            this.sin = Math.sin(this.angle);

            var x1:number = this.ball.x - this.line.x;
            var y1:number = this.ball.y - this.line.y;

            var x2:number = this.cos*x1 + this.sin*y1;
            var y2:number = this.cos*y1 - this.sin*x1;

            var vx1:number = this.cos*this.ball.vx + this.sin*this.ball.vy;
            var vy1:number = this.cos*this.ball.vy - this.sin*this.ball.vx;

            if( this.ball.x < this.line.x || this.ball.x > this.line.x+this.cos*300)
            {
                this.move( this.ball );
                return;
            }

            if( y2 > 0 && y2 < vy1)
            {
                y2 = 0;
                vy1 *= this.bounce;

                x1 = this.cos*x2 - this.sin*y2;
                y1 = this.cos*y2 + this.sin*x2;

                this.ball.vx = this.cos*vx1 - this.sin*vy1;
                this.ball.vy = this.cos*vy1 + this.sin*vx1;

                this.ball.x = this.line.x + x1;
                this.ball.y = this.line.y + y1;
            }



            this.move( this.ball );
        }



        /**
         * 限制显示范围
         * @param ball
         */
        private move(ball:DemoObject.Ball):void
        {
            //ball.vy += this.gravity;
            //ball.x += ball.vx;
            //ball.y += ball.vy;

            var left:number = 0;
            var right:number = Const.Const.stageWidth;
            var top:number = 0;
            var bottom:number = Const.Const.stageHeigth;
            if(ball.x +ball.radius > right)
            {
                ball.x = right - ball.radius;
                ball.vx *= this.bounce;
            }
            else if( ball.x - ball.radius < left)
            {
                ball.x = left+ball.radius;
                ball.vx *= this.bounce;
            }

            if( ball.y + ball.radius >bottom)
            {
                ball.y = bottom - ball.radius;
                ball.vy *= this.bounce;
            }
            else if( ball.y - ball.radius < top)
            {
                ball.y = top + ball.radius;
                ball.vy *= this.bounce;
            }
        }
    }
    /**
     * 多物体角度回弹
     */
    export class MultiAngleBounce extends egret.Sprite
    {
        public constructor()
        {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
        }

        private ball:DemoObject.Ball;
        private lines:Array<any>;
        private numLines:number = 5;
        private gravity:number = 0.3;
        private bounce:number = -0.6;
        private init(evt:egret.Event):void
        {
            this.ball = new DemoObject.Ball();
            this.addChild(this.ball);
            this.ball.x = 100;

            this.ball.y = 10;

            this.lines = [];
            for(var i:number = 0; i < this.numLines ; i++)
            {
                var line:egret.Sprite = new egret.Sprite();
                line.graphics.lineStyle( 2 , 0xff0000 );
                line.graphics.moveTo( -50 , 0 );
                line.graphics.lineTo( 50 , 0 );

                this.addChild( line );
                this.lines.push( line );
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


            this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
        }

        private onEnterFrame(evt:egret.Event):void
        {

            this.ball.vy += this.gravity;
            this.ball.x += this.ball.vx;
            this.ball.y += this.ball.vy;

            this.move( this.ball );

            for(var i:number = 0 ;i < this.numLines ; i++)
            {
                this.checkLine( this.lines[i] );
            }
        }
        /**
         * 限制显示范围
         * @param ball
         */
        private move(ball:DemoObject.Ball):void
        {
            //ball.vy += this.gravity;
            //ball.x += ball.vx;
            //ball.y += ball.vy;

            var left:number = 0;
            var right:number = Const.Const.stageWidth;
            var top:number = 0;
            var bottom:number = Const.Const.stageHeigth;
            if(ball.x +ball.radius > right)
            {
                ball.x = right - ball.radius;
                ball.vx *= this.bounce;
            }
            else if( ball.x - ball.radius < left)
            {
                ball.x = left+ball.radius;
                ball.vx *= this.bounce;
            }

            if( ball.y + ball.radius >bottom)
            {
                ball.y = bottom - ball.radius;
                ball.vy *= this.bounce;
            }
            else if( ball.y - ball.radius < top)
            {
                ball.y = top + ball.radius;
                ball.vy *= this.bounce;
            }
        }
        private angle:number = 1;
        private cos:number = 0;
        private sin:number = 0;
        /**
         * 检测每条线的碰撞
         * @param line
         */
        private checkLine(line:egret.Sprite):void
        {
            this.angle = line.rotation*Math.PI/180;
            this.cos = Math.cos(this.angle);
            this.sin = Math.sin(this.angle);

            var x1:number = this.ball.x - line.x;
            var y1:number = this.ball.y - line.y;

            var x2:number = this.cos*x1 + this.sin*y1;
            var y2:number = this.cos*y1 - this.sin*x1;
            //
            var vx1:number = this.cos*this.ball.vx + this.sin*this.ball.vy;
            var vy1:number = this.cos*this.ball.vy - this.sin*this.ball.vx;

            /*判断是否碰撞*/
            if( this.ball.x < line.x || this.ball.x > line.x+this.cos*100)
            {
                this.move( this.ball );
                return;
            }

            if( y2 > 0 && y2 < vy1)
            {
                y2 = 0;
                vy1 *= this.bounce;

                x1 = this.cos*x2 - this.sin*y2;
                y1 = this.cos*y2 + this.sin*x2;

                this.ball.vx = this.cos*vx1 - this.sin*vy1;
                this.ball.vy = this.cos*vy1 + this.sin*vx1;

                this.ball.x = line.x + x1;
                this.ball.y = line.y + y1;
            }



            //this.move( this.ball );
        }
    }
    /**
     * 台球物理动量守恒定律
     */
    export class Billiard extends egret.Sprite
    {
        public constructor()
        {
            super();
            this.addEventListener(egret.Event.ENTER_FRAME,this.init,this);
        }

        private ball0:DemoObject.Ball;
        private ball1:DemoObject.Ball;
        private bounce:number = -1;

        private init(evt:egret.Event):void
        {
            this.removeEventListener(egret.Event.ENTER_FRAME,this.init,this);
            this.width = Const.Const.stageWidth;
            this.height = Const.Const.stageHeigth;

            this.ball0 = new DemoObject.Ball(50,0x00ff00);
            this.ball0.mass = 2;
            this.ball0.x = Const.Const.stageWidth - 200;
            this.ball0.y = Const.Const.stageHeigth - 200;
            this.ball0.vx = Math.random()*10 - 5;
            this.ball0.vy = Math.random()*10 - 5;
            this.addChild( this.ball0 );

            this.ball1 = new DemoObject.Ball(20);
            this.ball1.mass = 1;
            this.ball1.x = 100;
            this.ball1.y = 100;
            this.ball1.vx = Math.random()*10 - 5;
            this.ball1.vy = Math.random()*10 - 5;
            this.addChild( this.ball1 );

            this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);

        }

        private onEnterFrame(evt:egret.Event):void
        {
            this.ball0.x += this.ball0.vx;
            this.ball0.y += this.ball0.vy;
            this.ball1.x += this.ball1.vx;
            this.ball1.y += this.ball1.vy;

            this.checkCollision(this.ball0,this.ball1);
            this.checkWalls(this.ball0);
            this.checkWalls(this.ball1);
        }

        /**
         * 两球碰撞检测
         * @param ball0
         * @param ball1
         */
        private checkCollision(ball0:DemoObject.Ball,ball1:DemoObject.Ball):void
        {
            var dx:number = ball0.x - ball1.x;
            var dy:number = ball0.y - ball1.y;
            var dis:number = Math.sqrt(dx*dx+dy*dy);
            /*碰撞处理*/
            if( dis < ball0.radius + ball1.radius)
            {
                var angle:number = Math.atan2(dy,dx);
                var sin:number = Math.sin(angle);
                var cos:number = Math.cos(angle);

                //var pos0:egret.Point = new egret.Point(0,0);
                //var pos1:egret.Point = this.rotate(dx,dy,sin,cos,true);
                var vel0:egret.Point = this.rotate(ball0.vx,ball0.vy,sin,cos,true);
                var vel1:egret.Point = this.rotate(ball1.vx,ball1.vy,sin,cos,true);

                var vxTotal:number = vel0.x - vel1.x;
                vel0.x = ((ball0.mass - ball1.mass)*vel0.x +2*ball1.mass*vel1.x)/(ball0.mass+ball1.mass);
                vel1.x = vxTotal +vel0.x;

                //pos0.x += vel0.x;
                //pos1.x += vel1.x;


                var vyTotal:number = vel0.y - vel1.y;
                vel0.y = ((ball0.mass - ball1.mass)*vel0.y +2*ball1.mass*vel1.y)/(ball0.mass+ball1.mass);
                vel1.y = vyTotal +vel0.y;

                //pos0.y += vel0.y;
                //pos1.y += vel1.y;

                //var pos0F:egret.Point = this.rotate(pos0.x,pos0.y,sin,cos,false);
                //var pos1F:egret.Point = this.rotate(pos1.x,pos1.y,sin,cos,false);


                var vel0F:egret.Point = this.rotate(vel0.x,vel0.y,sin,cos,false);
                var vel1F:egret.Point = this.rotate(vel1.x,vel1.y,sin,cos,false);

                ball0.vx = vel0F.x;
                ball0.vy = vel0F.y;
                ball1.vx = vel1F.x;
                ball1.vy = vel1F.y;

                //this.ball1.x = this.ball0.x + pos1F.x;
                //this.ball1.y = this.ball0.y + pos1F.y;
                //this.ball0.x = this.ball0.x + pos0F.x;
                //this.ball0.y = this.ball0.y + pos0F.y;

            }

        }

        private rotate(x:number,y:number,sin:number,cos:number,reverse:Boolean):egret.Point
        {
            var result:egret.Point = new egret.Point();
            if(reverse)
            {
                result.x = x*cos + y*sin;
                result.y = y*cos - x*sin;
            }
            else
            {
                result.x = x*cos - y*sin;
                result.y = y*cos + x*sin;
            }
            return result;
        }
        /**
         * 检测与四周环境碰撞
         * @param ball
         */
        private checkWalls(ball:DemoObject.Ball):void
        {
            var left:number = 0;
            var right:number = Const.Const.stageWidth;
            var top:number = 0;
            var bottom:number = Const.Const.stageHeigth;
            if(ball.x +ball.radius > right)
            {
                ball.x = right - ball.radius;
                ball.vx *= this.bounce;
            }
            else if( ball.x - ball.radius < left)
            {
                ball.x = left+ball.radius;
                ball.vx *= this.bounce;
            }

            if( ball.y + ball.radius >bottom)
            {
                ball.y = bottom - ball.radius;
                ball.vy *= this.bounce;
            }
            else if( ball.y - ball.radius < top)
            {
                ball.y = top + ball.radius;
                ball.vy *= this.bounce;
            }
        }
    }
    /**
     * 粒子引力和重力
     */
    export class Particle extends  egret.Sprite
    {
        public constructor()
        {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
        }
        private particles:Array<DemoObject.Ball>;
        private bounce:number = -1;
        private numParticle:number = 3;
        private init(evt:egret.Event):void
        {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
            this.width = Const.Const.stageWidth;
            this.height = Const.Const.stageHeigth;

            this.particles = [];
            for(var i:number = 0; i< this.numParticle ; i++)
            {
                var size:number = Math.random()*25 + 5;
                var particle:DemoObject.Ball = new DemoObject.Ball(size);
                particle.x = Math.random()*Const.Const.stageWidth;
                particle.y = Math.random()*Const.Const.stageHeigth;
                particle.mass = size;
                this.addChild( particle );
                this.particles.push(particle);
            }

            this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
        }

        private onEnterFrame(evt:egret.Event):void
        {
            for(var i:number = 0; i< this.numParticle ; i++)
            {
                var particle:DemoObject.Ball = this.particles[i];
                particle.x += particle.vx;
                particle.y += particle.vy;
                this.checkWalls(particle);
            }

            for(var i:number = 0 ; i < this.numParticle - 1; i++)
            {
                var partA:DemoObject.Ball = this.particles[i];
                for(var j:number = i+1; j < this.numParticle ; j++)
                {
                    var partB:DemoObject.Ball = this.particles[j];
                    this.checkCollision(partA,partB);
                    this.gravitate(partA,partB);
                }
            }

        }

        /**
         * 检测与四周环境碰撞
         * @param ball
         */
        private checkWalls(ball:DemoObject.Ball):void
        {
            var left:number = 0;
            var right:number = Const.Const.stageWidth;
            var top:number = 0;
            var bottom:number = Const.Const.stageHeigth;
            if(ball.x +ball.radius > right)
            {
                ball.x = right - ball.radius;
                ball.vx *= this.bounce;
            }
            else if( ball.x - ball.radius < left)
            {
                ball.x = left+ball.radius;
                ball.vx *= this.bounce;
            }

            if( ball.y + ball.radius >bottom)
            {
                ball.y = bottom - ball.radius;
                ball.vy *= this.bounce;
            }
            else if( ball.y - ball.radius < top)
            {
                ball.y = top + ball.radius;
                ball.vy *= this.bounce;
            }
        }
        /**
         * 计算两物体之间引力
         * @param ballA
         * @param ballB
         */
        private gravitate(ballA:DemoObject.Ball,ballB:DemoObject.Ball):void
        {
            var dx:number = ballB.x - ballA.x;
            var dy:number = ballB.y - ballA.y;
            var distSQ:number = dx*dx + dy*dy;
            var dist:number = Math.sqrt(distSQ);
            var force:number = ballA.mass*ballB.mass/distSQ;
            var ax:number = force*dx/dist;
            var ay:number = force*dy/dist;

            ballA.vx += ax/ballA.mass;
            ballA.vy += ay/ballA.mass;
            ballB.vx -= ax/ballB.mass;
            ballB.vy -= ay/ballB.mass;
        }

        /**
         * 两球碰撞检测
         * @param ball0
         * @param ball1
         */
        private checkCollision(ball0:DemoObject.Ball,ball1:DemoObject.Ball):void
        {
            var dx:number = ball0.x - ball1.x;
            var dy:number = ball0.y - ball1.y;
            var dis:number = Math.sqrt(dx*dx+dy*dy);
            /*碰撞处理*/
            if( dis < ball0.radius + ball1.radius)
            {
                var angle:number = Math.atan2(dy,dx);
                var sin:number = Math.sin(angle);
                var cos:number = Math.cos(angle);

                //var pos0:egret.Point = new egret.Point(0,0);
                //var pos1:egret.Point = this.rotate(dx,dy,sin,cos,true);
                var vel0:egret.Point = this.rotate(ball0.vx,ball0.vy,sin,cos,true);
                var vel1:egret.Point = this.rotate(ball1.vx,ball1.vy,sin,cos,true);

                var vxTotal:number = vel0.x - vel1.x;
                vel0.x = ((ball0.mass - ball1.mass)*vel0.x +2*ball1.mass*vel1.x)/(ball0.mass+ball1.mass);
                vel1.x = vxTotal +vel0.x;

                //pos0.x += vel0.x;
                //pos1.x += vel1.x;


                var vyTotal:number = vel0.y - vel1.y;
                vel0.y = ((ball0.mass - ball1.mass)*vel0.y +2*ball1.mass*vel1.y)/(ball0.mass+ball1.mass);
                vel1.y = vyTotal +vel0.y;

                //pos0.y += vel0.y;
                //pos1.y += vel1.y;

                //var pos0F:egret.Point = this.rotate(pos0.x,pos0.y,sin,cos,false);
                //var pos1F:egret.Point = this.rotate(pos1.x,pos1.y,sin,cos,false);


                var vel0F:egret.Point = this.rotate(vel0.x,vel0.y,sin,cos,false);
                var vel1F:egret.Point = this.rotate(vel1.x,vel1.y,sin,cos,false);

                ball0.vx = vel0F.x;
                ball0.vy = vel0F.y;
                ball1.vx = vel1F.x;
                ball1.vy = vel1F.y;

                //this.ball1.x = this.ball0.x + pos1F.x;
                //this.ball1.y = this.ball0.y + pos1F.y;
                //this.ball0.x = this.ball0.x + pos0F.x;
                //this.ball0.y = this.ball0.y + pos0F.y;

            }

        }

        private rotate(x:number,y:number,sin:number,cos:number,reverse:Boolean):egret.Point
        {
            var result:egret.Point = new egret.Point();
            if(reverse)
            {
                result.x = x*cos + y*sin;
                result.y = y*cos - x*sin;
            }
            else
            {
                result.x = x*cos - y*sin;
                result.y = y*cos + x*sin;
            }
            return result;
        }
    }
}