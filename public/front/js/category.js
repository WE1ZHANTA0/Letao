$(function(){
    $.ajax({
        type:'get',
        url:'/category/queryTopCategory',
        success:function(data){
            // console.log(template('tp1',data))
            $('.lt_category_l .mui-scroll').html(template('tp1',data));

            renderSecond(data.rows[0].id);
        }
    })

    function renderSecond(id){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategory',
            data:{
                id:id
            },
            success:function(data){
                $('.lt_category_r .mui-scroll').html(template('tp2',data))
            }
        })
    }

    $('.lt_category_l').on('click','li',function(){
        $(this).addClass('now').siblings().removeClass('now');
        var id = $(this).data('id');
        renderSecond(id);


        var temp = mui('.mui-scroll-wrapper').scroll()[1];
        temp.scrollTo(0,0,400);
    })


    

})