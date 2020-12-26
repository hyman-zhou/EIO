document.write('<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>');
(function (){
    window["EIO"] = {} //?
    /*****************客户端消息收发器*******************/
    function JsVeMsgDispatcher(){
        var father = this; //this 代表window
        this.baseServerUri;
        this.serverUri; //在window对象中声明成员变量
        this.isAsync=true;
        this.method="POST";
        this.respFunc;
        this.sendData;
        this.msgType;
        this.msgName;
        this.XHR;
        this.reqMsgHead;
        this.cEioVeDataId="EIOVEDATA";
        this.cVeNameId="VeName";
        this.cMsgTypeId="VEReqMsgType";
        this.cMsgNameId="VEReqMsgName";

        this.setConn = function (baseServerUri,serverUri,method,isAsync,sendData){
            console.log("从消息处理函数 进入ve的setConn");
            this.baseServerUri = baseServerUri;
            this.serverUri = serverUri;
            this.isAsync = isAsync;
            this.method = method;
            this.sendData =Object.assign({"EIOVEDATA":JSON.parse(sendData)},this.reqMsgHead);
            this.XHR = createXHR({baseServerUri});

        };

        this.sendMsg = function (){
            if(!this.XHR) return 1;
            //if(this.serverUri == null) return 2;

            this.XHR({
                method: this.method,
                url: this.serverUri,
                headers: {"Content-Type":"application/x-www-form-urlencoded"},
                data: JSON.stringify(this.sendData),
                //params: this.reqMsgHead
            }).then(response=>{
                eval(this.respFunc+"(response)") //回调处理函数
            }).catch(error =>{
                console.log(error.message)
            }).finally(()=>{
                //都会执行的
            })
            return 0; //成功返回0
        }

        this.startReqByMsgMap = function (veName,msgType,msgName,msgConfig){
            //消息处理的总入口（通过消息映射表启动消息请求）
            let reqFunc = msgConfig[msgType][msgName].ReqFunc; //获取请求服务端的函数
            let resFunc = msgConfig[msgType][msgName].ResFunc;//获取处理服务端的回复消息的函数
            let msgHandle = msgConfig[msgType][msgName].MsgHandle;//获取信息处理器
            this.startReqByMsgHandle(veName,msgType,msgName,reqFunc, resFunc,msgHandle);
        };

        this.startReqByMsgHandle = function(veName,msgType,msgName,reqFunc, resFunc,msgHandle){
            //消息处理的总入口（不通过消息映射表启动消息请求）
            this.reqMsgHead = getMsgHead(veName,msgType,msgName,msgHandle);//组装消息的参数
            if(resFunc==="") resFunc=null;//不指定相应处理函数
            this.msgType = msgType;
            this.msgName = msgName;
            this.respFunc = resFunc;
            //TODO: 利用axios request interceptors来实现会更好
            eval(reqFunc+"()")//调用具体的消息处理函数，以生成信息数据，设置个性化的通信方式
            this.sendMsg()//发送消息
        }

        function getMsgHead(cVeName,msgType,msgName,msgHandle)
        {//组装VE标准的消息头
            let msgHead = {}
            msgHead[father.cVeNameId]=cVeName;
            msgHead[father.cMsgTypeId]=msgType;
            msgHead[father.cMsgNameId]=msgName;
            msgHead["MsgHandle"]=msgHandle;
            return msgHead
        }

        function createXHR({baseServerUri}){
                return axios.create({
                    baseURL: baseServerUri,
                    timeout: 3000
                })
        }
    }
    window['EIO']['ve']=JsVeMsgDispatcher;
})()