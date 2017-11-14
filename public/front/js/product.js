$(function () {

    var id = tools.getParam('productId');

    // 发送ajax渲染界面
    $.ajax({
        url: '/product/queryProductDetail',
        data: {
            id: id
        },
        success: function (data) {
            console.log(data);
            $('.mui-scroll').html(template('productData', data));

            // 渲染后从新初始化轮播图
            mui(".mui-slider").slider({
                interval: 1000
            });

            //   手动初始化数字搜索框
            //手动初始化数字框
            mui(".mui-numbox").numbox();

            // 注册选择尺码的事件
            $('.lt_size span').off().on('click',function(){
                $(this).addClass('now').siblings().removeClass('now');
            });

            

        }
    })



    // 添加到购物车
    $('.mui-btn-danger').on('click',function(){
        // 获取尺码
        var size = $('.lt_size span.now').html();
        if(!size){
            mui.toast('请选择商品的尺码');
            return false;
        }

        // 获取库存
        var num = $('.mui-numbox-input').val();

        // 发送ajax
        $.ajax({
            type:'post',
            url:'/cart/addCart',
            data:{
                productId:id,
                size:size,
                num:num
            },
            success:function(data){
                console.log(data);
                tools.checkLogin(data);
                if(data.success){
                    mui.confirm('添加成功','温馨提示',['去购物车','继续逛逛'],function(e){
                        if(e.index ==0){
                            location.href = 'cart.html';
                        }
                    })
                }
            }
        })
    })




})