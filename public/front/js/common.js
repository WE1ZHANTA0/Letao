mui('.mui-scroll-wrapper').scroll({
    // deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    indicators: false
});



var gallery = mui('.mui-slider');
gallery.slider({
    interval: 500 //自动轮播周期，若为0则不自动播放，默认为0；
});



var tools = {
    getParamObj:function(){
        var search = location.search;

        search=decodeURI(search);
        search = search.slice(1);
        var arr = search.split('&');
        var obj = {};

        for(var i = 0;i<arr.length;i++){
            var k = arr[i].split('=')[0];
            var v = arr[i].split('=')[1];
            obj[k] = v;
        }
        return obj;
    },
    getParam:function(key){
        return this.getParamObj()[key];
    }
}