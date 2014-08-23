// 百度地图API功能
var map = new BMap.Map("l-map");            // 创建Map实例
map.centerAndZoom(new BMap.Point(115.8744,28.749117), 12);
var cr = new BMap.CopyrightControl({anchor: BMAP_ANCHOR_TOP_RIGHT});   //设置版权控件位置
map.addControl(cr); //添加版权控件

var bs = map.getBounds();   //返回地图可视区域
cr.addCopyright({id: 1, content: "<a href='http://www.ecjtu.net' style='font-size:20px;background:yellow'>交大日新</a>", bounds: bs});    //Copyright(id,content,bounds)类作为CopyrightControl.addCopyright()方法的参数

function searchKeyword() {
    var sar = document.getElementById("sar").value;
    var end = document.getElementById("end").value;
    var transit = new BMap.TransitRoute(map, {
        renderOptions: {map: map, panel: "r-result"}
    });
    transit.search(sar,end);
}