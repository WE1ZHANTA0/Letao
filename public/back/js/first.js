$(function(){

var currPage = 1;

var getListData = function(obj,callback){
    $.ajax({
        url:'/category/queryTopCategoryPaging',
        data:obj,
        success:function(data){
            callback&&callback(data);
        }
    })
}


var render = function(){
    console.log(currPage);
    getListData({
        page:currPage,
        pageSize:5
    },function(data){
        console.log(data);
        var html = template('firstData',data);
        console.log(html);
        $('tbody').html(html);

        getPage(data.page,Math.ceil(data.total/data.size),render)
    })
}

render();

var getPage = function(currentPage,totalPages,callback){
    $(".pagination").bootstrapPaginator({
        bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
        currentPage:currentPage,//当前页
        totalPages:totalPages,//总页数
        size:"small",//设置控件的大小，mini, small, normal,large
        onPageClicked:function(event, originalEvent, type,page){
          //为按钮绑定点击事件 page:当前点击的按钮值
        //   console.log(page);
        // event.preventDefault();
          currPage = page;
          callback&&callback()
        }
      });
}













})