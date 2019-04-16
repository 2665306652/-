
var config = {
    boxCls: '.randomData',
   // col: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
   col: [0, 1, 2, 3, 4, 5],
    randomData: [
        { "img": "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1545990457&di=7febe336f729e2672e8473ab15f663c5&src=http://up.qqjia.com/z/06/tu7450_5.jpg", "title": "必须的", "name": '鹿树苗' },
        { "img": "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1545990457&di=7febe336f729e2672e8473ab15f663c5&src=http://up.qqjia.com/z/06/tu7450_5.jpg", "title": "恭喜发财，大奖拿来！", "name": '李四' },
        { "img": "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1545990457&di=7febe336f729e2672e8473ab15f663c5&src=http://up.qqjia.com/z/06/tu7450_5.jpg", "title": "^(oo)^猪年大吉", "name": '王五' },
        { "img": "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1545990457&di=7febe336f729e2672e8473ab15f663c5&src=http://up.qqjia.com/z/06/tu7450_5.jpg", "title": "谁是全场最靓的仔", "name": '赵六' },
        { "img": "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1545990457&di=7febe336f729e2672e8473ab15f663c5&src=http://up.qqjia.com/z/06/tu7450_5.jpg", "title": "全速再创辉煌，前景无限", "name": '小花' },
        { "img": "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1545990457&di=7febe336f729e2672e8473ab15f663c5&src=http://up.qqjia.com/z/06/tu7450_5.jpg", "title": "好嗨哦,感觉人生已经到达了高潮", "name": '小草' },
        { "img": "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1545990457&di=7febe336f729e2672e8473ab15f663c5&src=http://up.qqjia.com/z/06/tu7450_5.jpg", "title": "来来，飞机游艇走一波~", "name": '小树苗' },
        { "img": "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1545990457&di=7febe336f729e2672e8473ab15f663c5&src=http://up.qqjia.com/z/06/tu7450_5.jpg", "title": "我搬着板凳来围观了", "name": '西西' }
    ]
}
let timer = null;
var newConfig={
    boxCls: '.newData',
    ConfigColor: ['#0ac219', '#eb1e04', '#fbbc00', '#0d0de5', '#e40edd', '#fabb00'],
    col: [0],
    randomData: [ { "img": "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1545990457&di=7febe336f729e2672e8473ab15f663c5&src=http://up.qqjia.com/z/06/tu7450_5.jpg", "title": "必须的", "name": '鹿树苗' },] 
}
function start() {
    config.col.forEach((i, item) => {
        setTimeout(function () {
            itemAnimte(i)
        }, i * 200)
    })
   
    setTimeout(function () {
        now(0)
    },  1000)
}
function method() {
    // var color = "#";
    // for (var i = 0; i < 6; i++) {
    //     color += (Math.random() * 16 | 0).toString(16);
    // }
    // return color;
    let ItemIndex = Math.floor(Math.random() * newConfig.ConfigColor.length);
    return newConfig.ConfigColor[ItemIndex]
}

function hexToRgba(hex, opacity) { 
    return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")"; 
    }
function itemAnimte(index) {
    let ItemIndex = Math.floor(Math.random() * config.randomData.length);//随机获取一条数据
    let randomItem = config.randomData[ItemIndex]
    let randomCol = index !== ' ' ? index : Math.floor(Math.random() * config.col.length);//随机获取一条数据
    let colCls = $(config.boxCls).find('.col');
    let customClass = 'col-' + new Date().getTime();
    let HTML = '<div data-index="' + randomCol + '" class="col-item ' + customClass + '"><div class="RandomDiv" style="border-color:' + method() + '"><img src="' + randomItem.img + '"/></div><span>' + randomItem.name + ':' + '</span><span>' + randomItem.title + '</span></div>';


    colCls.eq(randomCol).append(HTML);


    let customCls = $("." + customClass);

    customCls.css({
        width: customCls.width()+10,
        left: customCls.width() + window.screen.width + 'px',
        visibility: 'visible',
    })
    customCls.stop().animate({
        // left: -customCls.width()
        left: -600
    }, {
            easing: 'linear',
            duration: 25000,
            step: function (e, d, f) {
                let current = $(this);
                // let index = $('.col-item').index(current);
                let index = current.attr('data-index')
                let randomWidth = Math.floor(Math.random() * 10);
                // let diff = customCls.width() + randomWidth;
                let diff = customCls.width()/4;
                let isRender = current.attr('render');
                if (!isRender && window.screen.width - e > diff) {
                    itemAnimte(index);
                    current.attr('render', true);
                }

            },
            complete: function () {
                $(this).remove();
            }
        })
}

function now(index) {
    clearTimeout(timer);
    if(newConfig.randomData.length!=0){
        let ItemIndex = Math.floor(Math.random() * newConfig.randomData.length);//随机获取一条数据
        let randomItem = newConfig.randomData[ItemIndex]
        let randomCol = 0//随机获取一条数据
        let colCls = $(newConfig.boxCls).find('.rand');
        let customClass = 'rand-' + new Date().getTime();
        let randomColor= method();
        let randomColorOpactive=  hexToRgba(randomColor,0.4)
        let HTML = '<div data-index="' + randomCol + '" class="col-item ' + customClass + '" ><div class="RandomDiv" style="border-color:' + randomColor + '"><img src="' + randomItem.img + '"/></div><div style="background-color:'+randomColorOpactive+'" class="randomTxt"><span>' + randomItem.name + '</span><span>' + '签到啦' + '</span></div></div>';
        colCls.eq(randomCol).append(HTML);
    
    
        let customCls = $("." + customClass);
    
        customCls.css({
            width: customCls.width()+30,
            left: customCls.width() + window.screen.width + 'px',
            visibility: 'visible'
    
        })
        customCls.stop().animate({
            // left: -customCls.width()
            left: -600
        }, {
                easing: 'linear',
                duration: 25000,
                step: function (e, d, f) {
                    let current = $(this);
                    // let index = $('.col-item').index(current);
                    let index = current.attr('data-index')
                    let randomWidth = Math.floor(Math.random() * 10);
                    // let diff = customCls.width() + randomWidth;
                    let diff = 60 + randomWidth;
                    let isRender = current.attr('render');
                    if (!isRender && window.screen.width - e > diff) {
                        now(index);
                        current.attr('render', true);
                    }
    
    
                },
                complete: function () {
                    if(newConfig.randomData.length===0){
                        null
                        // console.log("no")
                    }else {
                        $(this).remove();
                        var deletData=newConfig.randomData.splice(0,1)
                        config.randomData.push(deletData[0])
                    }
                }
            })
    }else {
        // console.log('么有人登录')
        
          timer = setTimeout(() => {
            now(0);
         },1000);
    }

}

start()
function randomData(){
    // RandomIndex = 1
    // for(i=0;i<RandomIndex;i++){
    //     // let RandomitemData=i
    //     // console.log(i)
    //        let RandomitemData= { "img": "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1545990457&di=7febe336f729e2672e8473ab15f663c5&src=http://up.qqjia.com/z/06/tu7450_5.jpg", "title": "必须的", "name": '鹿树苗' }
    //         newConfig.randomData.push(RandomitemData)
    //         console.log(RandomitemData)

    // }
    let RandomitemData= { "img": "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1545990457&di=7febe336f729e2672e8473ab15f663c5&src=http://up.qqjia.com/z/06/tu7450_5.jpg", "title": "我是张全速", "name": '张全速' }
    newConfig.randomData.push(RandomitemData)
}



window.onload=function(){
    setInterval(() => {
        randomData()
  }, 2000);

} 