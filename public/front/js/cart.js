$(function () {



  // 下拉刷新初始化 并在回调函数中发送ajax
  mui.init({
    pullRefresh: {
      container: '.mui-scroll-wrapper',
      down: {
        auto: true,
        callback: function () {
          $.ajax({
            url: '/cart/queryCart',
            success: function (data) {
              setTimeout(function () {
                console.log(data);
                tools.checkLogin(data);
                $('.mui-table-view').html(template('tpl', {
                  data: data
                }));
                $('.lt_total .total').html('00.00');
                console.log(11111)


                // 删除功能
                // 给删除按钮注册事件  获取当前购物车id 发送ajax
                var btn = document.querySelectorAll('.btn_delete');
                for(var j=0;j<btn.length;j++){
                  btn[j].addEventListener("touchend", function () {
                    // console.log("tap event trigger");
                    var id = $(this).data('id');
                    console.log(1111);
                    mui.confirm('你确定要删除吗', '温馨提示', ['是', '否'], function (e) {
                      // mui.closePopups();
                      if (e.index === 0) {
                        $.ajax({
                          url: '/cart/deleteCart',
                          data: {
                            id: id
                          },
                          success: function (data) {
                            if (data.success) {
                              mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
                            }
                          }
                        })
                      }
                    })
  
  
                  });
                }




                // 编辑功能
                var edit = document.querySelectorAll('.btn_edit');
                console.log(edit);
                for (var i = 0; i < edit.length; i++) {
                  edit[i].addEventListener('touchend', function () {
                    var data = this.dataset;
                    console.log(data);

                    var arr = data.productsize;
                    console.log(arr);


                    // 渲染模板

                    var html = template('tpl2', data)
                    console.log(html);
                    // 去除html中的换行
                    html = html.replace(/\n/g, '');

                    // 显示confirm框
                    mui.confirm(html, '编辑商品', ['确定', '取消'], function (e) {
                      if (e.index == 0) {
                        var id = data.id;
                        var num = $('.lt_edit_num .mui-numbox-input').val();
                        var size = $('.lt_edit_num span.now').html();

                        $.ajax({
                          type: 'post',
                          url: '/cart/updateCart',
                          data: {
                            id: id,
                            size: size,
                            num: num
                          },
                          success: function (data) {
                            if (data.success) {
                              mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
                            }
                            console.log(data);
                          }
                        })
                      }
                    })

                    //选择尺码，lt_edit_size下span注册
                    $(".lt_edit_size span").on("tap", function () {
                      $(this).addClass("now").siblings().removeClass("now");
                    });


                    //初始化数字框
                    mui(".mui-numbox").numbox();


                  })
                }





                mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
              }, 700);
            }
          })
        }
      }
    }
  })








  // 给所有的checkbox注册点击事件

  $('.lt_content').on('change', '.ck', function () {
    var total = 0;
    $('.ck:checked').each(function () {
      total += this.dataset.price * this.dataset.num;
    })
    console.log(total);
    // 保留两位小数 
    $('.lt_total .total').html(total.toFixed(2));
  })




})