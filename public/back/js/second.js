$(function () {
    
        var currPage = 1;
    
        var getListData = function (obj, callback) {
            $.ajax({
                url: '/category/querySecondCategoryPaging',
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
                console.log(data);
                var html = template('secondData', data);
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


            $.ajax({
                type :'get',
                url:'/category/queryTopCategory',
                data:{
                    page:1,
                    pageSize:100
                },
                success:function(data){
                    // console.log(data);
                    var html = template('selectData',data);
                    // console.log(html);
                    $('.dropdown-menu').html(html);
                }
            })
        })

        $('.dropdown-menu').on('click','a',function(){
            $('.dropdown-text').text($(this).text());
            $('#categoryId').val($(this).data('id'));
            $('#addForm').data('bootstrapValidator').updateStatus('categoryId','VALID');
        })
    
        $("#fileupload").fileupload({
            dataType:"json",
            //e：事件对象
            //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
            done:function (e, data) {
              console.log(data.result.picAddr);
              $('.img_box img').attr('src',data.result.picAddr);
              $('#brandLogo').val(data.result.picAddr);
              $('#addForm').data('bootstrapValidator').updateStatus('brandLogo','VALID');
            }
          });
    
    
        // 使用表单校验插件
        $('#addForm').bootstrapValidator({
            excluded:[],
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                //校验用户名，对应name表单的name属性
                categoryId: {
                    validators: {
                        //不能为空
                        notEmpty: {
                            message: '请选择一级分类'
                        }
                    }
                },
                brandName:{
                    validators:{
                        notEmpty:{
                            message:'请输入二级分类的名称'
                        }
                    }
                },
                brandLogo:{
                    validators:{
                        notEmpty:{
                            message:'请上传图片'
                        }
                    }
                }
            }
    
        });
    
        $('#addForm').on('success.form.bv',function(e){
            e.preventDefault();
            console.log(352342);
            // console.log($('#addForm').serialize());
            $.ajax({
                type:'post',
                url:'/category/addSecondCategory',
                data:$('#addForm').serialize(),
                success:function(data){
                    // console.log(data);
                    if(data.success){
                        $('#addModal').modal('hide');
                        currPage =1;
                        render();

                        $('#addForm')[0].reset();
                        $('#addForm').data('bootstrapValidator').resetForm();
                        $(".dropdown-text").text("请选择一级分类");
                        $(".img_box img").attr("src", "images/none.png");
                        $("#categoryId").val("");
                        $("#brandLogo").val("");
                    }
                }
            })
        })
    
    
    
    
    
    
    
    
    
    
    })