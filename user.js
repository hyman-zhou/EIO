var cVe= new EIO.ve();
var cVeName="VeDemo1";//定义本应用的Ve引擎名称，用户自定义，用作服务按的消息处理调度
var cServerUri="EIOServletMsgEngine"
var selectedRowId;
var cMsgConfigure;


//页面信息初始化
function reqSysInit()
{
 var sendData = {"title":"json-from-eio","author": "zhoupeng"};
 cVe.setConn(cServerUri,"POST", true, JSON.stringify(sendData));
}


function resSysInit(response)
{
 // var retData =cVe.XHR.responseText;
 // var retDataObj=eval("("+retData+")");
 // cMsgConfigure = retDataObj[cVe.cEioVeDataId].GetMsgMap;
 // //alert("cookie:  "+retData);
 // cVeUti.Cookie.setCookie("VeMsgMap",retData);
// cVeUti.saveMsgMapToCookie(retData);
 //alert("getCookie: "+cVeUti.Cookie.getCookie("VeMsgMap"));
	console.log(response);
}

//抽取页面登录信息
function extractLoginData()
{
	var loginData;
	 loginData ="{\"MsgUserName\": " + "\""+ document.getElementById("username").value + "\",\"Msgpassword\": " + "\""+document.getElementById("password").value + "\"}";
	 return loginData;
}


///////////////////////////登录///////////////////////
function reqLogin()
{
 
 var sendData = extractLoginData();
 cVe.setConn(cServerUri,"POST", true, sendData);
}


function resLogin()
{
 var retData =cVe.XHR.responseText;
 var retDataObj=eval("("+retData+")");	
// alert(retData);
 var userStatus=retDataObj[cVe.cEioVeDataId];
 //alert("返回的数据"+cLoginPermission.cStatus);
 //经验证，这种方式无法存储指定名称变量到cookie中==> cVeUti.Cookie.setCookie("cLoginPermission",cLoginPermission);
 
 
 //cVeUti.Cookie.setCookie("cLoginPermission",retData);
// cVeUti.saveLoginPermit(retData);
 
 
 
 //cVeUti.saveMsgMapToCookie(retData);
 //alert("cookie"+cVeUti.Cookie.getCookie('cLoginPermission'));
 
 
 
 
 //var userStatus=cLoginPermission.cStatus;
 
 
 if(userStatus=="1"){
	
			window.location.href="loginwelcome.html";
		
		
	}else
	{
		alert("用户名或密码错误，无权访问");
	}

}



//用户访问权限判断管理

function hasPermission()
{	 
	//var retData =cVeUti.Cookie.getCookie('cLoginPermission');
	var cLoginPermission =cVeUti.readLoginPermit();
	if(cLoginPermission==null){
		$("body").css("display","none");
		alert("无权访问");
		cVeUti.gotoLocalMsgHandle('BackPage', '-1');
	}else{
		var resource=cLoginPermission["cResource"];
		var flag=0;
		if(resource[getCurrentPageName()]!=undefined){
			flag=1;
		}
		
		if(flag==0){
			$("body").css("display","none");
			alert("无权访问");
			cVeUti.gotoLocalMsgHandle('BackPage', '-1');
		}
	}
	
}


//function hasPermission()
//{	
//	var retData =cVeUti.Cookie.getCookie('cLoginPermission');
//	var retDataObj=eval("("+retData+")");	
//	var cLoginPermission=retDataObj[cVe.cEioVeDataId];
//	var resource=cLoginPermission.cResource;
//	loggedUser=cLoginPermission.cUsername;
//	
//	var flag=0;
//	for(var i=0;i<resource.length;i++){
//		if(resource[i]==getCurrentPageName()){
//			flag=1;
//		}
//	}
//	if(flag==0){
//		alert("无权访问");
//		cVeUti.gotoLocalMsgHandle('BackPage', '-1');
//	}
//}

//获得当前页面名称
function getCurrentPageName()
{ 
	var strUrl=window.location.href;
	var arrUrl=strUrl.split("/");
	var strPage=arrUrl[arrUrl.length-1];
	return strPage;
}

//获得用户名
function getUser(){
	var username="";
	var cLoginPermission =cVeUti.readLoginPermit();
	if(cLoginPermission!=null){
		username=cLoginPermission.cUsername;
	}
	//alert("username"+username);
	
	return username;
}

//获取用户登录ip
function getIPAddress(){
	var ipAddress="";
	var retData =cVeUti.Cookie.getCookie('cLoginPermission');
	if(retData!=""){
		var retDataObj=eval("("+retData+")");	
		var cLoginPermission=retDataObj[cVe.cEioVeDataId];
		ipAddress=cLoginPermission.cIPAddress;
	}
 
	return ipAddress;
}


//获得用户登录时间
function getLoginTime(){
	var loginTime="";
	var retData =cVeUti.Cookie.getCookie('cLoginPermission');
	if(retData!=""){
		var retDataObj=eval("("+retData+")");	
		var cLoginPermission=retDataObj[cVe.cEioVeDataId];
		loginTime=cLoginPermission.cLoginTime;
	}

	return loginTime;
}

//获得用户登录状态
function getUserStatus(){
	var status="";
	
	var retData =cVeUti.Cookie.getCookie('cLoginPermission');
	if(retData!=""){
		var retDataObj=eval("("+retData+")");	
		var cLoginPermission=retDataObj[cVe.cEioVeDataId];
		status=cLoginPermission.cStatus;
	}
	return status;
}

//获得用户类型
function getUserType(){
	var userType="";
	var retData =cVeUti.Cookie.getCookie('cLoginPermission');
	if(retData!=""){
		var retDataObj=eval("("+retData+")");	
		var cLoginPermission=retDataObj[cVe.cEioVeDataId];
		userType=cLoginPermission.cUserType;
	}

	return userType;
	
}

//获得用户能访问的资源列表
function getResource(){
	var resource="";
	var retData =cVeUti.Cookie.getCookie('cLoginPermission');
	if(retData!=""){
		var retDataObj=eval("("+retData+")");	
		var cLoginPermission=retDataObj[cVe.cEioVeDataId];
		resource=cLoginPermission.cResource;
	}	
	return resource;
}





function quit(){
	cVeUti.Cookie.delCookie('VeLoginPermit');
	window.location.href="http://125.216.242.40:8080/EcossWeb/index.html";
}







////////////////////用户表格操作相关
//
//function loadSystemUser()
//{
//	
//	hasPermission();
//	
//	var retData =cVeUti.Cookie.getCookie('VeMsgMap');
//	var retDataObj=eval("("+retData+")");	
//	cMsgConfigure = retDataObj[cVe.cEioVeDataId].GetMsgMap;
//	
//	cVe.startReqByMsgMap(cVeName,'MsgUserInfor','MsgGetSystemUserRecsToVeGrid',cMsgConfigure);
//	cVe.startReqByMsgMap(cVeName,'MsgUserInfor','MsgGetPersonalUserRecsToVeGrid',cMsgConfigure);
//}
//
//function editcommon(rowId) {
//	
//	var data = (window['systemuserInfor'].extDataById(rowId));
//	data=encodeURI(data);
//	window.location.href='personalcommonuserInfor.html'+'?c1='+data;
//}
//
//function editsystem(rowId) {
//	
//	var data = (window['systemuserInfor'].extDataById(rowId));
//	data=encodeURI(data);
//	window.location.href='personalsystemuserInfor.html'+'?c1='+data;
//}
//
//function check(rowId){
//	selectedRowId=rowId;
//	
// 
//	
//	cVe.startReqByMsgMap(cVeName,'MsgUserInfor','MsgGetDynamicRecsToVeGrid',cMsgConfigure);
//}
//
//function deleteRow(){
//	 window['systemuserInfor'].delSelectedRows();
//	  
//
//}
// //==============reqGetDbRecsToVegrid============
//function reqGetSystemUserDbRecsToVegrid()
//{
//  var sendData ="{\"MsgUserName\": \"" + getUser()+"\"}"; 
//  cVe.setConn(cServerUri,"POST", false, sendData);
//}
//
//
//function resGetSystemUserDbRecsToVegrid()
//{
// var retData =cVe.XHR.responseText;
// var retDataObj=eval("("+retData+")");	
// var data=retDataObj[cVe.cEioVeDataId];
// if(data==''){
//		alert("没有查询到相关数据");
//	}
//for (var i=0;i<data.length;i++)
//{
//	if(data[i][7]=='0')
//	{
//		data[i][7]='未审核';
//	}else if(data[i][7]=='1')
//	{
//		data[i][7]='通过';
//	}else if(data[i][7]=='2')
//	{
//		data[i][7]='未通过';
//	}
//}
//
//cVei.initGrid('systemuserInfor', null, {
//	'caption': "user",
//	'colNames': ['机构名称', '姓名', '用户名','用户id','身份证号','所在单位','工作状态','审核状态','操作'],
//	'widths': ['50%', '50%', '50%','50%','50%','50%','50%','50%'],
//	shrinkToFit: true,
//	//multiselect:false,
//				'formatters': {
//					8: function(cellvalue, options, rowObject) {
//						//return "<a onclick=\'check(\"" + options.rowId + "\")\' style=\'color: blue \'>" + '查看 ' + "</a>"+"<a onclick=\'editsystem(\"" + options.rowId + "\")\' style=\'color: blue \'>" + '编辑 ' + "</a>";
//						return "<a onclick=\'check(\"" + options.rowId + "\")\' style=\'color: blue \'>" + '查看 ' + "</a>";
//					}
//				}
//});
// var divID='systemuserInfor';
//
// cVei.injectGrid(divID,{
//			gData: retDataObj[cVe.cEioVeDataId],
//			records: 1003,
//			total: 12,
//			page:1
//			});
//}
//
//
//
//
//
//function reqGetPersonalUserDbRecsToVegrid()
//{
// 
// var data=(window['systemuserInfor'].extDataById(1));//默认获取第一行数据，下标从1开始
// var sendData ="{\"userid\": \"" +data[3]+"\"}";//调用用户自己的数据提取函数
// cVe.setConn(cServerUri,"POST", false, sendData);
//}
//
//
//function resGetPersonalUserDbRecsToVegrid()
//{
// var retData =cVe.XHR.responseText;
// var retDataObj=eval("("+retData+")");	
// var data=retDataObj[cVe.cEioVeDataId];
// if(data==''){
//		alert("没有查询到相关数据");
//	}
// for (var i=0;i<data.length;i++)
// {
//	 if(data[i][7]=='0')
//		{
//			data[i][7]='未审核';
//		}else if(data[i][7]=='1')
//		{
//			data[i][7]='通过';
//		}else if(data[i][7]=='2')
//		{
//			data[i][7]='未通过';
//		}
// }
// cVei.initGrid('personalInfor', null, {
//		'caption': "个人信息",
//		'colNames': ['身份证号码', '姓名', '岗位ID','岗位名称','审核状态'],
//		'widths': ['50%', '50%', '50%','50%','50%'],
//		shrinkToFit: true,
//		
//	});
// 
// var divID='personalInfor';
// cVei.injectGrid(divID,{
//			gData: retDataObj[cVe.cEioVeDataId],
//			records: 1003,
//			total: 12,
//			page:1
//			});
//}
//
//function reqGetDynamicRecsToVegrid()
//{	
// 
// 
// var data=(window['systemuserInfor'].extDataById(selectedRowId));
// var sendData ="{\"userid\": \"" +data[3]+"\"}";
// //var sendData =cGetMsgHead+"&"+userid;//调用用户自己的数据提取函数
// cVe.setConn(cServerUri,"POST", false, sendData);
//}
//
//
//function resGetDynamicRecsToVegrid()
//{
// var retData =cVe.XHR.responseText;
// var retDataObj=eval("("+retData+")");	
// var data=retDataObj[cVe.cEioVeDataId];
// if(data==''){
//		alert("没有查询到相关数据");
//	}
// for (var i=0;i<data.length;i++)
// {
//	 if(data[i][7]=='0')
//		{
//			data[i][7]='未审核';
//		}else if(data[i][7]=='1')
//		{
//			data[i][7]='通过';
//		}else if(data[i][7]=='2')
//		{
//			data[i][7]='未通过';
//		}
// }
// cVei.initGrid('personalInfor', null, {
//		'caption': "个人信息",
//		'colNames': ['身份证号码', '姓名', '岗位ID','岗位名称','审核状态'],
//		'widths': ['50%', '50%', '50%','50%','50%',],
//		shrinkToFit: true,
//		
//	});
//
// var divID='personalInfor';
//
// cVei.injectGrid(divID,{
//			gData: retDataObj[cVe.cEioVeDataId],
//			records: 1003,
//			total: 12,
//			page:1
//			});
//}
//
//
//
//
//
//
///////////////普通用户
//function loadCommonUser()
//{
//	hasPermission();
//	var retData =cVeUti.Cookie.getCookie('VeMsgMap');
//	var retDataObj=eval("("+retData+")");	
//	cMsgConfigure = retDataObj[cVe.cEioVeDataId].GetMsgMap;
//	cVe.startReqByMsgMap(cVeName,'MsgUserInfor','MsgGetCommonUserRecsToVeGrid',cMsgConfigure);
//	
//}
//
//function reqGetCommonUserRecsToVegrid()
//{	
//// var cGetMsgHead = cVeNameId+"="+cVeName+"&"+ cMsgTypeId+"="+cVe.msgType+"&"+cMsgNameId+"="+cVe.msgName;
//	
// var sendData ="{\"MsgUserName\": \"" + getUser()+"\"}";//调用用户自己的数据提取函数
// cVe.setConn(cServerUri,"POST", false, sendData);
//}
//
//
//function resGetCommonUserRecsToVegrid()
//{
//
// var retData =cVe.XHR.responseText;
// var retDataObj=eval("("+retData+")");	
//
//var data=retDataObj[cVe.cEioVeDataId];
////alert("返回data"+data);
//if(data==''){
//	alert("没有查询到相关数据");
//}
//for (var i=0;i<data.length;i++)
//{
//	if(data[i][8]=='0')
//	{
//		data[i][8]='未审核';
//	}else if(data[i][8]=='1')
//	{
//		data[i][8]='通过';
//	}else if(data[i][8]=='2')
//	{
//		data[i][8]='未通过';
//	}
//}
//
//cVei.initGrid('userInfor', null, {
//	'caption': "user",
//	'colNames': ['所属机构名称', '姓名', '用户名','用户id','身份证号','性别','通讯地址','联系方式','审核状态'],
//	'widths': ['50%', '50%', '50%','50%','50%','50%','50%','50%','50%'],
//	shrinkToFit: true,
//	//multiselect:false,
////				'formatters': {
////					9: function(cellvalue, options, rowObject) {
////						return "<a onclick=\'editcommon(\"" + options.rowId + "\")\' style=\'color: blue \'>" + '编辑 ' + "</a>";
////					}
////				}
//});
// var divID='userInfor';
//
// cVei.injectGrid(divID,{
//			gData: retDataObj[cVe.cEioVeDataId],
//			records: 1003,
//			total: 12,
//			page:1
//			});
//}



























