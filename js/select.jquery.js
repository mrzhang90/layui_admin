layui.define(["element","jquery"],function(exports){
    var $ = layui.jquery;
    exports("select_Category", function(obj,param,callback) {
        return new select_Category(obj,param,callback).InitData();
    });
    function select_Category(obj,param,callback) {
        this.Category1ID = obj.Category1ID,
        this.Category2ID = obj.Category2ID,
        this.Category3ID = obj.Category3ID,
        this.Category4ID = obj.Category4ID,
        this.state = obj.state,
        this.DataURL = obj.DataURL, //数据URL
        this.isClick=false;
        this.initial=1;
        this.paramVal={};
        // this.InitData();
        
        this.InitData = function(){
            var That=this;
            $.get(this.DataURL, {}, function(category1) {
                //初始化一级分类
                var _category=[];
                for (var i = 0; i < category1.data.length; i++) {
                    if(category1.status!=1 || category1.data.length<=0){
                        getErrorClearElem(That.Category1ID);
                        getErrorClearElem(That.Category2ID);
                        getErrorClearElem(That.Category3ID);
                        getErrorClearElem(That.Category4ID);
                        window.top.open_layer('没有获取到赛事信息',{'icon':5});
                        return false;
                    }
                    var _class="";
                    if(i==0){
                        _class="class='layui-this'";
                    }
                    if(param && param['activityId']==category1.data[i].id && callback){
                        That.paramVal['val1']=category1.data[i].name
                    }
                    _category.push(" <dd "+_class+" lay-value='" + category1.data[i].id + "' "+_class+">" + category1.data[i].name + "</dd>");
                }
                siblingDD(That.Category1ID).append(_category.join(''));
                if(That.state=='edit'){
                    loadC2C3C4(That,category1.data[0].id)
                }else{
                    createInit(That.Category2ID,"请选择赛制")
                    createInit(That.Category3ID,"请选择分组")
                    createInit(That.Category4ID,"请选择比赛")
                }
            }, "json")
            this.inputEvent();
            this.category1Select();
            this.category2Select();
            this.category3Select();
            this.category4Select();
        },
        this.inputEvent = function(){
            $('.layui-input').on('click',function(ev){
                ev.stopPropagation();
                selectHide()
                $(this).parents('.layui-form-select').toggleClass('layui-form-selected')
            })
            $(document).on('click',function(){
                selectHide()
            })
        },
        this.category1Select = function () {
            var That=this;
            var oldStyle;
            $('.'+this.Category1ID).on('click','dd',function(ev){
                ev.stopPropagation();
                if(!$(this).attr('lay-value') || $(this).attr('lay-value')==""){
                    window.top.open_layer('赛事不能为空',{'icon':5,'anim':6});
                    return false;
                }
                That.isClick=true;
                ++That.initial;
                createInit(That.Category2ID,"请选择赛制")

                oldStyle ? $(oldStyle).removeClass('layui-this') : $(this).siblings('.layui-this').removeClass('layui-this');
                $(this).addClass('layui-this');
                var tmpSelectedcategory1=$(this).attr('lay-value');
                $('.'+That.Category1ID+' .layui-input').val($(this).text());
                oldStyle=this;
                selectHide();
                //初始化二级分类
                param=null;
                loadC2C3C4(That,tmpSelectedcategory1)
            });
        },
        this.category2Select = function () {
            var That=this;
            var oldStyle;
            $('.'+this.Category2ID).on('click','dd',function(ev){
                ev.stopPropagation();
                if(!$(this).attr('lay-value') || $(this).attr('lay-value')==""){
                    window.top.open_layer('赛制不能为空',{'icon':5,'anim':6});
                    return false;
                }
                ++That.initial;
                createInit(That.Category3ID,"请选择分组")

                oldStyle ? $(oldStyle).removeClass('layui-this') : $(this).siblings('.layui-this').removeClass('layui-this');
                $(this).addClass('layui-this');
                var tmpSelectedcategory2=$(this).attr('lay-value');
                $('.'+That.Category2ID+' .layui-input').val($(this).text());
                oldStyle=this;
                selectHide();

                param=null;
                loadC3(That,tmpSelectedcategory2)
            });
        },
        this.category3Select = function () {
            var That=this;
            var oldStyle;
            $('.'+this.Category3ID).on('click','dd',function(ev){
                ev.stopPropagation();
                if(!$(this).attr('lay-value') || $(this).attr('lay-value')==""){
                    window.top.open_layer('分组不能为空',{'icon':5,'anim':6});
                    return false;
                }
                ++That.initial;
                createInit(That.Category4ID,"请选择比赛")

                oldStyle ? $(oldStyle).removeClass('layui-this') : $(this).siblings('.layui-this').removeClass('layui-this');
                $(this).addClass('layui-this');
                var tmpSelectedcategory3=$(this).attr('lay-value');
                $('.'+That.Category3ID+' .layui-input').val($(this).text());
                oldStyle=this;
                selectHide();

                param=null;
                loadC4(That,tmpSelectedcategory3)
            });
        },
        this.category4Select = function () {
            var That=this;
            var oldStyle;
            $('.'+this.Category4ID).on('click','dd',function(ev){
                ev.stopPropagation();
                if(!$(this).attr('lay-value') || $(this).attr('lay-value')==""){
                    window.top.open_layer('比赛不能为空',{'icon':5,'anim':6});
                    return false;
                }
                oldStyle ? $(oldStyle).removeClass('layui-this') : $(this).siblings('.layui-this').removeClass('layui-this');
                $(this).addClass('layui-this');
                $('.'+That.Category4ID+' .layui-input').val($(this).text());
                setHidden($(this).attr('lay-value'))
                oldStyle=this;
                param=null;
                selectHide();
            });
        }
        function createInit(id,val){
            var optionHtml = "";
            optionHtml = '<dd lay-value="" class="layui-select-tips">'+val+'</dd>';
            siblingDD(id).html(optionHtml)
        }
        function selectHide(){
            $('.layui-form-select').removeClass('layui-form-selected');
        }
        function loadC2C3C4(That,activityId){
            //初始化二级分类
            $.get(That.DataURL, {
                activityId: param ? param['activityId'] : activityId
            }, function(category2) {
                if(category2.status!=1 || category2.data.length<=0){
                    getErrorClearElem(That.Category2ID);
                    getErrorClearElem(That.Category3ID);
                    getErrorClearElem(That.Category4ID);
                    window.top.open_layer('没有获取到赛制信息',{'icon':5,'anim':6});
                    return false;
                }
                var _category2=[];
                That.initial>1 && $('.'+That.Category2ID+' .layui-input').val(category2.data[0].name);
                for (var i = 0; i < category2.data.length; i++) {
                    var _class='';
                    if(param && param['eventId']==category2.data[i].id && callback){
                        _class="class='layui-this'";
                        That.paramVal['val2']=category2.data[i].name
                    }
                    _category2.push(" <dd "+_class+" lay-value='" + category2.data[i].id + "'>" + category2.data[i].name + "</dd>");
                }
                siblingDD(That.Category2ID).append(_category2.join(''));
                loadC3(That,category2.data[0].id)
            }, "json");
        }
        function loadC3(That,eventId){
            $.get(That.DataURL, {
                eventId: param ? param['eventId'] : eventId
            }, function(category3) {
                if(category3.status!=1 || category3.data.length<=0){
                    getErrorClearElem(That.Category3ID);
                    getErrorClearElem(That.Category4ID);
                    window.top.open_layer('没有获取到分组信息',{'icon':5,'anim':6});
                    return false;
                }
                var _category3=[];
                That.initial>1 && $('.'+That.Category3ID+' .layui-input').val(category3.data[0].name);
                for (var i = 0; i < category3.data.length; i++) {
                    var _class='';
                    if(param && param['groupId']==category3.data[i].id && callback){
                        _class="class='layui-this'";
                        That.paramVal['val3']=category3.data[i].name
                    }
                    _category3.push(" <dd "+_class+" lay-value='" + category3.data[i].id + "'>" + category3.data[i].name + "</dd>");
                }
                siblingDD(That.Category3ID).append(_category3.join(''));
                loadC4(That,category3.data[0].id)
            }, "json");
        }
        function loadC4(That,groupId){
            $.get(That.DataURL, {
                groupId: param ? param['groupId'] : groupId
            }, function(category4) {
                if(category4.status!=1 || category4.data.length<=0){
                    getErrorClearElem(That.Category4ID);
                    window.top.open_layer('没有获取到比赛信息',{'icon':5,'anim':6});
                    return false;
                }
                var _category4=[];
                That.initial>1 && $('.'+That.Category4ID+' .layui-input').val(category4.data[0].name);
                for (var i = 0; i < category4.data.length; i++) {
                    var _class='';
                    if(param && param['id']==category4.data[i].id && callback){
                        That.paramVal['val4']=category4.data[i].name
                        _class="class='layui-this'";
                        callback(That.paramVal)
                    }
                    _category4.push(" <dd "+_class+" lay-value='" + category4.data[i].id + "'>" + category4.data[i].name + "</dd>");
                }
                siblingDD(That.Category4ID).append(_category4.join(''));
                if(That.isClick){
                    setHidden(category4.data[0].id)
                }
            }, "json");
        }
        function getErrorClearElem(cid){
            var parent=$('.'+cid);
            var input=parent.find('.layui-input');
            var list=parent.find('dl');
            var val=list.children('dd:eq(0)').text();
            input.val("");
            list.html('<dd lay-value="" class="layui-select-tips">'+val+'</dd>');
            setHidden("");
        }
        function setHidden(val){
            $('#handler').length<=0 ?
                $('.layui-form').append('<input type="hidden" id="handler" name="handler" value="'+ val +'" lay-verify="'+element+'"/>'):
                $('#handler').val(val);
        }
        function siblingDD(element){
            return $("." + element + "").find('dl');
        }
    }

})