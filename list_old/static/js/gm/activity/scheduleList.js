var gameLsit = {};
ajax({
    url: "/gm/activity/getAddGameParams.json",
    data: {},
    callback: function (result) {
        var arr = result.data.allArena;
        for (var i = 0, len = arr.length; i < len; i++) {
            gameLsit[arr[i]['id']] = arr[i]['name']
        }
    }
});
ajax({
    url: "/gm/activity/game/list-data.json",
    data: {
        eventId: eventId
    },
    callback: function (result) {
        initData(result.data);
    }
});

function updateStatus(obj, gameId, status) {
    ajax({
        url: "/gm/activity/game/updateStatus.json",
        data: {
            gameId: gameId,
            status: status
        },
        callback: function (result) {
            $(obj).parents("tr:first").find(".status").html(getGameStatus(result.data.status));
        }
    });
}

var gameList = null;
function initData(data) {
    gameList = data;
    var array = new Array();
    var groupId = null;
    for (var i = 0; i < data.length; i++) {
        var game = data[i];
        game.Number = i + 1;
        if (groupId == null || groupId != game.gpId) {
            if (groupId != null) {
                array.push('							</tbody>');
                array.push('						</table>');
                array.push('					</div><!-- /.span -->');
                array.push('				</div>');
            }
            array.push('<div class="page-header">');
            array.push('				<h1>');
            array.push('<a href="/gm/activity/list.html">');
            array.push('联赛列表');
            array.push("</a>");
            array.push('						<small><i class="ace-icon fa fa-angle-double-right"></i></small>');
            array.push('					' + game.eventName);
            array.push('					<small>');
            array.push('						<i class="ace-icon fa fa-angle-double-right"></i>');
            array.push('						' + game.groupName);
            array.push('					</small>');
            array.push('				</h1>');
            array.push('			</div><!-- /.page-header -->');
            array.push('');
            array.push('	  <!--content Start -->');
            array.push('	  <div class="row">');
            array.push('						<div class="col-xs-12">');
            array.push('							<table id="simple-table" class="table  table-bordered table-hover">');
            array.push('								<thead>');
            array.push('									<tr>');
            array.push('                                        <th style="width:5%;">序号</th>');
            array.push('										<th style="width:15%;">比赛日期</th>');
            // array.push('										<th class="detail-col">详情</th>');
            array.push('                                        <th style="width:13%">主队队名</th>');
            array.push('										<th style="width:13%">客队队名</th>');
            array.push('										<th style="width:10%">比分</th>');
            array.push('                                        <th style="width:15%">比赛地点</th>');
            array.push('										<th style="width:10%">比赛状态</th>');
            array.push('										<th class="center">操作</th>');
            array.push('									</tr>');
            array.push('								</thead>');
            array.push('');
            array.push('								<tbody id="content">');

            groupId = game.gpId;
        }

        array.push(getListStr(game));
    }

    if (data.length > 0) {
        array.push('							</tbody>');
        array.push('						</table>');
        array.push('					</div><!-- /.span -->');
        array.push('				</div>');
    }
    $(".page-content").html(array.join(""));
    $('.show-details-btn').on('click', function (e) {//点击详情按钮，显示或隐藏class=detail-row
        e.preventDefault();
        $(this).closest('tr').next().toggleClass('open');
        $(this).find(ace.vars['.icon']).toggleClass('fa-angle-double-down').toggleClass('fa-angle-double-up');
    });
    initArena();
}

function getGameStatus(status) {
    if (status.value == 1) {
        return '													<span class="label label-sm label-warning">' + status.desc + '</span>';
    } else if (status.value == 2) {
        return '													<span class="label label-sm label-success">' + status.desc + '</span>';
    } else {
        return '													<span class="label label-sm label-inverse arrowed-in">' + status.desc + '</span>';
    }
}

function btnSectionsEdit(obj) {
    $(obj).parents("div:first").siblings(".info").hide();
    $(obj).parents("div:first").siblings(".edit").show();
    $(obj).parents("div:first").find(".save").show();
    $(obj).parents("div:first").find(".cancel").show();
    $(obj).parents("div:first").find(".btnEdit").hide();
}

function btnSectionCancel(obj) {
    $(obj).parents("div:first").siblings(".info").show();
    $(obj).parents("div:first").siblings(".edit").hide();
    $(obj).parents("div:first").find(".save").hide();
    $(obj).parents("div:first").find(".cancel").hide();
    $(obj).parents("div:first").find(".btnEdit").show();
}

function btnSectionSave(obj, gameId, fristTeamId, secondTeamId, firstId, secondId) {//点击保存每节得分
    var $content = $(obj).parents(".row:first");
    var data = {
        eventId: eventId,
        gameId: gameId,
        fristTeamId: fristTeamId,
        secondTeamId: secondTeamId,
        firstId: firstId,
        secondId: secondId
    };

    var section1 = fristTeamId + "," + $content.find(".firstSection1").val() + "," + secondTeamId + "," + $content.find(".secondSection1").val();
    data["section1"] = section1;
    var section2 = fristTeamId + "," + $content.find(".firstSection2").val() + "," + secondTeamId + "," + $content.find(".secondSection2").val();
    data["section2"] = section2;
    var section3 = fristTeamId + "," + $content.find(".firstSection3").val() + "," + secondTeamId + "," + $content.find(".secondSection3").val();
    data["section3"] = section3;
    var section4 = fristTeamId + "," + $content.find(".firstSection4").val() + "," + secondTeamId + "," + $content.find(".secondSection4").val();
    data["section4"] = section4;
    if ($content.find(".firstSection5").val() != "") {
        var section5 = fristTeamId + "," + $content.find(".firstSection5").val() + "," + secondTeamId + "," + $content.find(".secondSection5").val();
        data["section5"] = section5;
    }

    if ($content.find(".firstSection6").val() != "") {
        var section6 = fristTeamId + "," + $content.find(".firstSection6").val() + "," + secondTeamId + "," + $content.find(".secondSection6").val();
        data["section6"] = section6;
    }

    if ($content.find(".firstSection7").val() != "") {
        var section7 = fristTeamId + "," + $content.find(".firstSection7").val() + "," + secondTeamId + "," + $content.find(".secondSection7").val();
        data["section7"] = section7;
    }

    if ($content.find(".firstSection8").val() != "") {
        var section8 = fristTeamId + "," + $content.find(".firstSection8").val() + "," + secondTeamId + "," + $content.find(".secondSection8").val();
        data["section8"] = section8;
    }

    ajax({
        url: "/gm/activity/game/saveSection.json",
        data: data,
        callback: function (result) {
            var $score = $(obj).parents(".detail-row:first").prev(".game").find(".score");
            $score.html(result.data.firstTeamScore + ':' + result.data.secondTeamScore);
            $(obj).parents(".detail-row:first").find(".info").html(getSectionStr(result.data));
            $(obj).parents("div:first").siblings(".info").show();
            $(obj).parents("div:first").siblings(".edit").hide();
            $(obj).parents("div:first").find(".save").hide();
            $(obj).parents("div:first").find(".cancel").hide();
            $(obj).parents("div:first").find(".btnEdit").show();
        }
    });
}

function getSectionStr(game) {
    var array = new Array();
    for (var i = 0; i < game.sections.length; i++) {
        var section = game.sections[i];
        array.push('');
        array.push('																		<div class="profile-info-row">');
        array.push('																			<div class="profile-info-value center">');
        array.push('																				<span>' + section.firstTeamScore + '</span>');
        array.push('																			</div>');
        array.push('																			<div class="profile-info-name center"> ' + section.name + ' </div>');
        array.push('');
        array.push('																			<div class="profile-info-value center">');
        array.push('																				<span>' + section.secondTeamScore + '</span>');
        array.push('																			</div>');
        array.push('																		</div>');
    }
    return array.join("");

}

function openDeleteStatisticseDialog(obj, id, gameId, accountId) {
    $("#deleteStatisticseDialog").dialog({
        title: "删除",
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
                        url: "/gm/activity/game/deleteStatisticse.json",
                        data: {
                            gameId: gameId,
                            id: id
                        },
                        callback: function (result) {
                            var $content = $(obj).parents(".content:first");
                            $content.html(getStatisticses(result.data, accountId));
                            $("#deleteStatisticseDialog").dialog("close");
                        }
                    });
                }
            }
        ]
    });
}

function openAddStatisticseDialog(obj, accountId, teamId, gameId) {
    $("#btnMember").html("");
    ajax({
        url: "/gm/activity/game/teamList.json",
        data: {
            eventId: eventId,
            teamId: teamId
        },
        callback: function (result) {
            var array = new Array();
            for (var i = 0; i < result.data.length; i++) {
                var mem = result.data[i];
                array.push('<option value="' + mem.userInfoId + '">' + (mem.actualName == null ? '' : mem.actualName ) + '(' + mem.nickName + ")</option>")
            }
            $("#btnMember").html(array.join(""));
        }
    });

    $("#addStatisticseDialog").dialog({
        title: "添加",
        width: 450,
        height: 700,
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
                    var data = {
                        userInfoId: $("#btnMember").val(),
                        id: accountId,
                        gameId: gameId,
                        playerLineup: $("[name=form-field-radio]:checked").val(),
                        score: $("#score").val(),
                        backboard: $("#backboard").val(),
                        assists: $("#assists").val(),
                        shotsTotal: $("#shotsTotal").val(),
                        shotsSuccessTotal: $("#shotsSuccessTotal").val(),
                        thirdsTotal: $("#thirdsTotal").val(),
                        thirdsSuccessTotal: $("#thirdsSuccessTotal").val(),
                        penaltyTotal: $("#penaltyTotal").val(),
                        penaltySuccessTotal: $("#penaltySuccessTotal").val(),
                        steals: $("#steals").val(),
                        miss: $("#miss").val(),
                        foul: $("#foul").val(),
                        foreignaid: 1
                    }

                    ajax({
                        url: "/gm/activity/game/saveStatistic.json",
                        data: data,
                        callback: function (result) {
                            var $content = $(obj).parents(".widget-box:first").find(".content");
                            $content.html(getStatisticses(result.data, accountId));
                            $("#addStatisticseDialog").dialog("close");
                        }
                    });
                }
            }
        ]
    });
    $("#addStatisticseDialog input[type=text]").val("0");
}

//openAddStatisticseDialog();

function getStatisticses(game, id) {
    var array = new Array();
    for (var i = 0; i < game.statisticses.length; i++) {
        var statisticse = game.statisticses[i];
        if (statisticse.gtId != id) {
            continue;
        }
        array.push('																									<tr>');
        array.push('																										<td>' + statisticse.actualName + '(' + statisticse.nickName + ')</td>');
        array.push('');
        array.push('																										<td>');
        array.push('																											' + statisticse.score);
        array.push('																										</td>');
        array.push('');
        array.push('																										<td>' + statisticse.backboard + '</td>');
        array.push('																										<td>' + statisticse.assists + '</td>');
        array.push('																										<td>' + statisticse.shotsSuccessTotal + '/' + statisticse.shotsTotal + '</td>');
        array.push('																										<td>' + statisticse.thirdsSuccessTotal + '/' + statisticse.thirdsTotal + '</td>');
        array.push('																										<td>' + statisticse.penaltySuccessTotal + '/' + statisticse.penaltyTotal + '</td>');
        array.push('																										<td>' + statisticse.steals + '</td>');
        array.push('																										<td>' + statisticse.miss + ' </td>');
        array.push('																										<td>' + statisticse.foul + '</td>');
        array.push('																										<td>' + (statisticse.playerLineup.value == 1 ? '是' : '否') + '</td>');
        array.push('																										<td style="width: 80px;">');
        array.push('																											<a href="#" class="red" onclick="openDeleteStatisticseDialog(this, \'' + statisticse.id + '\', \'' + game.id + '\', \'' + id + '\');">删除</a>');
        array.push('																										</td>');
        array.push('																									</tr>');
    }
    if (array.length == 0) {
        return "<tr><td colspan='12' class='center'>空</td></tr>";
    }
    return array.join("");
}

function getOptimalsStr(game) {
    var array = new Array();
    array.push(getOptimalDetailStr(getOptimalByType(game, 1)));
    array.push(getOptimalDetailStr(getOptimalByType(game, 2)));
    array.push(getOptimalDetailStr(getOptimalByType(game, 3)));
    return array.join("");
}

function getOptimalDetailStr(optimal) {
    if (optimal == null) return "";
    var array = new Array();
    array.push('																		<div class="profile-info-row">');
    array.push('																			<div class="profile-info-value center">');
    array.push('																				<span class="">' + optimal.firstName + '</span>');
    array.push('																			</div>');
    array.push('																			<div class="profile-info-value center">');
    array.push('																				<span class="">' + optimal.firstCount + '</span>');
    array.push('																			</div>');

    array.push('																			<div class="profile-info-name center">' + optimal.type + '<a href="#" class="red" style="font-size:12px;">删除</a></div>');//fuguolei
    array.push('');
    array.push('																			<div class="profile-info-value center">');
    array.push('																				<span class="">' + optimal.secondCount + '</span>');
    array.push('																			</div>');

    array.push('																			<div class="profile-info-value center">');
    array.push('																				<span class="">' + optimal.secondName + '</span>');
    array.push('																			</div>');
    array.push('																		</div>');
    return array.join("");
}

function getOptimalByType(game, type) {
    if (game.optimals.length == 0) {
        return null;
    }
    var firstTeamOptimal = null;
    var secondTeamOptimal = null;
    var optimalType = null;
    for (var i = 0; i < game.optimals.length; i++) {
        var optimal = game.optimals[i];
        if (type == optimal.type.value && game.firstTeamId == optimal.teamId) {
            firstTeamOptimal = optimal;
        }
        if (type == optimal.type.value && game.secondTeamId == optimal.teamId) {
            secondTeamOptimal = optimal;
        }
        if (type == optimal.type.value) {
            optimalType = optimal.type.desc;
        }
    }
    if (firstTeamOptimal == null || secondTeamOptimal == null) {
        return null;
    }
    return {
        firstName: firstTeamOptimal.userNickName,
        firstCount: firstTeamOptimal.count,
        secondName: secondTeamOptimal.userNickName,
        secondCount: secondTeamOptimal.count,
        type: optimalType
    };
}

function getListStr(game) {
    // console.log(game)
    var array = new Array();
    array.push('<tr class="game">');
    array.push('                                                <td>');
    array.push('                                                ' + game.Number);
    array.push('                                                </td>');
    array.push('												<td>');
    array.push('												' + game.competingTime.substring(0, 16));
    array.push('												</td>');
    array.push('');
    // array.push('													<td class="center">');
    // array.push('														<div class="action-buttons">');
    // array.push('															<a href="#" class="green bigger-140 show-details-btn" title="Show Details">');
    // array.push('																<i class="ace-icon fa fa-angle-double-down"></i>');
    // array.push('																<span class="sr-only">Details</span>');
    // array.push('															</a>');
    // array.push('														</div>');
    // array.push('													</td>');
    array.push('');
    array.push('                                                    <td >');
    array.push('                                                        ' + game.firstTeamName);
    array.push('                                                    </td>');
    array.push('													<td >');
    array.push('														' + game.secondTeamName);
    array.push('													</td>');
    if (game.firstTeamScore != null) {
        array.push('<td class="score">');
        array.push(game.firstTeamScore + ':' + game.secondTeamScore);
        array.push("</td>")
    } else {
        array.push('<td class="score"></td>');
    }
    array.push('<td>');
    array.push(gameLsit[game.arenaId]);
    array.push("</td>");
    array.push('<td class="status">');
    array.push(getGameStatus(game.status));
array.push("</td>");
    array.push('												');
    array.push('');
    array.push('													<td>');
    array.push('									<div class="hidden-sm hidden-xs btn-group">');
    array.push('                                         <div class="btn-group">');
    array.push('											<button data-toggle="dropdown" class="btn btn-primary btn-white dropdown-toggle" aria-expanded="true" style="font-size: 10px; padding: 4px;">');
    array.push('												比赛状态');
    array.push('												<i class="ace-icon fa fa-angle-down icon-on-right"></i>');
    array.push('											</button>');
    array.push('											<ul class="dropdown-menu">');
    array.push('												<li>');
    array.push('													<a href="#" onclick="updateStatus(this, \'' + game.id + '\', 1); return false;">未开赛</a>');
    array.push('												</li>');
    array.push('												<li>');
    array.push('													<a href="#" onclick="updateStatus(this, \'' + game.id + '\', 2); return false;">比赛中</a>');
    array.push('												</li>');
    array.push('												<li>');
    array.push('													<a href="#" onclick="updateStatus(this, \'' + game.id + '\', 3); return false;">比赛结束</a>');
    array.push('												</li>');
    array.push('											</ul>');
    array.push('										</div>');
    array.push('									</div>');
    array.push('&nbsp;&nbsp;');
    array.push('									<div class="hidden-sm hidden-xs btn-group">');
    array.push('                                         <div class="btn-group">');
    array.push('											<button data-toggle="dropdown" class="btn btn-primary btn-white dropdown-toggle" aria-expanded="true" style="font-size: 10px; padding: 4px;">');
    array.push('												设置');
    array.push('												<i class="ace-icon fa fa-angle-down icon-on-right"></i>');
    array.push('											</button>');
    array.push('											<ul class="dropdown-menu">');
    array.push('												<li>');
    array.push('													<a href="#" onclick="updateGameInfo(\'' + game.id + '\',\'' + game.competingTime + '\',\'' + game.arenaId + '\'); return false;">修改比赛信息</a>');
    array.push('												</li>');
    array.push('												<li>');
    array.push('													<a href="/gm/activity/score.html?gameId=' + game.id + '&eventId=' + eventId+'">录入成绩</a>');
    array.push('												</li>');
    array.push('												<li>');
    array.push('													<a href="/gm/activity/data.html?gameId=' + game.id + '&eventId=' + eventId+'">录入数据</a>');
    array.push('												</li>');
    array.push('												<li>');
    array.push('													<a href="/gm/activity/dynamic.html?gameId=' + game.id + '&eventId=' + eventId+'">录入动态</a>');
    array.push('												</li>');
    array.push('												<li>');
    array.push('													<a href="#" onclick="gameVideoDialog(\'' + game.id + '\'); return false;">获取回放</a>');
    array.push('												</li>');
    array.push('												<li>');
    // array.push('													<a href="/gm/statistics/console.html?gameId=' + game.id + '">技术统计</a>');
    array.push('													<a data-href="/gm/statistics/console.html?gameId=' + game.id + '" href="javascript:void(0)" class="jstj">技术统计</a>');
    array.push('												</li>');
    array.push('											</ul>');
    array.push('										</div>');
    array.push('									</div>');
    // array.push('&nbsp;&nbsp;<a href="#" onclick="updateGameInfo(\'' + game.id + '\',\'' + game.competingTime + '\',\'' + game.arenaId + '\')">修改比赛信息</a>');
    // array.push('&nbsp;&nbsp;<a href="/gm/activity/score.html?gameId=' + game.id + '&eventId=1">录入成绩</a>');
    // array.push('&nbsp;&nbsp;<a href="/gm/activity/data.html?gameId=' + game.id + '">录入数据</a>');
    // array.push('&nbsp;&nbsp;<a href="/gm/activity/dynamic.html?gameId=' + game.id + '">录入动态</a>');
    array.push('													</td>');
    array.push('												</tr>');
    array.push('');
    // array.push('												<tr class="detail-row">');//这里存的是详情
    // array.push('												</tr>');
    return array.join("");
}


function oepnOptimalDialog(obj, gameId) {//点击弹出最佳球员的编辑框
    var game = getGame(gameId);
    $("#optimalFirstName").html(game.firstTeamName);
    $("#optimalSecondName").html(game.secondTeamName);
    $("#optimalFirstUser").html("");
    $("#optimalSecondUser").html("");
    $("#optimalFirstCount").val("0");
    $("#optimalSecondCount").val("0");
    ajax({
        url: "/gm/activity/game/teamList.json",
        data: {
            eventId: eventId,
            teamId: game.firstTeamId
        },
        callback: function (result) {
            var array = new Array();
            for (var i = 0; i < result.data.length; i++) {
                var mem = result.data[i];
                array.push('<option value="' + mem.userInfoId + '">' + (mem.actualName == null ? '' : mem.actualName ) + '(' + mem.nickName + ")</option>")
            }
            $("#optimalFirstUser").html(array.join(""));
        }
    });

    ajax({//获取球员列表
        url: "/gm/activity/game/teamList.json",
        data: {
            eventId: eventId,
            teamId: game.secondTeamId
        },
        callback: function (result) {
            var array = new Array();
            for (var i = 0; i < result.data.length; i++) {
                var mem = result.data[i];
                array.push('<option value="' + mem.userInfoId + '">' + (mem.actualName == null ? '' : mem.actualName ) + '(' + mem.nickName + ")</option>")
            }
            $("#optimalSecondUser").html(array.join(""));
        }
    });
    $("#addOptimalDialog").dialog({//点击保存球员信息
        title: "添加最佳球员",
        width: 400,

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
                        url: "/gm/activity/game/addOptimal.json",
                        data: {
                            gameId: gameId,
                            firstTeamId: game.firstTeamId,
                            firstUserId: $("#optimalFirstUser").val(),
                            firstCount: $("#optimalFirstCount").val(),
                            secondTeamId: game.secondTeamId,
                            secondUserId: $("#optimalSecondUser").val(),
                            secondCount: $("#optimalSecondCount").val(),
                            type: $("#optimalType").val()
                        },
                        callback: function (result) {
                            var $content = $(obj).parents(".row:first").find(".optimals");
                            $content.html(getOptimalsStr(result.data));
                            $("#addOptimalDialog").dialog("close");
                        }
                    });
                }
            }
        ]
    });
}

function getGame(id) {
    for (var i = 0; i < gameList.length; i++) {
        if (gameList[i].id == id) {
            return gameList[i];
        }
    }
}

function initArena() {
    ajax({
        url: "/gm/activity/getAllArena.json",
        callback: function (result) {
            var array = new Array();
            for (var i = 0; i < result.data.length; i++) {
                array.push('<option value="' + result.data[i].id + '">' + result.data[i].name + '</option>')
            }
            $("#selArena").html(array.join(""));
        }
    });
    if (!ace.vars['old_ie']) $('#timeCompeting').datetimepicker({
        format: 'YYYY-MM-DD HH:mm:ss',//use this option to display seconds
        icons: {
            time: 'fa fa-clock-o',
            date: 'fa fa-calendar',
            up: 'fa fa-chevron-up',
            down: 'fa fa-chevron-down',
            previous: 'fa fa-chevron-left',
            next: 'fa fa-chevron-right',
            today: 'fa fa-arrows ',
            clear: 'fa fa-trash',
            close: 'fa fa-times'
        }
    }).next().on(ace.click_event, function () {
        $(this).prev().focus();
    });
}

function updateGameInfo(gameId, competingTime, areanId) {
    $("#timeCompeting").val(competingTime);
    $("#selArena").val(areanId);
    $("#updateGameDialog").dialog({
        title: "比赛信息编辑",
        width: 450,
        height: 400,
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
                    var timeCompeting = $("#timeCompeting").val();
                    var selArena = $("#selArena").val();
                    ajax({
                        url: "/gm/activity/updateGame.json",
                        data: {
                            gameId: gameId,
                            timeCompeting: timeCompeting,
                            selArena: selArena
                        },
                        callback: function (result) {
                            window.location.href = "/gm/activity/game/list.html?eventId=" + eventId;
                        }
                    });
                }
            }
        ]
    });
}

function gameVideoDialog(gameId) {
    ajax({
        url: "/gm/activity/game/getVideo.json",
        data: {
            gameId: gameId
        },
        callback: function (result) {
            $("#game-video").val(result.data.address);
            $("#gameVideoDialog").dialog({
                title: "回放地址",
                width: 450,
                height: 200,
                autoOpen: true,
                position: {my: "top", at: "center top+150px ", of: window},
                buttons: [
                    {
                        text: "取消",
                        "class": "btn btn-minier",
                        click: function () {
                            $(this).dialog("close");
                        }
                    }
                ]
            });
        }
    });

}

//oepnOptimalDialog();