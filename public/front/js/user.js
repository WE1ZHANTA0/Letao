$(function(){


// 发送ajax请求数据渲染页面
$.ajax({
    url:'/user/queryUserMessage',
    success:function(data){
        tools.checkLogin(data);
        console.log(data);
        $('.info').html(template('tpl',data));
    }
})


// 退出功能
$('.lt_logout a').on('click',function(){
    // 发送ajax

    $.ajax({
        url:'/user/logout',
        success:function(data){
            if(data.success){
                location.href = 'login.html';
            }
        }
    })


})


})