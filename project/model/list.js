define(function(){
    class List{
        constructor(options){
            this.ol = options.ool;
            this.data = "这是选项卡的数据";

            this.addEvent()
        }
        addEvent(){
            // var that = this;
            this.ol.click(function(){
                $(this).css({
                    background:"#D70029"
                }).siblings("li").css({
                    background:""
                })
            })
        }
    }


    return List;
})