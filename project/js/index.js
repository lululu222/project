
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
        $(".nav_left ul").children("li").click(function(){
           $("html").animate({
              scrollTop:$(".outerlayer").eq($(this).index()).offset().top
          },300)
        })
        $(".nav_right .sort2 .backtop").click(function(){
          $("html").animate({
             scrollTop:0
         },500)
       })
    
    //选项卡
    $(function() {
      $(".option_title .only li").each(function(index) {
          $(this).click(function(e) {
            //  $(this).children("a").addClass("option_active").parent("li").siblings().removeClass("id");
              $(".glist").eq(index).show().siblings(".glist").hide();
          })
      });
  })
    









   