/**
 * Created by xiashishi on 15/3/26.
 */
module MVC
{
    /**
     * 主循环控制中心
     */
    export class ControlCenter extends egret.DisplayObjectContainer
    {
        private dataManage:DataCenter;
        private modlelManage:ModelCenter;
        private utilManage:UtilCenter;
        private viewManage:ViewCenter;
        constructor()
        {
            super();
        }
    }



}