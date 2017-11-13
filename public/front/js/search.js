$(function(){



    function getHistory(){
        var history = localStorage.getItem('lt_search_history') || '[]';
        return JSON.parse(history);
    }

    // console.log(getHistory());

    function render(){
        var arr = getHistory();
        $('.lt_history').html(template('historyData',{arr:arr}));
    }

    render();


    // 清空操作
    $('.lt_history').on('click','.btn_empty',function(){
        mui.confirm('你确定要清空吗','温馨提示',['否','是'],
        function(e){
            if(e.index == 1){
                localStorage.removeItem('lt_search_history');
                render();
                // console.log(e.index);
            }
            
        })
    })



    // 删除操作
    $('.lt_history').on('click','.btn_delete',function(){
        var $this = $(this);
        //     mui.confirm('确定要删除这条吗','温馨提示',['否','是'],
        // function(e){
        //     if(e.index === 1){
            var index = $this.data('index');
            var arr = getHistory();
            arr.splice(index,1);
            console.log(arr);
            localStorage.setItem('lt_search_history',JSON.stringify(arr));
            render();
        //     }
        // })
    })


    // 增加操作
    $('.lt_search a').on('click',function(){
        var key = $('.lt_search input').val().trim();
        $('.lt_search input').val('');
        if(key === ''){
            mui.toast('请输入搜索内容');
            return false;
        }
        var arr = getHistory();
        var index = arr.indexOf(key);
        if(index != -1){
            arr.splice(index,i);
        }
        if(arr.length >= 10){
            arr.pop();
        }
        arr.unshift(key);

        localStorage.setItem('lt_search_history',JSON.stringify(arr));
        render();



        location.href = 'searchList.html?key='+key;
    })

})