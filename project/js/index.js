
// 中间大banner图部分
$(".b_banner").banner({
  item: $(".b_banner").find(".listonly"),
  left: $(".b_banner").find("#leftbtn"),
  right: $(".b_banner").find("#rightbtn"),
  list: true,
  autoplay: true,
  delayTime: 3000,
  moveTime: 500,
  index: 0
})

//手风琴banner图
$(".wrap").find("li").mouseover(function () {
  $(this).stop().animate({ width: 390 }).find("img").stop()
    .animate({ left: -200 }).parent("li")
    .siblings("li").stop().animate({ width: 200 }).find("img").stop()
    .animate({ left: 0 }); 200
});

//swiper
var swiper = new Swiper('.swiper-container', {
  slidesPerView: 3,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});


// 楼层
$(".nav_left ul").children("li").click(function () {
  $("html").animate({
    scrollTop: $(".outerlayer").eq($(this).index()).offset().top
  }, 300)
})
$(".nav_right .sort2 .backtop").click(function () {
  $("html").animate({
    scrollTop: 0
  }, 500)
})

//选项卡
$(function () {
  $(".option_title .only li").each(function (index) {
    $(this).click(function (e) {
      //  $(this).children("a").addClass("option_active").parent("li").siblings().removeClass("id");
      $(".glist").eq(index).show().siblings(".glist").hide();
    })
  });
})

// ajax({
// 	type:"get",					//可选，默认为get
// 	url:"",						//必传
// 	data:{						//可选
// 		user:"admin",
// 		pass:123
// 	},
// 	success:function(){},		//必传
// 	error:function(){},			//可选
// 	timeout:100,				//可选，默认500
// 	beforeSend:function(){}		//可选
// })


//这是设置商品详情跳转的部分
var alla = document.querySelectorAll(".alla");
for (var i = 0; i < alla.length; i++) {
  var t = alla[i].getAttribute("id");
  alla[i].setAttribute("href", `goodsdetail.html?${t}`);
}


//加载部分
// onload = function () {
//   var msg = localStorage.getItem("loginUser");
//   if (msg) {
//     $("#usersayhello").html(`hi，欢迎${JSON.parse(msg).user}用户`);
//   }
//   $("#backuser").click(function () {
//     localStorage.removeItem("loginUser");
//     $("#usersayhello").html(`hi，欢迎来到集食惠`);
//   })

//   // var carnum = JSON.stringify(getCookie("goods")).length;
//   // topcount.innerHTML = carnum;

// }
$("#backuser").click(function () {
  localStorage.removeItem("loginUser");
  $("#h5num").html("0");
  $("#usersayhello").html(`hi，欢迎来到集食惠`);
})
//这是绑定用户与购物车建立连接的部分
class Lists {
  constructor() {
    //获取元素
    this.topcount = document.getElementById("h5num");
    this.cont = document.querySelectorAll(".cartext");
    //1.ajax请求数据，拿到数据渲染页面
    //2.绑定事件
    this.load();
    this.addEvent();
  }
  load() {
    var that = this;
    window.onload = function () {
      that.login();
    }
  }
  login() {
    //console.log(getCookie("ccc")=="")
    //获取本地localstorage
    this.msg = localStorage.getItem("loginUser");
    //没有直接返回
    if(this.msg == null) return;
    //有，讲名字提取出来
    this.Lusername = JSON.parse(this.msg).user;
      $("#usersayhello").html(`hi，欢迎${this.Lusername}用户`);
      // 如果不为空证明有该用户的购物车
      //console.log(getCookie(`${this.Lusername}`))
      if ((getCookie(`${this.Lusername}`))!="") {
        this.t = JSON.parse(getCookie(`${this.Lusername}`));
        this.topcount.innerHTML = `${this.t.length}`;
      }else{
        this.topcount.innerHTML = "0";
      }

    
    
  }
  addEvent() {
    var that = this;
    //2.1点击绑定事件
    for (var i = 0; i < this.cont.length; i++) {
      this.cont[i].onclick = function (eve) {
        if(this.msg == null) return;
        that.id = eve.target.parentNode.getAttribute("id");
        that.setcookie(that.id);
      }
    }

  }
  setcookie(Id) {
    //2.3规划数据格式并且判断该以什么方式存
    this.goods = getCookie(`${this.Lusername}`) ? JSON.parse(getCookie(`${this.Lusername}`)) : [];
    //购物车为空直接存
    if (this.goods.length == 0) {
      this.goods.push({
        id: Id,
        num: 1
      })
    } else {
      //购物车不为空，判断是新商品还是旧商品
      var i = 0;
      var onoff = this.goods.some((val, index) => {
        i = index;
        return val.id == Id;
      })
      //旧商品增加数量
      if (onoff) {
        this.goods[i].num++;
      } else {
        //新商品直接存
        this.goods.push({
          id: Id,
          num: 1
        })
      }
    }
    //2.4最后设置cookie
    setCookie(`${this.Lusername}`, JSON.stringify(this.goods),1);
    //设置完成以后再从新渲染页面
    var ttt=JSON.parse(getCookie(`${this.Lusername}`));
    var carlength=ttt.length;
    this.topcount.innerHTML=carlength;
    // var carnum=JSON.parse(getCookie("goods")).length;
    // 
  }


}
new Lists();















