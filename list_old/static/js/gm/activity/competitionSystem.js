/**
 * 赛制
 **/
var setComSystemDialog = $("#setComSystemDialog").dialog({
    title: "赛制设置",
    width: 500,
    autoOpen: false,
    position: {my: "top", at: "center top+150px ", of: window}
});


function editSCGroupName(eventId, id, name, eventObject) {
    $("#csEditGroup input").val(name);
    $("#csEditGroup").dialog({
        title: "分组设置",
        width: 300,
        autoOpen: true,
        position: {my: "top", at: "center top+150px ", of: window},
        buttons: [
            {
                text: "取消",
                "class": "btn btn-minier",
                click: function () {
                    $(this).dialog("close");
                }
            },
            {
                text: "确定",
                "class": "btn btn-primary btn-minier",
                click: function () {
                    var $this = this;
                    ajax({
                        url: "/gm/activity/updateGroupName.json",
                        data: {
                            "eventId": eventId,
                            "groupId": id,
                            name: $("#csEditGroup input").val()
                        },
                        callback: function (result) {
                            $(eventObject).parents(".widget-box:first").replaceWith(getSC(result.data));
                            $("#csEditGroup").dialog("close");
                        }
                    });
                    //$( this ).dialog( "close" );
                }
            }
        ]
    });
}

function editSCEventName(eventId, name, eventObject) {
    $("#csEditEvent input").val(name);
    $("#csEditEvent").dialog({
        title: "编辑赛制",
        width: 300,
        autoOpen: true,
        position: {my: "top", at: "center top+150px ", of: window},
        buttons: [
            {
                text: "取消",
                "class": "btn btn-minier",
                click: function () {
                    $(this).dialog("close");
                }
            },
            {
                text: "确定",
                "class": "btn btn-primary btn-minier",
                click: function () {
                    var $this = this;
                    ajax({
                        url: "/gm/activity/updateEventName.json",
                        data: {
                            "eventId": eventId,
                            name: $("#csEditEvent input").val()
                        },
                        callback: function (result) {
                            $(eventObject).parents(".widget-box:first").replaceWith(getSC(result.data));
                            $("#csEditEvent").dialog("close");
                        }
                    });
                    //$( this ).dialog( "close" );
                }
            }
        ]
    });
}

function deleteGroup(eventId, id, eventObject) {
    $("#csDeleteGroup").dialog({
        title: "删除分组",
        width: 300,
        autoOpen: true,
        position: {my: "top", at: "center top+150px ", of: window},
        buttons: [
            {
                text: "取消",
                "class": "btn btn-minier",
                click: function () {
                    $(this).dialog("close");
                }
            },
            {
                text: "确定",
                "class": "btn btn-primary btn-minier",
                click: function () {
                    ajax({
                        url: "/gm/activity/deleteGroup.json",
                        data: {
                            "eventId": eventId,
                            "groupId": id
                        },
                        callback: function (result) {
                            $(eventObject).parents(".widget-box:first").replaceWith(getSC(result.data));
                            $("#csDeleteGroup").dialog("close");
                        }
                    });
                }
            }
        ]
    });
}


function addSCGroupName(eventId, eventObject) {
    $("#csAddGroup input").val("");
    $("#csAddGroup").dialog({
        title: "添加",
        width: 300,
        autoOpen: true,
        position: {my: "top", at: "center top+150px ", of: window},
        buttons: [
            {
                text: "取消",
                "class": "btn btn-minier",
                click: function () {
                    $(this).dialog("close");
                }
            },
            {
                text: "确定",
                "class": "btn btn-primary btn-minier",
                click: function () {
                    if ($("#csAddGroup input").val().length == 0) {
                        alert("请输入名称");
                        return;
                    }
                    var $this = this;
                    ajax({
                        url: "/gm/activity/addGroup.json",
                        data: {
                            "eventId": eventId,
                            name: $("#csAddGroup input").val()
                        },
                        callback: function (result) {
                            $(eventObject).parents(".widget-box:first").replaceWith(getSC(result.data));
                            $("#csAddGroup").dialog("close");
                        }
                    });
                    //$( this ).dialog( "close" );
                }
            }
        ]
    });
}


function deleteSCEvent(eventId, eventObject) {
    $("#csDeleteEvent").dialog({
        title: "删除分组",
        width: 300,
        autoOpen: true,
        position: {my: "top", at: "center top+150px ", of: window},
        buttons: [
            {
                text: "取消",
                "class": "btn btn-minier",
                click: function () {
                    $(this).dialog("close");
                }
            },
            {
                text: "确定",
                "class": "btn btn-primary btn-minier",
                click: function () {
                    ajax({
                        url: "/gm/activity/deleteEvent.json",
                        data: {
                            "eventId": eventId
                        },
                        callback: function (result) {
                            $(eventObject).parents(".widget-box:first").replaceWith("");
                            $("#csDeleteEvent").dialog("close");
                        }
                    });
                }
            }
        ]
    });
}


function editSCEventStatus(eventId, status, eventObject) {
    $("#selEventStatus").val(status);
    $("#csEditEventStatus").dialog({
        title: "更改状态",
        width: 300,
        autoOpen: true,
        position: {my: "top", at: "center top+150px ", of: window},
        buttons: [
            {
                text: "取消",
                "class": "btn btn-minier",
                click: function () {
                    $(this).dialog("close");
                }
            },
            {
                text: "确定",
                "class": "btn btn-primary btn-minier",
                click: function () {
                    ajax({
                        url: "/gm/activity/updateEventStatus.json",
                        data: {
                            "eventId": eventId,
                            status: $("#selEventStatus").val()
                        },
                        callback: function (result) {
                            $(eventObject).parents(".widget-box:first").replaceWith(getSC(result.data));
                            $("#csEditEventStatus").dialog("close");
                        }
                    });
                }
            }
        ]
    });
}

$("#btnADdEvent").click(function () {
    addSCEvent();
});
function addSCEvent() {
    $("#addEvent input").val("");
    $("#addEvent").dialog({
        title: "添加赛制",
        width: 300,
        autoOpen: true,
        position: {my: "top", at: "center top+150px ", of: window},
        buttons: [
            {
                text: "取消",
                "class": "btn btn-minier",
                click: function () {
                    $(this).dialog("close");
                }
            },
            {
                text: "确定",
                "class": "btn btn-primary btn-minier",
                click: function () {
                    if ($("#addEvent input").val().length == 0) {
                        alert("请输入名称");
                        return;
                    }

                    ajax({
                        url: "/gm/activity/addEvent.json",
                        data: {
                            "activityId": currentActivityId,
                            name: $("#addEvent input").val()
                        },
                        callback: function (result) {
                            $("#scList").append(getSC(result.data));

                            $("#addEvent").dialog("close");
                        }
                    });
                }
            }
        ]
    });
}

function openCompetitionSystemDialog(id, name) {
    currentActivityId = id;
    currentActivityName = name;
    setComSystemDialog.dialog("open");
    setComSystemDialog.dialog({
    	title : currentActivityName + "-赛制设置"
    });

    $("#scList").html("");
    ajax({
    	url: "/gm/activity/allEvent.json",
    	data: {
    		activityId: currentActivityId
    	},
    	callback: function(result) {
    		var array = new Array();
    		for (var i = 0; i < result.data.length; i++) {
    			var obj = result.data[i];
    			array.push(getSC(obj));
    		}
    		$("#scList").html(array.join(""));
    		initCompetitionSystemFile();
    	}
    });
};


/**
 *    上传赛程
 **/
function addScheduleImg(eventId, status, eventObject) {
    $("#addScheduleImg").html('<form>'
        + '<input type="file" id="fileSchedule" name="fileSchedule" />'
        + '<input type="hidden" id="txtEventId" name="txtEventId" value="' + eventId + '" />'
        + '</form>	');
    initCompetitionSystemFile("#addScheduleImg input[type=file]", "上传赛程显示图片");
    uploadFile("#addScheduleImg input[type=file]", "#addScheduleImg form", "/gm/activity/updateEventSchedule.json", function (result) {
        $(eventObject).parents(".widget-box:first").replaceWith(getSC(result.data));
        $("#addScheduleImg").dialog("close");
    });
    $("#addScheduleImg").dialog({
        title: "上传赛程",
        width: 300,
        autoOpen: true,
        position: {my: "top", at: "center top+150px ", of: window},
        buttons: [
            {
                text: "取消",
                "class": "btn btn-minier",
                click: function () {
                    $(this).dialog("close");
                }
            },
            {
                text: "确定",
                "class": "btn btn-primary btn-minier",
                click: function () {
                    $("#addScheduleImg form").submit();
                }
            }
        ]
    });
}

function getSC(obj) {
    var array = new Array();
    array.push('<div class="widget-box">');
    array.push('										<div class="widget-header">');
    array.push('											<h4 class="smaller">');
    array.push('												' + obj.name);
    if (obj.status.value == 1) {
        array.push('												<span class="label label-sm label-warning">' + obj.status.desc + '</span>');
    } else if (obj.status.value == 2) {
        array.push('												<span class="label label-sm label-success">' + obj.status.desc + '</span>');
    } else {
        array.push('												<span class="label label-sm label-inverse arrowed-in">' + obj.status.desc + '</span>');
    }

    array.push('											</h4>');
    array.push('										</div>');
    array.push('');
    array.push('										<div class="widget-body">');
    array.push('											<div class="widget-main">');
    if (obj.fixturesLinks != null) {
        array.push('												<div class="scImg"><img src="' + obj.fixturesLinks + '" style="width: 100%;"/></div>');
    }

    array.push('												');
    array.push('												<div>');
    array.push('													<h3 class="header smaller lighter green">');
    array.push('														分组');
    array.push('													</h3>');
    for (var i = 0; i < obj.groups.length; i++) {
        var group = obj.groups[i];
        array.push('													<div class="alert alert-block alert-success">');
        array.push('														');
        array.push('														<p>');
        array.push('														 ' + group.name);
        array.push('															<button type="button" class="btn btn-white btn-purple btn-sm"  onclick="editSCGroupName(\'' + obj.id + '\',\'' + group.id + '\', \'' + group.name + '\', this)">编辑</button>');
        array.push('															<button type="button" class="btn btn-white btn-purple btn-sm"  onclick="deleteGroup(\'' + obj.id + '\',\'' + group.id + '\', this)" >删除</button>');
        array.push('														</p>');
        array.push('');
        array.push('														');
        array.push('													</div>');
    }

    array.push('												</div>	');
    array.push('');
    array.push('												<hr />');
    array.push('');
    array.push('												<p>');
    array.push('													<span class="btn btn-success btn-sm tooltip-success" data-rel="tooltip" data-placement="right" title="Right Success" onclick="addSCGroupName(\'' + obj.id + '\', this)">添加分组</span>');
    array.push('													<span class="btn btn-info btn-sm tooltip-info" data-rel="tooltip" data-placement="bottom" title="Bottm Info" onclick="editSCEventName(\'' + obj.id + '\', \'' + obj.name + '\', this)">编辑赛制</span>');
    array.push('													<span class="btn btn-info btn-sm tooltip-info" data-rel="tooltip" data-placement="bottom" title="Bottm Info" onclick="addScheduleImg(\'' + obj.id + '\', \'' + obj.name + '\', this)">上传赛程</span>');
    array.push('													<span class="btn btn-info btn-sm tooltip-info" data-rel="tooltip" data-placement="bottom" title="Bottm Info" onclick="editSCEventStatus(\'' + obj.id + '\', \'' + obj.status.value + '\', this)">更改状态</span>');
    array.push('													<span class="btn btn-danger btn-sm tooltip-error" data-rel="tooltip" data-placement="top" title="Top Danger" onclick="deleteSCEvent(\'' + obj.id + '\', this)">删除</span>		');
    array.push('												</p>');
    array.push('											</div>');
    array.push('										</div>');
    array.push('									</div>');
    return array.join("");

}

function initCompetitionSystemFile(sel, text) {
    $(sel).ace_file_input({
        style: 'well',
        btn_choose: text,
        btn_change: null,
        no_icon: 'ace-icon fa fa-cloud-upload',
        droppable: true,
        thumbnail: 'small'
        ,
        preview_error: function (filename, error_code) {
        }

    }).on('change', function () {
    });

}


function uploadFile(file, form, url, callback) {
    var file_input = $(file);
    $(form).on("submit", function (e) {
        e.preventDefault();
        var files = file_input.data('ace_input_files');
        if (!files || files.length == 0) {
            alert("请选择要上传的图片");
            return false;
        }

        if ("FormData" in window) {
            var fd = new FormData(this);
            if (file_input.data('ace_input_method') == 'drop') {
                var files = file_input.data('ace_input_files');
                if (files && files.length > 0) {
                    fd.append(file_input.attr('name'), files[0]);
                    //to upload multiple files, the 'name' attribute should be something like this: myfile[]
                }
            }
            $.ajax({
                url: url,
                type: "POST",
                processData: false,
                contentType: false,
                dataType: 'json',
                data: fd,
                xhr: function () {
                    var req = $.ajaxSettings.xhr();
                    if (req && req.upload) {
                        req.upload.addEventListener('progress', function (e) {
                            if (e.lengthComputable) {
                                var done = e.loaded || e.position, total = e.total || e.totalSize;
                                var percent = parseInt((done / total) * 100) + '%';
                                //percentage of uploaded file
                            }
                        }, false);
                    }
                    return req;
                },
                beforeSend: function () {
                },
                success: function (result) {
                    callback(result);
                }
            });
        } else {
            alert("对不起，不支持您的浏览器");
        }
    });
}


 

