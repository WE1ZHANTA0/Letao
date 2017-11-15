$(function () {


  // 获取验证码
  $('.btn_getcode').on('click', function (e) {

    e.preventDefault();

    var $this = $(this);

    $this.addClass('disabled').prop('disabled', true).text('正在发送中...');


    $.ajax({
      type: 'get',
      url: '/user/vCode',
      success: function (data) {
        console.log(data);
        var count = 5;
        var timer = setInterval(function () {
          count--;
          $this.text(count + '秒后再次发送');

          if (count <= 0) {
            $this.removeClass('disabled').prop('disabled', false).text('获取验证码');
            clearInterval(timer);
          }
        }, 1000)
      }
    })



  })


  // 给注册按钮注册事件
  $('.btn_register').on('click', function () {


    // 获取表单数据

    var username = $("[name='username']").val();
    var password = $("[name='password']").val();
    var repassword = $("[name='repassword']").val();
    var mobile = $("[name='mobile']").val();
    var vCode = $("[name='vCode']").val();

    // 对表单数据进行验证
    if(!username){
      mui.toast('请输入用户名');
      return false;
    }
    if(!password){
      mui.toast('请输入密码');
      return false;
    }
    if(!repassword){
      mui.toast('请输入确认密码');
      return false;
    }
    if(password!=repassword){
      mui.toast('两次密码不一致');
      return false;
    }
    if(!mobile){
      mui.toast('请输入手机号');
      return false;
    }

    if(!/^1[34578]\d{9}$/.test(mobile)){
      mui.toast('请输入正确的手机号');
      return false;
    }

    if(!vCode){
      mui.toast('请输入验证码');
      return false;
    }


    // 验证成功发送ajax
    $.ajax({
      type:'post',
      url:'/user/register',
      data:{
        username:username,
        password:password,
        mobile:mobile,
        vCode:vCode
      },
      success:function(data){
         // 注册成功跳转登录界面
        if(data.success){
          mui.toast('注册成功,一秒后跳转到登录页');
          setTimeout(function() {
            location.href = 'login.html'
          }, 1000);
        }else{
          mui.toast(data.message);
        }
      }
    })
   






  })



})