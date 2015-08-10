window.onload = function () {
    //这3个是切换背景图片的
    document.getElementById('bgOne').onmouseover = function () {
        document.getElementById('bgOne').style.backgroundColor = "#D4D4D4";
        document.getElementById('bgTwo').style.backgroundColor = "#F4F4F4";
        document.getElementById('bgThree').style.backgroundColor = "#F4F4F4";
        document.getElementById('BackGroundDiv').style.backgroundImage = url('../Images/background.png');
    }

    document.getElementById('bgTwo').onmouseover = function () {
        document.getElementById('bgOne').style.backgroundColor = "#F4F4F4";
        document.getElementById('bgTwo').style.backgroundColor = "#D4D4D4";
        document.getElementById('bgThree').style.backgroundColor = "#F4F4F4";
        document.getElementById('BackGroundDiv').style.backgroundImage = url('http://localhost:30923/Images/登陆界面图标.png');
    }

    document.getElementById('bgThree').onmouseover = function () {
        document.getElementById('bgOne').style.backgroundColor = "#F4F4F4";
        document.getElementById('bgTwo').style.backgroundColor = "#F4F4F4";
        document.getElementById('bgThree').style.backgroundColor = "#D4D4D4";
        document.getElementById('BackGroundDiv').style.backgroundImage = url('../Images/background.png');
    }
}


/*回车键登陆*/
function keyLogin() {
    if (event.keyCode == 13)  //回车键的键值为13
        $("#login_btn").click(); //调用登录按钮的登录事件
}

function login() {
    var userName = $("#LoginName").val();;
    var pwd = $("#Pwd").val();
    var vCode = $("#VCode").val();
    var remember = $("#remember").val();
    var autologin = $("#autologin").val();
    var matchResult = true;
    if (LoginName == "" || pwd == "" || vCode == "") {
        alert("请确认是否有空缺项！");
        matchResult = false;
    } else if (userName.length < 6 || userName.length > 20) {
        alert("用户名长度应在6到20个字符之间！");
        matchResult = false;
    } else if (userName == pwd) {
        alert("密码不能和用户名相同！");
        matchResult = false;
    } else if (pwd.length < 6 || pwd.length > 20) {
        alert("密码或重复密码长度应在6到20个字符之间！");
        matchResult = false;
    }
    if (matchResult == true) {
        $.ajax({
            url: '/Login/Login/Login',
            type: 'post',
            data: { "LoginName": userName, "Pwd": pwd, "VCode": vCode, "Remember": remember, "AutoLogin": autologin, },
            success: function (data) {
                var jsonObj = JSON.parse(data);
                if (jsonObj.Statu == "ok") {
                    window.location = jsonObj.BackUrl;
                }
                if (jsonObj.Statu == "nologin") {
                    alert("您还没有登陆，请登录！");
                    parent.location = jsonObj.BackUrl;

                }
                if (jsonObj.Statu == "nopermission") {
                    alert(jsonObj.Msg);
                    window.location = jsonObj.BackUrl;
                }
                if (jsonObj.Statu == "err") {
                    alert(jsonObj.Msg);
                    window.location = "/Login/Login/Index";
                }
            }
        })
    }
}

$(function () {
    $("#ValiCode").bind("click", function () {
        this.src = "GetVCode?time=" + (new Date()).getTime();
    });
});