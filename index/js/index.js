var $,tab,skyconsWeather;
layui.config({
	base : "js/"
}).use(['bodyTab','form','element','layer','jquery'],function(){
	var form = layui.form(),
		layer = layui.layer,
		element = layui.element();
		$ = layui.jquery;
		tab = layui.bodyTab();

	//锁屏
	function lockPage(){
		layer.open({
			title : false,
			type : 1,
			content : $("#lock-box"),
			closeBtn : 0,
			shade : 0.9
		})
	}
	$(".lockcms").on("click",function(){
		window.sessionStorage.setItem("lockcms",true);
		lockPage();
	})
	// 判断是否显示锁屏
	if(window.sessionStorage.getItem("lockcms") == "true"){
		lockPage();
	}
	// 解锁
	$("#unlock").on("click",function(){
		if($(this).siblings(".admin-header-lock-input").val() == ''){
			layer.msg("请输入解锁密码！");
		}else{
			if($(this).siblings(".admin-header-lock-input").val() == "123456"){
				window.sessionStorage.setItem("lockcms",false);
				$(this).siblings(".admin-header-lock-input").val('');
				layer.closeAll("page");
			}else{
				layer.msg("密码错误，请重新输入！");
			}
		}
	});
	$(document).on('keydown', function() {
		if(event.keyCode == 13) {
			$("#unlock").click();
		}
	});

	//手机设备的简单适配
	var treeMobile = $('.site-tree-mobile'),
		shadeMobile = $('.site-mobile-shade')

	treeMobile.on('click', function(){
		$('body').addClass('site-mobile');
	});

	shadeMobile.on('click', function(){
		$('body').removeClass('site-mobile');
	});


	$('.navTopType').on('click', function() {
		$('.layui-side-scroll').scrollTop(0)
		var index = $(this).index();
		$('.navTopType2').eq(index).show().siblings('.navTopType2').hide();
	})
	// 添加新窗口
	$(".layui-nav .layui-nav-item a").on("click",function(){
		addTab($(this));
		// $(this).parent("li").siblings().removeClass("layui-nav-itemed");
	})
	// 左移按扭
    $('.J_tabLeft').on('click', scrollTabLeft);

    // 右移按扭
    $('.J_tabRight').on('click', scrollTabRight);

    
	//关闭其他标签
    $('.J_tabCloseOther').on('click', closeOtherTabs)
	// 关闭全部
    $('.J_tabCloseAll').on('click', function () {
    	var _len=$('.top_tab').children("[lay-id]").length;
    	for(var index=_len-1;index>0;index--){
       		deleteStroge(index,$('.top_tab').children("[lay-id]").eq(index).attr('lay-id'))
            $('.clildFrame>div').eq(index).remove();
            $('.top_tab').children("[lay-id]").eq(index).remove();
    	}
            
        $('.top_tab li:first-child').addClass('layui-this');
        $('.clildFrame div:first-child').addClass('layui-show');
        $('.top_tab').css("margin-left", "0");

    });

    //关闭其他选项卡
    function closeOtherTabs(){
        $('.top_tab').children("[lay-id]").not(":first").not(".layui-this").each(function () {
            var index=$(this).index();
            deleteStroge(index,$(this).attr('lay-id'))
            $('.clildFrame>div').eq(index).remove();
            $(this).remove();
        });
        $('.top_tab').css("margin-left", "0");
    }
    function deleteStroge(liIndex,lay_id,ele){
    	var menu = JSON.parse(window.sessionStorage.getItem("menu"));
		//获取被删除元素
		delMenu = menu[liIndex - 1];
		var curmenu = window.sessionStorage.getItem("curmenu") == "undefined" ? "undefined" : window.sessionStorage.getItem("curmenu") == "" ? '' : JSON.parse(window.sessionStorage.getItem("curmenu"));
		if (JSON.stringify(curmenu) != JSON.stringify(menu[liIndex - 1])) { //如果删除的不是当前选中的tab
			// window.sessionStorage.setItem("curmenu",JSON.stringify(curmenu));
			curNav = JSON.stringify(curmenu);
		} else {
			var _len = $('.top_tab').children().length-1;
			if (_len > liIndex) {
				window.sessionStorage.setItem("curmenu", curmenu);
				curNav = curmenu;
			} else {
				window.sessionStorage.setItem("curmenu", JSON.stringify(menu[liIndex - 1]));
				curNav = JSON.stringify(menu[liIndex - 1]);
			}
		}
		menu.splice((liIndex - 1), 1);
		window.sessionStorage.setItem("menu", JSON.stringify(menu));
		element.tabDelete("bodyTab", lay_id).init();
    }

	//公告层
	function showNotice(){
		layer.open({
	        type: 1,
	        title: "系统公告", //不显示标题栏
	        closeBtn: false,
	        area: '310px',
	        shade: 0.8,
	        id: 'LAY_layuipro', //设定一个id，防止重复弹出
	        btn: ['火速围观'],
	        moveType: 1, //拖拽模式，0或者1
	        content: '<div style="padding:15px 20px; text-align:justify; line-height: 22px; text-indent:2em;border-bottom:1px solid #e2e2e2;"><p>最近偶然发现贤心大神的layui框架，瞬间被他的完美样式所吸引，虽然功能不算强大，但毕竟是一个刚刚出现的框架，后面会慢慢完善的。很早之前就想做一套后台模版，但是感觉bootstrop代码的冗余太大，不是非常喜欢，自己写又太累，所以一直闲置了下来。直到遇到了layui我才又燃起了制作一套后台模版的斗志。由于本人只是纯前端，所以页面只是单纯的实现了效果，没有做服务器端的一些处理，可能后期技术跟上了会更新的，如果有什么问题欢迎大家指导。谢谢大家。</p><p>在此特别感谢Beginner和Paco，他们写的框架给了我很好的启发和借鉴。希望有时间可以多多请教。</p></div>',
	        success: function(layero){
				var btn = layero.find('.layui-layer-btn');
				btn.css('text-align', 'center');
				btn.on("click",function(){
					window.sessionStorage.setItem("showNotice","true");
				})
				if($(window).width() > 432){  //如果页面宽度不足以显示顶部“系统公告”按钮，则不提示
					btn.on("click",function(){
						layer.tips('系统公告躲在了这里', '#showNotice', {
							tips: 3
						});
					})
				}
	        }
	    });
	}
	//判断是否处于锁屏状态(如果关闭以后则未关闭浏览器之前不再显示)
	// if(window.sessionStorage.getItem("lockcms") != "true" && window.sessionStorage.getItem("showNotice") != "true"){
	// 	showNotice();
	// }
	$(".showNotice").on("click",function(){
		showNotice();
	})

	//刷新后还原打开的窗口
	if(window.sessionStorage.getItem("menu") != null){
		menu = JSON.parse(window.sessionStorage.getItem("menu"));
		curmenu = window.sessionStorage.getItem("curmenu");
		var openTitle = '';
		for(var i=0;i<menu.length;i++){
			openTitle = '';
			if(menu[i].icon.split("-")[0] == 'icon'){
				openTitle += '<i class="iconfont '+menu[i].icon+'"></i>';
			}else{
				openTitle += '<i class="layui-icon">'+menu[i].icon+'</i>';
			}
			openTitle += '<cite>'+menu[i].title+'</cite>';
			openTitle += '<i class="layui-icon layui-unselect layui-tab-close" data-id="'+menu[i].layId+'">&#x1006;</i>';
			element.tabAdd("bodyTab",{
				title : openTitle,
		        content :"<iframe src='"+menu[i].href+"' data-id='"+menu[i].layId+"'  frameborder='no' border='0'></frame>",
		        id : menu[i].layId
			})
			//定位到刷新前的窗口
			if(curmenu != "undefined"){
				if(curmenu == '' || curmenu == "null"){  //定位到后台首页
					element.tabChange("bodyTab",'');
				}else if(JSON.parse(curmenu).title == menu[i].title){  //定位到刷新前的页面
					element.tabChange("bodyTab",menu[i].layId);
				}
			}else{
				element.tabChange("bodyTab",menu[menu.length-1].layId);
			}
		}
	}

	//查看左侧隐藏的选项卡
	function scrollTabLeft() {
		var marginLeftVal = Math.abs(parseInt($('.top_tab').css('margin-left')));
		// 可视区域非tab宽度
		var tabOuterWidth = calSumWidth($(".layadmin-pagetabs").children().not(".tab_header"));
		//可视区域tab宽度
		var visibleWidth = $(".tab_header").outerWidth(true) - tabOuterWidth;
		//实际滚动宽度
		var scrollVal = 0;
		if (calSumWidth($('.top_tab').children()) < visibleWidth) {
			return false;
		} else {
			var tabElement = $(".top_tab li:first");
			var offsetVal = 0;
			while ((offsetVal + $(tabElement).outerWidth(true)) <= marginLeftVal) { //找到离当前tab最近的元素
				offsetVal += $(tabElement).outerWidth(true);
				tabElement = $(tabElement).next();
			}
			offsetVal = 0;
			if (calSumWidth($(tabElement).prevAll()) > visibleWidth) {
				while ((offsetVal + $(tabElement).outerWidth(true)) < (visibleWidth) && tabElement.length > 0) {
					offsetVal += $(tabElement).outerWidth(true);
					tabElement = $(tabElement).prev();
				}
				scrollVal = calSumWidth($(tabElement).prevAll());
			}
		}
		$('.top_tab').animate({
			marginLeft: 0 - scrollVal + 'px'
		}, "fast");
	}
	//查看右侧隐藏的选项卡
	function scrollTabRight() {
		var marginLeftVal = Math.abs(parseInt($('.top_tab').css('margin-left')));
		// 可视区域非tab宽度
		var tabOuterWidth = calSumWidth($(".layadmin-pagetabs").children().not(".tab_header"));
		//可视区域tab宽度
		var visibleWidth = $(".tab_header").outerWidth(true) - tabOuterWidth;
		//实际滚动宽度
		var scrollVal = 0;
		if (calSumWidth($('.top_tab').children()) < visibleWidth) {
			return false;
		} else {
			var tabElement = $(".top_tab li:first");
			var offsetVal = 0;
			while ((offsetVal + $(tabElement).outerWidth(true)) <= marginLeftVal) { //找到离当前tab最近的元素
				offsetVal += $(tabElement).outerWidth(true);
				tabElement = $(tabElement).next();
			}
			offsetVal = 0;
			while ((offsetVal + $(tabElement).outerWidth(true)) < (visibleWidth) && tabElement.length > 0) {
				offsetVal += $(tabElement).outerWidth(true);
				tabElement = $(tabElement).next();
			}
			scrollVal = calSumWidth($(tabElement).prevAll());
			if (scrollVal > 0) {
				$('.top_tab').animate({
					marginLeft: 0 - scrollVal + 'px'
				}, "fast");
			}
		}
	}

	//计算元素集合的总宽度
	function calSumWidth(elements) {
		var width = 0;
		$(elements).each(function() {
			width += $(this).outerWidth(true);
		});
		return width;
	}

})

//打开新窗口
function addTab(_this){
	tab.tabAdd(_this);
}

//捐赠弹窗
function donation(){
	layer.tab({
		area : ['260px', '367px'],
		tab : [{
			title : "微信",
			content : "<div style='padding:30px;overflow:hidden;background:#d2d0d0;'><img src='images/wechat.jpg'></div>"
		},{
			title : "支付宝",
			content : "<div style='padding:30px;overflow:hidden;background:#d2d0d0;'><img src='images/alipay.jpg'></div>"
		}]
	})
}