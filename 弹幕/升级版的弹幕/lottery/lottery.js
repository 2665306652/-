Array.prototype.shuffle = function () {
    let m = this.length,
        i;
    while (m) {
        i = (Math.random() * m--) >>> 0;
        [this[m], this[i]] = [this[i], this[m]]
    }
    return this;
}

let drawConfig = {
    getLottery: 'http://192.168.3.213/lottery/public/lotterylist',
    getdrawList: 'http://192.168.3.213/lottery/public/showwinninglist', ///year/public/showwinninglist
    4: {
        "rank": 50,
        "num": 5,
        "list": []
    },
    3: {
        "rank": 40,
        "num": 3,
        "list": []
    },
    2: {
        "rank": 30,
        "num": 2,
        "list": []
    },
    1: {
        "rank": 20,
        "num": 3,
        "list": []
    },
    0: {
        "rank": 10,
        "num": 2,
        "list": []
    }
}
var _index = 0;
var _showIndex = 0;
var currentDrawAnimate = [];
var lottery = function (config) {
    let _self = this;
    _self.config = Object.assign({}, lottery.config, config);
    _self._init();
}
lottery.config = {
    bodyCls: '#J_act_body',
    numberCls: '.j_act_number',
    winningListCls: '.j_winning_number_list',
    winnimgUserCls: '.j_winning_user_list',
    startButtonCls: '.j_anim_button',
    lotteryControlCls: '.j_back_control',
    currentRank: 4,
    numberHeight: null,
    animateIndex: 0,
    currentDrawAnimate: null,
    currentDrawList: [],
    specialTimer: {},
    getPhotoUrl : 'http://192.168.3.213/lottery/public/static/files/'

}
lottery.prototype = {
    _init: function (param) {
        let _self = this;
        _self._prizeChange(_self.config.currentRank);
        _self._getDrawList(function (param) {
            console.log(drawConfig)
            _self.config.numberHeight = $('.item-number')
                .eq(0)
                .height()
            _self._event()
        })

    },
    _event: function (param) {
        let _self = this;
        $(document).on('click', _self.config.startButtonCls, function (param) {
            var _this = $(this);
            if (drawConfig[_self.config.currentRank].num > 0) {
                // $(this).addClass('btn-revolve'); _self._startAnimate();
                $(_self.config.winningListCls).html('')
                $(_self.config.winnimgUserCls).html('')

                // _self._getDrawLuck(drawConfig[_self.config.currentRank].rank)

                if (_self.config.currentRank == 4) {
                    _self._getDrawLuck(drawConfig[_self.config.currentRank].rank)

                    _self._batchAnimate();
                } else if (_self.config.currentRank == 1) {
                    $(this).addClass('btn-end-move'); //总共9秒，7秒挺一个,8秒停一个,9秒停一个
                    _self._specialStart();
                    _self._getDrawLuck(drawConfig[_self.config.currentRank].rank)
                    setTimeout(() => {
                        for (key in _self.config.specialTimer) {
                            console.log(key, _self.config.specialTimer[key])
                            // clearTimeout(_self.config.specialTimer[key]);
                            let item = _self.config.specialTimer[key];
                            item.diff = 500;
                        }
                    }, 2000)
                    setTimeout(() => {
                        for (key in _self.config.specialTimer) {
                            let item = _self.config.specialTimer[key];
                            item.diff = 50;
                        }
                    }, 3000)
                    setTimeout(() => {
                        _self.config.specialTimer[3]['end'] = true;
                    }, 6000)
                    setTimeout(() => {
                        _self.config.specialTimer[2]['end'] = true;
                    }, 7000)
                    setTimeout(() => {
                        _self.config.specialTimer[1]['end'] = true;
                    }, 8000)
                    setTimeout(() => {
                        _self.config.specialTimer[0]['end'] = true;
                        // $(this).removeClass('btn-end-move');
                    }, 9000)
                } else if (_self.config.currentRank == 0) {
                    $(this).addClass('btn-special-start'); //总共9秒，7秒挺一个,8秒停一个,9秒停一个
                    var arr = [1, 2, 3,4];
                    arr = arr.shuffle();
                    var customRandom = function () {
                        return Math.floor(Math.random() * arr.length)
                    }
                    _self._specialStart();
                    _self._getDrawLuck(drawConfig[_self.config.currentRank].rank);

                    // setTimeout(() => {
                    //     var currentIndex = customRandom();
                    //     currentIndex = arr.splice(currentIndex, 1)
                    //     _self.config.specialTimer[currentIndex]['diff'] = 50;
                    // }, 2000)

                    // setTimeout(() => {
                    //     var currentIndex = customRandom();
                    //     currentIndex = arr.splice(currentIndex, 1)
                    //     _self.config.specialTimer[currentIndex]['diff'] = 500;
                    // }, 4000)

                    let _index = 0;
                    arr.forEach((item, i) => {
                        var timer = ((i + 1) * 2000) * 2;
                        _self.config.specialTimer[item-1]['diff'] = 50;
                        setTimeout(() => {
                            _self._specialShow(item-1,_this,function(){
                                _index++;
                                console.log(_index)
                                if(_index < 4){
                                    _this.addClass('btn-special-move');
                                }else{
                                    console.log('全部结束')
                                }
                            });
                        }, timer)
                    })

                    // setTimeout(() => {     for (key in _self.config.specialTimer) {
                    // console.log(key, _self.config.specialTimer[key])         //
                    // clearTimeout(_self.config.specialTimer[key]);         let item =
                    // _self.config.specialTimer[key];         item.diff = 500;     } }, 2000)
                    // setTimeout(() => {     for (key in _self.config.specialTimer) {         let
                    // item = _self.config.specialTimer[key];         item.diff = 50;     } }, 3000)
                    // setTimeout(() => {     _self.config.specialTimer[3]['end'] = true; }, 6000)
                    // setTimeout(() => {     _self.config.specialTimer[2]['end'] = true; }, 7000)
                    // setTimeout(() => {     _self.config.specialTimer[1]['end'] = true; }, 8000)
                    // setTimeout(() => {     _self.config.specialTimer[0]['end'] = true;     //
                    // $(this).removeClass('btn-end-move'); }, 9000)

                } else {
                    _self._getDrawLuck(drawConfig[_self.config.currentRank].rank)

                    _self._startFlash();
                }

            } else {
                _self._sceneReplace();
                alert(_self.config.currentRank + "等奖已经抽取完毕")
            }
        })
        $(document).on('click', _self.config.lotteryControlCls, function (e) {
            let currentTarget = $(e.currentTarget);
            if (!currentTarget.hasClass('active')) {
                currentTarget.addClass('active')
            }
        })
        $(_self.config.lotteryControlCls).on('click', '.j_item_prize', function (e) {
            let currentTarget = $(e.currentTarget);
            currentTarget
                .siblings()
                .removeClass('item-checked');
            currentTarget.addClass("item-checked");
            // _self.config.currentRank = currentTarget.attr('data-index')
            _self._prizeChange(currentTarget.attr('data-index'))
            console.log('当前界面为' + _self.config.currentRank + '等奖抽奖')
        })
        $(_self.config.lotteryControlCls).on('click', '.j_item_close', function (e) {
            e.stopPropagation();
            $(_self.config.lotteryControlCls).removeClass("active");
        })
    },
    /**
     * todo 数字闪现效果-开始
     */
    _startFlash() {
        let _self = this;
        let currentRank = _self.config.currentRank;
        console.log(currentRank)
        let random = Math.floor(Math.random() * 10 + 1);
        $(_self.config.startButtonCls).addClass('btn-ordinary-move');
        $(_self.config.numberCls).each((index, item) => {
            _self._flashAnimate({
                item: $(item),
                index: index,
                timer: 5 * random
            })
        })
    },
    /**
     * todo 数字闪现效果-具体方法
     * @param {*} config
     */
    _flashAnimate(config) {
        let _self = this;
        let random = Math.floor(Math.random() * 9 + 1);
        let isTrue = _self.config.currentDrawAnimate
            ? true
            : false;
        if (isTrue) {
            let currentCode = _self
                .config
                .currentDrawAnimate
                .code
                .toString();
            random = currentCode[config.index];
        }
        config
            .item
            .html(random);
        setTimeout(function (param) {
            if (isTrue) {
                // console.log("*******");
                _self._animateEnd()
            } else {
                _self._flashAnimate(config)

            }
        }, config.timer)
    },
    /**
     * todo 开始滚动动画
     */
    _startAnimate() {
        let _self = this;
        // let listCls = $(_self.config.numberCls).find('ul');
        let currentRank = _self.config.currentRank;
        $(_self.config.numberCls).removeAttr('style');
        $(_self.config.startButtonCls).addClass('btn-revolve')
        $(_self.config.numberCls).each((index, item) => {
            var speed = currentRank == 1 || currentRank == 0
                ? 4000 + index * 3000
                : 4000;
            var _num = $(item);
            var timer = 4000;
            var easing = 'linear';
            if (currentRank == 1 || currentRank == 0) {
                timer = 4000 + index * 3000;
                easing = 'easeInOutCirc';
            }

            _self._itemAnimate({item: _num, number: 10, index: index, timer: timer, easing: easing})
        })

        // setTimeout(function (param) {     _self.config.currentDrawAnimate = '7788' },
        // 4000)

    },
    _itemAnimate(config) {
        let _self = this;
        var animateType = config.easing
            ? config.easing
            : 'linear'
        var timer = config.timer
            ? config.timer
            : '3000';
        console.log('start', config)
        config
            .item
            .stop()
            .animate({
                "top": -_self.config.numberHeight * config.number + "px"
            }, timer, animateType, function () {
                // let currentDrawAnimate = _self.config.currentDrawInfo.code;

                let currentCode = _self
                    .config
                    .currentDrawAnimate
                    .code
                    .toString();
                currentCode = currentCode[0] + currentCode[1] + currentCode[2] + (10 - currentCode[3]); //因为最后一位是9，为了动画的同向，所以最后一位是反的

                if (_self.config.currentDrawAnimate && config.number == currentCode[config.index]) {
                    _self._animateEnd();
                } else {
                    config
                        .item
                        .css('top', '0')
                    config.number = 0;
                    if (_self.config.currentDrawAnimate && currentCode) {
                        // _self.config.currentDrawAnimate[3] = 10 -
                        // parseInt(_self.config.currentDrawAnimate[3], 10);
                        // console.log(_self.config.currentDrawAnimate[3], 1111)

                        config.number = currentCode[config.index];
                    } else {
                        config.number = config.number == 10
                            ? 0
                            : 10;
                    }
                    console.log('again')
                    _self._itemAnimate(config)
                }

            })
    },
    _getDrawLuck(level) {
        let _self = this;
        let currentRank = _self.config.currentRank;

        $.ajax({
            type: 'post',
            url: drawConfig.getLottery,
            data: {
                winninglevel: level
            },
            success: function (data) {
                // data = {     "code": 200,     "data": [         {             "id": 5,
                // "username": "姚佳佳",             "code": 2323,             "avatar":
                // "杭州-人事行政部-姚佳佳.jpg"         }, {             "id": 12,             "username":
                // "沈玉萍",             "code": 2828,             "avatar": "杭州-结算中心-沈玉萍.jpg" }, {
                //             "id": 6,             "username": "郑志宏", "code": 3434, "avatar":
                // "杭州-人事行政部-郑志宏.jpg"         }, {   "id": 10, "username": "崔燕燕", "code": 3636,
                // "avatar": "杭州-财务部-崔燕燕.jpg"      }, { "id": 7, "username": "葛雪枫", "code":
                // 5656,           "avatar": "杭州-人事行政部-葛雪枫.jpg"         } ], "msg": "操作成功!" };
                if (data.code == 200) {
                    drawConfig[currentRank].num--;
                    drawConfig[currentRank].list = drawConfig[currentRank]
                        .list
                        .concat(data.data)
                    var dataArr = [];
                    data
                        .data
                        .forEach(function (data) {
                            dataArr.push(data.code);
                        });
                    var len = dataArr.length;
                    for (var i = 0; i < len; i++) {
                        dataArr[i] += "";
                    }
                    // _self.config.currentDrawInfo = data.data; _self.config.currentDrawList =
                    // dataArr.slice(0);

                    if (_self.config.currentRank == 4) {
                        _self.config.currentDrawList = data.data;
                    } else {
                        setTimeout(function () {
                            _self.config.currentDrawList = data.data;
                            _self.config.currentDrawAnimate = _self
                                .config
                                .currentDrawList
                                .shift();
                        }, 2000)
                    }

                    // console.log(222,_self.config.currentDrawList,_self.config.currentDrawAnimate)
                    // number_anmiate(dataArr, 0);

                } else {
                    _self._sceneReplace();
                    isDraw = true;
                    _showIndex = 0;
                    alert(data.msg)
                }

            }
        })
    },
    _sceneReplace(aa) {
        console.log('_sceneReplace')
        let _self = this;
        $(_self.config.startButtonCls).removeClass('btn-revolve');

    },
    _getDrawList(callback) {
        $.ajax({
            type: 'post',
            url: drawConfig.getdrawList,
            success: function (res) {
                for (var key in drawConfig) {
                    var level = drawConfig[key]['rank'];
                    if (res.data[level]) {
                        drawConfig[key]['list'] = res.data[level]['list'];
                        drawConfig[key]['num'] = res.data[level]['surplus'];
                    }
                }
                callback && callback();

            }
        });
    },
    _animateEnd() {
        let _self = this;
        _self.config.animateIndex++;
        if (_self.config.animateIndex == 4) {

            // if(_self.config.currentRank == 0){
            //     setTimeout(()=>{
            //         _self._numberRender();
            //         _self._userRender();
            //     },2000)
            // }else{
                _self._numberRender();
                _self._userRender(); 
                $(_self.config.startButtonCls).removeClass('btn-ordinary-move btn-end-move')
                _self.config.currentDrawAnimate = null;
                _self.config.animateIndex = 0;
                _showIndex++;
                if (_self.config.currentDrawList.length) {
                    setTimeout(function () {
                        $('.J_list').removeAttr('style')
                        // _self._startAnimate();
                        _self._startFlash();
                        setTimeout(function () {
                            if(_self.config.currentRank != 0){
                                _self.config.currentDrawAnimate = _self
                                .config
                                .currentDrawList
                                .shift()
                            }
                        }, 2000)
                    }, 1000)
                }  else {
                    // $('.j_price_btn').removeClass('btn-revolve');
                    _self._sceneReplace();
                    isDraw = true;
                    _showIndex = 0;
                }
            // }



           
            // _self._sceneReplace();
           
        }
    },
    _numberRender(data) {
        let _self = this;

        data = data
            ? data
            : _self.config.currentDrawAnimate;

        let HTML = '<li class="list-item">' + data.code + '</li>';

        if (_self.config.currentRank == 0 || _self.config.currentRank == 1) {
            var customCls = data.username.length > 3 ? 'short-name' : ''
            HTML = '<li class="list-item"><img src="' + _self.config.getPhotoUrl + data.avatar + '" alt="" class="item-photo"><span class="user-name ' + customCls +'">' + data.username + '</span></li>'
        }

        $(_self.config.winningListCls).append(HTML)
    },
    _userRender(data) {
        let _self = this;
        data = data
            ? data
            : _self.config.currentDrawAnimate;
        var customCls = data.username.length > 3 ? 'short-name' : ''
        
        let HTML = '<li class="list-item"><img src="' + _self.config.getPhotoUrl + data.avatar + '" alt="" class="item-photo"><span class="user-name ' + customCls + '">' + data.username + '</span></li>'
        $(_self.config.winnimgUserCls).append(HTML)

    },
    _prizeChange(index) {
        let _self = this;
        _self.config.currentRank = index;
        // console.log(index, _self.config.currentRank, 'mui-act prize-' + _self.config.currentRank)
        if (_self.config.currentRank > -1) {
            // $(_self.config.bodyCls)     .removeClass('prize-' + index + 1)
            // .addClass('prize-' + _self.config.currentRank)
            $(_self.config.bodyCls).removeAttr('class')
            $(_self.config.bodyCls).addClass('mui-act prize-' + _self.config.currentRank);

            $(_self.config.winnimgUserCls).html('');
            $(_self.config.winningListCls).html('');

            $(_self.config.numberCls).each((i, item) => {
                switch (i) {
                    case 0:
                        if (index == 4 ) {
                            $(item).html('为');

                        } else {
                            $(item).html('2');

                        }

                        break;
                    case 1:
                        if (index == 4 ) {
                            $(item).html('你');

                        } else {
                            $(item).html('0');

                        }
                        break;
                    case 2:
                        if (index == 4 ) {
                            $(item).html('而');

                        } else {
                            $(item).html('1');

                        }
                        break;
                    case 3:
                        if (index == 4 ) {
                            $(item).html('来');

                        } else {
                            $(item).html('9');

                        }
                        break;
                }
            })

        }
    },
    /**
     * 四等奖抽奖动画
     */
    _batchAnimate() {
        let _self = this;
        let batchTimer = null;
        $(_self.config.startButtonCls).addClass('btn-first-move');

        if (_self.config.currentDrawList.length) {
            // let data = ;
            batchTimer = setInterval(() => {
                let item = _self
                .config
                .currentDrawList
                .shift();
                if (item) {
                    _self._numberRender(item);
                    _self._userRender(item);
                } else {
                    $(_self.config.startButtonCls).removeClass('btn-first-move');
                    clearInterval(batchTimer)
                }
            }, 1000)
        } else {
            batchTimer = setTimeout(() => {
                _self._batchAnimate();
            }, 1000);
        }

    },
    _specialStart(diff) {
        let _self = this;
        let currentRank = _self.config.currentRank;
        diff = diff
            ? diff
            : 50;
        $(_self.config.numberCls).each((index, item) => {
            let random = Math.floor(Math.random() * diff + 1);
            console.log(random, '*****')
            let config = {
                item: $(item),
                index: index,
                timer: random,
                end: false,
                diff: diff
            };

            _self.config.specialTimer[index] = config;
            _self._specialAnimate(index)
        })

    },
    _specialAnimate(index) {
        let _self = this;
        let config = _self.config.specialTimer[index];
        let randomNumber = Math.floor(Math.random() * 9 + 1);
        let randomTimer = Math.floor(Math.random() * config.diff + 1);
        config.timer = randomTimer;
        config
            .item
            .html(randomNumber);

        let timer = setTimeout(function (param) {
            if (config.end) {
                console.log("*******");
                let currentCode = _self
                .config
                .currentDrawAnimate
                .code
                .toString();
                config.item.html(currentCode[config.index])
                config.item.addClass('number-item-checked');

                setTimeout(()=>{
                    config.item.removeClass('number-item-checked');

                },2000)
                _self._animateEnd()
            } else {
                _self._specialAnimate(config.index)

            }
        }, config.timer)

        config.timer = timer;

        _self.config.specialTimer[config.index] = config;
      
    },
    _specialShow(index,item,callback) {
        let _self = this;
        _self.config.specialTimer[index]['end'] = true;
        item.removeClass('btn-special-move btn-special-start');
        setTimeout(()=>{
            callback && callback();
        },1000)

    },
    _specialEnd(index,callback){
        let _self = this;
        _self.config.specialTimer[index]['end'] = true;
        setTimeout(()=>{
            callback && callback();
        },2000)
    }

}

new lottery();