$(function(){

    var currentPage = 1;
    var pageSize = 100;

    var key = tools.getParam('key');
    console.log(key);
    $('.lt_search input').val(key);


    function render(){

        var type = $('.lt_sort a[data-type].now').data('type');
        var value = $('.lt_sort a[data-type].now').find('span').hasClass('fa-angle-down')?2:1;

        var obj = {};

        obj.proName = key;
        obj.page = currentPage;
        obj.pageSize = pageSize;


        if(type){
            obj[type] = value;
        }



        $.ajax({
            type:'get',
            url:'/product/queryProduct',
            data:obj,
            success:function(data){
                console.log(data);
                setTimeout(function() {
                    $('.lt_product').html(template('productList',data));
                }, 600);
            }
        })
    }

    render();


    $('.lt_search a').on('click',function(){
         key = $('.lt_search input').val().trim();
        $('.lt_search input').val('');
        if(key === ''){
            mui.toast('请输入搜索内容');
            return false;
        }

        render();
    })

    $(".lt_sort a.paixu").on('click',function(){
        var $this = $(this);
        if($this.hasClass('now')){
            $this.find("span").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
        }else{
            $this.addClass('now').siblings().removeClass('now');
            $('.lt_sort a').find('span').removeClass("fa-angle-up").addClass("fa-angle-down");
        }
        $('.lt_product').html('<div class="loading"><span class="mui-icon mui-icon-spinner"></span></div>');
        render();
    })



})