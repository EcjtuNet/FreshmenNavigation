var init = function() {
    // 创建街景
    var pano = new qq.maps.Panorama(document.getElementById('pano_holder'), {
        pano: '21011014130406143159500',
        disableMove: false,
        disableFullScreen: false,
        zoom:1,
        pov:{
            heading:20,
            pitch:15
        }
    });
    document.getElementById('pano_holder').style.width = "100%";
    document.getElementById('pano_holder').style.height = "360px";
}