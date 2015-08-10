//编辑方法
function Edit(stuNum) {

}

//删除方法
function Delete(stuNum) {
    if (confirm("确定要删除吗？")) {
        $.ajax({
            url: '/PersonalManger/CheckMember/DeleteBy',
            type: 'post',
            data: { "stuNum": stuNum },
            success: function (data) {
                var jsonObj = JSON.parse(data);
                if (jsonObj.Statu == "ok") {
                    alert(jsonObj.Msg);
                    $("#body").empty();
                    $.Init();
                } else {
                    alert(jsonObj.Msg);
                }
            }
        })
    }
    else { }
}


/*分页定义的变量*/
var json = "";//json数据
var pageSize = 10;//页的容量
var pageIndex = 1;//记录翻到了第几页
var rowSum;//记录总行数
var pageSum;//记录总页数
var rowCurrentSum;//当前请求得到的总记录数
var rowForm;//开始的记录数
var rowTO;//结束的记录数

$(function () {
    //关闭Jquery的浏览器缓存
    $.ajaxSetup({ cache: false });
})


//生成表格前预处理工作
function PreCreateTable(jsonObj) {
    var data = jsonObj.Data.data;//获得数据data对象
    rowSum = jsonObj.Data.TotalRecord;//总记录数
    pageSum = Math.floor((jsonObj.Data.TotalRecord / (pageSize + 1))) + 1;//总页数    
    rowCurrentSum = data.length;//当前请求得到的总记录数
    rowForm = (pageIndex - 1) * pageSize + 1;//开始的记录数
    rowTO = rowForm + rowCurrentSum - 1;//结束的记录数
    $(".lable-text-right").html("显示" + rowForm + "到" + rowTO + "，总计" + rowSum + "条记录");//从开始纪录到结束纪录显示
    $(".lable-page").html(pageIndex);//当前页显示
    $("#lable-page-sum").html("共" + pageSum + "页");//总页数显示
    $.creatTable(data);
}

$.extend({
    Init: function () {
        $.ajax({
            url: '/Permission/Permission/GetPageData',
            type: 'post',
            data: { "pageindex": pageIndex },
            success: function (json) {
                //转换json，很奇怪............
                //var jsonObj = JSON.parse(json);
                if (json.Statu == "ok") {
                    PreCreateTable(json);
                }
                if (json.Statu == "nologin") {
                    alert("您还没有登陆，请登录！");
                    parent.location = jsonObj.BackUrl;

                }
                if (json.Statu == "nopermission") {
                    alert(json.Msg);
                    window.location = jsonObj.BackUrl;
                }
                if (json.Statu == "err") {
                    alert(json.Msg);
                }
            }
        })
    }
})

//第一次请求初始化
$(function () {
    //清空表格
    $.Init();
})

//各种点击事件
$(function () {
    //点击第一页按钮触发事件
    $(".a-first").click(function () {
        $("#body").empty();
        var $data = $("#input-text").val();
        /*有查询条件时请求的行为不同*/
        if ($data != "")
        {
            pageIndex = 1;
            Search($data);
        }
        if ($data == "") {
            pageIndex = 1;
            $.Init();
        }
    });

    //点击最后一页按钮触发事件
    $(".a-last").click(function () {
        $("#body").empty();
        var $data = $("#input-text").val();
        /*有查询条件时请求的行为不同*/
        if ($data != "") {
            pageIndex = pageSum;
            Search($data);
        }
        if ($data == "") {
            pageIndex = pageSum;
            $.Init();
        }

    });

    //点击向前翻页按钮触发事件
    $(".a-pre").click(function () {
        if (pageIndex == 1) { }//判断是否到了第一页
        else {
            $("#body").empty();
            var $data = $("#input-text").val();
            /*有查询条件时请求的行为不同*/
            if ($data != "") {
                pageIndex = pageIndex - 1;
                Search($data);
            }
            if ($data == "") {
                pageIndex = pageIndex - 1;
                $.Init();
            }
        }
    });
    //点击向后翻页按钮触发事件
    $(".a-next").click(function () {
        if (pageIndex == pageSum) { }//判断是否到了最后一页
        else {
            $("#body").empty();
            var $data = $("#input-text").val();
            /*有查询条件时请求的行为不同*/
            if ($data != "") {
                pageIndex = pageIndex + 1;
                Search($data);
            }
            if ($data == "") {
                pageIndex = pageIndex + 1;
                $.Init();
            }
        }
    });
    //点击刷新按钮触发事件
    $(".a-refresh").click(function () {
        $("#body").empty();
        var $data = $("#input-text").val();
        /*有查询条件时请求的行为不同*/
        if ($data != "") {
            Search($data);
        }
        $.Init();
    });
})

//生成表格
$.extend({
    creatTable: function (data) {
        var $body = $("#body");
        var IsEdit = $("#IsEdit").val();
        if (IsEdit == "True") {
            for (var i = 0; i < data.length; i++) {
                var $tr = $("<tr class='tbody-tr'></tr>");
                /*生成第一列*/
                var $td = $("<td id='body-td-first'></td>");
                var $div = $("<div class='head-table-img'></div>");
                $td.append($div);
                $tr.append($td);
                /*生成其他七列*/
                var $content = $("<td><a href='" + "/PersonalManger/CheckMember/PersonPage?StuNum=" + data[i].StuNum + "' class='a-stum'>" + data[i].StuNum + "</a></td>" + "<td>" + data[i].StuName + "</td>" +
                    "<td>" + data[i].TelephoneNumber + "</td>" + "<td>" + data[i].Major + "</td>" + "<td>" + data[i].Department + "</td>" +
                    "<td>" + data[i].Year + "</td>" + "<td><a href='/PersonalManger/CheckMember/PersonPage?StuNum=" + data[i].StuNum + "'class='a-operate' onclick='Edit(" + data[i].StuNum + ")'>查看</a> <a href='#' class='a-operate' id='a-operate-delete' onclick='Delete(" + data[i].StuNum + ")'>删除</a></td>");
                $tr.append($content);
                $body.append($tr);
            }
        } else {
            for (var i = 0; i < data.length; i++) {
                var $tr = $("<tr class='tbody-tr'></tr>");
                /*生成第一列*/
                var $td = $("<td id='body-td-first'></td>");
                var $div = $("<div class='head-table-img'></div>");
                $td.append($div);
                $tr.append($td);
                /*生成其他七列*/
                var $content = $("<td><a href='" + "/PersonalManger/CheckMember/PersonPage?StuNum=" + data[i].StuNum + "' class='a-stum'>" + data[i].StuNum + "</a></td>" + "<td>" + data[i].StuName + "</td>" +
                    "<td>" + data[i].TelephoneNumber + "</td>" + "<td>" + data[i].Major + "</td>" + "<td>" + data[i].Department + "</td>" +
                    "<td>" + data[i].Year + "</td>"+ "<td></td>");
                $tr.append($content);
                $body.append($tr);
            }
        }
    }
});

//进行查询dataBy:查询条件Obj);
function Search(dataBy) {
    $.ajax({
        url: '/PersonalManger/CheckMember/GetPageData',
        type: 'post',
        data: { "dataBy": dataBy, "pageindex": pageIndex },
        success: function (data) {
            var jsonObj = JSON.parse(data);
            if (jsonObj.Statu == "ok") {
                $("#body").empty();
                var pageIndex = 1;//初始化页数为1
                PreCreateTable(jsonObj)
            }
            if (jsonObj.Statu == "nologin") {
                alert(jsonObj.Msg);
                parent.location = jsonObj.BackUrl;

            }
            if (jsonObj.Statu == "nopermission") {
                alert("您没有权限访问此页面!");
                window.location = jsonObj.BackUrl;
            }
            if (jsonObj.Statu == "err") {
                alert("访问出错！");
            }
        }
    })
}

//为button绑定事件
$(function () {
    $(".ser-btn").click(function () {
        var $data = $("#input-text").val();
        Search($data);
    });

    //鼠标焦点移开查寻
    $("#input-text").blur(function () {
        var $data = $("#input-text").val();
        Search($data);
    });
})