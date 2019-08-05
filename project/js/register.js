class Register{
    constructor(){
        this.username=document.getElementById("username");
        this.pass=document.getElementById("pass");
        this.pass2=document.getElementById("pass2");
        this.tel=document.getElementById("register_tel");
        this.btn=document.getElementById("register_btn");
        this.ouser=this.opass=this.opass2=this.otel=this.ocheck=false;
        this.check=document.getElementById("check");
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
            console.log(11);
        }else{
            this.ocheck=false;
        }
    }
    



}


new Register();