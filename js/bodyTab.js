/*
 *
 *   H+ - 后台主题UI框架
 *   version 4.6
 *
*/
var tabFilter, menu = [],
	liIndex, curNav, delMenu;
layui.define(["element", "jquery"], function(exports) {
	var element = layui.element,
		$ = layui.jquery,
		layId,
		Tab = function() {
			this.tabConfig = {
				closed: true,
				openTabNum: 10,
				tabFilter: "bodyTab"
			}
		};
	//显示左侧菜单
	if ($(".navBar").html() == '') {
		var _this = this;
		$(".navBar").html(navBar(navs)).height($(window).height() - 230);
		element.init(); //初始化页面元素
		$(window).resize(function() {
			$(".navBar").height($(window).height() - 230);
		})
	}

	//参数设置
	Tab.prototype.set = function(option) {
		var _this = this;
		$.extend(true, _this.tabConfig, option);
		return _this;
	};

	//通过title获取lay-id
	Tab.prototype.getLayId = function(title) {
		$(".layui-tab-title.top_tab li").each(function() {
			if ($(this).find("cite").text() == title) {
				layId = $(this).attr("lay-id");
			}
		})
		return layId;
	}
	//通过title判断tab是否存在
	Tab.prototype.hasTab = function(title) {
		var tabIndex = -1;
		$(".layui-tab-title.top_tab li").each(function() {
			if ($(this).find("cite").text() == title) {
				tabIndex = 1;
			}
		})
		return tabIndex;
	}

	//右侧内容tab操作
	var tabIdIndex = 0;
	Tab.prototype.tabAdd = function(_this) {
		if (window.sessionStorage.getItem("menu")) {
			menu = JSON.parse(window.sessionStorage.getItem("menu"));
		}
		var that = this;
		var closed = that.tabConfig.closed,
			openTabNum = that.tabConfig.openTabNum;
		tabFilter = that.tabConfig.tabFilter;
		// $(".layui-nav .layui-nav-item a").on("click",function(){
		// 	if(_this.find("i.iconfont,i.layui-icon").attr("data-icon") != undefined){
		if (_this.attr("data-url") != undefined) {
			var title = '';
			if (that.hasTab(_this.find("cite").text()) == -1 && _this.siblings("dl.layui-nav-child").length == 0) {
				if ($(".layui-tab-title.top_tab li").length == openTabNum) {
					layer.msg('只能同时打开' + openTabNum + '个选项卡哦。不然系统会卡的！');
					return;
				}
				tabIdIndex++;
				// title+="<i class=\"layui-icon\" data-icon=\"\"></i>";
				// if(_this.find("i.iconfont").attr("data-icon") != undefined){
				// 	title += '<i class="iconfont '+_this.find("i.iconfont").attr("data-icon")+'"></i>';
				// }else{
				// 	title += '<i class="layui-icon">'+_this.find("i.layui-icon").attr("data-icon")+'</i>';
				// }
				title += '<cite>' + _this.find("cite").text() + '</cite>';
				title += '<i class="layui-icon layui-unselect layui-tab-close" data-id="' + tabIdIndex + '">&#x1006;</i>';
				element.tabAdd(tabFilter, {
					title: title,
					content: "<iframe name='"+_this.attr('data-name')+"' src='" + _this.attr("data-url") + "' data-id='" + tabIdIndex + "' frameborder='no' border='0'></frame>",
					id: new Date().getTime()
				})

				//当前窗口内容
				var curmenu = {
					// "icon" : _this.find("i.iconfont").attr("data-icon")!=undefined ? _this.find("i.iconfont").attr("data-icon") : _this.find("i.layui-icon").attr("data-icon"),
					"icon": "",
					"title": _this.find("cite").text(),
					"href": _this.attr("data-url"),
					"layId": new Date().getTime(),
					"name":_this.attr('data-name')
				}
				menu.push(curmenu);
				window.sessionStorage.setItem("menu", JSON.stringify(menu)); //打开的窗口
				window.sessionStorage.setItem("curmenu", JSON.stringify(curmenu)); //当前的窗口
				element.tabChange(tabFilter, that.getLayId(_this.find("cite").text()));
			} else {
				//当前窗口内容
				var curmenu = {
					// "icon" : _this.find("i.iconfont").attr("data-icon")!=undefined ? _this.find("i.iconfont").attr("data-icon") : _this.find("i.layui-icon").attr("data-icon"),
					"icon": "",
					"title": _this.find("cite").text(),
					"href": _this.attr("data-url"),
					"layId": new Date().getTime(),
					"name":_this.attr('data-name')
				}
				window.sessionStorage.setItem("curmenu", JSON.stringify(curmenu)); //当前的窗口
				element.tabChange(tabFilter, that.getLayId(_this.find("cite").text()));
			}
			scrollToTab($('.top_tab li[lay-id='+that.getLayId(_this.find("cite").text())+']'))
		}
		// })
	}
	$("body").on("click", ".top_tab li", function() {
		scrollToTab(this)
		//切换后获取当前窗口的内容
		var curmenu = '';
		var menu = JSON.parse(window.sessionStorage.getItem("menu"));
		curmenu = menu[$(this).index() - 1];
		if ($(this).index() == 0) {
			window.sessionStorage.setItem("curmenu", '');
		} else {
			window.sessionStorage.setItem("curmenu", JSON.stringify(curmenu));
			if (window.sessionStorage.getItem("curmenu") == "undefined") {
				//如果删除的不是当前选中的tab,则将curmenu设置成当前选中的tab
				if (curNav != JSON.stringify(delMenu)) {
					window.sessionStorage.setItem("curmenu", curNav);
				} else {
					window.sessionStorage.setItem("curmenu", JSON.stringify(menu[liIndex - 1]));
				}
			}
		}
		element.tabChange(tabFilter, $(this).attr("lay-id")).init();
	})

	//删除tab
	$("body").on("click", ".top_tab li i.layui-tab-close", function() {
		//删除tab后重置session中的menu和curmenu
		liIndex = $(this).parent("li").index();
		var menu = JSON.parse(window.sessionStorage.getItem("menu"));
		//获取被删除元素
		delMenu = menu[liIndex - 1];
		var curmenu = window.sessionStorage.getItem("curmenu") == "undefined" ? "undefined" : window.sessionStorage.getItem("curmenu") == "" ? '' : JSON.parse(window.sessionStorage.getItem("curmenu"));
		if (JSON.stringify(curmenu) != JSON.stringify(menu[liIndex - 1])) { //如果删除的不是当前选中的tab
			// window.sessionStorage.setItem("curmenu",JSON.stringify(curmenu));
			curNav = JSON.stringify(curmenu);
		} else {
			if ($(this).parent("li").length > liIndex) {
				window.sessionStorage.setItem("curmenu", curmenu);
				curNav = curmenu;
			} else {
				window.sessionStorage.setItem("curmenu", JSON.stringify(menu[liIndex - 1]));
				curNav = JSON.stringify(menu[liIndex - 1]);
			}
		}
		menu.splice((liIndex - 1), 1);
		window.sessionStorage.setItem("menu", JSON.stringify(menu));
		element.tabDelete("bodyTab", $(this).parent("li").attr("lay-id")).init();
	})


	var bodyTab = new Tab();
	exports("bodyTab", function(option) {
		return bodyTab.set(option);
	});
	//计算元素集合的总宽度
	function calSumWidth(elements) {
		var width = 0;
		$(elements).each(function() {
			width += $(this).outerWidth(true);
		});
		return width;
	}
	//滚动到指定选项卡
	function scrollToTab(element) {
		var ele_topTab=$('.top_tab');
		var width_topTab_child=calSumWidth(ele_topTab.children());
		var marginLeftVal = calSumWidth($(element).prevAll()),
			marginRightVal = calSumWidth($(element).nextAll());
		// 可视区域非tab宽度
		var tabOuterWidth = calSumWidth($(".layadmin-pagetabs").children().not(".tab_header"));
		//可视区域tab宽度
		var visibleWidth = $(".tab_header").outerWidth(true) - tabOuterWidth;
		// var visibleWidth = ele_topTab.width();
		//实际滚动宽度
        var scrollVal = 0;
        if (width_topTab_child < visibleWidth) {
            scrollVal = 0;
        } else if (marginRightVal <= (visibleWidth - $(element).outerWidth(true) - ($(element).next().outerWidth(true) || 0))) {
            if ((visibleWidth - ($(element).next().outerWidth(true) || 0)) > marginRightVal) {
                scrollVal = marginLeftVal;
                var tabElement = element;
                while ((scrollVal - $(tabElement).outerWidth()) > (width_topTab_child - visibleWidth)) {
                    scrollVal -= $(tabElement).prev().outerWidth();
                    tabElement = $(tabElement).prev();
                }
            }
        } else if (marginLeftVal > (visibleWidth - $(element).outerWidth(true) - $(element).prev().outerWidth(true))) {
            scrollVal = marginLeftVal - $(element).prev().outerWidth(true);
        }
		ele_topTab.animate({
			marginLeft: 0 - scrollVal + 'px'
		}, "fast");
	}
})