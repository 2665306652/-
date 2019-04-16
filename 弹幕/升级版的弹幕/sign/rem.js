!(function(doc, win) {
    var docEle = doc.documentElement,
        evt = "onorientationchange" in window ? "orientationchange" : "resize",
        fn = function() {
            var width = docEle.clientWidth;
            width = width < 320 ? 320 : width;
            width = width > 750 ? 750 : width;
            width && (docEle.style.fontSize = 100 * (width / 750) + "px");
        };
     
    win.addEventListener(evt, fn, false);
    doc.addEventListener("DOMContentLoaded", fn, false);
 
}(document, window));
             
               // px除100