var mapObj;
var marker = new Array();
var windowsArr = new Array();
//中心点坐标
var cpoint = new AMap.LngLat(115.868510,28.743040);
function mapInit() {
    mapObj = new AMap.Map("iCenter", {
         view: new AMap.View2D({
        center:new AMap.LngLat(115.868510,28.743040),//地图中心点
        zoom:13 //地图显示的缩放级别
        })
    });
     mapObj.plugin(["AMap.MapType"], function() {
        var type = new AMap.MapType({defaultType:0});//初始状态使用2D地图
        mapObj.addControl(type);
    });
    var cmarker = new AMap.Marker({
        icon:new AMap.Icon({
            image:"http://developer.amap.com/wp-content/uploads/2014/06/mark.png",
            size:new AMap.Size(20, 30),
            imageOffset:new AMap.Pixel(-32, 0)
        }),
        position:cpoint,
        offset : {
                x : -10,
                y : -30
        },
        map:mapObj
    });
}
//地点查询函数
function placeSearch() {
    var MSearch;
    //加载服务插件，实例化地点查询类
    var keyword = document.getElementById("keyword").value;
    mapObj.plugin(["AMap.PlaceSearch"], function() {
        MSearch = new AMap.PlaceSearch({
            city: "南昌"
        });
        //查询成功时的回调函数
        AMap.event.addListener(MSearch, "complete", placeSearch_CallBack);
        //周边搜索
        MSearch.searchNearBy(keyword, cpoint, 2000);
    });
}



//查询结果的marker和infowindow
function addmarker(i, d) {
    var lngX = d.location.getLng();
    var latY = d.location.getLat();
    var markerOption = {
        map:mapObj,
        icon:"http://webapi.amap.com/images/" + (i + 1) + ".png",
        position:new AMap.LngLat(lngX, latY),
        topWhenClick:true
    };
    var mar = new AMap.Marker(markerOption);
    marker.push(new AMap.LngLat(lngX, latY));

    var infoWindow = new AMap.InfoWindow({
        content:"<h3><font color=\"#00a6ac\">  " + (i + 1) + "." + d.name + "</h3></font>" + TipContents(d.type, d.address, d.tel),
        size:new AMap.Size(300, 0),
        autoMove:true,
        offset:{x:0, y:-20}
    });
    windowsArr.push(infoWindow);

    var aa = function (e) {infoWindow.open(mapObj, mar.getPosition());};
    AMap.event.addListener(mar, "click", aa);
}
//回调函数
function placeSearch_CallBack(data) {
    var resultStr = "";
    var poiArr = data.poiList.pois;
    var resultCount = data.poiList.pois.length;
    for (var i = 0; i < data.poiList.pois.length; i++) {
        resultStr += "<div id='divid" + (i + 1) + "' onmouseover='openMarkerTipById1(" + i + ",this)' onmouseout='onmouseout_MarkerStyle(" + (i + 1) + ",this)' style=\"font-size: 12px;cursor:pointer;padding:0px 0 4px 2px; border-bottom:1px solid #C1FFC1;\"><table><tr><td><img src=\"http://webapi.amap.com/images/" + (i + 1) + ".png\"></td>" + "<td><h3><font color=\"#00a6ac\">名称: " + poiArr[i].name + "</font></h3>";
        resultStr += TipContents(poiArr[i].type, poiArr[i].address, poiArr[i].tel) + "</td></tr></table></div>";
        addmarker(i, poiArr[i]);
    }
    mapObj.setFitView();
    document.getElementById("result").innerHTML = resultStr;
}
function TipContents(type, address, tel) {  //信息窗体内容
    if (type == "" || type == "undefined" || type == null || type == " undefined" || typeof type == "undefined") {
        type = "暂无";
    }
    if (address == "" || address == "undefined" || address == null || address == " undefined" || typeof address == "undefined") {
        address = "暂无";
    }
    if (tel == "" || tel == "undefined" || tel == null || tel == " undefined" || typeof address == "tel") {
        tel = "暂无";
    }
    var str = "  地址：" + address + "<br />  电话: " + tel + " <br />  类型：" + type;
    return str;
}
//根据数组id打开搜索结果点tip
function openMarkerTipById1(pointid, thiss) {
    thiss.style.background = '#CAE1FF';
    windowsArr[pointid].open(mapObj, marker[pointid]);
}
//鼠标移开后点样式恢复
function onmouseout_MarkerStyle(pointid, thiss) {
    thiss.style.background = "";
}
