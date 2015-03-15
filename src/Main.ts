/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     */
    private loadingView: LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    }
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    }
    /**
     * preload资源组加载完成
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        }
    }
    /**
    * 资源组加载出错
    */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        //TODO
        console.warn("Group:" + event.groupName + " 中有加载失败的项目");
        //忽略加载失败的项目
        this.onResourceLoadComplete(event);
    }
    /**
     * preload资源组加载进度
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textContainer: egret.Sprite;


    /**
     * 创建游戏场景
     */
    private createGameScene(): void {

        egret.Profiler.getInstance().run();

        //var three1:ThreeD.Perspective = new ThreeD.Perspective();
        //this.addChild( three1 );

        //var three2:ThreeD.Bounce3D = new ThreeD.Bounce3D();
        //this.addChild( three2 );

        //var three3:ThreeD.MultiBounce3D = new ThreeD.MultiBounce3D();
        //this.addChild( three3 );

        //var three4:ThreeD.Fireworks = new ThreeD.Fireworks();
        //this.addChild( three4 );
        //var s:DesignPattern.StrategyPattern.MallardDuck = new DesignPattern.StrategyPattern.MallardDuck();
        //this.addChild(s);
        ////s.display();
        //s.performFly();
        //
        //s.performQuack();
        //
        //var m:DesignPattern.StrategyPattern.ModelDuck = new DesignPattern.StrategyPattern.ModelDuck();
        //this.addChild( m );
        //m.performFly();
        //m.setFlyBehavior(new DesignPattern.StrategyPattern.FlyRocketPowered());
        //m.performFly();


        //
        //var w:DesignPattern.Observer.WeatherStation = new DesignPattern.Observer.WeatherStation();
        //this.addChild(w);

        var star:DesignPattern.Decorator.StarbuzzCoffee = new DesignPattern.Decorator.StarbuzzCoffee();
        //this.addChild(star);

        var p:DesignPattern.FactoryPattern.PizzaTestDrive = new DesignPattern.FactoryPattern.PizzaTestDrive();
        this.addChild( p );
    }

    private onTouchBegin(evt:egret.TouchEvent) {
        console.log('touch_begin');
    }
    private onTouchMove(evt:egret.TouchEvent) {
        console.log('touch_move');
    }
    private onTouchEnd(evt:egret.TouchEvent) {
        console.log('touch_end');
    }
    private onReleaseOutside() {
        console.log('release_outside')
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    private createBitmapByName(name: string): egret.Bitmap {
        var result: egret.Bitmap = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    /**
     * 描述文件加载成功，开始播放动画
     */
    private startAnimation(result: Array<any>): void {
        var textContainer: egret.Sprite = this.textContainer;
        var count: number = -1;
        var self: any = this;
        var change: Function = function () {
            count++;
            if (count >= result.length) {
                count = 0;
            }
            var lineArr = result[count];

            self.changeDescription(textContainer, lineArr);

            var tw = egret.Tween.get(textContainer);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        }

        change();
    }
    /**
     * 切换描述内容
     */
    private changeDescription(textContainer: egret.Sprite, lineArr: Array<any>): void {
        textContainer.removeChildren();
        var w: number = 0;
        for (var i: number = 0; i < lineArr.length; i++) {
            var info: any = lineArr[i];
            var colorLabel: egret.TextField = new egret.TextField();
            colorLabel.x = w;
            colorLabel.anchorX = colorLabel.anchorY = 0;
            colorLabel.textColor = parseInt(info["textColor"]);
            colorLabel.text = info["text"];
            colorLabel.size = 40;
            textContainer.addChild(colorLabel);

            w += colorLabel.width;
        }
    }
}
