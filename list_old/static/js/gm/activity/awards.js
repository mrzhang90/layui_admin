
function openTeamAwardDialog() {
	var currentActivityId = $("#span_activityId_awards").html();
	//-----startDialog ---
	$("#addTeamAwardDialog").dialog({
		title: "添加团队奖项",
		width: 500,
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
						url: "/gm/honor/createHonor.json",
						type: "post",
						data: {
							recordId :$("#team_awards_teamId").val(),
							name:$("#team_awards_name").val(),
							activityId: currentActivityId,
							type:2
						},
						callback: function(result) {
							awardsData(currentActivityId);
							$("#addTeamAwardDialog").dialog("close");
						}
					});

				}
			}
		]
	});
	//-----endDialog ---
	getAddGameParams("#team_awards_teamId");
}

function openPersonAwardsDialog(obj) {
	var currentActivityId = $("#span_activityId_awards").html();
	$("#addpersonAwardsDialog").dialog({
		title: "添加个人奖项",
		width: 500,
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
						url: "/gm/honor/createHonor.json",
						type: "post",
						data: {
							recordId :$("#awards_userInfoId").val(),
							name:$("#person_awards_name").val(),
							activityId: currentActivityId,
							type:1
						},
						callback: function(result) {
							awardsData(currentActivityId);
							$("#addpersonAwardsDialog").dialog("close");
						}
					});

				}
			}
		]
	});

	getAddGameParams("#person_awards_memberId");
}

function getAddGameParams(elementId) {
	ajax({
		url: "/gm/activity/getAddGameParams.json",
		type: "post",
		data: {
			activityId: currentActivityId
		},
		callback: function(result) {

			var array = new Array();
			for (var i = 0; i < result.data.allTeam.length; i++) {
				var mem = result.data.allTeam[i];
				if (elementId == "#person_awards_memberId") {
					array.push('<option value="' + mem.id + '">' + mem.teamName +"</option>");
				} else if (elementId == "#team_awards_teamId") {
					array.push('<option value="' + mem.teamId + '">' + mem.teamName +"</option>");
				}

			}
			$(elementId).html(array.join(""));
		}
	});
}


function deleteAwards(obj) {
	var currentActivityId = $("#span_activityId_awards").html();
	var awardsId = $(obj).attr("id")
	ajax({
		url: "/gm/honor/deleteHonor.json",
		type: "post",
		data: {
			awardsId: awardsId
		},
		callback: function(result) {
			if (result.code == 1) {
				alert("删除成功!");
				awardsData(currentActivityId);
			} else {
				alert("删除失败!");
			}

		}
	});
}

$("#person_awards_memberId").change(function() {
	var currentContestantId = $(this).val();
	ajax({
		url: "/gm/contestant/getAddContestantMembers.json",
		type: "get",
		data: {
			contestantId: currentContestantId
		},
		callback: function(result) {
			var array = new Array();
			for (var i = 0; i < result.data.allContestantMember.contestantMembers.length; i++) {
				var mem = result.data.allContestantMember.contestantMembers[i];
				array.push('<option value="' + mem.userInfoId + '">' + (mem.actualName == null ? '' : mem.actualName ) + '(' + mem.nickName + ")</option>")
			}

			$("#awards_userInfoId").html(array.join(""));
		}
	});
});

function openAwardsDialog(id, name) {
	currentActivityId = id;
    currentActivityName = name;
    if($("#span_activityId_awards").length == 0) {
        $("#activityId_awards").append("<span id='span_activityId_awards' style='display:none;'>"+id+"</span>");
    }
	$("#personAwards").html("");
    $("#teamAwards").html("");
	$("#awardsDialog").dialog({
                     title: "奖项",
                     width: 500,                     
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
									
								} 
							}
						]
		});
	awardsData(currentActivityId);
}

function awardsData(currentActivityId) {
	ajax({
		url: "/gm/activity/ac/awardsData.json",
		data: {
			activityId: currentActivityId
		},
		callback: function(result) {
			initAwards(result.data);
		}
	});
}

function initAwards(list) {
	$("#personAwards").html("");
	$("#teamAwards").html("");
	var persionArray = new Array();
	var teamArray = new Array();
	for (var i = 0; i < list.length; i++) {
		var obj = list[i];
		if (obj.type.value == 1) {
			persionArray.push('<tr>');
			persionArray.push('											<td>' + obj.winner + '</td>');
			persionArray.push('');
			persionArray.push('											<td>');
			persionArray.push('												 ' + obj.name);
			persionArray.push('											</td>');
			persionArray.push('											<td>');
			persionArray.push('												<a href="#" onclick="deleteAwards(this)" id=' + obj.id + ' class="red">删除</a>');
			persionArray.push('											</td>');
			persionArray.push('											');
			persionArray.push('										</tr>');

		} else {
			teamArray.push('<tr>');
			teamArray.push('											<td>' + obj.winner + '</td>');
			teamArray.push('');
			teamArray.push('											<td>');
			teamArray.push('												' + obj.name);
			teamArray.push('											</td>');
			teamArray.push('											<td>');
			teamArray.push('												<a href="#" onclick="deleteAwards(this)" id='+obj.id+' class="red">删除</a>');
			teamArray.push('											</td>');
			teamArray.push('											');
			teamArray.push('										</tr>');
		}
	}
	$("#personAwards").html(persionArray.join(""));
	$("#teamAwards").html(teamArray.join(""));
}