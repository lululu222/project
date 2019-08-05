// $(function() {
//     $(".option_title .only li").each(function(index) {
//         $(this).click(function(e) {
//           //  $(this).children("a").addClass("option_active").parent("li").siblings().removeClass("id");
//             $(".glist").eq(index).show().siblings(".glist").hide();
//         })
//     });
// })
// console.log(l);

define(function(){
    class Tab{
        constructor(options){
            this.btn=options.btns;
            this.tabs=options.tabs;
            this.addevent();
        }
        addevent(){
            var that=this;
            this.btn.on("click","li",function(){
                var index = $(this).index();
               that.tabs.eq(index).show().siblings().hide();
            })
        }
    }
    return Tab;
});