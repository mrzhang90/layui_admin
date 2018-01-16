function openGamePage(id, name) {
	currentActivityId = id;
    currentActivityName = name;
	ajax({
		url: "/gm/activity/allEvent.json",
		data: {
			activityId: currentActivityId
		},
		callback: function(result) {
			var array = new Array();
			for (var i = 0; i < result.data.length; i++) {
				var obj = result.data[i];
				if (obj.status.value == 2) {
					//initGroup(obj);
					window.location.href  =  "/gm/activity/game/list.html?eventId=" + obj.id;
					return ;
				}
			}

			alert("不存在发布中的赛程");
         	}
    });
};