function select_Category($) {
    return {
        Category1ID: "j_category1",
        Category2ID: "j_category2",
        Category3ID: "j_category3",
        DataURL: "http://localhost:3000/select_date/", //数据URL
        select_category:function(){
            this.InitData();
            this.inputEvent();
            this.category1Select(true);
            this.category2Select(true);
            this.category3Select();
        },
        InitData:function(){
            var That=this;
            $.get(this.DataURL, {}, function(category1) {
                var firstcategory1Guid = category1[0].Value;
                //初始化一级分类
                var _category=[];
                for (var i = 0; i < category1.length; i++) {
                    var _class="";
                    if(i==0){
                        _class="class='layui-this'";
                    }
                    _category.push(" <dd lay-value='" + category1[i].Value + "' "+_class+">" + category1[i].Display + "</dd>");
                }
                siblingDD(That.Category1ID).append(_category.join(''));
                loadC2AndC3(That,firstcategory1Guid)
            }, "json")
        },
        inputEvent:function(){
            $('.layui-input').on('click',function(ev){
                ev.stopPropagation();
                selectHide()
                $(this).parents('.layui-form-select').toggleClass('layui-form-selected')
            })
            $(document).on('click',function(){
                selectHide()
            })
        },
        category1Select: function (useEmpty) {
            var That=this;
            var oldStyle;
            $('.j_category1').on('click','dd',function(ev){
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
                $('.j_category1 .layui-input').val($(this).text());
                oldStyle=this;
                selectHide();
                //初始化二级分类
                $.get(That.DataURL, { pid: tmpSelectedcategory1 }, function (category2) {
                    loadC2AndC3(That,category2[0].Value)
                }, "json");
            });
        },
        category2Select: function (useEmpty) {
            var That=this;
            var oldStyle;
            $('.j_category2').on('click','dd',function(ev){
                ev.stopPropagation();
                var optionHtml = "";
                if (useEmpty) {
                    optionHtml = '<dd lay-value="" class="layui-select-tips">请选择</dd>';
                }
                siblingDD(That.Category3ID).html(optionHtml)

                oldStyle ? $(oldStyle).removeClass('layui-this') : $(this).siblings('.layui-this').removeClass('layui-this');
                $(this).addClass('layui-this');
                console.log($(this))
                var tmpSelectedcategory2=$(this).attr('lay-value');
                $('.j_category2 .layui-input').val($(this).text());
                oldStyle=this;
                selectHide();
                //初始化二级分类
                $.get(That.DataURL, { pid: tmpSelectedcategory2 }, function (category3) {
                    var _category3=[];
                    for (var i = 0; i < category3.length; i++) {
                        _category3.push(" <dd lay-value='" + category3[i].Value + "'>" + category3[i].Display + "</dd>");
                    }
                    siblingDD(That.Category3ID).append(_category3.join(''));
                }, "json");
            });
        },
        category3Select: function () {
            var That=this;
            var oldStyle;
            $('.j_category3').on('click','dd',function(ev){
                ev.stopPropagation();

                oldStyle ? $(oldStyle).removeClass('layui-this') : $(this).siblings('.layui-this').removeClass('layui-this');
                $(this).addClass('layui-this');
                $('.j_category3 .layui-input').val($(this).text());
                oldStyle=this;
                selectHide();
            });
        }
    }
    function selectHide(){
        $('.layui-form-select').removeClass('layui-form-selected');
    }
    function loadC2AndC3(That,firstcategory1Guid){
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

            //初始化县
            $.get(That.DataURL, {
                pid: firstcategory2Guid
            }, function(category3) {
                var _category3=[];
                for (var i = 0; i < category3.length; i++) {
                    _category3.push(" <dd lay-value='" + category3[i].Value + "'>" + category3[i].Display + "</dd>");
                }
                siblingDD(That.Category3ID).append(_category3.join(''));

            }, "json");

        }, "json");
    }
    function siblingDD(element){
        return $("." + element + "").find('dl');
    }
}