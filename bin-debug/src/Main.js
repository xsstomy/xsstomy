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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var __egretProto__ = Main.prototype;
    __egretProto__.onAddToStage = function (event) {
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    __egretProto__.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     */
    __egretProto__.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            this.createGameScene();
        }
    };
    /**
    * 资源组加载出错
    */
    __egretProto__.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " 中有加载失败的项目");
        //忽略加载失败的项目
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     */
    __egretProto__.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     */
    __egretProto__.createGameScene = function () {
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
        //
        //var star:DesignPattern.Decorator.StarbuzzCoffee = new DesignPattern.Decorator.StarbuzzCoffee();
        ////this.addChild(star);
        //
        //var p:DesignPattern.FactoryPattern.PizzaTestDrive = new DesignPattern.FactoryPattern.PizzaTestDrive();
        //this.addChild( p );
        //var trees:ThreeD.Trees = new ThreeD.Trees();
        //this.addChild( trees );
        var btm = new egret.Bitmap(RES.getRes("egretIcon"));
        var jmp = new Fun.Jump(btm);
        jmp.active();
        this.addChild(jmp);
        console.log("........" + jmp.width);
        //var spr:egret.Sprite = new egret.Sprite();
        //spr.width = 480;
        //spr.height = 800;
        //this.addChild(spr);
        //spr.touchEnabled = true;
        //spr.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
        //    console.log("...........");
        //},this);
    };
    __egretProto__.onTouchBegin = function (evt) {
        console.log('touch_begin');
    };
    __egretProto__.onTouchMove = function (evt) {
        console.log('touch_move');
    };
    __egretProto__.onTouchEnd = function (evt) {
        console.log('touch_end');
    };
    __egretProto__.onReleaseOutside = function () {
        console.log('release_outside');
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    __egretProto__.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     */
    __egretProto__.startAnimation = function (result) {
        var textContainer = this.textContainer;
        var count = -1;
        var self = this;
        var change = function () {
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
        };
        change();
    };
    /**
     * 切换描述内容
     */
    __egretProto__.changeDescription = function (textContainer, lineArr) {
        textContainer.removeChildren();
        var w = 0;
        for (var i = 0; i < lineArr.length; i++) {
            var info = lineArr[i];
            var colorLabel = new egret.TextField();
            colorLabel.x = w;
            colorLabel.anchorX = colorLabel.anchorY = 0;
            colorLabel.textColor = parseInt(info["textColor"]);
            colorLabel.text = info["text"];
            colorLabel.size = 40;
            textContainer.addChild(colorLabel);
            w += colorLabel.width;
        }
    };
    return Main;
})(egret.DisplayObjectContainer);
Main.prototype.__class__ = "Main";
