
Array.prototype._uniq = function () {
    var arr = this;
    if (arr.length > 1) {
        for (var i = 0; i < arr.length - 1; i++) {
            for (var j = i + 1; j < arr.length; j++) {
                if (arr[i] == arr[j]) {
                    arr.splice(j, 1); //console.log(arr[j]);
                    j--;
                }
            }
        }
    }

    return arr;
}
Array.prototype._remove = function(item) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == item) {
            this.splice(i, 1)
        }
    }
}
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
var dugIndex = 0;
var barrage = function (config) {
    let _self = this;
    _self.config = Object.assign({}, barrage.config, config);
    _self.init();

}
barrage.config = {
    currentBoxCls: '.newData',
    currentData: [],
    currentTimer: null,
    currentDel : [],
    randomData: [],
    randomCode: [],
    randomBoxCls: '.randomData',
    initStatus: false,
    randomColor: ['#0ac219', '#eb1e04', '#fbbc00', '#0d0de5', '#e40edd', '#fabb00'],
    getListUrl : 'http://192.168.3.213/lottery/public/getsignlist',
    getPhotoUrl : 'http://192.168.3.213/lottery/public/static/files/'
}
barrage.prototype = {
    init() {
        let _self = this;
        _self.config.randomBoxCls = $(_self.config.randomBoxCls);
        _self.config.currentBoxCls = $(_self.config.currentBoxCls);
        _self._getList(function (param) {
            console.log('callback')

            _self._dataHander();
            _self._currentAnimate();

        })
    },
    _getList(callback) {
        let _self = this;
        $.ajax({
            url: _self.config.getListUrl,
            type: 'post',
            success: function (res) {
                var newArr = _self.config.currentDel._diff(res.data.list);
                newArr =  _self.config.currentData.concat(newArr);
                newArr = newArr._unique();
                // var newArr = _self.config.currentData._diff(newArr);
                _self.config.currentData = newArr.slice(0);
                _self.config.randomData = res.data.list;
                callback && callback();
            }
        })
    },
    _dataHander() {
        let _self = this;

        if (_self.config.randomData.length &&  _self.config.randomData.length < 7 && !_self.config.initStatus) {
            _self.config.initStatus = true;
            _self.config.randomData.forEach((item, i) => {
                let colCls = _self.config.randomBoxCls.find('.col-item');
                if (!colCls[i]) {
                    _self._itemAnimte(i, i);
                }
            })
        } else if (_self.config.randomData.length > 7 && !_self.config.initStatus) {
            _self.config.initStatus = true;
            _self.config.randomBoxCls.find('.col').each((i, item) => {
                _self._itemAnimte(i, i);
            })
        }

        setTimeout(() => {
            _self._getList(() => {
                // _self._curentRender();
                _self._dataHander();
            });
        }, 2000)




    },
    _curentRender() {
        let _self = this;
        _self.config.currentData.forEach((item, i) => {
            console.log(item, i)
        })
    },
    _currentAnimate() {
        let _self = this;
        clearTimeout(_self.config.currentTimer)
        if (!_self.config.currentData.length) {
            _self.config.currentTimer = setTimeout(() => {
                _self._currentAnimate();
            }, 1000)
            return false;
        }



        let colCls = _self.config.currentBoxCls.find('.rand');
        let customClass = 'rand-' + new Date().getTime();
        let currentItem = _self.config.currentData.shift();
        let usernameCls = currentItem.username.length > 4 ? 'long-name' : '';
        let randomColor = _self.config.randomColor[_self._getRandom(6)];
        let randomColorOpactive = _self._hexToRgba(randomColor, 0.6)
        HTML = '<div class="col-item ' + customClass + ' ' + usernameCls + '" ><div class="RandomDiv" style="border-color:' + randomColor + '"><img src="'+_self.config.getPhotoUrl + currentItem.avatar + '"/></div><div style="background-color:' + randomColorOpactive + '" class="randomTxt"><span>' + currentItem.username + '</span><span>' + '签到啦' + '</span></div></div>';

        colCls.append(HTML);

        let customCls = $("." + customClass);
        // console.log(customCls.width())
        dugIndex++
        console.log("_currentAnimate",currentItem,dugIndex)
        customCls.css({
            width: customCls.width() + 30,
            backgroundPosition: 1280,
            visibility: 'visible',
            // 'transform' : "translateX("+ (parseInt(customCls.width()) + 30)+"px)"
            // 'transform': "translateX(1280px)"

        })
        _self.config.currentDel.push(currentItem)



        // return false;
        // _self.config.currentBoxCls.find('.randground').hide();

        customCls.stop().animate({
            backgroundPosition: -customCls.width()
        }, {
            easing: 'linear',
            duration: 5000,
            step: function (e, d, f) {
                // console.log(e,d,f)
                let current = $(this);
                // let index = current.attr('data-index')
                let diff = customCls.width();
                let isRender = current.attr('render');
                 current.css({
                     'transform': "translate(" + e + "px,0)"
                 })
                // console.log(e,1280-e)
                if (!isRender && 1280 - e > diff) {
                    _self._currentAnimate();
                    current.attr('render', true);
                }


            },
            complete: function () {
                // $(this).remove();
                // $(this).stop()
                _self._currentEnd()
            }
        })
    },
    _currentEnd() {
        let _self = this;
        let lastChild = _self.config.currentBoxCls.find('.col-item').last();
        let lastLeft = parseInt(lastChild.css('backgroundPosition'),10);

        // console.log(lastLeft)

        if(lastLeft == -280){
            _self._currentAnimate();
            // _self.config.currentBoxCls.find('.randground').show();
        }
        
        // if (!lastChild.length) {
        //     _self._currentAnimate();
        //     _self.config.currentBoxCls.find('.randground').show();
        // }



    },
    _itemAnimte(index, dataIndex) {
        let _self = this;
        let currentItem = dataIndex != undefined ? _self.config.randomData[dataIndex] : _self._getRandomItem(); //随机获取一条数据
        let colIndex = index != undefined ? index : _self._getRandom(7); //随机获取一条通道
        let colCls = _self.config.randomBoxCls.find('.col');
        let customClass = 'col-' + new Date().getTime();
        let HTML = '<div data-index="' + colIndex + '" class="col-item ' + customClass + '"><div class="RandomDiv" style="border-color:' + _self.config.randomColor[_self._getRandom(6)] + '"><img src="'+_self.config.getPhotoUrl + currentItem.avatar + '"/></div><span>' + currentItem.username + '<span style="display:inline-block;padding:0px 8px 0 2px">:</span>' + '</span><span>' + currentItem.wishes + '</span></div>';
        colCls.eq(colIndex).append(HTML);
        _self.config.randomCode.push(currentItem.code);


        // console.log(index,dataIndex,currentItem)

        let customCls = $("." + customClass);

        customCls.css({
            width: customCls.width() + 10,
            backgroundPosition: 1280,
            visibility: 'visible',
            'transform': "translateX(1280px)"
        });


        customCls.stop().animate({
            backgroundPosition: -customCls.width()
        }, {
            easing: 'linear',
            duration: 25000,
            step: function (e, d, f) {
                let current = $(this);
                let index = current.attr('data-index')
                let randomWidth = Math.floor(Math.random() * 10);
                let diff = customCls.width() + 100;
                let isRender = current.attr('render');
                current.css({
                    'transform': "translateX(" + e + "px)"
                })
                if (!isRender && 1280 - e > diff) {
                    _self._itemAnimte(index);
                    current.attr('render', true);
                }

            },
            complete: function () {
                $(this).remove();
                _self.config.randomCode._remove(currentItem.code)

            }
        })
        // console.log(currentItem);
    },
    _getRandomItem() {
        let _self = this;
        let index = _self._getRandom(_self.config.randomData.length);
        let randomItem = _self.config.randomData[index];

        if (_self.config.randomData.length < 20) {
            return randomItem;
        } else {
            _self.config.randomCode = _self.config.randomCode._uniq();
            if (_self.config.randomCode.indexOf(randomItem.code) > -1) {
                return _self._getRandomItem();
            }else{
                return randomItem;
            }
            
        }
    },
    _getRandomCol(index) {
        let _self = this;
        if (index != undefined) {
            return index;
        } else {

        }
    },
    _getRandom(max) {
        return Math.floor(Math.random() * max)
    },
    _hexToRgba(hex, opacity) {
        return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")";
    },
    _randomStart() {

    },
}
new barrage()

// window.onload = function (param) {
//     var videoCls = document.getElementById('myvideo');
//     videoCls.oncanplaythrough = function (param) {
//         console.log(videoCls);
//         // videoCls.play();
//         new barrage()

//     }

// }
