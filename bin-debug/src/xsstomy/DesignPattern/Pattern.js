var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by xiashishi on 15/3/9.
 */
/**
 * 设计模式编写
 */
var DesignPattern;
(function (DesignPattern) {
    /**
     * 策略模式
     */
    var StrategyPattern;
    (function (StrategyPattern) {
        /**
         * 鸭子
         */
        var Duck = (function (_super) {
            __extends(Duck, _super);
            function Duck() {
                _super.apply(this, arguments);
            }
            Duck.prototype.performFly = function () {
                this.flyBehavior.fly();
            };
            Duck.prototype.performQuack = function () {
                this.quackBehavior.quack();
            };
            Duck.prototype.swim = function () {
                console.log("All ducks float, even decoys!");
            };
            Duck.prototype.display = function () {
            };
            Duck.prototype.setFlyBehavior = function (fb) {
                this.flyBehavior = fb;
            };
            Duck.prototype.setQuackBehavior = function (qb) {
                this.quackBehavior = qb;
            };
            return Duck;
        })(egret.Sprite);
        StrategyPattern.Duck = Duck;
        Duck.prototype.__class__ = "DesignPattern.StrategyPattern.Duck";
        var FlyWithWings = (function () {
            function FlyWithWings() {
            }
            FlyWithWings.prototype.fly = function () {
                console.log("I'm flying!");
            };
            return FlyWithWings;
        })();
        StrategyPattern.FlyWithWings = FlyWithWings;
        FlyWithWings.prototype.__class__ = "DesignPattern.StrategyPattern.FlyWithWings";
        var FlyNoWay = (function () {
            function FlyNoWay() {
            }
            FlyNoWay.prototype.fly = function () {
                console.log("I can't fly!");
            };
            return FlyNoWay;
        })();
        StrategyPattern.FlyNoWay = FlyNoWay;
        FlyNoWay.prototype.__class__ = "DesignPattern.StrategyPattern.FlyNoWay";
        var FlyRocketPowered = (function () {
            function FlyRocketPowered() {
            }
            FlyRocketPowered.prototype.fly = function () {
                console.log("I'm flying with a rocket!");
            };
            return FlyRocketPowered;
        })();
        StrategyPattern.FlyRocketPowered = FlyRocketPowered;
        FlyRocketPowered.prototype.__class__ = "DesignPattern.StrategyPattern.FlyRocketPowered";
        var Quack = (function () {
            function Quack() {
            }
            Quack.prototype.quack = function () {
                console.log("Quack!");
            };
            return Quack;
        })();
        StrategyPattern.Quack = Quack;
        Quack.prototype.__class__ = "DesignPattern.StrategyPattern.Quack";
        var MuteQuack = (function () {
            function MuteQuack() {
            }
            MuteQuack.prototype.quack = function () {
                console.log("<< Silence >>");
            };
            return MuteQuack;
        })();
        StrategyPattern.MuteQuack = MuteQuack;
        MuteQuack.prototype.__class__ = "DesignPattern.StrategyPattern.MuteQuack";
        var Squeak = (function () {
            function Squeak() {
            }
            Squeak.prototype.quack = function () {
                console.log("Squeak");
            };
            return Squeak;
        })();
        StrategyPattern.Squeak = Squeak;
        Squeak.prototype.__class__ = "DesignPattern.StrategyPattern.Squeak";
        var MallardDuck = (function (_super) {
            __extends(MallardDuck, _super);
            function MallardDuck() {
                _super.call(this);
                this.flyBehavior = new FlyWithWings();
                this.quackBehavior = new Quack();
            }
            MallardDuck.prototype.display = function () {
                console.log("I'm a real Mallard duck!");
            };
            return MallardDuck;
        })(Duck);
        StrategyPattern.MallardDuck = MallardDuck;
        MallardDuck.prototype.__class__ = "DesignPattern.StrategyPattern.MallardDuck";
        var ModelDuck = (function (_super) {
            __extends(ModelDuck, _super);
            function ModelDuck() {
                _super.call(this);
                this.flyBehavior = new FlyNoWay();
                this.quackBehavior = new Quack();
            }
            ModelDuck.prototype.display = function () {
                console.log("I'm a model duck!");
            };
            return ModelDuck;
        })(Duck);
        StrategyPattern.ModelDuck = ModelDuck;
        ModelDuck.prototype.__class__ = "DesignPattern.StrategyPattern.ModelDuck";
    })(StrategyPattern = DesignPattern.StrategyPattern || (DesignPattern.StrategyPattern = {}));
})(DesignPattern || (DesignPattern = {}));
var DesignPattern;
(function (DesignPattern) {
    var Observer;
    (function (Observer) {
        var WeatherData = (function (_super) {
            __extends(WeatherData, _super);
            function WeatherData() {
                _super.call(this);
                this.init();
            }
            WeatherData.prototype.init = function () {
                this.observers = [];
            };
            /**
             * 注册监听者
             * @param o
             */
            WeatherData.prototype.registerObserver = function (o) {
                this.observers.push(o);
            };
            /**
             * 移除监听者
             * @param o
             */
            WeatherData.prototype.removeObserver = function (o) {
                var i = this.observers.indexOf(o);
                if (i >= 0) {
                    this.observers.splice(i);
                }
            };
            WeatherData.prototype.notifyObservers = function () {
                for (var i = 0; i < this.observers.length; i++) {
                    var o = this.observers[i];
                    o.update(this.temperature, this.humidity, this.pressure);
                }
            };
            WeatherData.prototype.setMeasurements = function (temperature, humidity, pressure) {
                this.humidity = humidity;
                this.temperature = temperature;
                this.pressure = pressure;
                this.notifyObservers();
            };
            return WeatherData;
        })(egret.Sprite);
        Observer.WeatherData = WeatherData;
        WeatherData.prototype.__class__ = "DesignPattern.Observer.WeatherData";
        /**
         * 气象面板
         */
        var CurrentConditionsDisplay = (function () {
            function CurrentConditionsDisplay(weatherData) {
                this.weatherData = weatherData;
                this.weatherData.registerObserver(this);
            }
            CurrentConditionsDisplay.prototype.update = function (temperature, humidity, pressure) {
                this.temperature = temperature;
                this.humidity = humidity;
                this.display();
            };
            CurrentConditionsDisplay.prototype.display = function () {
                console.log("Current condition :" + this.temperature + "F degrees and " + this.humidity + " % humidity");
            };
            return CurrentConditionsDisplay;
        })();
        Observer.CurrentConditionsDisplay = CurrentConditionsDisplay;
        CurrentConditionsDisplay.prototype.__class__ = "DesignPattern.Observer.CurrentConditionsDisplay";
        var StatisticsDisplay = (function () {
            function StatisticsDisplay(weatherData) {
                this.weatherData = weatherData;
                this.weatherData.registerObserver(this);
            }
            StatisticsDisplay.prototype.update = function (temperature, humidity, pressure) {
                this.humidity = humidity;
                this.pressure = pressure;
                this.display();
            };
            StatisticsDisplay.prototype.display = function () {
                console.log("Statistics condition : " + this.humidity + " F degrees and " + this.pressure + " pressure");
            };
            return StatisticsDisplay;
        })();
        Observer.StatisticsDisplay = StatisticsDisplay;
        StatisticsDisplay.prototype.__class__ = "DesignPattern.Observer.StatisticsDisplay";
        var WeatherStation = (function (_super) {
            __extends(WeatherStation, _super);
            function WeatherStation() {
                _super.call(this);
                this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
            }
            WeatherStation.prototype.init = function (evt) {
                this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
                this.width = egret.MainContext.instance.stage.stageWidth;
                this.height = egret.MainContext.instance.stage.stageHeight;
                var weatherData = new WeatherData();
                var cur = new CurrentConditionsDisplay(weatherData);
                var sta = new StatisticsDisplay(weatherData);
                weatherData.setMeasurements(80, 65, 20);
            };
            return WeatherStation;
        })(egret.Sprite);
        Observer.WeatherStation = WeatherStation;
        WeatherStation.prototype.__class__ = "DesignPattern.Observer.WeatherStation";
    })(Observer = DesignPattern.Observer || (DesignPattern.Observer = {}));
})(DesignPattern || (DesignPattern = {}));
