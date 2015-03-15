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
    /**
     * 观察者模式
     */
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
                    this.observers.splice(i, 1);
                }
            };
            WeatherData.prototype.notifyObservers = function () {
                if (this.changed) {
                    for (var i = 0; i < this.observers.length; i++) {
                        var o = this.observers[i];
                        o.update(this.temperature, this.humidity, this.pressure);
                    }
                }
                this.changed = false;
            };
            WeatherData.prototype.setChanged = function () {
                this.changed = true;
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
                console.log("Statistics condition : " + this.humidity + "% humidity and " + this.pressure + " pressure");
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
var DesignPattern;
(function (DesignPattern) {
    /**
     * 装饰者模式
     */
    var Decorator;
    (function (Decorator) {
        var Beverage = (function (_super) {
            __extends(Beverage, _super);
            function Beverage() {
                _super.call(this);
                this.description = "Unkown Beverage";
            }
            Beverage.prototype.getDescription = function () {
                return this.description;
            };
            Beverage.prototype.cost = function () {
                return null;
            };
            return Beverage;
        })(egret.Sprite);
        Decorator.Beverage = Beverage;
        Beverage.prototype.__class__ = "DesignPattern.Decorator.Beverage";
        var CondimentDecorator = (function (_super) {
            __extends(CondimentDecorator, _super);
            function CondimentDecorator() {
                _super.call(this);
            }
            CondimentDecorator.prototype.getDescription = function () {
                return null;
            };
            return CondimentDecorator;
        })(Beverage);
        Decorator.CondimentDecorator = CondimentDecorator;
        CondimentDecorator.prototype.__class__ = "DesignPattern.Decorator.CondimentDecorator";
        /**
         * 装饰者
         */
        var Espresso = (function (_super) {
            __extends(Espresso, _super);
            function Espresso() {
                _super.call(this);
                this.description = "Espresso";
            }
            Espresso.prototype.cost = function () {
                return 1.99;
            };
            return Espresso;
        })(Beverage);
        Decorator.Espresso = Espresso;
        Espresso.prototype.__class__ = "DesignPattern.Decorator.Espresso";
        /**
         * 装饰者
         */
        var HouseBlend = (function (_super) {
            __extends(HouseBlend, _super);
            function HouseBlend() {
                _super.call(this);
                this.description = "House Blend Coffee";
            }
            HouseBlend.prototype.cost = function () {
                return 0.89;
            };
            return HouseBlend;
        })(Beverage);
        Decorator.HouseBlend = HouseBlend;
        HouseBlend.prototype.__class__ = "DesignPattern.Decorator.HouseBlend";
        var Mocha = (function (_super) {
            __extends(Mocha, _super);
            function Mocha(beverage) {
                _super.call(this);
                this.beverage = beverage;
            }
            Mocha.prototype.getDescription = function () {
                return this.beverage.getDescription() + " , Mocha";
            };
            Mocha.prototype.cost = function () {
                return 0.2 + this.beverage.cost();
            };
            return Mocha;
        })(CondimentDecorator);
        Decorator.Mocha = Mocha;
        Mocha.prototype.__class__ = "DesignPattern.Decorator.Mocha";
        var Soy = (function (_super) {
            __extends(Soy, _super);
            function Soy(beverage) {
                _super.call(this);
                this.beverage = beverage;
            }
            Soy.prototype.getDescription = function () {
                return this.beverage.getDescription() + " , Soy";
            };
            Soy.prototype.cost = function () {
                return 0.1 + this.beverage.cost();
            };
            return Soy;
        })(CondimentDecorator);
        Decorator.Soy = Soy;
        Soy.prototype.__class__ = "DesignPattern.Decorator.Soy";
        var Whip = (function (_super) {
            __extends(Whip, _super);
            function Whip(beverage) {
                _super.call(this);
                this.beverage = beverage;
            }
            Whip.prototype.getDescription = function () {
                return this.beverage.getDescription() + " , Whip";
            };
            Whip.prototype.cost = function () {
                return 0.1 + this.beverage.cost();
            };
            return Whip;
        })(CondimentDecorator);
        Decorator.Whip = Whip;
        Whip.prototype.__class__ = "DesignPattern.Decorator.Whip";
        var StarbuzzCoffee = (function (_super) {
            __extends(StarbuzzCoffee, _super);
            function StarbuzzCoffee() {
                _super.call(this);
                this.init();
            }
            StarbuzzCoffee.prototype.init = function () {
                var beverage = new Espresso();
                console.log(beverage.getDescription() + "$ " + beverage.cost());
                var beverage2 = new HouseBlend();
                beverage2 = new Mocha(beverage2);
                beverage2 = new Whip(beverage2);
                console.log(beverage2.getDescription() + " $ " + beverage2.cost());
            };
            return StarbuzzCoffee;
        })(egret.Sprite);
        Decorator.StarbuzzCoffee = StarbuzzCoffee;
        StarbuzzCoffee.prototype.__class__ = "DesignPattern.Decorator.StarbuzzCoffee";
    })(Decorator = DesignPattern.Decorator || (DesignPattern.Decorator = {}));
})(DesignPattern || (DesignPattern = {}));
var DesignPattern;
(function (DesignPattern) {
    /**
     * 工厂模式
     */
    var FactoryPattern;
    (function (FactoryPattern) {
        /**
         * 工厂基类
         */
        var PizzaStore = (function () {
            function PizzaStore() {
            }
            PizzaStore.prototype.orderPizza = function (type) {
                var pizza;
                pizza = this.createPizza(type);
                pizza.prepare();
                pizza.bake();
                pizza.cut();
                pizza.box();
                return pizza;
            };
            PizzaStore.prototype.createPizza = function (type) {
                return null;
            };
            return PizzaStore;
        })();
        FactoryPattern.PizzaStore = PizzaStore;
        PizzaStore.prototype.__class__ = "DesignPattern.FactoryPattern.PizzaStore";
        /**
         * 披萨基类
         */
        var Pizza = (function (_super) {
            __extends(Pizza, _super);
            function Pizza() {
                _super.call(this);
                this.toppings = [];
                this.init();
            }
            Pizza.prototype.init = function () {
                this.prepare();
                this.bake();
                this.cut();
                this.box();
            };
            Pizza.prototype.prepare = function () {
                console.log("Preparing " + this.name);
                console.log("Tossing dough..." + this.dough);
                console.log("Adding sauce..." + this.sauce);
                console.log("Adding toppings: ");
                for (var i = 0; i < this.toppings.length; i = i + 1) {
                    console.log(" " + this.toppings[i]);
                }
            };
            Pizza.prototype.bake = function () {
                console.log("Bake for 25 minutes at 350");
            };
            Pizza.prototype.cut = function () {
                console.log("Cutting the pizza into diagonal slices");
            };
            Pizza.prototype.box = function () {
                console.log("Place pizza in official PizzaStore box");
            };
            Pizza.prototype.getName = function () {
                return this.name;
            };
            return Pizza;
        })(egret.Sprite);
        FactoryPattern.Pizza = Pizza;
        Pizza.prototype.__class__ = "DesignPattern.FactoryPattern.Pizza";
        /**
         * 工厂
         */
        var NYPizzaStore = (function (_super) {
            __extends(NYPizzaStore, _super);
            function NYPizzaStore() {
                _super.call(this);
            }
            NYPizzaStore.prototype.createPizza = function (type) {
                if (type === "cheese") {
                    return new NYStyleCheesePizza();
                }
                else if (type === "veggie") {
                }
                else if (type === "clam") {
                }
                else {
                    return null;
                }
            };
            return NYPizzaStore;
        })(PizzaStore);
        FactoryPattern.NYPizzaStore = NYPizzaStore;
        NYPizzaStore.prototype.__class__ = "DesignPattern.FactoryPattern.NYPizzaStore";
        /**
         * 具体商品
         */
        var NYStyleCheesePizza = (function (_super) {
            __extends(NYStyleCheesePizza, _super);
            function NYStyleCheesePizza() {
                _super.call(this);
                this.name = "NY Style Sauce and Cheese Pizza";
                this.dough = "Thin Crust Dough";
                this.sauce = "Marinara Sauce";
                this.toppings.push("Grated Reggiano Cheese");
            }
            return NYStyleCheesePizza;
        })(Pizza);
        FactoryPattern.NYStyleCheesePizza = NYStyleCheesePizza;
        NYStyleCheesePizza.prototype.__class__ = "DesignPattern.FactoryPattern.NYStyleCheesePizza";
        /**
         * 具体产品
         */
        var ChicagoStyleCheesePizza = (function (_super) {
            __extends(ChicagoStyleCheesePizza, _super);
            function ChicagoStyleCheesePizza() {
                _super.call(this);
                this.name = "Chicago Style Deep Dish Cheese Pizza";
                this.dough = "Extre Thick Crust Dough";
                this.sauce = "Plum Tomato Sauce";
                this.toppings.push("Shredded Mozzarella Cheese");
            }
            ChicagoStyleCheesePizza.prototype.cut = function () {
                console.log("Cutting the pizza into square slices");
            };
            return ChicagoStyleCheesePizza;
        })(Pizza);
        FactoryPattern.ChicagoStyleCheesePizza = ChicagoStyleCheesePizza;
        ChicagoStyleCheesePizza.prototype.__class__ = "DesignPattern.FactoryPattern.ChicagoStyleCheesePizza";
        /**
         * 例子调用
         */
        var PizzaTestDrive = (function (_super) {
            __extends(PizzaTestDrive, _super);
            function PizzaTestDrive() {
                _super.call(this);
                this.init();
            }
            PizzaTestDrive.prototype.init = function () {
                var nyStore = new NYPizzaStore();
                var p = nyStore.createPizza("cheese");
                console.log("Ethan ordered a " + p.getName() + "\n");
            };
            return PizzaTestDrive;
        })(egret.Sprite);
        FactoryPattern.PizzaTestDrive = PizzaTestDrive;
        PizzaTestDrive.prototype.__class__ = "DesignPattern.FactoryPattern.PizzaTestDrive";
    })(FactoryPattern = DesignPattern.FactoryPattern || (DesignPattern.FactoryPattern = {}));
})(DesignPattern || (DesignPattern = {}));
