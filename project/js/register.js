class Register{
    constructor(){
        this.url = "http://api.icodeilife.cn:81/user";
        this.username=document.getElementById("username");
        this.pass=document.getElementById("pass");
        this.pass2=document.getElementById("pass2");
        this.tel=document.getElementById("register_tel");
        this.btn=document.getElementById("register_btn");
        this.ouser=this.opass=this.opass2=this.otel=this.ocheck=false;
        this.check=document.getElementById("check");
        this.alertbox=document.querySelector(".alertbox");
        this.addEvent();
        this.checkverify();
    }
    addEvent(){
        var that=this;
        this.username.onblur=function(){
            that.useverify();
        }
        this.pass.onkeyup=function(){
            that.passverify();
        }
        this.pass2.onkeyup=function(){
            that.pass2verify();
        }
        this.tel.onblur=function(){
            that.telverify();
        }
        this.btn.onclick=function(){
            that.register();
        }


        

    }
    useverify(){
        var reg = /^\w{3,15}$/
        if (reg.test(this.username.value)) {
            this.username.nextElementSibling.innerHTML="用户名可用";
            this.ouser = true;
        } else {      
            this.username.nextElementSibling.innerHTML="用户名不符合规范";
            this.ouser=false;
        }
    }
    passverify(){
        var reg = /^.{3,15}$/;
        if (reg.test(this.pass.value)) {
            this.pass.nextElementSibling.innerHTML = "密码输入完成";
            this.opass = true;
        } else {
            this.pass.nextElementSibling.innerHTML= "密码长度不符合";
            this.opass = false;
        }
        if(this.pass2.value != "" && this.pass2.value == this.pass.value){
            this.pass2.nextElementSibling.innerHTML="两次密码一致";
            this.opass2=true;
        }else if(pass2.value != "" && this.pass2.value != this.pass.value){
            this.pass2.nextElementSibling.innerHTML="两次密码不一致";
            this.opass2=flase;
        }

    }
    pass2verify(){
        if (this.pass2.value ===  this.pass.value) {
            this.opass2 = true;
            this.pass2.nextElementSibling.innerHTML = "密码一致";
        } else {
            this.opass2 = false;
            this.pass2.nextElementSibling.innerHTML = "密码不一致";
        }

    }
    telverify(){
        var reg = /^1[3-9]\d{9}$/;
        if (reg.test(this.tel.value)) {
            this.tel.nextElementSibling.innerHTML = "手机号输入完成";
            this.otel = true;
        } else {
            this.tel.nextElementSibling.innerHTML = "手机号格式不正确";
            this.otel = false;
        }
    }
    checkverify(){
        if(this.check.getAttribute("checked")==1){
            this.ocheck=true;
        }else{
            this.ocheck=false;
        }
    }
    register(){
        var that=this;
        this.btn.onclick=function(){
            if(that.ocheck=that.opass=that.ouser=that.opass2=that.otel=true){
                that.load();
            }else{
                that.alertbox.innerHTML="信息不完整或者有误，请重新填写";
            }
        }  
    }
    load(){
        var that=this;
         //先去ajax请求发送相关信息
         ajax({
            url:this.url,
            data:{
                type:"register",
                user:this.username.value,
                pass:this.pass.value,
                tel:this.tel.value
            },
            success:function(res){
                res=JSON.parse(res);
                if(res.code == 0){
                    that.alertbox.innerHTML=`<a href="">用户名重复，点击重新注册</a>`;
                }else if(res.code == 1){
                    that.alertbox.innerHTML="注册成功，3秒后跳转";
                    setTimeout(()=>{
                        location.href="login.html";
                    },3000);
                }
            }

        })

        //再去跳转页面
    }

    



}


new Register();