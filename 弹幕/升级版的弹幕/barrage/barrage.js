Array.prototype._unique = function (ds) {
    let item = this;
    let result = {};
    let finalResult = [];
    for (let i = 0; i < item.length; i++) {
        result[item[i].code] = item[i];
    }

    for (let item in result) {
        finalResult.push(result[item]);
    }
    return finalResult;
}
Array.prototype._diff = function (arr) {
    //return this.filter(function(i) {return a.indexOf(i) < 0;});
    var new_tmp = new Array();
    var item = this;
    var a = item.length > arr.length ? item : arr;
    var b = item.length > arr.length ? arr : item;

    for (var i = 0; i < a.length; i++) {
        var flag = true;
        for (var j = 0; j < b.length; j++) {
            if (a[i].code == b[j].code) {
                flag = false;
            }
        }
        if (flag) {
            new_tmp.push(a[i]);
        }
    }
    return new_tmp;
};

var config = {
    boxCls: '.randomData',
    col: [0, 1, 2, 3, 4, 5],
    randomData: [],
    randomCode: []

}

let timer;
var newConfig = {
    boxCls: '.newData',
    ConfigColor: ['#0ac219', '#eb1e04', '#fbbc00', '#0d0de5', '#e40edd', '#fabb00'],
    col: [0],
    randomData: [],
    randomCode: [],
    run : false
}

function start() {
    var videoCls = document.getElementsByTagName('video');
    setTimeout(() => {
        videoCls[0].play();
    }, 2000)
    // config.col.forEach((i, item) => {
    //     setTimeout(function () {
    //         itemAnimte(i)
    //     }, i * 200)
    // })

    setTimeout(function () {
        now(0)
    }, 1000)
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


function itemAnimte(index, dataIndex) {
    if (!config.randomData.length) {
        return false;
    }
    let ItemIndex = dataIndex != undefined ? dataIndex : Math.floor(Math.random() * config.randomData.length); //随机获取一条数据
    let randomItem =  config.randomData.length < 20 || dataIndex != undefined ? config.randomData[ItemIndex] : getRandomItem() 
    let randomCol = index != undefined ? index : Math.floor(Math.random() * config.col.length); //随机获取一条通道
    let colCls = $(config.boxCls).find('.col');
    let customClass = 'col-' + new Date().getTime();
    let HTML = '<div data-index="' + randomCol + '" class="col-item ' + customClass + '"><div class="RandomDiv" style="border-color:' + method() + '"><img src="http://192.168.3.213/lottery/public/static/files/' + randomItem.avatar + '"/></div><span>' + randomItem.username + '<span style="display:inline-block;padding:0px 8px 0 2px">:</span>' + '</span><span>' + randomItem.wishes + '</span></div>';

    colCls.eq(randomCol).append(HTML);

    if(config.randomData.length > 20 ){
        config.randomCode.push(randomItem.code);
    }

    let customCls = $("." + customClass);

    customCls.css({
        width: customCls.width() + 10,
        left: customCls.width() + 1280,
        visibility: 'visible',
    })
    customCls.stop().animate({
        left: -customCls.width()
    }, {
        easing: 'linear',
        duration: 25000,
        step: function (e, d, f) {

            let current = $(this);
            // let index = $('.col-item').index(current);
            let index = current.attr('data-index')
            let randomWidth = Math.floor(Math.random() * 10);
            // let diff = customCls.width() + randomWidth;
            let diff = customCls.width() / 2;
            let isRender = current.attr('render');
            if (!isRender && 1280 - e > diff) {
                itemAnimte(index);
                current.attr('render', true);
            }

        },
        complete: function () {
            $(this).remove();
            config.randomCode.splice(ItemIndex, 1)

        }
    })
}

var maxNum = 0;

function getRandomItem(num) {
    if (!num) {
        maxNum = 0
    }
    let index = Math.floor(Math.random() * config.randomData.length)
    let randomItem = config.randomData[index];
    if (config.randomCode.indexOf(randomItem.code) > -1 && config.randomCode.length != config.randomData.length) {
        maxNum++;
        return getRandomItem(maxNum);
    }
    return randomItem;
}

function now(index) {
    clearTimeout(timer);
    var itemCls = $('.newData').find('.col-item');
    var lastChild = itemCls.last();
    var run = false;

    if (lastChild.length) {

        var currentL = lastChild.offset().left;
        var lastW = lastChild.width();
        if ((currentL - lastW) < (1280 - lastW - 50)) {
            run = true;
        }
    } else {
        run = true;
    }


    if (newConfig.randomData.length != 0 ) {


        let randgroundDOMONE = $('.newData').find('.randground');
        let ItemIndex = Math.floor(Math.random() * config.randomData.length);
        let randomItem = newConfig.randomData.shift(0, 1)


        if(!randomItem){
            newConfig.run = false;
            return false;
        }else{
            newConfig.run = true;

        }


        // let randomItem = newConfig.randomData.splice(0, 1)[0]
        let randomCol = 0 //随机获取一条数据
        let colCls = $(newConfig.boxCls).find('.rand');
        let customClass = 'rand-' + new Date().getTime();
        let randomColor = method();
        let randomColorOpactive = hexToRgba(randomColor, 0.6)
        //    判断接收长
        //  if(randomItem.username.length)
        let deletdLenght = randomItem.username.length
        let HTML
        if (deletdLenght < 4) {
            HTML = '<div data-index="' + randomCol + '" class="col-item ' + customClass + '" ><div class="RandomDiv" style="border-color:' + randomColor + '"><img src="http://192.168.3.213/lottery/public/static/files/' + randomItem.avatar + '"/></div><div style="background-color:' + randomColorOpactive + '" class="randomTxt"><span>' + randomItem.username + '</span><span>' + '签到啦' + '</span></div></div>';

        } else {
            HTML = '<div data-index="' + randomCol + '" class="col-item ' + customClass + '" id="especially"><div class="RandomDiv" style="border-color:' + randomColor + '"><img src="http://192.168.3.213/lottery/public/static/files/' + randomItem.avatar + '"/></div><div style="background-color:' + randomColorOpactive + '" class="randomTxt"><span class="especially-font">' + randomItem.username + '</span><span class="especially-font">' + '签到啦' + '</span></div></div>';
        }
        colCls.eq(randomCol).append(HTML);

        // config.randomData.push(randomItem);

        let customCls = $("." + customClass);
        customCls.css({
            width: customCls.width() + 30,
            left: customCls.width() + 1280,
            visibility: 'visible'

        })

        let deleteDom = $('.rand div:eq(0)').css('left');
        let deleteDomLeft = deleteDom.split('p')[0] - 0

        if (deleteDomLeft < 1270) {
            randgroundDOMONE.css({
                "display": 'none'
            })
        }
        customCls.stop().animate({
            left: -customCls.width()
        }, {
            easing: 'linear',
            duration: 25000,
            step: function (e, d, f) {
                let current = $(this);
                let index = current.attr('data-index')
                let randomWidth = Math.floor(Math.random() * 10);
                let diff = customCls.width() + randomWidth;
                // let diff = 60 + randomWidth;
                let isRender = current.attr('render');
                if (!isRender && 1280 - e > diff) {
                    now(index);
                    current.attr('render', true);
                }


            },
            complete: function () {
                $(this).remove();

                if (newConfig.randomData.length === 0) {
                    null
                } else {
                    // config.randomData.push(randomItem);
                }
            }
        })
    } else {
        // console.log('么有人登录')沒人登陸
        // timer = setTimeout(() => {
        //     now(0);
        // }, 1000);

        fullspeed()
    }


}

function fullspeed() {
    let randgroundDOM = $('.newData').find('.randground');
    let randDom = $('.rand').find('.col-item').length;
    if (randDom < 1) {
        randgroundDOM.css({
            "display": 'block'
        })
    } else {
        randgroundDOM.css({
            "display": 'none'
        })
    }
}


var isRandomStart = false;

function getList() {

    $.ajax({
        url: 'http://192.168.3.213/lottery/public/getsignlist',
        type: 'post',
        success: function (res) {
            var newArr = config.randomData._diff(res.data.list);
            newArr = newConfig.randomData._diff(newArr);
            newConfig.randomData = newArr.slice(0);
            config.randomData = res.data.list;
            // now();
            if(!newConfig.run){
                now()
            }


            if (!isRandomStart) { //普通弹幕
                randomStart();
                isRandomStart = true;
            }
        }
    })
}

function randomStart() {
    if (!config.randomData.length) {
        setTimeout(function () {
            randomStart();
        }, 1000)
    } else {
        if (config.randomData.length < 7) {
            config.randomData.forEach((item, i) => {
                let colCls = $('.randomData').find('.col-item');
                if (!colCls[i]) {
                    itemAnimte(i, i);
                }
            })
            setTimeout(function () {
                randomStart();
            }, 1000)
        }else{
            $('.randomData').find('.col').each((i,item)=>{
                itemAnimte(i, i);
            })
        }
    }
}


window.onload = function () {
    start()

    setInterval(() => {
        getList()
    }, 1000)
}