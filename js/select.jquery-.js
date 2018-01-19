function select_Category($){
    //三级分类选择器
    return select_Category = {
        Category1ID: "select_category1_select",
        Category2ID: "select_category2_select",
        Category3ID: "select_category3_select",
        DataURL: "http://localhost:3000/select_date/",//数据URL
        //初始化
        //wrapID :   包裹三级分类的标签ID
        //category1： 省ID 对应 Value
        //category2：     市ID 对应 Value
        //category3：   县ID 对应 Value
        //useEmpty： 是否支持请选择,如果为false则默认三级都加载
        //successCallBack：加载完成后的回调函数
        Init: function (wrapID, category1, category2, category3, useEmpty, successCallBack) {
            select_Category.InitTag(wrapID, useEmpty);
            select_Category.InitData(category1, category2, category3, useEmpty, successCallBack);
            select_Category.category1Select(useEmpty);
            select_Category.category2Select(useEmpty);
        },
        //初始化标签
        InitTag: function (wrapID, useEmpty) {
            var tmpInit = "";
            tmpInit += "<span class='select_category1_span'>一级分类：</span>";
            if (useEmpty) {
                tmpInit += "<select id='" + select_Category.Category1ID + "' name='" + select_Category.Category1ID + "'><option value='0'>--请选择--</option></select>";
            } else {
                tmpInit += "<select id='" + select_Category.Category1ID + "' name='" + select_Category.Category1ID + "'></select>";
            }
            tmpInit += "<span class='select_category2_span'>二级分类：</span>";
            if (useEmpty) {
                tmpInit += "<select id='" + select_Category.Category2ID + "' name='" + select_Category.Category2ID + "'><option value='0'>--请选择--</option></select>";
            } else {
                tmpInit += "<select id='" + select_Category.Category2ID + "' name='" + select_Category.Category2ID + "'></select>";
            }
            tmpInit += "<span class='select_category3_span'>三级分类：</span>";
            if (useEmpty) {
                tmpInit += "<select id='" + select_Category.Category3ID + "' name='" + select_Category.Category3ID + "'><option value='0'>--请选择--</option></select>";
            } else {
                tmpInit += "<select id='" + select_Category.Category3ID + "' name='" + select_Category.Category3ID + "'></select>";
            }
            $("#" + wrapID + "").html(tmpInit);
        },
        //初始化数据--包括修改
        InitData: function (incategory1, incategory2, incategory3, useEmpty, successCallBack) {
            //添加
            if (incategory1 == 0) {

                $.get(select_Category.DataURL, {}, function (category1) {
                    console.log(category1)
                    var firstcategory1Guid = category1[0].Value;
                    //初始化一级分类
                    for (var i = 0; i < category1.length; i++) {
                        var tmp_option = " <option value='" + category1[i].Value + "'>" + category1[i].Display + "</option>";
                        $("#" + select_Category.Category1ID + "").html($("#" + select_Category.Category1ID + "").html() + tmp_option);

                    }

                    if (useEmpty) {
                        successCallBack();
                        return;
                    }
                    //初始化二级分类
                    $.get(select_Category.DataURL, { pid: firstcategory1Guid }, function (category2) {
                        var firstcategory2Guid = category2[0].Value;
                        for (var i = 0; i < category2.length; i++) {
                            var tmp_option = " <option value='" + category2[i].Value + "'>" + category2[i].Display + "</option>";
                            $("#" + select_Category.Category2ID + "").html($("#" + select_Category.Category2ID + "").html() + tmp_option);

                        }

                        //初始化县
                        $.get(select_Category.DataURL, { pid: firstcategory2Guid }, function (category3) {
                            for (var i = 0; i < category3.length; i++) {
                                var tmp_option = " <option value='" + category3[i].Value + "'>" + category3[i].Display + "</option>";
                                $("#" + select_Category.Category3ID + "").html($("#" + select_Category.Category3ID + "").html() + tmp_option);
                            }
                            successCallBack();

                        }, "json");


                    }, "json");
                }, "json");
            }
                //修改
            else {

                $.get(select_Category.DataURL, {}, function (category1) {

                    //初始化一级分类
                    for (var i = 0; i < category1.length; i++) {
                        var tmp_option = "";
                        if (category1[i].Value == incategory1) {

                            tmp_option = " <option selected='selected' value='" + category1[i].Value + "'>" + category1[i].Display + "</option>";
                        } else {
                            tmp_option = " <option value='" + category1[i].Value + "'>" + category1[i].Display + "</option>";
                        }
                        $("#" + select_Category.Category1ID + "").html($("#" + select_Category.Category1ID + "").html() + tmp_option);

                    }

                    //初始化二级分类
                    $.get(select_Category.DataURL, { pid: incategory1 }, function (category2) {
                        for (var i = 0; i < category2.length; i++) {
                            var tmp_option = "";
                            if (category2[i].Value == incategory2) {
                                tmp_option = " <option  selected='selected' value='" + category2[i].Value + "'>" + category2[i].Display + "</option>";
                            } else {
                                tmp_option = " <option value='" + category2[i].Value + "'>" + category2[i].Display + "</option>";
                            }
                            $("#" + select_Category.Category2ID + "").html($("#" + select_Category.Category2ID + "").html() + tmp_option);

                        }

                        //初始化三级分类
                        $.get(select_Category.DataURL, { pid: incategory2 }, function (category3) {
                            for (var i = 0; i < category3.length; i++) {
                                var tmp_option = "";
                                if (category3[i].Value == incategory3) {
                                    tmp_option = " <option selected='selected' value='" + category3[i].Value + "'>" + category3[i].Display + "</option>";
                                } else {
                                    tmp_option = " <option value='" + category3[i].Value + "'>" + category3[i].Display + "</option>";
                                }

                                $("#" + select_Category.Category3ID + "").html($("#" + select_Category.Category3ID + "").html() + tmp_option);

                            }
                            successCallBack();
                        }, "json");
                    });
                });

            }
        },
        //一级分类change
        category1Select: function (useEmpty) {
            $("#" + select_Category.Category1ID + "").change(function () {
                var optionHtml = "";
                if (useEmpty) {
                    optionHtml = "<option value='0'>--请选择--</option>";
                }
                $("#" + select_Category.Category2ID + "").html(optionHtml);
                $("#" + select_Category.Category3ID + "").html(optionHtml);
                var tmpSelectedcategory1 = $("#" + select_Category.Category1ID + " option:selected").val();
                //初始化二级分类
                $.get(select_Category.DataURL, { pid: tmpSelectedcategory1 }, function (category2) {
                    var firstcategory2Guid = category2[0].Value;
                    for (var i = 0; i < category2.length; i++) {
                        var tmp_option = " <option value='" + category2[i].Value + "'>" + category2[i].Display + "</option>";
                        $("#" + select_Category.Category2ID + "").html($("#" + select_Category.Category2ID + "").html() + tmp_option);
                    }
                    if (useEmpty) {
                        return;
                    }
                    //初始化三级分类
                    $.get(select_Category.DataURL, { pid: firstcategory2Guid }, function (category3) {
                        for (var i = 0; i < category3.length; i++) {
                            var tmp_option = " <option value='" + category3[i].Value + "'>" + category3[i].Display + "</option>";
                            $("#" + select_Category.Category3ID + "").html($("#" + select_Category.Category3ID + "").html() + tmp_option);
                        }
                    }, "json");


                }, "json");

            });
        },
        //二级分类change
        category2Select: function (useEmpty) {
            $("#" + select_Category.Category2ID + "").change(function () {
                var optionHtml = "";
                if (useEmpty) {
                    optionHtml = "<option value='0'>--请选择--</option>";
                }
                $("#" + select_Category.Category3ID + "").html(optionHtml);
                var tmpSelectedcategory2 = $("#" + select_Category.Category2ID + " option:selected").val();
                //初始化三级分类
                $.get(select_Category.DataURL, { pid: tmpSelectedcategory2 }, function (category3) {
                    for (var i = 0; i < category3.length; i++) {
                        var tmp_option = " <option value='" + category3[i].Value + "'>" + category3[i].Display + "</option>";
                        $("#" + select_Category.Category3ID + "").html($("#" + select_Category.Category3ID + "").html() + tmp_option);
                    }
                }, "json");
            });
        }
    };
}