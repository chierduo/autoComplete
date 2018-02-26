/***************基础js**************/
var passWord = /^[a-zA-Z0-9]{8,}$/;
var onlyNum = /^[0-9]*$/;
var jadeNum=/\d+/;
var accNo_reg = /^[a-zA-z0-9]{1,20}$/;  //1-20数字加英文
var docu_mode=parseInt(document.documentMode);
if(BrowserType()=="IE7"||BrowserType()=="IE6"||docu_mode<8){ 
	alert("您当前浏览器版本太低，建议您升级到最新版本或者使用谷歌浏览器");
}
//$(document).ready(function(e) {   
//    var counter = 0;  
//    if (window.history && window.history.pushState) {  
//         $(window).on('popstate', function () {  
//            window.history.pushState('forward', null, '#');  
//                window.history.forward(1);  
//            });  
//      }  
//	  window.history.pushState('forward', null, '#'); //在IE中必须得有这两行  
//	  window.history.forward(1);  
//});  
$(function(){
	$(".alert .close").click(function(){
		$(this).parents(".alert").hide();

	});
	$(".modal .close").click(function(){
		$(this).parents(".modal").hide();
	});
	
	$(".dropdown-menu").on("click","li",function(){ 
		var $show_input=$(this).parent().siblings(".showInput");
		var $true_input=$(this).parent().siblings("input:hidden");
		var curName=$show_input.val();
		var curCode=$true_input.val();
		var code=$(this).data("code");
		var name=trim($(this).text());
		if($(this).hasClass("active")){ 
			$(this).removeClass("active");
			$(this).find(":checkbox").prop("checked",false);
			curName=valFormate(curName,name,2);
			curCode=valFormate(curCode,code,2);
		}else{
			$(this).addClass("active");
			$(this).find(":checkbox").prop("checked",true);
			curName=valFormate(curName,name,1);
			curCode=valFormate(curCode,code,1);
		}
		
		$show_input.val(curName).attr("title",curName);
		$true_input.val(curCode);
	})
	/******监听下拉框的点击行为*******/
	$(document).on("click",function(e){ 
		var target=e.target;
		if(!$(target).is(".dropdown input")&&!$(target).is(".dropdown-menu")&&!$(target).parent().is(".dropdown-menu")&&$(target).parents(".dropdown-menu").length==0){ 
			$(".dropdown-menu").hide();
		}
		
	})
	/******监听面板显示*******/
	$(".form-input[readonly],.showInput").on("click",function(){ 
		setTimeout(function(){ 
			resizePanel()
		})
		
	})
	$(window).resize(function() {
		resizePanel();
	})
});


function setSession(key,val){ 
	 try{ 
	 	sessionStorage.setItem(key,val);
	 }
	 catch(e){ 
	 	console.log("建议切换浏览器模式为非隐身模式");
	 }
}
function getSession(key){ 
	var val="";
	 try{ 
	 	val=sessionStorage.getItem(key);
	 	return val;
	 }
	 catch(e){ 
	 	console.log("建议切换浏览器模式为非隐身模式");
	 	 return ""
	 }
}
/******监听面板大小监控*******/
function resizePanel(){ 
	if($(".layer-wrpper").is(":visible")){ 
		var layer_wrpper=$(".layer-wrpper:visible");
		var layer_height=layer_wrpper.height();
		var action_height=layer_wrpper.find(".layer-action").outerHeight();
		if(layer_wrpper.is(".large-panel")){
			var content_height=layer_height-action_height;
			layer_wrpper.find('.layer-content').css("maxHeight",content_height);
			if(layer_wrpper.parent().is("#queryModel")){ 
				$("#queryContBox").css("height",content_height-127);
			}
		}else
		if(layer_wrpper.is(".middle-panel")){
			layer_wrpper.css("margin-top",-(layer_height/2));
		}
	}
}
function valFormate(fullVal,shortVal,type){
		
		if(type==1){
			fullVal=fullVal+","+shortVal;
			
		}else
		if(type==2){
			fullVal=fullVal+",";
			fullVal=fullVal.replace(shortVal+",","");
			fullVal=fullVal.replace(/\,$/,"");
		}
		fullVal=fullVal.replace(/^\,/,"");
		return fullVal;
}
/**** 弹出框 ****/
var tipAlert=function(msg){
	$(".dialog_div .text").text(msg);
	$(".dialog_div:eq(0)").show();
	var _this=this;
	setTimeout(function(){
		$(".dialog_div:eq(0)").hide();
	},3000);
	$(".dialog_div .close").click(function(){
		$(".dialog_div:eq(0)").hide();
	});
	this.close=function(){
		$(".dialog_div:eq(0)").hide();
	}
};

/*** 显示加载框 ***/ 
function showLoader(){
	$("#loader").show();
}
/*** 隐藏加载框 ***/ 
function hideLoader(){
	$("#loader").hide();
}

/*** 刷新生成验证码 ***/ 
function flushValidateCode()
{ 
	var validateImgObject = document.getElementById("codeValidateImg"); 
	//validateImgObject.src = "${pageContext.request.contextPath }/getVerificationCode?time=" + new Date(); 
	validateImgObject.src = ctx+Get_VerifiCode+"?time=" + new Date(); 
} 

/*** 显示险种大讲堂 ***/
function showRiskDes(){
	$(".outer-riskbox").show();
	$(".head").hide();
}

/*** 弹框高度 ***/ 
function layerCenter(obj){//弹框高度
    var WHight=$(window).height();
    var DivHight=$(obj).height();
    var DivTop=(WHight-DivHight)/2-50;
    $(obj).css({"top":DivTop});
}
/***发送验证码***/
function sendCode(data,_url){
	if(_url){
		_url=ctx+_url;//利宝定制发送短信接口
	}else{
		_url=ctx+Per_sendSMS;
	}
	if(!CommonVerify.phone($("#telephone").val())){
		CommonUtil.showalter("请输入正确的手机号码！");
	}else{
		$(".send-code").attr("disabled","disabled");
		$(".send-code").addClass("after-send");
		$(".send-code").removeClass("active");
		var count=60;
		$(".send-code").text(count+"s");
		var sendCode=setInterval(function(){
			count--;
			$(".send-code").text(count+"s");
			if(count==-1){
				clearInterval(sendCode);
				$(".send-code").addClass("active");
				$(".send-code").text("重新发送");
				$(".send-code").removeClass("after-send");
				$(".send-code").removeAttr("disabled");
			}
		},1000);
		
		$.when(ajaxDataAsync(_url,JSON.stringify(data))).done(function(res){
			if(res){
				
			}
		});
	}
}
//判断两个日期间隔多少天
function getDays(strDateStart,strDateEnd){
   var strSeparator = "-"; //日期分隔符
   var oDate1;
   var oDate2;
   var iDays;
   oDate1= strDateStart.split(strSeparator);
   oDate2= strDateEnd.split(strSeparator);
   var strDateS = new Date(oDate1[0], oDate1[1]-1, oDate1[2]);
   var strDateE = new Date(oDate2[0], oDate2[1]-1, oDate2[2]);
   iDays = parseInt(Math.abs(strDateS - strDateE ) / 1000 / 60 / 60 /24)//把相差的毫秒数转换为天数 
   return iDays ;
}
function confirmTip(msg,callback){ 
	$("#confirmTip").show().find(".layer-content").html(msg);
	$("#confirmTip #confirm-tip-btn,#confirmTip #cancel-tip-btn").unbind("click");
	$("#confirmTip #confirm-tip-btn").click(function(){ 
		callback();
		$(this).parents(".layer").hide();
	});
	$("#confirmTip #cancel-tip-btn").click(function(){ 
		$(this).parents(".layer").hide();

	});
}
//判断当前浏览类型
function BrowserType(){
	var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
	var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
	var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
	var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器
	var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
	var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1; //判断是否Safari浏览器
	var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1; //判断Chrome浏览器
	
	if (isIE) 
	{
	     var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
		 reIE.test(userAgent);
		 var fIEVersion = parseFloat(RegExp["$1"]);
		 if(fIEVersion == 7)
		 { return "IE7";}
		 else if(fIEVersion == 8)
		 { return "IE8";}
		 else if(fIEVersion == 9)
		 { return "IE9";}
		 else if(fIEVersion == 10)
		 { return "IE10";}
		 else if(fIEVersion == 11)
		 { return "IE11";}
		 else
		 { return "0"}//IE版本过低
	 }//isIE end
	 if (isFF) {  return "FF";}
	 if (isOpera) {  return "Opera";}
	 if (isSafari) {  return "Safari";}
	 if (isChrome) { return "Chrome";}
	 if (isEdge) { return "Edge";}
	 }//myBrowser() end
     
     //判断是否是IE浏览器
function isIE(){
    var userAgent = navigator.userAgent;
	if (!!window.ActiveXObject || "ActiveXObject" in window)
		return 1;
	else if (userAgent.indexOf("Edge") > -1) {
		return 1;
	}else {
		return 0;
	}
} 
//判断是否是IE浏览器，包括Edge浏览器
function IEVersion(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
	var isEdge = userAgent.indexOf("Windows NT 6.1; Trident/7.0;") > -1 && !isIE; //判断是否IE的Edge浏览器
    if(isIE)
    {
         var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
         reIE.test(userAgent);
         var fIEVersion = parseFloat(RegExp["$1"]);
         if(fIEVersion == 7)
         { return "IE7";}
         else if(fIEVersion == 8)
         { return "IE8";}
         else if(fIEVersion == 9)
         { return "IE9";}
         else if(fIEVersion == 10)
         { return "IE10";}
         else if(fIEVersion == 11)
         { return "IE11";}
         else
         { return "0"}//IE版本过低
    }
	else if(isEdge)
	{
		return "Edge";
	}
    else
    {
        return "-1";//非IE
    }
}
/*******json 转html*******/
function jsonToHtml(msg,value,name){ 
	//console.log(value);
	if(isArrayFn(msg)){
		var array="";
		array+="<option value=''>请选择</option>"
		for( var i in msg){ 
			//var option="";
			array+='<option value="'+msg[i][value]+'">'+msg[i][name]+'</option>';
		}
		return 	array;
	}
}
//判断是否是数组
function isArrayFn (o) { 
	if(Array.isArray){ 
		return Array.isArray(o);
	}else{ 
		return	Object.prototype.toString.call(o) === '[object Array]';
	}
}
/********只获取有name的表单数据******/
function getFormData(formId){ 

	$ele=$(formId).find(":input[name]");
	var formData={};
	$ele.each(function(){
		var name=$(this).attr("name");
		formData[name]=this.value;
	});
	return formData;
}


function setFormData(data){ 
	for(var d in data){ 
		var inputEle=document.getElementsByName(d);
		if(inputEle.length>1){ 
			for(var i =0 ;i <inputEle.length;i++){ 
				if(data[d].indexOf(inputEle[i].value)>-1){ 
					inputEle[i].checked=true;
				}
			}
		}else
		if(inputEle.length>0){ 
			inputEle[0].value=data[d];
		}
		
	}
	
}
function areaSelect(option){
	var pro_ele=$(option.proSelector);
	var city_ele=$(option.citySelector);
	option.data.forEach(function(item,i){
		var pro_option="<option value='"+item.id+"' data-index="+i+">"+item.name+"</option>";
		pro_ele.append(pro_option);
	});
	//appendChild(0,city_ele,option.data);
	pro_ele.on("change",function(){
		var i=$(this).find(":selected").data("index");
		appendChild(i,city_ele,option.data)
		
	}).val('');
	function appendChild(i,obj,data){ 
		obj.empty();
		if(i!=undefined){ 
			var citylist=data[i].child;
		
			citylist.forEach(function(item){
				var city_option="<option value='"+item.id+"'>"+item.name+"</option>";
				obj.append(city_option).data("index",i);
			});
		}
		obj.prepend("<option value=''>---请选择---</option>").val('');
		
	}
}

/***比较时间大小***/
function compareTimeHour(oldTime,newTime){   
	var t1 = new Date(oldTime); 
	var t2 = new Date(newTime);   
	if(typeof(oldTime)=="string"){
		t1.setHours(0);
	}
	if(typeof(newTime)=="string"){
		t2.setHours(0);
	}
    if(Date.parse(t1) - Date.parse(t2)>0){   
    	return false;
    } 
    return true;
}
/***比较时间大小***/
function compareTime(oldTime,newTime){
	var t1 = new Date(oldTime);  
	var t2 = new Date(newTime); 
	if(typeof(oldTime)=="string"){
		t1.setTime(t1.getTime());
	}
	if(typeof(newTime)=="string"){
		t2.setTime(t2.getTime());
	}
	
    if(Date.parse(t1) - Date.parse(t2)>0)   
    {   
    return true;
    } 
    return false;
}

/****隐藏业务机构树弹框****/
function hideTreeBox(){
	$("#treePanel").hide();
}
/*****显示面板*********/
function showPanel(root){ 
	var _this=this;
	_this.panel=$(root);
	this.init=function(opt){ 
		$(".dropdown input").click(function(){ 
			_this.curInput=this;
			var targetPanel=$(this).data("target");
			_this.panel=$(targetPanel);
			if(opt.onfocus){
				opt.onfocus(_this);
			}
			_this.panel.show();
			if(document.addEventListener){
				$(window).on("mousewheel DOMMouseScroll",function(e){
					var target=e.originalEvent.srcElement||e.target;
					var panel_content=$(_this.panel).find(".layer-content");
					if(!$(target).is(panel_content)&&!$(target).parents().is(panel_content)){
						  e.preventDefault();  
					}else{ 
						if(panel_content.get(0).scrollHeight<=panel_content.get(0).clientHeight){ 
							 e.preventDefault();  
						}
					}
				})
			}else{
				document.attachEvent("onmousewheel",ieScroll);
				document.attachEvent("onclick",function(e){
					var target=e.srcElement||e.target;
					var panel_content=$(_this.panel).find(".layer-content");
					if(!$(target).is(panel_content)&&!$(target).parents().is(panel_content)){
							 e.cancelBubble=true;
							window.event.returnValue=false;  
						   return false;  
					}
					
				})
			}
		});
		_this.panel.find(".cancel").click(function(){ 
			//$(".cancel").parents(".layer").hide();
			_this.panel.hide();
			if(document.addEventListener){
				$(window).off("mousewheel DOMMouseScroll");
			}else{
				document.detachEvent("onmousewheel",ieScroll);
			}
			
		});
		_this.panel.find(".confirm").click(function(){ 
			opt.callBack(_this);
			//$(".cancel").parents(".layer").hide();
			_this.panel.hide();
			if(document.addEventListener){
				$(window).off("mousewheel DOMMouseScroll");
			}else{
				document.detachEvent("onmousewheel",ieScroll);
			}
		});
		if(opt.loadDatafn){ 
			opt.loadDatafn(_this);
		}
	}
	return this;
}
/****ie滚动******/
function ieScroll(e){
	var target=e.srcElement;
	var tr_panel_content=$("#treePanel").find(".layer-content");
	var in_panel_content=$("#insurePanel").find(".layer-content");
	if(!$(target).is(tr_panel_content)&&!$(target).parents().is(tr_panel_content)&&!$(target).is(in_panel_content)&&!$(target).parents().is(in_panel_content)){
		   window.event.returnValue=false;  
	}else{
		if(tr_panel_content&&tr_panel_content.length>0){ 
			if(tr_panel_content.get(0).scrollHeight<=tr_panel_content.get(0).clientHeight){ 
					window.event.returnValue=false;  
				   return false; 
			}
		}
		if(in_panel_content&&in_panel_content.length>0){
			if(in_panel_content.get(0).scrollHeight<=in_panel_content.get(0).clientHeight){ 
					window.event.returnValue=false;  
				   return false; 
			}
		}
		
	} 
}
/****加载单选树*******/
function loadRadioTree(data){ 
	var treePanel=new showPanel("#treePanel");
		var treeOpt={ 
			loadDatafn:function(obj){
				var setting = {
					view:{
						showLine: false,
						showTitle: false,
						selectedMulti: false,
						dblClickExpand: false
					},
					
					data:{ 
						simpleData: { 
							enable: true,
							idKey: "orgCode",
							pIdKey: "parentOrgCode"
						},
						key: {
							name: "orgName"
						}
					},
					
					callback:{ 
						beforeClick:function(treeId, treeNode, clickFlag){ 
							if(obj.panel.hasClass("noCheckHQ")){ 
								return (treeNode.level!=0)
							}
						},
						onDblClick:function(node){ 
							treeConfirm(obj);
							obj.panel.hide();
							if(document.addEventListener){
								$(window).off("mousewheel DOMMouseScroll");
							}else{
								document.detachEvent("onmousewheel",ieScroll);
							}
						}
					}
				};
				$.fn.zTree.init($("#Ztree"), setting,data);
				var zTree=  $.fn.zTree.getZTreeObj("Ztree");
				zTree.expandAll(true);
			},
			onfocus:function(obj){ 
				var zTree=  $.fn.zTree.getZTreeObj("Ztree");
				var cur_val=$(obj.curInput).siblings("input:hidden").val();
				if(cur_val){
					var nodes = zTree.getNodesByFilter(function(node){ 
						return (cur_val==node.orgCode);
					});
					zTree.selectNode(nodes[0]);
				}
			},
			callBack:function(obj){ 
				treeConfirm(obj);
			}
		}
		treePanel.init(treeOpt);
}
function treeConfirm(obj){ 
	var zTree=  $.fn.zTree.getZTreeObj("Ztree");
	var slt_code="",slt_name="";
	var selectNode=zTree.getSelectedNodes();
	if(selectNode.length>0){ 
		slt_code=selectNode[0].orgCode;
		slt_name=selectNode[0].orgName;
		$(obj.curInput).val(slt_name).attr("title",slt_name);
		$(obj.curInput).siblings("input:hidden").val(slt_code);
	};
}
/****加载多选树*******/
function loadCheckTree(data){ 
	var treePanel=new showPanel("#treePanel");
		var treeOpt={ 
			loadDatafn:function(obj){
				var setting = {
					view:{
						showLine: false,
						showTitle: false
					},
					data:{ 
						key: {
							name: "orgName",
							children:"orgChildrenList"
						}
					},
					check: {
						enable: true,
						autoCheckTrigger:true,
						chkStyle: "checkbox",
						chkboxType: { "Y": "ps", "N": "ps" }
					},
					callback:{ 
						beforeClick:function(){ 
							return false;
						}
					}
				};
				$.fn.zTree.init($("#Ztree"), setting,data);
				var zTree=  $.fn.zTree.getZTreeObj("Ztree");
				zTree.expandAll(true);
				//expandAll
			},
			onfocus:function(obj){ 
				var zTree=  $.fn.zTree.getZTreeObj("Ztree");
				var cur_val=$(obj.curInput).siblings("input:hidden").val();
				zTree.checkAllNodes(false);
				if(cur_val){
					var nodes = zTree.getNodesByFilter(function(node){ 
						return (cur_val.indexOf(node.orgCode)>-1);
					});
					for(var i=0;i<nodes.length;i++){ 
						zTree.checkNode(nodes[i], true, true);
					}
				}
			},
			callBack:function(obj){ 
				var zTree=  $.fn.zTree.getZTreeObj("Ztree");
			
				var code_arry=[],name_arry=[];
				checkNode = zTree.getCheckedNodes();
				for(var i=0;i<checkNode.length;i++){ 
					if(checkNode[i].orgCode){ 
						code_arry.push(checkNode[i].orgCode);
						name_arry.push(checkNode[i].orgName);
					}
				}
				var name=name_arry.join()==""?"请选择结构":name_arry.join();
				$(obj.curInput).val(name).attr("title",name_arry.join());
				$(obj.curInput).siblings("input:hidden").val(code_arry.join());
			}
		}
		treePanel.init(treeOpt);
}
/*****兼容ie的trim()操作******/
function trim(val){
	var trim_val="";
	if($.trim){ 
		trim_val=$.trim(val);
	}else{
		//var reg=/^\s$/;
		trim_val=val.replace(/^\s$/g,"");
	}
	return trim_val;
} 
