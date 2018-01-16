/**
*   靳龙
*/


$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

var listView = function() {
    var lang = {
        "sProcessing": "处理中...",
        "sLengthMenu": "每页 _MENU_ 项",
        "sZeroRecords": "没有匹配结果",
        "sInfo": "当前显示第 _START_ 至 _END_ 项，共 _TOTAL_ 项。",
        "sInfoEmpty": "当前显示第 0 至 0 项，共 0 项",
        "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
        "sInfoPostFix": "",
        "sSearch": "搜索:",
        "sUrl": "",
        "sEmptyTable": "表中数据为空",
        "sLoadingRecords": "载入中...",
        "sInfoThousands": ",",
        "oPaginate": {
            "sFirst": "首页",
            "sPrevious": "上页",
            "sNext": "下页",
            "sLast": "末页",
            "sJump": "跳转"
        },
        "oAria": {
            "sSortAscending": ": 以升序排列此列",
            "sSortDescending": ": 以降序排列此列"
        }
    };
    var dataTableSelector;
    var config = {
        id: "listView",
        columns: [],
        rowCallback: function() {},
        ajaxType: "POST",
        url: "",
        searchFromId: "listViewSearchForm",
        searchBtn: "btnListViewSearch",
        resetBtn: "btnListViewReset"
    };

    //初始化表格
    var table = null;
    var dataList = null;
    function initView() {

        table = $("#" + config.id).dataTable({
                    language: lang,
                    autoWidth: false,
                    stripeClasses: ["odd", "even"],
                    processing: true,
                    serverSide: true,
                    searching: false,
                    orderMulti: false,
                    order: [],
                    pagingType: "simple_numbers",
                    columnDefs: [{
                        "targets": 'nosort',
                        "orderable": false
                    }],
                    ordering: false,
                    lengthChange: false,
                    headerCallback: function() {
                        $(".dataTables_wrapper :first").css("padding", "0")
                    },
                    rowCallback: config.rowCallback,
                    ajax: function(data, callback, settings) {
                        //封装请求参数
                        var param = {};
                        param.pageSize = data.length;
                        param.start = data.start;
                        param.pageNo = (data.start / data.length) + 1;
                        param.search = JSON.stringify($("#" + config.searchFromId).serializeObject());
                        $.ajax({
                            type: config.ajaxType,
                            url: config.url,
                            cache: false,
                            data: param,
                            dataType: "json",
                            success: function(result) {
                                var userData = result.data;
                                dataList = userData.dataList;
                                setTimeout(function() {
                                    var returnData = {};
                                    returnData.draw = data.draw;
                                    returnData.recordsTotal = userData.total;
                                    returnData.recordsFiltered = userData.total;
                                    returnData.data = userData.dataList;
                                    callback(returnData);
                                },
                                0);
                            },
                            error: function(msg) {
                                alert(msg);
                            }
                        });
                    },
                    columns: config.columns
                    }).api();
         initSearch();
    }

    function initSearch() {
        $("#" + config.searchBtn).click(function() {
            table.ajax.reload();
        });

        $("#" + config.resetBtn).click(function() {
            $("#"+ config.searchFromId + " input[type=text]").val("")
          table.ajax.reload();
        });

         $("#" + config.searchFromId + " input[type=text]").keypress(function (event) {

                            var key = event.which;
                            if (key == 13) {
                                if(event.preventDefault) event.preventDefault();  //标准技术
                                if(event.returnValue) event.returnValue = false;  //IE
                                table.ajax.reload();

                                  return false;   //用于处理使用对象属性注册的处理程序
                            }
                        });

    }



    return {
        init: function(userConfig) {
            $.extend(config, userConfig);
            initView();
        },
        api: function() {
            return table;
        },
        dataList: function() {
            return dataList;
        }
    }
}();


function ajax(userConfig) {
    var config = {
        type: "POST",
        cache: false,
        dataType: "json",
        success: function(result) {
            if (result.status == 1) {
                config.callback(result);
            } else {
                alert(result.msg);
            }
        },
        error: function(msg) {
            alert(msg.msg);
        }
    }
    $.extend(config, userConfig);
    return $.ajax(config);
}