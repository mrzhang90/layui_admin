var zgs_util={
    dateFormat:function(d){
        var double=function(num){
            if(num<9){
                num="0"+num;
            }
            return num;
        }
        var date=new Date(d);
        return date.getFullYear()+'-'+double(date.getMonth()+1)+'-'+double(date.getDate());
    },
    getNowFormatDate:function(){
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
        return currentdate;
    },
    addSuccess:function(result){
        isSuccess(result,'添加成功')
    },
    updSuccess:function(result,callback){
        if(result.status==1){
            if(callback && typeof callback=="function"){
                callback();
            }
        }
        isSuccess(result,'修改成功')
    },
    // success:function(result) {
    //     if(result.status==1){
    //         window.top.closeAll('iframe');
    //         layerSucc(result.msg)
    //     }else{
    //         layerErr(result.msg)
    //     }
    // },
    error:function(err){
        layerErr("服务器异常！")
    },
    layerErr:function(msg){
        layerErr(msg)
    },
    selectCallback:function(result){
        if(result.status!=1) {
            layerErr(result.msg)
            return false;
        }
        return true;
    },
    delCallback:function(result){
        if(result.status==1){
            layerSucc('删除成功')
        }else{
            layerErr(result.msg)
        }
    }
}
function isSuccess(result,msg) {
    if(result.status==1){
        window.top.closeAll('iframe');
        layerSucc(msg)
    }else{
        layerErr(result.msg)
    }
}
function layerErr(msg){
    window.top.open_layer(msg,{'icon':5,'anim':6})
}
function layerSucc(msg){
    window.top.open_layer(msg,{icon: 1,'time':1000});
}