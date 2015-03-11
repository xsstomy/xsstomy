/**
 * Created by xiashishi on 15/3/9.
 */
/**
 * 设计模式编写
 */
module DesignPattern
{
    /**
     * 策略模式
     */
    export module StrategyPattern{
        /**
         * 鸭子
         */
        export class Duck extends egret.Sprite{

            public flyBehavior:FlyBehavior;
            public quackBehavior:QuackBehavior;
            public performFly():void
            {
                this.flyBehavior.fly();
            }

            public performQuack():void
            {
                this.quackBehavior.quack();
            }

            public swim():void
            {
                console.log("All ducks float, even decoys!");
            }

            public display():void
            {

            }

            public setFlyBehavior(fb:FlyBehavior):void
            {
                this.flyBehavior = fb;
            }

            public setQuackBehavior(qb:QuackBehavior):void
            {
                this.quackBehavior = qb;
            }
        }

        export interface FlyBehavior{

            fly():void;

        }

        export class FlyWithWings implements FlyBehavior
        {
            public fly():void
            {
                console.log("I'm flying!");
            }
        }

        export class FlyNoWay implements FlyBehavior
        {
            public fly():void
            {
                console.log("I can't fly!");
            }
        }

        export class FlyRocketPowered implements FlyBehavior
        {
            public fly():void
            {
                console.log("I'm flying with a rocket!");
            }
        }
        export interface QuackBehavior{
            quack():void;
        }

        export class Quack implements QuackBehavior
        {
            public quack():void
            {
                console.log("Quack!");
            }
        }

        export class MuteQuack implements QuackBehavior
        {
            public quack():void
            {
                console.log("<< Silence >>");
            }

        }

        export class Squeak implements QuackBehavior
        {
            public quack():void
            {
                console.log("Squeak");
            }
        }

        export class MallardDuck extends Duck
        {
            public constructor()
            {
                super();
                this.flyBehavior = new FlyWithWings();
                this.quackBehavior = new Quack();
            }

            public display():void
            {
                console.log("I'm a real Mallard duck!");
            }
        }

        export class ModelDuck extends Duck
        {
            public constructor()
            {
                super();
                this.flyBehavior = new FlyNoWay();
                this.quackBehavior = new Quack();
            }

            public display():void
            {
                console.log("I'm a model duck!");
            }
        }
    }
}


module DesignPattern
{
    /**
     * 观察者模式
     */
    export module Observer
    {
        export class WeatherData extends egret.Sprite {
            private observers:Array<any>;
            private temperature:number;
            private humidity:number;
            private pressure:number;
            private changed:boolean;

            public constructor() {
                super();
                this.init();
            }

            public init():void {
                this.observers = [];
            }

            /**
             * 注册监听者
             * @param o
             */
            public registerObserver(o:Observer):void {
                this.observers.push(o);
            }

            /**
             * 移除监听者
             * @param o
             */
            public removeObserver(o:Observer):void {
                var i = this.observers.indexOf(o);
                if (i >= 0) {
                    this.observers.splice(i,1);
                }
            }


            public notifyObservers():void {
                if( this.changed )
                {
                    for (var i = 0; i < this.observers.length; i++) {
                        var o:Observer = this.observers[i];
                        o.update(this.temperature, this.humidity, this.pressure);
                    }
                }
                this.changed = false;
            }

            public setChanged()
            {
                this.changed = true;
            }
            public setMeasurements(temperature:number, humidity:number, pressure:number):void
            {
                this.humidity = humidity;
                this.temperature = temperature;
                this.pressure = pressure;
                this.notifyObservers();
            }

        }

        export interface Subject
        {
            registerObserver(o:Observer):void;
            removeObserver(o:Observer):void;
            notifyObservers():void;
        }

        export interface Observer
        {
            update(temperature:number, humidity:number, pressure:number):void;
        }

        export interface DisplayElement
        {
            display():void;
        }
        /**
         * 气象面板
         */
        export class CurrentConditionsDisplay implements Observer,DisplayElement
        {
            private temperature:number;
            private humidity:number;
            private weatherData;

            public constructor(weatherData:Subject)
            {
                this.weatherData = weatherData;
                this.weatherData.registerObserver( this );
            }

            public update(temperature:number , humidity:number , pressure:number ):void
            {
                this.temperature = temperature;
                this.humidity = humidity;
                this.display();
            }

            public display()
            {
                console.log("Current condition :" + this.temperature + "F degrees and " + this.humidity + " % humidity");
            }
        }

        export class StatisticsDisplay implements Observer,DisplayElement
        {
            private humidity:number;
            private pressure:number;
            private weatherData:WeatherData;
            public constructor(weatherData:WeatherData)
            {
                this.weatherData = weatherData;
                this.weatherData.registerObserver(this);
            }

            public update(temperature:number , humidity:number , pressure:number):void
            {
                this.humidity = humidity;
                this.pressure = pressure;
                this.display();
            }

            public display()
            {
                console.log("Statistics condition : " + this.humidity + "% humidity and " + this.pressure + " pressure");
            }
        }
        export class WeatherStation extends egret.Sprite
        {
            public constructor()
            {
                super();
                this.addEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
            }

            public init(evt:egret.Event):void
            {
                this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.init,this);
                this.width = egret.MainContext.instance.stage.stageWidth;
                this.height = egret.MainContext.instance.stage.stageHeight;

                var weatherData:WeatherData = new WeatherData();
                var cur:CurrentConditionsDisplay = new CurrentConditionsDisplay(weatherData);
                var sta:StatisticsDisplay = new StatisticsDisplay(weatherData);
                weatherData.setMeasurements( 80 , 65 , 20);
            }
        }
    }
}


module DesignPattern
{
    /**
     * 装饰者模式
     */
    export module Decorator
    {
        export class Beverage extends egret.Sprite
        {
            public constructor()
            {
                super();

            }

            public description:string = "Unkown Beverage";

            public getDescription():string
            {
                return this.description;
            }

            public cost():number
            {
                return null;
            }

        }


        export class CondimentDecorator extends Beverage
        {
            public constructor()
            {
                super();
            }

            public getDescription():string
            {
                return null;
            }
        }

        export class Espresso extends Beverage
        {
            public constructor()
            {
                super();
                this.description = "Espresso";
            }

            public cost():number
            {
                return 1.99;
            }
        }

        export class HouseBlend extends Beverage
        {
            public constructor()
            {
                super();
                this.description = "House Blend Coffee";
            }

            public cost():number {
                return 0.89;
            }

        }

        export class Mocha extends CondimentDecorator
        {
            public beverage:Beverage;
            public constructor(beverage:Beverage)
            {
                super();
                this.beverage = beverage;
            }

            public getDescription():string
            {
                return this.beverage.getDescription() +  " , Mocha";
            }

            public cost():number
            {
                return 0.2 + this.beverage.cost();
            }
        }

        export class Soy extends CondimentDecorator
        {
            public beverage:Beverage;
            public constructor(beverage:Beverage)
            {
                super();
                this.beverage = beverage;
            }

            public getDescription():string
            {
                return this.beverage.getDescription() + " , Soy";
            }

            public cost():number
            {
                return 0.1 + this.beverage.cost();
            }
        }

        export class Whip extends CondimentDecorator
        {
            public beverage:Beverage;
            public constructor(beverage?:Beverage)
            {
                super();
                this.beverage = beverage;
            }

            public getDescription():string
            {
                return this.beverage.getDescription() + " , Whip";
            }

            public cost():number
            {
                return 0.1 + this.beverage.cost();
            }
        }

        export class StarbuzzCoffee extends egret.Sprite
        {
            public constructor()
            {
                super();
                this.init();

            }

            public init():void
            {
                var beverage:Beverage = new Espresso();
                console.log( beverage.getDescription() + "$ "+ beverage.cost());

                var beverage2:Beverage = new HouseBlend();
                beverage2 = new Mocha(beverage2);
                beverage2 = new Whip(beverage2);

                console.log( beverage2.getDescription() + " $ " + beverage2.cost() );
            }
        }
    }
}