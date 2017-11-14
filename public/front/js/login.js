$(function(){


    // 给登录按钮祝陈伟点击事件
    $('.btn_login').on('click',function(){
        // 获取用户名
        var username = $("[name='username']").val();
        // 获取密码
        var password = $("[name = 'password']").val();
        // 判断密码和用户名是否为空
        if(!username||!password){
            mui.toast('请输入用户名和密码');
            return false;
        }
        // 发送ajax
        $.ajax({
            type:'post',
            url:'/user/login',
            data:{
                username:username,
                password:password
            },
            success:function(data){
                console.log(data);
                if(data.success){
                    var search = location.search;
                    if(search.indexOf('retUrl')==-1){
                        // 说明是从会员中心界面过来的
                        location.href = 'user.html'
                    }else{
                        search = search.replace('?retUrl=','');
                        location.href = search;
                    }
                }else if(data.error === 403){
                    mui.toast(data.message);
                }
            }
        })

    })



})