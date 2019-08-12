class Login{
    constructor(){
        // 登录的接口
        this.url = "http://api.icodeilife.cn:81/user";
        // 获取元素
        this.user = $("#user");
        this.pass = $("#pass");
        this.btn = $("#loginbtn");
        this.statea = $(".username_tip");
        this.stateb=$(".pass_tip");
        this.kejian=$("#kejian");
        this.bukejian=$("#bukejian");
        // 绑定点击事件
        this.addEvent();
    }
    addEvent(){
        var that = this;
        this.btn.click(function(){
            if(that.user.val()==""||that.pass.val==""){
                $("#innertext").html("请输入您的信息");
                return;
            }
            // 开启ajax
            that.load()
        })
        this.bukejian.click(function(){
            that.bukeload();
        })
        this.kejian.click(function(){
            that.kejianload();
        })
    }
    bukeload(){
        this.bukejian.css({
            display:"none"
        });
        this.kejian.css({
            display:"block"
        })
        $("#pass").attr("type","text");
    }
    kejianload(){
        this.bukejian.css({
            display:"block"
        });
        this.kejian.css({
            display:"none"
        })
        $("#pass").attr("type","password");
    }
    load(){
        // 请求登录接口
        $.ajax({
            url:this.url,
            data:{
                type:"login",
                user:this.user.val(),
                pass:this.pass.val(),
            },
            success:(res)=>{
                // 请求成功之后，解析数据，根据数据的返回信息，决定不同的状态
                this.res = JSON.parse(res);
                // console.log(res);
                if(this.res.code == 2){
                    $("#innertext").html("帐号密码不符，请<a href='login.html'>重新登录</a>");
                    $("#innertext").html("帐号密码不符，请<a href='login.html'>重新登录</a>")
                }else if(this.res.code == 1){
                    // 登录成功之后，存储状态
                    this.setState()

                    $("#innertext").html("登录成功,3秒后跳转到<a href='index.html'>首页</a>");
                    setTimeout(() => {
                        location.href="index.html";
                    }, 3000);
                }else if(this.res.code == 0){
                    $("#innertext").html("该用户不存在，请<a href='register.html'>注册</a>")
                }
            }
        })
    }
    setState(){
        // 将当前登录成功后返回的用户信息作为登录成功的状态
        localStorage.setItem("loginUser",JSON.stringify(this.res.msg));
    }
}

new Login();