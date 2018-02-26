CommonVerify={
	// 电话号码匹配
		phone :function(val){
			var re=/^1[3|4|5|6|7|8|9]\d{9}$/;
			if(re.test(val)){
				return true;
			}
				return false;
		},
		/**
		 * 验证手机号码的有效性的方法
		 * 
		 * @param cellPhoneObject
		 *            待校验的对象
		 */
		valiCellPhoneNumber : function(value){
			var cellphone = /^0?(13[0-9]|15[0-9]|18[0-9]|14[0-9]|17[0-9])[0-9]{8}$/;
			if(value.length < 11){
				return false;
			}
			if(!cellphone.test(value)) {

		     	return false;
		    }
		    return true;
		},
		// 姓名校验匹配
		name :function(val){
//			var re= /^[\u4E00-\u9FA5]{1,15}[.]{0,1}[\u4E00-\u9FA5]{1,15}$/;
			var re= /^[\u4E00-\u9FA5]{1}[\u4E00-\u9FA5\·]{0,48}[\u4E00-\u9FA5]{1}$/;
			if(re.test(val)){
				return true;
			}
				return false;
		},
		verificationCode :function(val){
			var re=/^\d{4}$/;
			if(re.test(val)){
				return true;
			}
			return false;
		},
		number :function(val){
			var re=/^[0-9]*$/;
			if(re.test(val)){
				return true;
			}
			return false;
		},
		digit:function(val){
			var re=/^\d+(\.\d+)?$/;
			if(re.test(val)){
				return true;
			}
			return false;
		},
		url:function(val){
			//var strRegex = '^((https|http|ftp|rtsp|mms)?://)'
			var strRegex = '^((https|http|ftp|rtsp|mms)?://|)'
//				+ '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' //ftp的user@ 
				+ '(([0-9]{1,3}\.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184 
				+ '|' // 允许IP和DOMAIN（域名） 
				+ '(([0-9A-Za-z_-]+\\.|)' // 域名- www. 
				+ '(([0-9A-Za-z][0-9A-Za-z-]{0,61})+\\.)' // 二级域名 
				+ '([0-9A-Za-z]*\\.|)'
				+ '[A-Za-z]{2,6}))' // first level domain- .com or .museum 
				+ '(:[0-9]{1,4})?' // 端口- :80 
				+ '((/?)|' // a slash isn't required if there is no file name 
				+ '(/[0-9A-Za-z_!~*\'().;?:@&=+$,%#-]+)+/?)$'; 
				var re=new RegExp(strRegex); 
			if(re.test(val)){
				return true;
			}
			return false;
		},
		isDate:function(val,formate){
			var replace_str=val.replace(/[-|.]/g,"/");
			var date=new Date(replace_str);
			if(isNaN(date.getTime())){ 
				return false;
			};
			var  date_str=val,time_str;
			if(val.length > 10){ 
				var len=val.length;
				var data_time=val.split(" ");
				date_str=data_time[0];
				time_str=data_time[1];
				if(time_str.split(":").length<3){ 
					return false;
				}
			}
			if(date_str.length < 10){ 
				val=val.padStart(10,'0');
			};

			var val_char1=val.charAt("4");
			var val_char2=val.charAt("7");
			
			
			if(formate){
				var val_ayy=val.split(formate);
				if(val_ayy.length<3){ 
					return false;
				}
			}
			if(val_char1!=val_char2){ 
				return false;
			}
			var year=date.getFullYear();
			var moonth=Number(val.substring(5,7));
			var day=Number(val.substring(8,10));
			if(moonth>12){ 
				return false;
			}
			if(day>31){
				return false;
			} 
			var reg=new RegExp("^(2|4|6|9|11)$");

			if(reg.test(moonth)){ 
				if(day>30){ 
					return false;
				}
			};
			var year_mod=year % 4;
			if(moonth==2&&year_mod!=0){
				if(day>28){ 
					return false;
				}
			}
			return true;

		  },
		ip:function(val){
			var reg =  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
			if(reg.test(val)){
				return true;
			}
			return false;
		},
		
		/**
		 * 身份证号使用
		 *//*
			 * cardId2 : function(val){ IdCardValidate(val); }, IdCardValidate:
			 * function(idCardObj) { var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3,
			 * 7, 9, 10, 5, 8, 4, 2, 1 ]; // 加权因子 var ValideCode = [ 1, 0, 10,
			 * 9, 8, 7, 6, 5, 4, 3, 2 ]; // 身份证验证位值.10代表X if(idCardObj.value ==
			 * ""){ return true; } idCard = trim(idCardObj.value.replace(/ /g,
			 * "")); //去掉字符串头尾空格 if (idCard.length == 15) { return
			 * isValidityBrithBy15IdCard(idCard); //进行15位身份证的验证 } else if
			 * (idCard.length == 18) { var a_idCard = idCard.split(""); //
			 * 得到身份证数组
			 * if(isValidityBrithBy18IdCard(idCard)&&isTrueValidateCodeBy18IdCard(a_idCard)){
			 * //进行18位身份证的基本验证和第18位的验证 return true; }else { var
			 * msg='身份证号码输入有误，请重新输入！'; checkPopCommon(msg); return false; } }
			 * else { var msg='身份证号码长度必须是15或18位的数字类型！'; checkPopCommon(msg);
			 * return false; } },
			 *//**
				 * 判断身份证号码为18位时最后的验证位是否正确
				 * 
				 * @param a_idCard
				 *            身份证号码数组
				 * @return
				 *//*
					 * isTrueValidateCodeBy18IdCard : function (a_idCard) { var
					 * sum = 0; // 声明加权求和变量 var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1,
					 * 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ]; // 加权因子 var ValideCode = [
					 * 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ]; // 身份证验证位值.10代表X if
					 * (a_idCard[17].toLowerCase() == 'x') { //a_idCard[17] =
					 * 10; // 将最后位为x的验证码替换为10方便后续操作 return true; } for ( var i =
					 * 0; i < 17; i++) { sum += Wi[i] * a_idCard[i]; // 加权求和 }
					 * valCodePosition = sum % 11; // 得到验证码所位置 if (a_idCard[17] ==
					 * ValideCode[valCodePosition]) { return true; } else {
					 * return false; } } ,
					 *//**
						 * 验证18位数身份证号码中的生日是否是有效生日
						 * 
						 * @param idCard
						 *            18位书身份证字符串
						 * @return
						 *//*
							 * isValidityBrithBy18IdCard : function(idCard18){
							 * var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9,
							 * 10, 5, 8, 4, 2, 1 ]; // 加权因子 var ValideCode = [
							 * 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ]; //
							 * 身份证验证位值.10代表X var year =
							 * idCard18.substring(6,10); var month =
							 * idCard18.substring(10,12); var day =
							 * idCard18.substring(12,14); var temp_date = new
							 * Date(year,parseFloat(month)-1,parseFloat(day)); //
							 * 这里用getFullYear()获取年份，避免千年虫问题
							 * if(temp_date.getFullYear()!=parseFloat(year)
							 * ||temp_date.getMonth()!=parseFloat(month)-1){
							 * return false; }else{ return true; } } ,
							 *//**
							 * 验证15位数身份证号码中的生日是否是有效生日
							 * 
							 * @param idCard15
							 *            15位书身份证字符串
							 * @return
							 *//*
							 * isValidityBrithBy15IdCard : function(idCard15){
							 * var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9,
							 * 10, 5, 8, 4, 2, 1 ]; // 加权因子 var ValideCode = [
							 * 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ]; //
							 * 身份证验证位值.10代表X var year = idCard15.substring(6,8);
							 * var month = idCard15.substring(8,10); var day =
							 * idCard15.substring(10,12); var temp_date = new
							 * Date(year,parseFloat(month)-1,parseFloat(day)); //
							 * 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
							 * if(temp_date.getYear()!=parseFloat(year)
							 * ||temp_date.getMonth()!=parseFloat(month)-1){
							 * checkPopCommon("身份证号码输入有误，请重新输入！"); return false;
							 * }else{ return true; } },
							 */
		  
		  
		  
		  cardId : function(val)  
		  {  
		      // 是否为空
		      if(val == '')  
		      {  
		          return false;  
		      }  
		      // 校验长度，类型
		      if(isCardNo(val) == false)  
		      {   
		          return false;  
		      }  
		      // 检查省份
		      if(checkProvince(val) == false)  
		      {    
		          return false;  
		      }  
		      // 校验生日
		      if(checkBirthday(val) == false)  
		      {  
		          return false;  
		      }  
		      // 检验位的检测
		      if(checkParity(val) == false)  
		      {  
		          return false;  
		      }   
		      return true;  
		  },  
		// 邮箱正则表达式匹配
		mail :function(val){
			var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			if(re.test(val)){
				return true;
			}
			return false;
		},
	
		intCheck :function(_val,min,max){
			var re=/^[+-]?[1-9]?[0-9]*\.[0-9]*$/;
			var msg="";
			var res=false;
			//校验
			if(min>_val||_val>max){
				msg="数值超出范围";
			}else 
			if(re.test(_val)){
				msg="请输入整数";
			}else
			{
				res=true;
			}
			return {res:res,msg:msg}
		},
		//保留两位小数的校验
		floatCheck :function(_val,min,max){
			var floatN=/^(-?\d*)\.?\d{1,2}$/;
			var res=false;
			var msg="";
			if(min>_val||_val>max){
				msg="数值超出范围";
			}else 
			if(!floatN.test(_val)){
				msg="请输入最多保留两位小数的数值";
			}else{
				res=true;
			}
			return {res:res,msg:msg}
		},
		//车牌号带汉字
		lisonN_ch :function(_val){
			var plate = ["京","津","沪","渝","鲁","苏","黑","豫","粤","蒙",
	               "辽","冀","琼","桂","湘","浙","贵","川","青","云",
	               "陕","鄂","吉","新","浙","辽","甘","皖","赣","闽",
	               "蒙","闽","宁","藏","晋"];
			var lisnoreg=/^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z_0-9]{5,6}$/;
			var msg="";
			var res=false;
			 var cityplate=_val.substring(0,1);
			if(!lisnoreg.test(_val)||$.inArray(cityplate, plate)<0){
			   return false;
		   	}
			return true;
		},
	//	车牌号不带汉字
		lisonN_N_ch :function(_val){
			var lisno_noch=/^[A-Z]{1}[A-Z_0-9]{5,6}$/;
			var msg="";
			var cityplate=_val.substring(0,1);
			if(!lisno_noch.test(_val)){
			     return false;
		   	} 
		   	return true;
		},
		//校验英文字母
		English_Letter:function(_val){
			var eng_let=/^[A-Za-z]+$/;
			var msg="";
			var res=false;
			if(!eng_let.test(_val)){
			   	msg="请输入英文字母";
		   	}else{
		    	res=true;
		    }
			return {res:res,msg:msg};
		},
		//校验汉字
		character:function(_val){
			var eng_let=/[\u4e00-\u9fa5]/;
			var msg="";
			var res=false;
			if(!eng_let.test(_val)){
			   	msg="请输入汉字";
		   	}else{
		    	res=true;
		    }
			return {res:res,msg:msg};
		},
		vehicleFrameNo:function(val){
			var re = /^[a-zA-Z0-9*]{17}$/; // 车架号正则表达式
			if(re.test(val)){
				return true;
			}
			return false;
		},
		engineNo : function(val){
			var re = /^[a-zA-Z0-9]{1}[a-zA-Z0-9-_/\\*]{3,48}[a-zA-Z0-9]{1}$/;// 发动机号正则表达式
			if(re.test(val)){
				return true;
			}
			return false;
		},
		speCharacter: function(val){
			var spec=/[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/; //特殊字符
			if(spec.test(val)){
				return true;
			}
			return false;
		},
		spec_userName:function(val){
			var spec_userName = /^[\u4E00-\u9FA5A-Za-z0-9·_-]{1,30}$/; //数字汉字英文和·_- 人名类校验
			if(spec_userName.test(val)){
				return true;
			}
			return false;
		},
		spec_Name:function(val){
			var spec_Name = /^[\u4E00-\u9FA5A-Za-z0-9]+$/; //数字汉字英文
			if(spec_Name.test(val)){
				return true;
			}
			return false;
		},
		numAndEn:function(val){
			var numAndEn=/^[A-Za-z0-9]+$/;   //英文和数字
			if(numAndEn.test(val)){
				return true;
			}
			return false;
		}
		
}

CommonUtil={
		currentObj : null,
		showalter: function(val){
			 /*$(".dialog_div").show();
			 $(".dialog_div").eq(0).text(val);
			 setTimeout(function(){
				 $(".dialog_div").hide();
			 },2000);*/
			 $(".dialog_div .text").text(val);
				$(".dialog_div:eq(0)").show();
				var _this=this;
				setTimeout(function(){
					_this.close();
				},3000);
				$(".dialog_div .close").click(function(){
					_this.close();
				})
				this.close=function(){
					$(".dialog_div:eq(0)").hide();
				}
		},
		confirmTip:function(msg,callback){ 
			$("#confirm").show().find(".layer-content").html(msg);
			$("#confirm .confirm,#confirm .cancel").unbind("click");
			$("#confirm .confirm").click(function(){ 
				callback();
				$(this).parents(".layer").hide()
			});
			$("#confirm .cancel").click(function(){ 
				$(this).parents(".layer").hide()
		
			})
		},
		//弹出遮罩层-默认全屏 ，divId 有值作用于div上
		showFakeloader : function(divId){
			if(divId){
				if($(".fakeloader_"+divId).length<1){
					$("#fakeloadeDiv").append("<div class='fakeloader_"+divId+"'></div>");
					$(".fakeloader_"+divId).fakeLoader({
						timeToHide:160000,
						pos:"absolute",
						bgColor:"#f0f8fc",
						spinner:"spinner3",
						opacity:0.5,
						divId:divId,
						top:$("#"+divId).offset().top,
						left:$("#"+divId).offset().left,
						width:$("#"+divId).width(),
						height:$("#"+divId).height()
					});
				}else{
					$(".fakeloader_"+divId).show();	
				}
			}else{
				$("#fakeloader").fakeLoader({
			       
			        bgColor:"rgba(100,100,100,0.5)",
			        spinner:"spinner6"
			    });
				$("#fakeloader").show();
			}
			
		},
		hideFakeloader : function(divId){
			if(divId){
				$(".fakeloader_"+divId).hide();
			}else{
				$("#fakeloader").hide();
			}
		}
		
		
}
/**
 * 系统定义每周从周一开始，周日结束
 */
CommonUtil.dateUtils = {
	parseDate : function(dateStr) {
		return new Date(Date.parse(dateStr.replace(/-/g,   "/")));
	},
	// 得到每周的第一天(周一)
	getFirstDateOfWeek : function(theDate){  
		theDate = EduBoss.dateUtils.parseDate(theDate);
		var firstDateOfWeek;  
		if(theDate.getDay() == 0){ // 周日则往前推六天
			theDate.setDate(theDate.getDate() -6);
		}else{
			theDate.setDate(theDate.getDate() + 1 - theDate.getDay());
		}
		firstDateOfWeek = theDate.Format("yyyy-MM-dd");  
		return firstDateOfWeek;   
	} , 
	// 得到每周的最后一天(周日)
	getLastDateOfWeek: function(theDate){  
		theDate = EduBoss.dateUtils.parseDate(theDate);
		var lastDateOfWeek;  
		if(theDate.getDay() > 0){ // 非周日则归0至周日再往后推7天
			theDate.setDate(theDate.getDate() - theDate.getDay() + 7);  
		}
		lastDateOfWeek = theDate.Format("yyyy-MM-dd");  
		return lastDateOfWeek;   
	}  ,
	// 得到上周的第一天(周一)
	getPreviousFirstDateOfWeek: function (theDate){
		theDate = EduBoss.dateUtils.parseDate(theDate);
		theDate.setDate(theDate.getDate() - 7);  
		return this.getFirstDateOfWeek(theDate.Format("yyyy-MM-dd"));
	}  ,
	// 得到上周的最后一天(周日)
	getPreviousLastDateOfWeek:function (theDate){
		theDate = EduBoss.dateUtils.parseDate(theDate);
		theDate.setDate(theDate.getDate() + 7);  
		return this.getLastDateOfWeek(theDate.Format("yyyy-MM-dd"));
	},
	// 前一日
	getPreviousDate: function(theDate) {
		theDate = EduBoss.dateUtils.parseDate(theDate);
		var previousDate;
		theDate.setDate(theDate.getDate() - 1);
		previousDate = theDate.Format("yyyy-MM-dd");
		return previousDate;
	},
	// 下一日
	getNextDate: function(theDate) {
		theDate = EduBoss.dateUtils.parseDate(theDate);
		var nextDate;
		theDate.setDate(theDate.getDate() + 1);
		nextDate = theDate.Format("yyyy-MM-dd");
		return nextDate;
	},
	addDate: function(theDate, addDates) {
		
		theDate = EduBoss.dateUtils.parseDate(theDate);
		var nextDate;
		theDate.setDate(theDate.getDate() + addDates);
		nextDate = theDate.Format("yyyy-MM-dd");
		return nextDate;
	},
	getCurrentDate: function(){
		return (new Date()).Format("yyyy-MM-dd");
	},
	getCurrentTime: function(){
		return (new Date()).Format("yyyy-MM-dd HH:mm:ss");
	},
	getCurrentMonthFirstDay: function(){
		return (new Date()).Format("yyyy-MM")+"-01";
	},
	addMonth: function(theDate, addMonths) {
		theDate = EduBoss.dateUtils.parseDate(theDate);
		var nextDate;
		theDate.setMonth(theDate.getMonth() + addMonths);
		nextDate = theDate.Format("yyyy-MM-dd");
		return nextDate;
	},
	addQuarter: function(theDate, addQuarters) {
		theDate = EduBoss.dateUtils.parseDate(theDate);
		var nextDate;
		theDate.setMonth(theDate.getMonth() + addQuarters);
		nextDate = theDate.Format("yyyy-MM-dd");
		return nextDate;
	},
	addYear: function(theDate, addYears) {
		theDate = EduBoss.dateUtils.parseDate(theDate);
		var nextDate;
		theDate.setYear(theDate.getFullYear() + addYears);
		nextDate = theDate.Format("yyyy-MM-dd");
		return nextDate;
	},
	getFirstDateOfMonth : function(theDate){  
		theDate = EduBoss.dateUtils.parseDate(theDate);
		var nextDate;
		theDate.setDate(1);
		nextDate = theDate.Format("yyyy-MM-dd");
		return nextDate;
	},
	getLastDateOfMonth : function(theDate){  
		theDate = EduBoss.dateUtils.parseDate(theDate);
		var day = new Date(theDate.getFullYear(), theDate.getMonth()+1, 0);
		var nextDate;
		theDate.setDate(day.getDate());
		nextDate = theDate.Format("yyyy-MM-dd");
		return nextDate;
	},
	getFirstDateOfYear : function(theDate){  
		theDate = EduBoss.dateUtils.parseDate(theDate);
		var nextDate;
		theDate.setMonth(0);
		theDate.setDate(1);
		nextDate = theDate.Format("yyyy-MM-dd");
		return nextDate;
	},
	getLastDateOfYear : function(theDate){  
		theDate = EduBoss.dateUtils.parseDate(theDate);
		var day = new Date(theDate.getFullYear(), 12, 0);
		var nextDate;
		theDate.setMonth(11);
		theDate.setDate(day.getDate());
		nextDate = theDate.Format("yyyy-MM-dd");
		return nextDate;
	},
	getFirstDateOfQuarter : function(theDate){  
		theDate = EduBoss.dateUtils.parseDate(theDate);
		if (theDate.getMonth()>=0 && theDate.getMonth()<=2) {
			theDate.setMonth(0);
		} else if (theDate.getMonth()>2 && theDate.getMonth()<=5) {
			theDate.setMonth(3);
		} else if (theDate.getMonth()>5 && theDate.getMonth()<=8) {
			theDate.setMonth(6);
		} else if (theDate.getMonth()>8 && theDate.getMonth()<=11) {
			theDate.setMonth(9);
		}
		var nextDate;
		theDate.setDate(1);
		nextDate = theDate.Format("yyyy-MM-dd");
		return nextDate;
	},
	getLastDateOfQuarter : function(theDate){  
		theDate = EduBoss.dateUtils.parseDate(theDate);
		if (theDate.getMonth()>=0 && theDate.getMonth()<=2) {
			theDate.setMonth(2);
		} else if (theDate.getMonth()>2 && theDate.getMonth()<=5) {
			theDate.setMonth(5);
		} else if (theDate.getMonth()>5 && theDate.getMonth()<=8) {
			theDate.setMonth(8);
		} else if (theDate.getMonth()>8 && theDate.getMonth()<=11) {
			theDate.setMonth(11);
		}
		var day = new Date(theDate.getFullYear(), theDate.getMonth()+1, 0);
		var nextDate;
		theDate.setDate(day.getDate());
		nextDate = theDate.Format("yyyy-MM-dd");
		return nextDate;
	}
};
CommonUtil.NumberUtils = {
		numberMultiplication : function(){// js数据乘法，支持n个参数
			var temp=1;
			if(typeof temp.rate != 'function' ){
				Number.prototype.rate=function(){  
					var oStr=this.toString(); 
					if(oStr.indexOf(".")==-1)  
					return 1; 
					else 
					return Math.pow(10,parseInt(oStr.length-oStr.indexOf(".")-1)); 
				}
			}
			var args=EduBoss.NumberUtils.numberMultiplication.arguments; 
			for(i=0;i < args.length ;i++) 
				temp*=parseFloat(args[ i ])*parseFloat(args[ i ]).rate(); 
			for(i=0; i < args.length;i++)  
				temp=EduBoss.NumberUtils.numberDivide(temp,parseFloat(args[ i ]).rate()); 
			return temp;
		},
		numberDivide : function(arg1,arg2){
			var result=(parseFloat(arg1)/parseFloat(arg2)).toFixed(2);
			if(result.toString().indexOf(".")==-1){
				return result;
			}else{
				return parseFloat(result);
			}
		},
		moneyToUpper : function (num){
			var strOutput = "";  
			var strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';  
			num += "00";  
			var intPos = num.indexOf('.');  
			if (intPos >= 0)  
			  num = num.substring(0, intPos) + num.substr(intPos + 1, 2);  
			strUnit = strUnit.substr(strUnit.length - num.length);  
			for (var i=0; i < num.length; i++)  
			  strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i,1),1) + strUnit.substr(i,1);  
			return strOutput.replace(/零角零分$/, '').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元");  
		},
		convert :function (str){
			var result=""; 
			for (var i = 0; i < str.length; i++)
			{
				if (str.charCodeAt(i)==12288)
				{
					result+= String.fromCharCode(str.charCodeAt(i)-12256); 
					continue; 
				} 
			if (str.charCodeAt(i)>65280 && str.charCodeAt(i)<65375) result+= String.fromCharCode(str.charCodeAt(i)-65248); 
			else result+= String.fromCharCode(str.charCodeAt(i)); 
			} 
			return result; 
			}
	};



var vcity={ 11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",  
        21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",  
        33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",  
        42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",  
        51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",  
        63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"  
       }; 

// 检查号码是否符合规范，包括长度，类型
function isCardNo(val)  
{  
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;  
    if(reg.test(val) == false)  
    {  
        return false;  
    }  
  
    return true;  
}  
  
// 取身份证前两位,校验省份
function checkProvince(val)  
{  
    var province = val.substr(0,2);  
    if(vcity[province] == undefined)  
    {  
        return false;  
    }  
    return true;  
} 
  
// 检查生日是否正确
function checkBirthday(val)  
{  
    var len = val.length;  
    // 身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
    if(len == '15')  
    {  
        var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;   
        var arr_data = val.match(re_fifteen);  
        var year = arr_data[2];  
        var month = arr_data[3];  
        var day = arr_data[4];  
        var birthday = new Date('19'+year+'/'+month+'/'+day);  
        return verifyBirthday('19'+year,month,day,birthday);  
    }  
    // 身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
    if(len == '18')  
    {  
        var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;  
        var arr_data = val.match(re_eighteen);  
        var year = arr_data[2];  
        var month = arr_data[3];  
        var day = arr_data[4];  
        var birthday = new Date(year+'/'+month+'/'+day);  
        return verifyBirthday(year,month,day,birthday);  
    }  
    return false;  
} 
  
// 校验日期
function verifyBirthday(year,month,day,birthday)  
{  
    var now = new Date();  
    var now_year = now.getFullYear();  
    // 年月日是否合理
    if(birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day)  
    {  
        // 判断年份的范围（3岁到100岁之间)
        var time = now_year - year;  
        if(time >= 3 && time <= 100)  
        {  
            return true;  
        }  
        return false;  
    }  
    return false;  
} 
  
// 校验位的检测
function checkParity(val)  
{  
    // 15位转18位
    val = changeFivteenToEighteen(val);  
    var len = val.length;  
    if(len == '18')  
    {  
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);   
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');   
        var cardTemp = 0, i, valnum;   
        for(i = 0; i < 17; i ++)   
        {   
            cardTemp += val.substr(i, 1) * arrInt[i];   
        }   
        valnum = arrCh[cardTemp % 11];   
        if (valnum == val.substr(17, 1))   
        {  
            return true;  
        }  
        return false;  
    }  
    return false;  
}
  
// 15位转18位身份证号
function changeFivteenToEighteen(val)  
{  
    if(val.length == '15')  
    {  
        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);   
        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');   
        var cardTemp = 0, i;     
        val = val.substr(0, 6) + '19' + val.substr(6, val.length - 6);  
        for(i = 0; i < 17; i ++)   
        {   
            cardTemp += val.substr(i, 1) * arrInt[i];   
        }   
        val += arrCh[cardTemp % 11];   
        return val;  
    }  
    return val;  
}

 