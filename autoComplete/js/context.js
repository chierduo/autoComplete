(function( window, document, $, undefined ) { 
	var autoComplete = {};
	autoComplete.api = {
		int:function(opt){
			this.action(opt);
		},
		action:function(opt){
			var ajax_request = this.ajax_request;
			var _this=this;
			opt.beforeVal=$(opt.T).val();
			if(isIE()){ //解决ie高版本浏览器下input输入框自带叉号
				if(document.attachEvent){
					$(opt.T).get(0).attachEvent("onpropertychange", function(){
						_this.eventDeal(opt);
					});
				}else{
					$(opt.T).get(0).addEventListener("input", function(){
						_this.eventDeal(opt);
					});
				}
				
				$(document).on("mouseup",function(e){
					//console.log("0");
					if($(e.target).is(opt.T)){
						setTimeout(function(){
							if(opt.T.val()==""&&opt.T.data("code")){
								opt.T.data("code","");
								opt.T.data("hideName","");
								opt.T.blur();
								$(opt.autocomplete).empty().hide(); 
							}
						})
					}
				})
			}
			$(opt.T).on("keyup",function(event){
				//字母数字，退格，空格 
				if(event.keyCode > 40 || event.keyCode == 8 || event.keyCode ==32) { 
					//首先删除下拉列表中的信息 
					var searchText = opt.T.val();
					$(opt.autocomplete).empty().hide(); 
					clearTimeout(opt.timeoutid);
					if(opt.T.val().length==0){
						opt.T.data("code","");
						$(opt.autocomplete).empty().hide(); 
						clearTimeout(opt.timeoutid); 	
					}
					opt.selectedItem=0;
					opt.timeoutid = ajax_request(opt,searchText);
					_this.setSelectedItem(opt);
				}
			}).on("keyup",function(event){
				if(event.keyCode == 38){
					//上 
					
					if(opt.selectedItem == -1){ 
						_this.setSelectedItem(opt); 
					}else { 
						//索引减1 
						opt.selectedItem-=1;
						_this.setSelectedItem(opt); 
					} 
					event.preventDefault(); 
				}else if(event.keyCode == 40) { 
					//下 
					if(opt.selectedItem == -1){ 
						_this.setSelectedItem(opt); 
					}else{ 
						//索引加1 
						opt.selectedItem+=1;
						_this.setSelectedItem(opt); 
					} 
					event.preventDefault(); 
				} 
			}).on("keypress",function(event){ 
				//enter键 
				if(event.keyCode == 13) { 
					//列表为空或者鼠标离开导致当前没有索引值 
					if($(opt.autocomplete).find('li').length == 0 || opt.selectedItem == -1) { 
						return; 
					} 
					opt.T.val($(opt.autocomplete).find('li .fl').eq(opt.selectedItem).text()); 
					opt.T.data("code",$(opt.autocomplete).find('li').eq(opt.selectedItem).data("code"));
					var id = $(opt.autocomplete).find('li').eq(opt.selectedItem).data("code");
					if(opt.callback){
						opt.callback(id);
					}
					
					$(opt.autocomplete).empty().hide(); 
					event.preventDefault(); 
				} 
			}).on("keydown",function(event){ 
				//esc键 
				if(event.keyCode == 27 ) { 
					$(opt.autocomplete).empty().hide(); 
					event.preventDefault(); 
				} 
			});
			//区域模块失去焦点
			$(document).on("click",function(e){
				var target=e.target;
				var optVal=opt.T.val();
				if(!$(target).is(opt.T)&& !$(target).parent().is(opt.autocomplete)&& !$(target).is(opt.autocomplete)){
					$(opt.autocomplete).empty().hide();
					var id = $(".search-text").data("code");
					if(opt.callback){
						opt.callback(id);
					}
					clearTimeout(opt.timeoutid); 
				}
			});
			
			//获得焦点时
			opt.T.on("focus",function(){
				var searchText = opt.T.val();
				$(opt.autocomplete).empty().hide(); 
				clearTimeout(opt.timeoutid); 
				if(opt.T.val().length==0){
					$(opt.autocomplete).empty().hide(); 
					clearTimeout(opt.timeoutid); 	
				}
				opt.selectedItem=0;
				opt.timeoutid = ajax_request(opt,searchText);
				_this.setSelectedItem(opt);
			});
		},
		/****循环遍历添加上联想出的信息*****/
		ajax_request:function(opt,searchText){
			if(opt.data.length){ 
				//console.log(opt.data.length);
				//遍历data，添加到自动完成区 
				$.each(opt.data, function(index,item) { 
					var queryItem=item[opt.dataName]+"("+item.phone+")";
					if(searchText!=""&&queryItem.indexOf(searchText)!=-1){
						//创建li标签,添加到下拉列表中 
						//var _html='<span class="fl">'+item[opt.dataName]+'</span><span class="fr">'+item.phone+'</span>';
						var _html='<span class="fl">'+queryItem+'</span>';
						$('<li data-code='+item.userCode+' class="clearfix"></li>').html(_html).appendTo($(opt.autocomplete)).addClass('clickable').hover(function(){ 
							//下拉列表每一项的事件，鼠标移进去的操作 
							$(this).siblings().removeClass('highlight'); 
							$(this).addClass('highlight'); 
							opt.selectedItem = index; 
						},function(){ 
							//下拉列表每一项的事件，鼠标离开的操作 
							//当鼠标离开时索引，当作标记 
							opt.selectedItem = $(this).index();
						});
					} 
					if(searchText==''){
						//var _html='<span class="fl">'+item[opt.dataName]+'</span><span class="fr">'+item.phone+'</span>';
						var _html='<span class="fl">'+queryItem+'</span>';
						$('<li data-code='+item.userCode+' class="clearfix"></li>').html(_html).appendTo($(opt.autocomplete)).addClass('clickable').hover(function(){ 
							//下拉列表每一项的事件，鼠标移进去的操作 
							$(this).siblings().removeClass('highlight'); 
							$(this).addClass('highlight'); 
							opt.selectedItem = index; 
						},function(){ 
							//下拉列表每一项的事件，鼠标离开的操作 
							//当鼠标离开时索引，当作标记 
							opt.selectedItem = $(this).index();
						});
					}
				});//事件注册完毕 
				//设置下拉列表的位置，然后显示下拉列表 
				var ypos = opt.T.position().top+5; 
				var xpos = opt.T.position().left; 
				$(opt.autocomplete).css('min-width',opt.T.css('width')); 
				$(opt.autocomplete).css({'position':'absolute','left':xpos + "px",'top':ypos +24+"px"}); 
				//显示下拉列表 
				$(opt.autocomplete).show(); 
				//点击下拉框的内容
				$(opt.autocomplete).find("li").on("click",function(){
//					var showName=$(this).find(".fl").text();
//					var showTel=$(this).find(".fr").text();
					var showVal=$(this).find(".fl").text();
					$(".search-text").val(showVal);
//					$(".search-text").attr("data-hideName",showName);
					$(".search-text").data("code",$(this).data("code"));
					$(opt.autocomplete).empty().hide(); 
					clearTimeout(opt.timeoutid); 
					var id=$(this).data("code").toString();
					if(opt.callback){
						opt.callback(id);
					}
				});
			} 
		},	
		/****高亮*******/
		setSelectedItem:function(opt){
			
			//更新索引变量 
			var item=opt.selectedItem; 
			//按上下键是循环显示的，小于0就置成最大的值，大于最大值就置成0 
			if(item < 0){ 
				item=opt.selectedItem = $(opt.autocomplete).find('li').length - 1; 
			} 
			else if(item > $(opt.autocomplete).find('li').length-1 ) { 
				item=opt.selectedItem = 0; 
			} 
			//首先移除其他列表项的高亮背景，然后再高亮当前索引的背景 
			$(opt.autocomplete).find('li').removeClass('highlight').eq(item).addClass('highlight'); 
		},
		eventDeal:function(opt){
			var _this=this;
			var optVal=$(opt.T).val();
			_this.ajax_request(opt,optVal);
			if(optVal.length==0){
				opt.T.data("code","");
				opt.T.blur();
				$(opt.autocomplete).empty().hide();
				
			}
		}
	}
	autoComplete.setting = {};
	$.fn.autoComplete = function(opt){
		var autoCom = {
			selectedItem:"",
			timeoutid:"",
			autocomplete:"",
			data:[],
			event:"",
			dataNames:"",
			beforeVal:""
		};
		autoComplete.setting = $.extend(autoCom,opt);
		autoComplete.setting.T = this;
		autoComplete.api.int(autoComplete.setting);
	}
}(window, document, jQuery));
