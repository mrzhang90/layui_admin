function select_Category($,obj) {
    this.Category1ID = obj.Category1ID,
    this.Category2ID = obj.Category2ID,
    this.Category3ID = obj.Category3ID,
    this.Category4ID = obj.Category4ID,
    this.DataURL = obj.DataURL, //数据URL
    // this.InitData();
    
    this.InitData = function(){
        var That=this;
        $.get(this.DataURL, {}, function(category1) {
            var firstcategory1Guid = category1[0].Value;
            //初始化一级分类
            var _category=[];
            for (var i = 0; i < category1.length; i++) {
                var _class="";
                if(i==0){
                    _class="class='layui-this'";
                    // $('.j_category1 .layui-input').val(category1[i].Display);
                }
                _category.push(" <dd lay-value='" + category1[i].Value + "' "+_class+">" + category1[i].Display + "</dd>");
            }
            siblingDD(That.Category1ID).append(_category.join(''));
            loadC2C3C4(That,firstcategory1Guid)
        }, "json")
        this.inputEvent();
        this.category1Select(true);
        this.category2Select(true);
        this.category3Select(true);
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
    this.category1Select = function (useEmpty) {
        var That=this;
        var oldStyle;
        $('.'+this.Category1ID).on('click','dd',function(ev){
            ev.stopPropagation();
            var optionHtml = "";
            if (useEmpty) {
                optionHtml = '<dd lay-value="" class="layui-select-tips">请选择</dd>';
            }
            siblingDD(That.Category2ID).html(optionHtml)
            siblingDD(That.Category3ID).html(optionHtml)

            oldStyle ? $(oldStyle).removeClass('layui-this') : $(this).siblings('.layui-this').removeClass('layui-this');
            $(this).addClass('layui-this');
            var tmpSelectedcategory1=$(this).attr('lay-value');
            $('.'+That.Category1ID+' .layui-input').val($(this).text());
            oldStyle=this;
            selectHide();
            //初始化二级分类
            $.get(That.DataURL, { pid: tmpSelectedcategory1 }, function (category2) {
                loadC2C3C4(That,category2[0].Value)
            }, "json");
        });
    },
    this.category2Select = function (useEmpty) {
        var That=this;
        var oldStyle;
        $('.'+this.Category2ID).on('click','dd',function(ev){
            ev.stopPropagation();
            var optionHtml = "";
            if (useEmpty) {
                optionHtml = '<dd lay-value="" class="layui-select-tips">请选择</dd>';
            }
            siblingDD(That.Category3ID).html(optionHtml)

            oldStyle ? $(oldStyle).removeClass('layui-this') : $(this).siblings('.layui-this').removeClass('layui-this');
            $(this).addClass('layui-this');
            var tmpSelectedcategory2=$(this).attr('lay-value');
            $('.'+That.Category2ID+' .layui-input').val($(this).text());
            oldStyle=this;
            selectHide();
            //初始化二级分类
            $.get(That.DataURL, { pid: tmpSelectedcategory2 }, function (category3) {
                var tmpSelectedcategory3 = category3[0].Value;
                var _category3=[];
                for (var i = 0; i < category3.length; i++) {
                    _category3.push(" <dd lay-value='" + category3[i].Value + "'>" + category3[i].Display + "</dd>");
                }
                siblingDD(That.Category3ID).append(_category3.join(''));
                $.get(That.DataURL, { pid: tmpSelectedcategory3 }, function (category4) {
                    var _category4=[];
                    for (var i = 0; i < category4.length; i++) {
                        _category4.push(" <dd lay-value='" + category4[i].Value + "'>" + category4[i].Display + "</dd>");
                    }
                    siblingDD(That.Category4ID).append(_category4.join(''));
                }, "json");
            }, "json");
        });
    },
    this.category3Select = function (useEmpty) {
        var That=this;
        var oldStyle;
        $('.'+this.Category3ID).on('click','dd',function(ev){
            ev.stopPropagation();
            var optionHtml = "";
            if (useEmpty) {
                optionHtml = '<dd lay-value="" class="layui-select-tips">请选择</dd>';
            }
            siblingDD(That.Category3ID).html(optionHtml)

            oldStyle ? $(oldStyle).removeClass('layui-this') : $(this).siblings('.layui-this').removeClass('layui-this');
            $(this).addClass('layui-this');
            var tmpSelectedcategory3=$(this).attr('lay-value');
            $('.'+That.Category3ID+' .layui-input').val($(this).text());
            oldStyle=this;
            selectHide();
            //初始化二级分类
            
            $.get(That.DataURL, { pid: tmpSelectedcategory3 }, function (category4) {
                var _category4=[];
                for (var i = 0; i < category4.length; i++) {
                    _category4.push(" <dd lay-value='" + category4[i].Value + "'>" + category4[i].Display + "</dd>");
                }
                siblingDD(That.Category4ID).append(_category4.join(''));
            }, "json");
        });
    },
    this.category4Select = function () {
        var That=this;
        var oldStyle;
        $('.'+this.Category4ID).on('click','dd',function(ev){
            ev.stopPropagation();

            oldStyle ? $(oldStyle).removeClass('layui-this') : $(this).siblings('.layui-this').removeClass('layui-this');
            $(this).addClass('layui-this');
            $('.'+That.Category4ID+' .layui-input').val($(this).text());
            oldStyle=this;
            selectHide();
        });
    }
    function selectHide(){
        $('.layui-form-select').removeClass('layui-form-selected');
    }
    function loadC2C3C4(That,firstcategory1Guid){
        //初始化二级分类
        $.get(That.DataURL, {
            pid: firstcategory1Guid
        }, function(category2) {
            var firstcategory2Guid = category2[0].Value;
            var _category2=[];
            for (var i = 0; i < category2.length; i++) {
                _category2.push(" <dd lay-value='" + category2[i].Value + "'>" + category2[i].Display + "</dd>");
            }
            siblingDD(That.Category2ID).append(_category2.join(''));

            $.get(That.DataURL, {
                pid: firstcategory2Guid
            }, function(category3) {
                var firstcategory3Guid = category3[0].Value;
                var _category3=[];
                for (var i = 0; i < category3.length; i++) {
                    _category3.push(" <dd lay-value='" + category3[i].Value + "'>" + category3[i].Display + "</dd>");
                }
                siblingDD(That.Category3ID).append(_category3.join(''));
                $.get(That.DataURL, {
                    pid: firstcategory3Guid
                }, function(category4) {
                    var _category4=[];
                    for (var i = 0; i < category4.length; i++) {
                        _category4.push(" <dd lay-value='" + category4[i].Value + "'>" + category4[i].Display + "</dd>");
                    }
                    siblingDD(That.Category4ID).append(_category4.join(''));

                }, "json");
            }, "json");

        }, "json");
    }
    function siblingDD(element){
        return $("." + element + "").find('dl');
    }
}