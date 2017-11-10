$(function () {

    var currPage = 1;

    var getListData = function (obj, callback) {
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            data: obj,
            success: function (data) {
                callback && callback(data);
            }
        })
    }


    var render = function () {
        // console.log(currPage);
        getListData({
            page: currPage,
            pageSize: 5
        }, function (data) {
            // console.log(data);
            var html = template('firstData', data);
            // console.log(html);
            $('tbody').html(html);

            getPage(data.page, Math.ceil(data.total / data.size), render)
        })
    }

    render();

    var getPage = function (currentPage, totalPages, callback) {
        $(".pagination").bootstrapPaginator({
            bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
            currentPage: currentPage, //当前页
            totalPages: totalPages, //总页数
            size: "small", //设置控件的大小，mini, small, normal,large
            onPageClicked: function (event, originalEvent, type, page) {
                //为按钮绑定点击事件 page:当前点击的按钮值
                //   console.log(page);
                // event.preventDefault();
                currPage = page;
                callback && callback()
            }
        });
    }


    $('#addBtn').on('click', function () {
        $('#addModal').modal('show');
    })



    //使用表单校验插件
    $('#addForm').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            //校验用户名，对应name表单的name属性
            categoryName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '用户名不能为空'
                    }
                }
            }
        }

    });

    $('#addForm').on('success.form.bv',function(e){
        e.preventDefault();
        // console.log(352342);
        // console.log($('#addForm').serialize());
        $.ajax({
            type:'post',
            url:'/category/addTopCategory',
            data:$('#addForm').serialize(),
            success:function(data){
                // console.log(data);
                if(data.success){
                    $('#addModal').modal('hide');
                    currPage =1;
                    render();
                    $('#addForm').data('bootstrapValidator').resetForm();
                    $('#addForm').find('input').val('');
                }
            }
        })
    })










})