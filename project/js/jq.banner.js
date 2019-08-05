; (function ($) {
    "use strict";

    $.fn.banner = function (options) {
        var that = this;
        //1.定义面向对象的对象
        var ban = {};

        //2.1处理默认选项
        ban.list = options.list === false ? false : true;
        ban.autoPlay = options.autoPlay === false ? false : true;
        ban.delayTime = options.delayTime || 2000;
        ban.moveTime = options.moveTime || 200;

        //2.2处理当前索引的默认选项
        //此值在list功能中要走的（点击的是要来的），在btn中表示要来的
        if (options.index >= 0 && options.index <= options.item.length - 1) {
            ban.index = options.index;
        } else if (options.index < 0) {
            ban.index = 0;
        } else if (options.index > options.length - 1) {
            ban.index = options.length - 1;
        }
        //设置btn中要走的
        ban.btnPrev = null;


        //3.生成list下面的小圆点
        ban.init = function () {
            if (!ban.list) return;
            this.ul = $("<ul>");
            var str = "";
            for (var i = 0; i < options.item.length; i++) {
                str += `<li></li>`;
            }
            this.ul.html(str);
            that.append(this.ul);
            this.ul.css({
                width:180,
                height:30,
                overflow:"hidden",
                position: "absolute",
                left:560,
                bottom:30,
                textAlign: "center",
                lineHeight: "20px",
                listStyle: "none",
                margin: 0,
                padding: 0
            }).children("li").css({
                float:"left",
                cursor: "pointer",
                display:"block",
                width:30,
                height:30,
                marginLeft:20,
                borderRadius:15,
                background: "rgba(200,200,200,0.6)"
            }).eq(ban.index).css({
                backgroundColor: "#E60012"
               
            })
            this.listEvent();

        }


        //4.生成点击功能
        ban.listEvent = function () {
            var _this = this;
            this.ul.children("li").click(function () {
                //this表示当前点击的，_this表示当前显示的
                if ($(this).index() < _this.index) {  //右
                    _this.listMove(-1, $(this).index());
                }
                if ($(this).index() > _this.index) {  //左
                    _this.listMove(1, $(this).index());
                }
                //点击之后，点击的就变成了当前的
                _this.index = $(this).index();
                //设置当前项显示
                _this.ul.children("li").css({
                    backgroundColor:"rgba(200,200,200,0.6)"
                }).eq(_this.index).css({
                    background: "#E60012"
                })
            })
        }
        //4.1点击移动
        ban.listMove = function (type, iknow) {
            //走：this.index   来：iknow
            options.item.eq(this.index).css({
                left: 0
            }).stop().animate({
                left: -options.item.eq(0).width() * type
            }, this.moveTime).end().eq(iknow).css({
                left: options.item.eq(0).width() * type
            }).stop().animate({
                left: 0
            }, this.moveTime)
        }



        //5.开始给左右按钮绑定事件
        ban.btnEvent = function () {
            if (!(options.left != undefined && options.left.length > 0 && options.right != undefined && options.right.length > 0)) return;
            var _this = this;
            options.left.on("click", function () {
                //计算索引
                if (_this.index == 0) {
                    _this.index = options.item.length - 1;
                    _this.btnPrev = 0;
                } else {
                    _this.index--;
                    _this.btnPrev = _this.index + 1;
                }
                _this.btnMove(-1);
            })
            options.right.on("click",this.rightEvent.bind(this));

        }
        ban.rightEvent=function(){
            if (this.index == options.item.length - 1) {
                this.index = 0;
                this.btnPrev = options.item.length - 1;
            } else {
                this.index++;
                this.btnPrev = this.index - 1;
            }
            this.btnMove(1);
        }

        ban.btnMove = function (type) {
            //5.1移动相应的图片
            //要走的this.btnPrev   要来的this.index
            options.item.eq(this.btnPrev).css({
                left: 0
            }).stop().animate({
                left: -options.item.eq(0).width() * type
            }, this.moveTime).end().eq(this.index).css({
                left: options.item.eq(0).width() * type
            }).stop().animate({
                left: 0
            }, this.moveTime)

            this.ul.children("li").css({
                backgroundColor:"rgba(200,200,200,0.6)"
            }).eq(this.index).css({
                background: "#E60012"
            })
        }

        ban.autoMove = function () {
           var _this=this;
           if(!ban.autoPlay) return;
           clearInterval(this.t);
            this.t=setInterval(function(){
                _this.rightEvent();
            },this.delayTime);
            //给大框添加鼠标进入或者离开事件
            that.hover(function(){
                clearInterval(_this.t);
            },function(){
                clearInterval(_this.t);
                _this.t=setInterval(function(){
                    _this.rightEvent();
                },_this.delayTime)
            })

        }

        ban.init();
        ban.btnEvent();
        ban.autoMove();
    }

})(jQuery);