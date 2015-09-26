/**
 * Created by xiashishi on 15/2/8.
 */
module ThreeD
{
    /**
     * 3d透视
     */
    export class Perspective extends egret.Sprite
    {
        public constructor()
        {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
        }
        private ball:DemoObject.Ball;
        private xpos:number = Const.Const.stageWidth/2;
        private ypos:number = Const.Const.stageHeigth/2;
        private zpos:number = 0;
        private fl:number = 250;
        private vpX:number = Const.Const.stageWidth/2;
        private vpY:number = Const.Const.stageHeigth/2;
        private init(evt:egret.Event):void
        {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
            this.width = Const.Const.stageWidth;
            this.height = Const.Const.stageHeigth;
            this.ball = new DemoObject.Ball();
            this.addChild(this.ball);

            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);

            this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
        }

        private touchX:number = Const.Const.stageWidth/2;
        private touchY:number = Const.Const.stageHeigth/2;
        private onTouchBegin(evt:egret.TouchEvent):void
        {
            this.touchX = evt.stageX;
            //this.touchY = evt.stageY;
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
            this.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
        }
        private onTouchMove(evt:egret.TouchEvent):void
        {
            this.touchX = evt.stageX;
            //this.touchY = evt.stageY;
        }
        private onTouchEnd(evt:egret.TouchEvent):void
        {
            this.touchX = evt.stageX;
            //this.touchY = evt.stageY;
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
        }
        private onEnterFrame(evt:egret.Event):void
        {
            this.xpos = this.touchX - this.vpX;
            //this.ypos = this.touchY - this.vpY;
            this.zpos = Math.sqrt(this.xpos*this.xpos + this.ypos*this.ypos);
            //this.zpos = Math.min(Math.abs(this.xpos),Math.abs(this.ypos));
            var scale:number = this.fl/(this.fl + this.zpos);
            this.ball.scaleX = this.ball.scaleY = scale;
            this.ball.x = this.vpX + this.xpos * scale;
            this.ball.y = this.vpY + this.ypos * scale;
            this.graphics.clear();
            this.graphics.lineStyle(2,0xff0000);
            this.graphics.moveTo(this.vpX,this.vpY);
            this.graphics.lineTo(this.ball.x, this.ball.y);
        }
    }

    /**
     * 3d代码回弹
     */
    export class Bounce3D extends egret.Sprite
    {
        public constructor()
        {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
        }

        private ball:DemoObject.Ball;
        private xpos:number = 0;
        private ypos:number = 0;
        private zpos:number = 0;
        private vx:number = Math.random()*10 - 5;
        private vy:number = Math.random()*10 - 5;
        private vz:number = Math.random()*10 - 5;
        private fl:number = 250;
        private vpX:number = Const.Const.stageWidth*0.5;
        private vpY:number = Const.Const.stageHeigth*0.5;
        private top:number = -100;
        private bottom:number = 100;
        private left:number = -100;
        private right:number = 100;
        private front:number = 100;
        private back:number = -100;

        private bounce:number = 1;
        private init(evt:egret.Event):void
        {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
            this.width = Const.Const.stageWidth;
            this.height = Const.Const.stageHeigth;

            this.ball = new DemoObject.Ball();
            this.addChild( this.ball );

            this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);

        }

        private onEnterFrame(evt:egret.Event):void
        {
            this.xpos += this.vx;
            this.ypos += this.vy;
            this.zpos += this.vz;

            var radius:number = this.ball.radius;

            if(this.xpos + radius > this.right)
            {
                this.xpos = this.right - radius;
                this.vx *= -this.bounce;
            }
            else if( this.xpos - radius < this.left)
            {
                this.xpos = this.left + radius;
                this.vx *= -this.bounce;
            }

            if(this.ypos + radius > this.bottom)
            {
                this.ypos = this.bottom - radius;
                this.vy *= -this.bounce;
            }
            else if( this.ypos - radius < this.top )
            {
                this.ypos = this.top + radius;
                this.vy *= -this.bounce;
            }

            if(this.zpos + radius > this.front)
            {
                this.zpos = this.front - radius;
                this.vz *= -this.bounce;
            }
            else if( this.zpos - radius < this.back)
            {
                this.zpos = this.back + radius;
                this.vz *= -this.bounce;
            }

            if(this.zpos > -this.fl)
            {
                var scale:number = this.fl/(this.fl + this.zpos);
                this.ball.scaleX = this.ball.scaleY = scale;
                this.ball.x = this.vpX + this.xpos * scale;
                this.ball.y = this.vpY + this.ypos * scale;
                this.ball.visible = true;
            }
            else
            {
                this.ball.visible = false;
            }
        }
    }

    /**
     * 3d多物体回弹
     */
    export class MultiBounce3D extends egret.Sprite
    {
        private balls:Array<DemoObject.Ball3D>;
        private numBalls:number = 50;
        private fl:number = 250;//透视初始距离 scale ＝ fl/( fl + z )
        private vpX:number = Const.Const.stageWidth*0.5;//视点X轴位置
        private vpY:number = Const.Const.stageHeigth*0.5;//视点Y轴位置
        private top:number = -400;
        private bottom:number = 400;
        private left:number = -240;
        private right:number = 240;
        private front:number = 100;
        private back:number = -100;
        private bounce:number = 1;
        public constructor()
        {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
        }
        public init()
        {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
            this.width  = Const.Const.stageWidth;
            this.height = Const.Const.stageHeigth;

            this.balls = [];
            for(var i:number = 0 ; i < this.numBalls ; i = i + 1)
            {
                var ball:DemoObject.Ball3D = new DemoObject.Ball3D(15,Math.random()*0xffffff);
                this.balls.push( ball );
                ball.vx = Math.random() * 10 - 5;
                ball.vy = Math.random() * 10 - 5;
                ball.vz = Math.random() * 10 - 5;
                this.addChild( ball );
            }

            this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
        }

        private onEnterFrame(evt:egret.Event):void
        {
            for( var i:number = 0 ; i < this.numBalls ; i = i + 1)
            {
                var ball:DemoObject.Ball3D = this.balls[i];
                this.move(ball);
            }
            //this.arraySort(this.balls);
            this.sortZ();
        }

        /**
         * 路径移动规则
         * @param ball
         */
        private move(ball:DemoObject.Ball3D):void
        {
            ball.xpos += ball.vx;
            ball.ypos += ball.vy;
            ball.zpos += ball.vz;

            var radius:number = ball.radius;

            if(ball.xpos + radius > this.right)
            {
                ball.xpos = this.right - radius;
                ball.vx *= -this.bounce;
            }
            else if( ball.xpos - radius < this.left)
            {
                ball.xpos = this.left + radius;
                ball.vx *= -this.bounce;
            }

            if(ball.ypos + radius > this.bottom)
            {
                ball.ypos = this.bottom - radius;
                ball.vy *= -this.bounce;
            }
            else if( ball.ypos - radius < this.top )
            {
                ball.ypos = this.top + radius;
                ball.vy *= -this.bounce;
            }

            if(ball.zpos + radius > this.front)
            {
                ball.zpos = this.front - radius;
                ball.vz *= -this.bounce;
            }
            else if( ball.zpos - radius < this.back)
            {
                ball.zpos = this.back + radius;
                ball.vz *= -this.bounce;
            }

            if(ball.zpos > -this.fl)
            {
                var scale:number = this.fl/(this.fl + ball.zpos);
                ball.scaleX = ball.scaleY = scale;
                ball.x = this.vpX + ball.xpos * scale;
                ball.y = this.vpY + ball.ypos * scale;
                ball.visible = true;
            }
            else
            {
                ball.visible = false;
            }
        }

        /**
         * z轴排序
         */
        private sortZ():void
        {
            this.arraySort(this.balls);
            for( var i:number = 0 ; i < this.numBalls ; i = i +1 )
            {
                var ball:DemoObject.Ball3D = this.balls[i];
                this.setChildIndex(ball,i);
            }
        }

        /**
         * 数组中对象的某一属性排序
         * @param array
         */
        private arraySort(array:Array<any>,property?:string):void
        {
            var z:number = 0;
            var ball:DemoObject.Ball3D;
            for(var i:number = 0 ; i < array.length ; i = i + 1)
            {
                for( var j:number = i + 1 ; j < array.length ; j = j + 1)
                {

                    if( this.balls[j-1].zpos > this.balls[j].zpos )
                    {
                        ball = this.balls[j];
                        this.balls[j] = this.balls[j-1];
                        this.balls[j-1] = ball;
                    }
                }
            }
        }
    }
    /**
     * 3d烟花效果
     */
    export class Fireworks extends egret.Sprite
    {
        private balls:Array<any>;
        private numBalls:number = 100;
        private fl:number = 250;
        private vpX:number = Const.Const.stageWidth*0.5;
        private vpY:number = Const.Const.stageHeigth*0.5;
        private gravity:number = 0.2;
        private floor:number = 200;
        private bounce:number = -0.6;

        public constructor()
        {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
        }

        private init():void
        {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
            this.width = Const.Const.stageWidth;
            this.height = Const.Const.stageHeigth;


            this.balls = [];
            for(var i:number = 0 ; i < this.numBalls ; i = i + 1)
            {
                var ball:DemoObject.Ball3D = new DemoObject.Ball3D(3,Math.random()*0xffffff);
                this.balls.push( ball );
                ball.vx = Math.random() * 6 - 3;
                ball.vy = Math.random() * 6 - 10;
                ball.vz = Math.random() * 6 - 3;
                this.addChild( ball );
            }

            this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
        }

        private onEnterFrame(evt:egret.Event):void
        {
            for( var i:number = 0 ; i < this.numBalls ; i = i + 1)
            {
                var ball:DemoObject.Ball3D = this.balls[i];
                this.move(ball);
            }
            //this.arraySort(this.balls);
            this.sortZ();
        }

        /**
         * 路径移动规则
         * @param ball
         */
        private move(ball:DemoObject.Ball3D):void
        {
            ball.vy += this.gravity;
            ball.xpos += ball.vx;
            ball.ypos += ball.vy;
            ball.zpos += ball.vz;

            if( ball.ypos > this.floor )
            {
                ball.ypos = this.floor;
                ball.vy *= this.bounce;
            }

            if(ball.zpos > -this.fl)
            {
                var scale:number = this.fl/(this.fl + ball.zpos);
                ball.scaleX = ball.scaleY = scale;
                ball.x = this.vpX + ball.xpos * scale;
                ball.y = this.vpY + ball.ypos * scale;
                ball.visible = true;
            }
            else
            {
                ball.visible = false;
            }
        }

        /**
         * z轴排序
         */
        private sortZ():void
        {
            this.arraySort(this.balls);
            for( var i:number = 0 ; i < this.numBalls ; i = i +1 )
            {
                var ball:DemoObject.Ball3D = this.balls[i];
                this.setChildIndex(ball,i);
            }
        }

        /**
         * 数组中对象的某一属性排序
         * @param array
         */
        private arraySort(array:Array<any>,property?:string):void
        {
            var ball:any;
            for(var i:number = 0 ; i < array.length ; i = i + 1)
            {
                for( var j:number = i + 1 ; j < array.length ; j = j + 1)
                {

                    if( array[j-1].zpos > array[j].zpos )
                    {
                        ball = array[j];
                        array[j] = array[j-1];
                        array[j-1] = ball;
                    }
                }
            }
        }
    }

    /**
     * 森林
     */
    export class Trees extends egret.Sprite
    {
        private trees:Array<any>;
        private numTrees:number = 100;
        private fl:number = 250;
        private vpX:number = 0;
        private vpY:number = 0;
        private floor:number = 50;
        private vz:number = 0;
        private friction:number = 0.98;

        constructor()
        {
            super();
            this.init();
        }

        private init()
        {
            this.width = egret.MainContext.instance.stage.stageWidth;
            this.height = egret.MainContext.instance.stage.stageHeight;
            this.vpX = this.width * 0.5;
            this.vpY = this.height * 0.5;
            this.trees = [];
            for(var i = 0,tree:DemoObject.Tree; i < this.numTrees ; i = i + 1)
            {
                tree = new DemoObject.Tree(Math.random()*0xffffff);
                this.trees.push( tree );
                tree.xPos = Math.random()*2000 - 1000;
                tree.yPos = this.floor;
                tree.zPos = Math.random()*10000;
                this.addChild( tree );
            }

            this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
            this.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this);
        }


        private onEnterFrame(evt:egret.Event)
        {
            for(var i = 0 , tree:DemoObject.Tree; i < this.numTrees ; i = i + 1)
            {
                tree = this.trees[i];
                this.move(tree);

            }

            this.vz *= this.friction;
            this.sortZ();

            this.vz += 1;
            if( this.vz > 100)
                this.vz = -100;
        }

        private onTouchBegin(evt:egret.TouchEvent)
        {
            this.vz -= 10;
        }

        private onTouchEnd(evt:egret.TouchEvent)
        {
            this.vz += 10;
        }

        private move(tree:DemoObject.Tree)
        {
            tree.zPos += this.vz;

            if( tree.zPos < -this.fl )
            {
                tree.zPos += 10000;
            }

            if( tree.zPos > 10000 - this.fl )
            {
                tree.zPos -= 10000;
            }

            var scale:number = this.fl/(this.fl + tree.zPos);
            tree.scaleX = tree.scaleY = scale;

            tree.x = this.vpX + tree.xPos * scale;
            tree.y = this.vpY + tree.yPos * scale;
            tree.alpha = scale*0.7 + 0.3;
        }

        /**
         * 数组中对象的某一属性排序
         * @param array
         */
        private arraySort(array:Array<any>,property?:string):void
        {
            var ball:any;
            for(var i:number = 0 ; i < array.length ; i = i + 1)
            {
                for( var j:number = i + 1 ; j < array.length ; j = j + 1)
                {

                    if( array[j-1].zpos > array[j].zpos )
                    {
                        ball = array[j];
                        array[j] = array[j-1];
                        array[j-1] = ball;
                    }
                }
            }
        }
        private sortZ()
        {
            this.arraySort(this.trees);
            for(var i = 0 ,tree:DemoObject.Tree ; i < this.numTrees ; i = i + 1 )
            {
                tree = this.trees[i];
                this.setChildIndex(tree,i);
            }
        }
    }
}