$(function () {


  mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper",//下拉刷新容器标识
      //下拉刷新
      down : {
        //下拉时，会触发这个function
        auto:true,
       
      }
    }
  });


})