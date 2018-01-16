function openScheduleEditDialog(id, name) {
	currentActivityId = id;
    currentActivityName = name;
	ajax({
		url: "/gm/activity/allEvent.json",
		data: {
			activityId: currentActivityId
		},
		callback: function(result) {
			for (var i = 0; i < result.data.length; i++) {
				var obj = result.data[i];
				if (obj.status.value == 1) {
					initGroup(obj);
					return ;
				}
			}

			alert("不存在草稿阶段的赛程");
			
		}
	});
};

function initGroup(eventObject) {
	ajax({
		url: "/gm/activity/getAllGroup.json",
		data: {
			eventId: eventObject.id
		},
		callback: function(result) {
			openScheduleDialog(result.data, eventObject);
		}
	});
}

function openScheduleDialog(groups, eventObject) {
	var array = new Array();
	for (var i = 0; i < groups.length; i++) {
		var group = groups[i];
		array.push(getGroupHHTML(group, eventObject));
	}
	$("#editSchedule").html("");
	$("#editSchedule").html(array.join(""));
	$("#editSchedule").dialog({
                    title: "编辑赛程",
                    width: 600,
                    autoOpen: true,
      				position: { my: "top", at: "center top+150px ", of: window  }
      				// position: { using:function(pos){
      				// 	var screenTop=$(this).offset().top;
                    //     var docHeight = window.screen.height/2;
                    //     var divHeight = $(this).height()/2;
                    //     console.log(screenTop,docHeight,divHeight)
                    //     pos['position']='fixed';
                    //     pos['top']=screenTop+(docHeight-divHeight)-86;
                    //     console.log(pos)
                    //     $(this).css(pos);
                    // }}
    });
}

function addScheduleGame(groupId, opObj) {
	ajax({
		url: "/gm/activity/getAddGameParams.json",
		data: {
			activityId: currentActivityId
		},
		callback: function(result) {
			openAddScheduleDialog(result.data, groupId, opObj);
		}
	});
}

function openAddScheduleDialog(data, groupId, opObj) {
	var array = new Array();
	for (var i = 0; i < data.allArena.length; i++) {
		array.push('<option value="' + data.allArena[i].id +'">' + data.allArena[i].name +'</option>')
	}
	$("#selArena").html(array.join(""));
	var teamArray = new Array();
	for (var i = 0; i < data.allTeam.length; i++) {
		teamArray.push('<option value="' + data.allTeam[i].teamId +'">' + data.allTeam[i].teamName +'</option>');
	}
	$("#selScheduleTeam1").html(teamArray.join(""));
	$("#selScheduleTeam2").html(teamArray.join(""));
	$("#addGameDialog").dialog({
                     title: "添加比赛",
                     width: 450,
                     height: 550,
                     autoOpen: true,
      				position: { my: "top", at: "center top+150px ", of: window  },
      				buttons: [ 
							{
								text: "取消",
								"class" : "btn btn-minier",
								click: function() {
									$( this ).dialog( "close" ); 
								} 
							},
							{
								text: "确定",
								"class" : "btn btn-primary btn-minier",
								click: function() {
									var timeCompeting = $("#timeCompeting").val();
									var selScheduleTeam1 = $("#selScheduleTeam1").val();
									var selScheduleTeam2 = $("#selScheduleTeam2").val();
									var selArena = $("#selArena").val();
									ajax({
										url: "/gm/activity/createGame.json",
										data: {
											groupId: groupId,
											timeCompeting: timeCompeting,
											selScheduleTeam1: selScheduleTeam1,
											selScheduleTeam2: selScheduleTeam2,
											selArena: selArena
										},
										callback: function(result) {
											$(opObj).parents(".group:first").replaceWith(getGroupHHTML(result.data, eo));
											$("#addGameDialog").dialog("close");
										}
									});
								} 
							}
						]
		});
}

if(!ace.vars['old_ie']) $('#timeCompeting').datetimepicker({
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
				}).next().on(ace.click_event, function(){
					$(this).prev().focus();
				});

function deleteGame(opObj, groupId, gameId) {
	$("#deleteGame").dialog({
                    title: "删除比赛",
                    width: 300,
                    autoOpen: true,
      				position: { my: "top", at: "center top+150px ", of: window  },
      				buttons: [ 
							{
								text: "取消",
								"class" : "btn btn-minier",
								click: function() {
									$( this ).dialog( "close" ); 
								} 
							},
							{
								text: "确定",
								"class" : "btn btn-primary btn-minier",
								click: function() {
									ajax({
										url: "/gm/activity/deleteGame.json",
										data: {
											groupId: groupId,
											gameId: gameId
										},
										callback: function(result) {
											//alert($(opObj).parents(".group:first").length);
											$(opObj).parents(".group:first").replaceWith(getGroupHHTML(result.data, eo));
											$("#deleteGame").dialog("close");
										}
									});
								} 
							}
						]
		});
}
var eo;
function getGroupHHTML(group, eventObject) {
	//alert(group.id);
	eo = eventObject;
	var array = new Array();
	array.push('<div class="group">');
	array.push('	<div class="page-header">');
	array.push('						<h1>');
	array.push('							' + eventObject.name);
	array.push('							<small>');
	array.push('								<i class="ace-icon fa fa-angle-double-right"></i>');
	array.push('								' + group.name);
	array.push('							</small>');
	array.push('							<span style="float: right;">');
	array.push('								<button class="btn btn-sm btn-info no-radius" type="button" onclick="addScheduleGame(\'' + group.id +'\', this)">');
	array.push('																	添加比赛');
	array.push('																</button>');
	array.push('							</span>');
	array.push('						</h1>');
	array.push('	');
	array.push('	</div>');
	array.push('	<table id="simple-table" class="table  table-bordered table-hover">');
	array.push('										<thead>');
	array.push('											<tr>');
	array.push('												<th>球队</th>	');
	array.push('												<th>时间</th>');
	array.push('												<th>地点</th>');
	array.push('												<th>操作</th>');
	array.push('											</tr>');
	array.push('										</thead>');
	array.push('										<tbody>');
	if (group.games.length != 0) {
		for (var i = 0; i < group.games.length; i++) {
			var game = group.games[i];
			array.push('<tr>');
				array.push("<td>");
					array.push(game.teams[0].teamName + " VS " + game.teams[1].teamName);
				array.push("</td>");

				array.push("<td>");
					array.push(game.competingTime);
				array.push("</td>");

				array.push("<td>");
					array.push(game.areanName);
				array.push("</td>");

				array.push("<td>");
					array.push('<button class="btn btn-xs btn-danger" onclick="deleteGame(this, \'' + group.id + '\', \'' + game.id + '\')">');
					array.push('											<i class="ace-icon fa fa-trash-o bigger-120"></i>');
					array.push('									</button>');
				array.push("</td>");
			array.push('</tr>');
		}
	} else {
		array.push('											<tr><td colspan="4" style="text-align: center;">请添加比赛</td></tr>');
	}
	
	array.push('	');
	array.push('										</tbody>');
	array.push('	</table>');
	array.push('');
	array.push('	');
	array.push('</div>');

	return array.join("");

}