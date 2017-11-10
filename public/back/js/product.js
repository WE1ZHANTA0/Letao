$(function(){

    var currentPage = 1;



    var render = function(){
        $.ajax({
            type:'get',
            url:'/product/queryProductDetailList',
            data:{
                page:currentPage,
                pageSize:5
            },
            success:function(data){
                // console.log(data);
                $('tbody').html(template('listData',data));


                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:currentPage,//当前页
                    totalPages:Math.ceil(data.total/data.size),//总页数
                    size:"small",//设置控件的大小，mini, small, normal,large
                    onPageClicked:function(event, originalEvent, type,page){
                      //为按钮绑定点击事件 page:当前点击的按钮值
                      currentPage = page;
                      render();
                    }
                  });



            }
        })
    }

    render();


    $('#addBtn').on('click',function(){
        $('#addModal').modal('show');
    })

    $.fn.bootstrapValidator.validators.checkPic = {
        validate:function(validate,$field,options){
            if(picList.length !=3) return {valid: false, message: '请上传三张图片'};
            return true;
        }
    }


    $('#form').bootstrapValidator({
        excluded: [],
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields:{
            proName:{
                validators:{
                    notEmpty:{
                        message:'请输入商品名称'
                    }
                }
            },
            proDesc:{
                validators:{
                    notEmpty:{
                        message:'请输入商品描述'
                    }
                }
            },
            num:{
                validators:{
                    notEmpty:{
                        message:'请输入商品库存'
                    }
                }
            },
            price:{
                validators:{
                    notEmpty:{
                        message:'请输入商品价格'
                    }
                }
            },
            oldPrice:{
                validators:{
                    notEmpty:{
                        message:'请输入商品原价'
                    }
                }
            },
            size:{
                validators: {
                    notEmpty: {
                        message: '请输入商品尺码'
                    }
                }
            },
            pic:{
                validators: {
                    checkPic:{}
                }
            }
        }
    }).on('success.form.bv',function(e){
        e.preventDefault();
        var data = $('#form').serialize();

        $.each(picList,function(i,e){
            data += '&picName'+(i+1)+'='+e.picName+'&picAddr'+(i+1)+'='+e.picAddr;
        });
        $.ajax({
            type:'post',
            url:'/product/addProduct',
            data:data,
            dataType:'json',
            success:function(data){
                if(data.success){
                    $('#addModal').modal('hide');
                    currentPage = 1;
                    render();
                    $('#form')[0].reset();
                    $('#form').data('bootstrapValidator').resetForm();
                    $('#form').find('img').remove();
                }
            }
        })
    })














    var picList = [];
    $("#fileupload").fileupload({
        dataType:"json",
        //e：事件对象
        //data：图片上传后的对象，通过e.result.picAddr可以获取上传后的图片地址
        done:function (e, data) {
          console.log(data);
          if(picList.length<3){
              console.log('haha');
              $(this).parent().parent().next().append('<img width="100" height="100" src="'+data.result.picAddr+'"/> ');
              picList.push(data.result);
              if(picList.length == 3){
                //   $('#form').data('bootstrapValidator').updateStatus('pic','VALID');
              }
          }
        }
      });

})