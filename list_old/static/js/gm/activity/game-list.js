loadXML = function(xmlString){
        var xmlDoc=null;
        //判断浏览器的类型
        //支持IE浏览器 
        if(!window.DOMParser && window.ActiveXObject){   //window.DOMParser 判断是否是非ie浏览器
            var xmlDomVersions = ['MSXML.2.DOMDocument.6.0','MSXML.2.DOMDocument.3.0','Microsoft.XMLDOM'];
            for(var i=0;i<xmlDomVersions.length;i++){
                try{
                    xmlDoc = new ActiveXObject(xmlDomVersions[i]);
                    xmlDoc.async = false;
                    xmlDoc.loadXML(xmlString); //loadXML方法载入xml字符串
                    break;
                }catch(e){
                }
            }
        }
        //支持Mozilla浏览器
        else if(window.DOMParser && document.implementation && document.implementation.createDocument){
            try{
                /* DOMParser 对象解析 XML 文本并返回一个 XML Document 对象。
                 * 要使用 DOMParser，使用不带参数的构造函数来实例化它，然后调用其 parseFromString() 方法
                 * parseFromString(text, contentType) 参数text:要解析的 XML 标记 参数contentType文本的内容类型
                 * 可能是 "text/xml" 、"application/xml" 或 "application/xhtml+xml" 中的一个。注意，不支持 "text/html"。
                 */
                domParser = new  DOMParser();
                xmlDoc = domParser.parseFromString(xmlString, 'text/xml');
            }catch(e){
            }
        }
        else{
            return null;
        }

        return xmlDoc;
}
var currentGameId;
function openDynamicDialog(gameId)  {
    currentGameId = gameId;
	$("#scList").html("");
	ajax({
		url: "/gm/activity/game/dynamicData.json",
		data: {
			gameId: gameId
		},
		callback: function(result) {
			initList(result.data);
			showDynamicDialog(gameId);
		}
    });	
}

function initList(dynamics) {
    $("#scList").html("");
	var array = new Array();
	for (var i = 0; i < dynamics.length; i++) {
		var dynamic = dynamics[i];
		if (dynamic.contentType.value == 1) {
			array.push(getVideoStr(dynamic));
		} else if (dynamic.contentType.value == 2) {
			array.push(getImgStr(dynamic));
		} else if (dynamic.contentType.value == 3) {
			array.push(getTextStr(dynamic));
		}
	}
	$("#scList").html(array.join(""));
}

function getVideoStr(dynamic) {
	var xml = loadXML(dynamic.content);

	var array = new Array();
	array.push('<div class="search-area well well-sm">');
    array.push('            <div class="row ace-nav">');
    array.push('                <img class="nav-user-photo" src="' + dynamic.uploaderUserPhoto +'" />');
    array.push('                <span class="user-info">');
    array.push('                                <small style="margin-top: -2px;">' + dynamic.uploaderNickName +'</small>');
    array.push('                                <small style="margin-top: 2px;">' + dynamic.uploadTime +'</small>');
    array.push('                            </span>');
    array.push('                <span style="float: right;"><a href="#" class="red">删除</a></span>');
    array.push('            </div>');
    array.push('            <hr />');
    array.push('                     ');    
    array.push('            <div class="row">');
    array.push('                <div class="imgContent">');
    array.push('                    <img src="' + xml.getElementsByTagName("preview")[0].innerHTML + '" class="videoImg" onclick="window.open(\'' + xml.getElementsByTagName("videoUrl")[0].innerHTML +'\');">');
    array.push('                </div>                    ');
    array.push('            </div>');
    array.push('        </div>');
    return array.join("");
}

function getImgStr(dynamic) {
	var xml = loadXML(dynamic.content);
	var array = new Array();
	array.push('<div class="search-area well well-sm">');
    array.push('            <div class="row ace-nav">');
    array.push('                <img class="nav-user-photo" src="' + dynamic.uploaderUserPhoto +'" />');
    array.push('                <span class="user-info">');
    array.push('                                <small style="margin-top: -2px;">' + dynamic.uploaderNickName +'</small>');
    array.push('                                <small style="margin-top: 2px;">' + dynamic.uploadTime +'</small>');
    array.push('                            </span>');
    array.push('                <span style="float: right;"><a href="#" class="red">删除</a></span>');
    array.push('            </div>');
    array.push('            <hr />');                            
    array.push('            <div class="row">');
    array.push('                <div class="imgContent">');
    var list = xml.getElementsByTagName("imgUrl");
    for (var i = 0; i < list.length; i++) {
    	array.push('                    <img src="' + list[i].innerHTML +'" class="photoImg"  onclick="window.open(\'' + list[i].innerHTML +'\');"/>');
    }    
    array.push('                </div>                    ');
    array.push('            </div>');
    array.push('        </div>');
    return array.join("");
}

function getTextStr(dynamic) {
	var xml = loadXML(dynamic.content);
	var array = new Array();
	array.push('<div class="search-area well well-sm">');
    array.push('            <div class="row ace-nav">');
    array.push('                <img class="nav-user-photo" src="' + dynamic.uploaderUserPhoto +'" />');
    array.push('                <span class="user-info">');
    array.push('                                <small style="margin-top: -2px;">' + dynamic.uploaderNickName +'</small>');
    array.push('                                <small style="margin-top: 2px;">' + dynamic.uploadTime +'</small>');
    array.push('                            </span>');
    array.push('                <span style="float: right;"><a href="#" class="red">删除</a></span>');
    array.push('            </div>');
    array.push('            <hr />');   
    array.push('                     ');    
    array.push('            <div class="row">');
    var nodes = xml.documentElement.childNodes;
    for (var i = 0; i < nodes.length; i++) {
    	var node = nodes[i];
    	if (node.tagName == "title") {
    		 array.push('                <p class="title">' + node.innerHTML +'</p>');
    	} else if (node.tagName == "imgUrl") {
    		array.push('                <div class="imgContent">');
		    array.push('                    <img src="' + node.innerHTML +'" class="videoImg" onclick="window.open(\'' + node.innerHTML +'\');" />');
		    array.push('                </div>');
    	} else if (node.tagName == "text") {
    		array.push('                <p class="text">' + node.innerHTML + '</p>                 ');
    	}
    }
   
    
 
    array.push('            </div>');
    array.push('       </div>');
	return array.join("");
}

function showDynamicDialog(gameId) {
		$("#dynamicDialog").dialog({
                     title: "动态",
                     width: 400,
                     minHeight: 600,                   
                     autoOpen: true,
      				position: { my: "top", at: "center top+30px ", of: window  }
      				
		});
}


function openAddVideoDialog() {
    initCheckBox();
    $("#fileBanner").ace_file_input({
                    style: 'well',
                    btn_choose: "视频预览",
                    btn_change: null,
                    no_icon: 'ace-icon fa fa-cloud-upload',
                    droppable: true,
                    thumbnail: 'small'
                    ,
                    preview_error : function(filename, error_code) {
                    }
            
                }).on('change', function(){
                });
    $("#addVideoDialog").dialog({
                     title: "动态",
                     width: 400,
                     minHeight: 300,                   
                     autoOpen: true,
                    position: { my: "top", at: "center top+30px ", of: window  },
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
                                    $("#videoFrom").submit();
                                }
                            }
                        ]
                    
        });

}


function getCurrentGame() {
    var list = listView.dataList();
    for (var i = 0; i < list.length; i++) {
        if (list[i].id == currentGameId) {
            return list[i];
        }
    }

}

uploadFile("#fileBanner", "#videoFrom", "/gm/activity/game/addVideo.json", function(result) {
   initList(result.data); 
   $(".dialog").dialog("close");
});

uploadFile("#fileImg1", "#addImgForm", "/gm/activity/game/addImg.json", function(result) {
   initList(result.data); 
   $(".dialog").dialog("close");
});


function initCheckBox() {
    var game = getCurrentGame();
    $(".firstTeam").val(game.firstTeamId);
    $(".firstTeam").attr("checked", "checked");
    $(".secondTeam").val(game.secondTeamId);
    $(".firstTeam").siblings("span").html(game.firstTeamName);
    $(".secondTeam").siblings("span").html(game.secondTeamName);
    $(".gameId").val(game.id);
}


function uploadFile(file, form, url, callback) {
    var file_input = $(file);
    $(form).on("submit", function(e) {
         e.preventDefault();
         var files = file_input.data('ace_input_files');
         if( !files || files.length == 0 ) {
             alert("请选择要上传的图片");
             return false;
         }

         if( "FormData" in window ) {
            var fd = new FormData(this);
            if(file_input.data('ace_input_method') == 'drop') {
                        var files = file_input.data('ace_input_files');
                        if(files && files.length > 0) {
                            //fd.append(file_input.attr('name'), files[0]);
                                    //to upload multiple files, the 'name' attribute should be something like this: myfile[]
                            for (var i = 0; i < files.length; i++) {
                                 fd.append(file_input.attr('name'), files[i]);
                            }
                        }

            }
            $.ajax({
                            url: url,
                            type: "POST",
                            processData: false,
                            contentType: false,
                            dataType: 'json',
                            data: fd,
                            xhr: function() {
                                var req = $.ajaxSettings.xhr();
                                if (req && req.upload) {
                                    req.upload.addEventListener('progress', function(e) {
                                        if(e.lengthComputable) {    
                                            var done = e.loaded || e.position, total = e.total || e.totalSize;
                                            var percent = parseInt((done/total)*100) + '%';
                                            //percentage of uploaded file
                                        }
                                    }, false);
                                }
                                return req;
                            },
                            beforeSend : function() {
                            },
                            success : function(result) {
                                callback(result);
                            }
            });
         } else {
            alert("对不起，不支持您的浏览器");
         }       
    });
}



function openAddImgDialog() {
    initCheckBox();
    $("#addImgDialog [type=file]").ace_file_input({
                    style: 'well',
                    btn_choose: "图片",
                    btn_change: null,
                    no_icon: 'ace-icon fa fa-cloud-upload',
                    droppable: true,
                    thumbnail: 'small'
                    ,
                    preview_error : function(filename, error_code) {
                    }
            
                }).on('change', function(){
                });
    $("#addImgDialog").dialog({
                     title: "动态",
                     width: 400,
                     height: 600,                   
                     autoOpen: true,
                    position: { my: "top", at: "center top+30px ", of: window  },
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
                                    $("#addImgForm").submit();
                                }
                            }
                        ]
                    
        });

}
