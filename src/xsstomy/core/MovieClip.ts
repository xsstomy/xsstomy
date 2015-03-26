/**
 * Created by xiashishi on 3/23/2015.
 */
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


module xsstomy {
    /**
     * 封装egret动画库
     */
    export class MovieClip extends egret.DisplayObjectContainer
    {
        Action:any = {};

        private obj:any;

        /**
         * 初始化传递动画资源数组名
         * @param obj   数组
         * [{"json":"json","png":"png","action":"action"}]
         */
         constructor(obj:Array<any>)
        {
            super();
            this.obj = obj;
            this.init();
        }

        private init()
        {
            var json:string,
                png:string,
                i:number,
                action:string,
                mc:egret.MovieClipDataFactory,
                ac:egret.MovieClip;
            for( i = 0 ; i < this.obj.length ; i = i+1)
            {
                json = this.obj[i].json;
                png = this.obj[i].png;
                action = this.obj[i].action;
                mc = new egret.MovieClipDataFactory(RES.getRes(json),RES.getRes(png));
                ac = new egret.MovieClip(mc.generateMovieClipData(action));
                this.Action[action] = ac;
            }
        }

        private actor:egret.MovieClip;

        /**
         *
         * @param action  执行动作的动作名称
         * @param isRePlay   是否循环播放
         */
        gotoAndPlay(action:string,isRePlay:boolean = true)
        {
            this.removeChildren();
            this.actor = this.Action[action];
            this.addChild(this.actor);
            isRePlay? this.actor.gotoAndPlay("",-1):this.actor.gotoAndPlay("",1);
        }

        gotoAndStop()
        {
            this.actor.stop();
        }


    }
}

