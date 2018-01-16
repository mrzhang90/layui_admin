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
        if (groupId == null || groupId != game.gpId) {
            if (groupId != null) {
                array.push('							</tbody>');
                array.push('						</table>');
                array.push('					</div><!-- /.span -->');
                array.push('				</div>');
            }
            array.push('<div class="page-header">');
            array.push('				<h1>');
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
            array.push('										<th class="center">');
            array.push('											时间');
            array.push('										</th>');
            array.push('										<th class="detail-col">详情</th>');
            array.push('										<th>比赛</th>');
            array.push('										<th>比分</th>');
            array.push('										<th>比赛状态</th>');
            array.push('										<th>操作</th>');
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
    $('.show-details-btn').on('click', function (e) {
        e.preventDefault();
        $(this).closest('tr').next().toggleClass('open');
        $(this).find(ace.vars['.icon']).toggleClass('fa-angle-double-down').toggleClass('fa-angle-double-up');
    });
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

function btnSectionSave(obj, gameId, fristTeamId, secondTeamId, firstId, secondId) {
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
                        foul: $("#foul").val()
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
    var array = new Array();
    array.push('<tr class="game">');
    array.push('												<td class="center" width="130">');
    array.push('												' + game.competingTime.substring(0, 16));
    array.push('												</td>');
    array.push('');
    array.push('													<td class="center">');
    array.push('														<div class="action-buttons">');
    array.push('															<a href="#" class="green bigger-140 show-details-btn" title="Show Details">');
    array.push('																<i class="ace-icon fa fa-angle-double-down"></i>');
    array.push('																<span class="sr-only">Details</span>');
    array.push('															</a>');
    array.push('														</div>');
    array.push('													</td>');
    array.push('');
    array.push('													<td >');
    array.push('														' + game.firstTeamName + ' VS ' + game.secondTeamName);
    array.push('													</td>');
    if (game.firstTeamScore != null) {
        array.push('<td class="score">');
        array.push(game.firstTeamScore + ':' + game.secondTeamScore);
        array.push("</td>")
    } else {
        array.push('<td class="score"></td>');
    }

    array.push('<td class="status">');
    array.push(getGameStatus(game.status));
    array.push("</td>");
    array.push('												');
    array.push('');
    array.push('													<td>');
    array.push('														<div class="hidden-sm hidden-xs btn-group">');
    array.push('<div class="btn-group">');
    array.push('											<button data-toggle="dropdown" class="btn btn-primary btn-white dropdown-toggle" aria-expanded="true" style="font-size: 10px; padding: 4px;">');
    array.push('												比赛状态');
    array.push('												<i class="ace-icon fa fa-angle-down icon-on-right"></i>');
    array.push('											</button>');
    array.push('											<ul class="dropdown-menu">');
    array.push('												<li>');
    array.push('													<a href="#" onclick="updateStatus(this, \'' + game.id + '\', 1)">未开赛</a>');
    array.push('												</li>');
    array.push('												<li>');
    array.push('													<a href="#" onclick="updateStatus(this, \'' + game.id + '\', 2)">比赛中</a>');
    array.push('												</li>');
    array.push('												<li>');
    array.push('													<a href="#" onclick="updateStatus(this, \'' + game.id + '\', 3)">比赛结束</a>');
    array.push('												</li>');
    array.push('											</ul>');
    array.push('										</div>');

    array.push('														</div>');
    array.push('');
    array.push('	');
    array.push('													</td>');
    array.push('												</tr>');
    array.push('');
    array.push('												<tr class="detail-row">');
    array.push('													<td colspan="8">');
    array.push('														<div class="table-detail">');
    array.push('															<div class="row">');
    array.push('																<div class="col-xs-12 col-sm-2">');
    array.push('																	<div class="text-center">');
    array.push('																		<img class="thumbnail inline no-margin-bottom" alt="" src="' + game.firstTeamLogo + '" height="150" width="150">');
    array.push('																		<br>');
    array.push('																		<div class="width-80 label label-info label-xlg arrowed-in arrowed-in-right">');
    array.push('																			<div class="inline position-relative">');
    array.push('																				<a class="user-title-label" href="#">');
    array.push('																					<i class="ace-icon fa fa-circle light-green"></i>');
    array.push('																					&nbsp;');
    array.push('																					<span class="white">' + game.firstTeamName + '</span>');
    array.push('																				</a>');
    array.push('																			</div>');
    array.push('																		</div>');
    array.push('																	</div>');
    array.push('																</div>');
    array.push('');
    array.push('																<div class="col-xs-12 col-sm-7">');
    array.push('																	<div class="space visible-xs"></div>');
    array.push('');
    array.push('																	<div class="">');
    array.push('																		<h4 class="widget-title lighter">');
    array.push('																			<i class="ace-icon fa fa-angle-double-right"></i>');
    array.push('																			每节得分');
    array.push('');
    array.push('																			<span style="float: right;">');
    array.push('																				<button type="button" class="btn btn-xs btn-info btnEdit" data-toggle="button" onclick="btnSectionsEdit(this);">编辑</button>	&nbsp;																	');
    array.push('																			</span>');

    array.push('																			<span style="float: right;">');
    array.push('																				&nbsp;<button type="button" class="btn btn-xs btn-info save" data-toggle="button" onclick="btnSectionSave(this, \'' + game.id + '\', \'' + game.firstTeamId + '\', \'' + game.secondTeamId + '\', \'' + game.firstAcountId + '\', \'' + game.secondAcountId + '\');" style="display:none;">保存</button>		&nbsp;																');
    array.push('																			</span>');

    array.push('																			<span style="float: right;">');
    array.push('																				&nbsp;<button type="button" class="btn btn-xs btn-info cancel" data-toggle="button" onclick="btnSectionCancel(this);" style="display:none;">取消</button>		&nbsp;																');
    array.push('																			</span>');

    array.push('																		</h4>');
    array.push('																		');
    array.push('																		');
    array.push('																	</div>');
    array.push('');
    array.push('																	<hr />');
    array.push('');
    array.push('	');
    array.push('');
    array.push('																	<div class="profile-user-info profile-user-info-striped info">');
    if (game.sections.length == 0) {
        array.push('																		<div class="profile-info-row">');
        array.push('																			<div class="profile-info-value center">');
        array.push('																				<span class="">0</span>');
        array.push('																			</div>');
        array.push('																			<div class="profile-info-name center"> 上半场 </div>');//fuguolei
        array.push('');
        array.push('																			<div class="profile-info-value center">');
        array.push('																				<span>0</span>');
        array.push('																			</div>');
        array.push('																		</div>');
        array.push('');
        array.push('');
        array.push('																		<div class="profile-info-row">');
        array.push('																			<div class="profile-info-value center">');
        array.push('																				<span>0</span>');
        array.push('																			</div>');
        array.push('																			<div class="profile-info-name center"> 下半场 </div>');//fuguolei
        array.push('');
        array.push('																			<div class="profile-info-value center">');
        array.push('																				<span>0</span>');
        array.push('																			</div>');
        array.push('																		</div>');
        array.push('');
        // array.push('																		<div class="profile-info-row">');
        // array.push('																			<div class="profile-info-value center">');
        // array.push('																				<span>0</span>');
        // array.push('																			</div>');
        // array.push('																			<div class="profile-info-name center"> 第三节 </div>');
        // array.push('');
        // array.push('																			<div class="profile-info-value center">');
        // array.push('																				<span>0</span>');
        // array.push('																			</div>');
        // array.push('																		</div>');
        // array.push('');
        // array.push('																		<div class="profile-info-row">');
        // array.push('																			<div class="profile-info-value center">');
        // array.push('																				<span>0</span>');
        // array.push('																			</div>');
        // array.push('																			<div class="profile-info-name center"> 第四节 </div>');
        // array.push('');
        // array.push('																			<div class="profile-info-value center">');
        // array.push('																				<span>0</span>');
        // array.push('																			</div>');
        // array.push('																		</div>');
    } else {
        array.push(getSectionStr(game));
    }

    array.push('	');
    array.push('																	</div>');


    array.push('																	<div class="profile-user-info profile-user-info-striped edit" style="display: none;">');
    array.push('																		<div class="profile-info-row">');
    array.push('																			<div class="profile-info-value center">');
    array.push('																				<input type="text" class="firstSection1" />');
    array.push('																			</div>');
    array.push('																			<div class="profile-info-name center"> 上半场 </div>');//fuguolei
    array.push('');
    array.push('																			<div class="profile-info-value center">');
    array.push('																				<input type="text" class="secondSection1"  />');
    array.push('																			</div>');
    array.push('																		</div>');
    array.push('');
    array.push('');
    array.push('																		<div class="profile-info-row">');
    array.push('																			<div class="profile-info-value center">');
    array.push('																				<input type="text" class="firstSection2" />');
    array.push('																			</div>');
    array.push('																			<div class="profile-info-name center"> 下半场 </div>');//fuguolei
    array.push('');
    array.push('																			<div class="profile-info-value center">');
    array.push('																				<input type="text" class="secondSection2" />');
    array.push('																			</div>');
    array.push('																		</div>');
    array.push('');
    // array.push('																		<div class="profile-info-row">');//fuguolei
    // array.push('																			<div class="profile-info-value center">');
    // array.push('																				<input type="text" class="firstSection3" />');
    // array.push('																			</div>');
    // array.push('																			<div class="profile-info-name center"> 第三节 </div>');
    // array.push('');
    // array.push('																			<div class="profile-info-value center">');
    // array.push('																				<input type="text" class="secondSection3"  />');
    // array.push('																			</div>');
    // array.push('																		</div>');
    // array.push('');
    // array.push('																		<div class="profile-info-row">');
    // array.push('																			<div class="profile-info-value center">');
    // array.push('																				<input type="text" class="firstSection4" />');
    // array.push('																			</div>');
    // array.push('																			<div class="profile-info-name center"> 第四节 </div>');
    // array.push('');
    // array.push('																			<div class="profile-info-value center">');
    // array.push('																				<input type="text" class="secondSection4"  />');
    // array.push('																			</div>');
    // array.push('																		</div>');
    array.push('																		<div class="profile-info-row">');
    array.push('																			<div class="profile-info-value center">');
    array.push('																				<input type="text" class="firstSection5" />');
    array.push('																			</div>');
    array.push('																			<div class="profile-info-name center"> 加时1 </div>');
    array.push('');
    array.push('																			<div class="profile-info-value center">');
    array.push('																				<input type="text" class="secondSection5"  />');
    array.push('																			</div>');
    array.push('																		</div>');
    array.push('																		<div class="profile-info-row">');
    array.push('																			<div class="profile-info-value center">');
    array.push('																				<input type="text" class="firstSection6" />');
    array.push('																			</div>');
    array.push('																			<div class="profile-info-name center"> 加时2 </div>');
    array.push('');
    array.push('																			<div class="profile-info-value center">');
    array.push('																				<input type="text"  class="secondSection6" />');
    array.push('																			</div>');
    array.push('																		</div>');

    array.push('																		<div class="profile-info-row">');
    array.push('																			<div class="profile-info-value center">');
    array.push('																				<input type="text" class="firstSection7" />');
    array.push('																			</div>');
    array.push('																			<div class="profile-info-name center"> 加时3 </div>');
    array.push('');
    array.push('																			<div class="profile-info-value center">');
    array.push('																				<input type="text" class="secondSection7"  />');
    array.push('																			</div>');
    array.push('																		</div>');

    array.push('																		<div class="profile-info-row">');
    array.push('																			<div class="profile-info-value center">');
    array.push('																				<input type="text" class="firstSection8" />');
    array.push('																			</div>');
    array.push('																			<div class="profile-info-name center"> 加时4 </div>');
    array.push('');
    array.push('																			<div class="profile-info-value center">');
    array.push('																				<input type="text" class="secondSection8"  />');
    array.push('																			</div>');
    array.push('																		</div>');

    array.push('	');
    array.push('																	</div>');

    // 添加最佳球员 start
    array.push('																	<div class="space visible-xs"></div>');
    array.push('');
    array.push('																	<div class="">');
    array.push('																		<h4 class="widget-title lighter">');
    array.push('																			<i class="ace-icon fa fa-angle-double-right"></i>');
    array.push('																			最佳球员');
    array.push('');
    array.push('																			<span style="float: right;">');
    array.push('																				<button type="button" class="btn btn-xs btn-info btnEdit" data-toggle="button" onclick="oepnOptimalDialog(this, \'' + game.id + '\')">添加</button>	&nbsp;																	');
    array.push('																			</span>');


    array.push('																		</h4>');
    array.push('																		');
    array.push('																		');
    array.push('																	</div>');
    array.push('');
    array.push('																	<hr />');
    array.push('																	<div class="profile-user-info profile-user-info-striped optimals" >');
    array.push(getOptimalsStr(game));
    array.push('																	</div>')
    //end

    array.push('																</div>');
    array.push('');
    array.push('																<div class="col-xs-12 col-sm-2">');
    array.push('																	<div class="text-center">');
    array.push('																		<img class="thumbnail inline no-margin-bottom" alt="" src="' + game.secondTeamLogo + '" height="150">');
    array.push('																		<br>');
    array.push('																		<div class="width-80 label label-info label-xlg arrowed-in arrowed-in-right">');
    array.push('																			<div class="inline position-relative">');
    array.push('																				<a class="user-title-label" href="#">');
    array.push('																					<i class="ace-icon fa fa-circle light-green"></i>');
    array.push('																					&nbsp;');
    array.push('																					<span class="white">' + game.secondTeamName + '</span>');
    array.push('																				</a>');
    array.push('																			</div>');
    array.push('																		</div>');
    array.push('																	</div>');
    array.push('																</div>');
    array.push('															</div> <!-- row end-->');
    array.push('');
    array.push('															<div class="row">');
    array.push('');
    array.push('																				<div class="widget-box transparent">');
    array.push('																					<div class="widget-header widget-header-flat">');
    array.push('																						<h4 class="widget-title lighter">');
    array.push('																							<i class="ace-icon fa fa-star orange"></i>');
    array.push('																							' + game.firstTeamName);
    array.push('																						</h4>');
    array.push('																						<div class="widget-toolbar">');
    array.push('																							<a href="#" data-action="collapse">');
    array.push('																								<i class="ace-icon fa fa-chevron-up"></i>');
    array.push('																							</a>');
    array.push('																						</div>');
    array.push('																						<div class="widget-toolbar">');
    array.push('																							<a href="#" onclick="openAddStatisticseDialog(this, \'' + game.firstAcountId + '\', \'' + game.firstTeamId + '\', \'' + game.id + '\');">添加球员</a>');
    array.push('																						</div>');
    array.push('																						');
    array.push('																					</div>');
    array.push('');
    array.push('																					<div class="widget-body">');
    array.push('																						<div class="widget-main no-padding">');
    array.push('																							<table class="table table-bordered table-striped">');
    array.push('																								<thead class="thin-border-bottom">');
    array.push('																									<tr>');
    array.push('																										<th>');
    array.push('																											球员');
    array.push('																										</th>');
    array.push('');
    array.push('																										<th>');
    array.push('																											<i class="ace-icon fa fa-caret-right blue"></i>得分');
    array.push('																										</th>');
    array.push('');
    array.push('																										<th>');
    array.push('																											<i class="ace-icon fa fa-caret-right blue"></i>篮板');
    array.push('																										</th>');
    array.push('');
    array.push('																										<th>');
    array.push('																											<i class="ace-icon fa fa-caret-right blue"></i>助攻');
    array.push('																										</th>');
    array.push('');
    array.push('																										<th>');
    array.push('																											<i class="ace-icon fa fa-caret-right blue"></i>投篮');
    array.push('																										</th>');
    array.push('');
    array.push('																										<th>');
    array.push('																											<i class="ace-icon fa fa-caret-right blue"></i>三分');
    array.push('																										</th>');
    array.push('');
    array.push('																										<th>');
    array.push('																											<i class="ace-icon fa fa-caret-right blue"></i>罚球');
    array.push('																										</th>');
    array.push('');
    array.push('																										<th>');
    array.push('																											<i class="ace-icon fa fa-caret-right blue"></i>抢断');
    array.push('																										</th>');
    array.push('');
    array.push('																										<th>');
    array.push('																											<i class="ace-icon fa fa-caret-right blue"></i>失误');
    array.push('																										</th>');
    array.push('');
    array.push('																										<th>');
    array.push('																											<i class="ace-icon fa fa-caret-right blue"></i>犯规');
    array.push('																										</th>');
    array.push('																										<th>');
    array.push('																											<i class="ace-icon fa fa-caret-right blue"></i>首发');
    array.push('																										</th>');
    array.push('																										<th>操作</th>');
    array.push('																									</tr>');
    array.push('																								</thead>');
    array.push('');
    array.push('																								<tbody class="content">');
    array.push(getStatisticses(game, game.firstAcountId));
    array.push('																									');
    array.push('																									');
    array.push('																								</tbody>');
    array.push('																							</table>');
    array.push('																						</div><!-- /.widget-main -->');
    array.push('																					</div><!-- /.widget-body -->');
    array.push('																				</div><!-- /.widget-box -->');
    array.push('																		');
    array.push('															</div>');


    array.push('															<div class="row">');
    array.push('');
    array.push('																				<div class="widget-box transparent">');
    array.push('																					<div class="widget-header widget-header-flat">');
    array.push('																						<h4 class="widget-title lighter">');
    array.push('																							<i class="ace-icon fa fa-star orange"></i>');
    array.push('																							' + game.secondTeamName);
    array.push('																						</h4>');
    array.push('																						<div class="widget-toolbar">');
    array.push('																							<a href="#" data-action="collapse">');
    array.push('																								<i class="ace-icon fa fa-chevron-up"></i>');
    array.push('																							</a>');
    array.push('																						</div>');
    array.push('																						<div class="widget-toolbar">');
    array.push('																							<a href="#" onclick="openAddStatisticseDialog(this, \'' + game.secondAcountId + '\', \'' + game.secondTeamId + '\', \'' + game.id + '\');">添加球员</a>');
    array.push('																						</div>');
    array.push('																						');
    array.push('																					</div>');
    array.push('');
    array.push('																					<div class="widget-body">');
    array.push('																						<div class="widget-main no-padding">');
    array.push('																							<table class="table table-bordered table-striped">');
    array.push('																								<thead class="thin-border-bottom">');
    array.push('																									<tr>');
    array.push('																										<th>');
    array.push('																											球员');
    array.push('																										</th>');
    array.push('');
    array.push('																										<th>');
    array.push('																											<i class="ace-icon fa fa-caret-right blue"></i>得分');
    array.push('																										</th>');
    array.push('');
    array.push('																										<th>');
    array.push('																											<i class="ace-icon fa fa-caret-right blue"></i>篮板');
    array.push('																										</th>');
    array.push('');
    array.push('																										<th>');
    array.push('																											<i class="ace-icon fa fa-caret-right blue"></i>助攻');
    array.push('																										</th>');
    array.push('');
    array.push('																										<th>');
    array.push('																											<i class="ace-icon fa fa-caret-right blue"></i>投篮');
    array.push('																										</th>');
    array.push('');
    array.push('																										<th>');
    array.push('																											<i class="ace-icon fa fa-caret-right blue"></i>三分');
    array.push('																										</th>');
    array.push('');
    array.push('																										<th>');
    array.push('																											<i class="ace-icon fa fa-caret-right blue"></i>罚球');
    array.push('																										</th>');
    array.push('');
    array.push('																										<th>');
    array.push('																											<i class="ace-icon fa fa-caret-right blue"></i>抢断');
    array.push('																										</th>');
    array.push('');
    array.push('																										<th>');
    array.push('																											<i class="ace-icon fa fa-caret-right blue"></i>失误');
    array.push('																										</th>');
    array.push('');
    array.push('																										<th>');
    array.push('																											<i class="ace-icon fa fa-caret-right blue"></i>犯规');
    array.push('																										</th>');
    array.push('																										<th>');
    array.push('																											<i class="ace-icon fa fa-caret-right blue"></i>首发');
    array.push('																										</th>');
    array.push('																										<th>操作</th>');
    array.push('																									</tr>');
    array.push('																								</thead>');
    array.push('');
    array.push('																								<tbody class="content">');

    array.push(getStatisticses(game, game.secondAcountId));
    array.push('																									');
    array.push('																									');
    array.push('																								</tbody>');
    array.push('																							</table>');
    array.push('																						</div><!-- /.widget-main -->');
    array.push('																					</div><!-- /.widget-body -->');
    array.push('																				</div><!-- /.widget-box -->');
    array.push('																		');
    array.push('															</div>');


    array.push('														</div>');
    array.push('													</td>');
    array.push('												</tr>');
    return array.join("");
}


function oepnOptimalDialog(obj, gameId) {
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

    ajax({
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
    $("#addOptimalDialog").dialog({
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
//oepnOptimalDialog();