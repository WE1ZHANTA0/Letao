$(function () {
    var currenPage = 1;

    var render = function(){
        getUserData({
            page:currenPage,
            pageSize:5
        },function(data){
            // console.log(data);
            var html = template('userData', data);
            // console.log(html);
            $('.table tbody').html(html);
            setPage(data.page,Math.ceil(data.total/data.size),render);
        });
        
    }
    
    var setPage = function(currentPage,totalPages,callback){
        $(".page .pagination").bootstrapPaginator({
            bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
            currentPage:currenPage,//当前页
            totalPages:totalPages,//总页数
            size:"small",//设置控件的大小，mini, small, normal,large
            onPageClicked:function(event, originalEvent, type,page){
              //为按钮绑定点击事件 page:当前点击的按钮值

              currenPage = page;

              callback && callback();
            }
          });
    }
    
    var getUserData = function(obj,callback){
        $.ajax({
            url: '/user/queryUser',
            data: obj,
            success: function (data) {
                
                callback&&callback(data);
            }
        })
    }

    render();

    $('tbody').on('click','.btn', function () {
        // console.log('eheh');
        var text = $(this).text();
        text += $(this).attr('data-name');
        var id = $(this).attr('data-id');
        var isDelete = $(this).attr('data-isDelete') == 1 ? 0 : 1;
        // console.log(id);
        // console.log(isDelete);
        $('#statusModal strong').html(text);

        $('#statusModal').modal("show");

        $('#statusModal .btn_confirm').off().on('click', function () {
            $.ajax({
                type: 'post',
                url: '/user/updateUser',
                data: {
                    id: id,
                    isDelete: isDelete
                },
                dataType: 'json',
                success: function (backData) {
                    // console.log(backData);
                    if (backData.success) {
                        render();
                        $('#statusModal').modal('hide');
                    }
                }
            })
        })
    })



})