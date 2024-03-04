// 作用：需要将所有的dom元素对象以及相关资源全部都加载完毕之后，再实现的事件函数
window.onload = function () {


    // 路径导航的数据渲染
    navPathDataBind()
    function navPathDataBind() {
        //     思路：
        //     1. 先获取路径导航的页面元素navPath
        //     2. 再来获取所需要的数据（data.js->goodData.path）
        //     3. 由于数据是动态产生的，相应的dom元素也应该是动态产生的，意味着需要根据数据的数量来创建dom元素，
        //     4. 在遍历数据创建dom元素的最后一条，只创建a标签，不创建i标签

        // 1、获取页面导航的元素对象
        var navPath = document.querySelector('#wrapper #content .contentMain #navPath');
        // console.log(navPath);

        // 2.获取数据
        var path = goodData.path

        // 3. 遍历数据
        for (var i = 0; i < path.length; i++) {
            if (i == path.length - 1) {
                // 只需要创建 a 且没有 href 属性
                var aNode = document.createElement("a")
                aNode.innerHTML = path[i].title
                navPath.appendChild(aNode)
            } else {
                // 创建 a 标签
                var aNode = document.createElement("a")
                aNode.href = path[i].url
                aNode.innerText = path[i].title

                // 创建 i 标签
                var iNode = document.createElement('i')
                iNode.innerHTML = '/'

                // 让 navPath 元素来追加 a 和 i
                navPath.appendChild(aNode)
                navPath.appendChild(iNode)
            }

        }

    }

    // #region 放大镜移入移出效果
    // 鼠标经过小图框，显示隐藏大图框
    const smallPic = document.querySelector('#wrapper #content .contentMain #center #left #leftTop #smallPic')
    const bigPic = document.querySelector('#wrapper #content .contentMain #center #left #leftTop #bigPic')



    smallPic.addEventListener('mouseenter', show)
    smallPic.addEventListener('mouseleave', hide)
    let timeId = 0
    // 显示函数， 显示大盒子
    function show() {
        // 先清除定时器
        clearTimeout(timeId)
        bigPic.style.display = 'block'

    }

    // 隐藏函数， 隐藏大盒子
    function hide() {
        timeId = setTimeout(function () {
            bigPic.style.display = 'none'
        }, 200)

        // 鼠标经过大图框，显示隐藏大图框
        // bigPic.addEventListener('mouseenter', show)
        // bigPic.addEventListener('mouseleave', hide)

    }

    // 鼠标经过小图框，显示隐藏蒙版元素\
    const mask = document.querySelector('#wrapper #content .contentMain #center #left #leftTop #smallPic .mask')
    smallPic.addEventListener('mouseenter', function () {
        mask.style.display = 'block'
    })
    smallPic.addEventListener('mouseleave', function () {
        mask.style.display = 'none'
    })

    // 移动蒙版元素
    smallPic.addEventListener('mousemove', function (e) {
        // 鼠标在小图框里的坐标 = 鼠标在页面中的坐标 - 小图框的坐标
        let x = e.pageX - smallPic.getBoundingClientRect().left
        let y = e.pageY - smallPic.getBoundingClientRect().top - document.documentElement.scrollTop
        // console.log(x,y);

        // 蒙版元素移动 在小图框 盒子内，限定移动的距离
        if (x >= 0 && x <= 400 && y >= 0 && y <= 400) {
            // 蒙版元素不是一直移动的
            // 声明两个变量  蒙版元素移动的 mx  my  变量
            let mx = 0, my = 0
            if (x <= 100) mx = 0
            if (x >= 100 && x <= 300) mx = x - 100
            if (x >= 300) mx = 200

            if (y <= 100) my = 0
            if (y >= 100 && y <= 300) my = y - 100
            if (y >= 300) my = 200
            mask.style.left = mx + 'px'
            mask.style.top = my + 'px'
            const bigImg = document.querySelector('#wrapper #content .contentMain #center #left #leftTop #bigPic img')
            var scale = (smallPic.clientWidth - mask.offsetWidth) / (bigImg.offsetWidth - bigPic.clientWidth)
            // 大图框里的大图片跟随蒙版元素移动
            bigImg.style.left = -mx / scale + 'px';
            bigImg.style.top = -my / scale + 'px';

        }

    })

    // #endregion   


    // #region 动态渲染放大镜缩略图的数据


    thumbnailData()
    function thumbnailData() {
        /**
         * 思路
         * 1. 先获取piclist元素下的ul
         * 2. 再获取data.js文件下goodData->imagessrc
         * 3. 遍历数据，根据数组的长度来创建li元素
         * 4. 让 ul 遍历追加 li
         */

        // 1. 获取piclist下的ul
        const ul = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom #piclist ul')


        // 2. 获取imagessrc获取
        const imagessrc = goodData.imagessrc

        // 3. 遍历数组
        for (let i = 0; i < imagessrc.length; i++) {
            // 创建 li 元素
            const newLi = document.createElement('li')

            // 创建 img 元素
            const newImg = document.createElement('img')
            newImg.src = imagessrc[i].s

            // 让 li 追加 img  元素
            newLi.appendChild(newImg)

            // 让 ul 追加 li 元素
            ul.appendChild(newLi)
        }
    }
    // #endregion


    // #region 点击缩略图出现大图

    thumbnailClick()
    function thumbnailClick() {
        /**
         * 思路：
         * 1. 获取所有的 li 元素，并且循环发生点击事件
         * 2. 点击缩略图 需要确定其下标位置来找到对应小图路径和大图路径替换现有的src 的值
         */

        //  1. 获取所有的 li 元素
        const liNodes = document.querySelectorAll('#wrapper #content .contentMain #center #left #leftBottom #piclist ul li')
        const smallpic_img = document.querySelector('#wrapper #content .contentMain #center #left #leftTop #smallPic img')
        const bigPic_img = document.querySelector('#wrapper #content .contentMain #center #left #leftTop #bigPic img')
        let imagessrc = goodData.imagessrc
        smallpic_img.src = imagessrc[0].s

        // 2. 循环点击 li 标签
        for (let i = 0; i < liNodes.length; i++) {
            liNodes[i].onclick = function () {
                //    bigimgIndex = i
                console.log(i);

                // 变换小，大图路径
                smallpic_img.src = imagessrc[i].s
                bigPic_img.src = imagessrc[i].b
            }
        }
    }


    // #endregion


    // #region 点击缩略图左右箭头的效果
    thumbnailLeftRightClick()
    function thumbnailLeftRightClick() {
        /**
         * 思路
         * 1. 先获取左右两端的箭头按钮
         * 2. 再获取可视的div和ul, li 元素
         * 3. 计算(发生起点, 步长, 总体运动的距离值)
         * 4. 然后发生点击事件
         */

        // 获取箭头元素
        const prev = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom a.prev')
        const next = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom a.next')
        // console.log(prev,next);

        // 获取 div, ul, li
        // const piclist = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom #piclist')
        const ul = document.querySelector('#wrapper #content .contentMain #center #left #leftBottom #piclist ul')
        const liNodes = document.querySelectorAll('#wrapper #content .contentMain #center #left #leftBottom #piclist ul li')

        // 计算
        // 起点位置
        let start = 0;

        // 步长
        let step = (liNodes[0].offsetWidth + 20) * 2

        // 总体运动距离值 = ul的宽度 - div框的宽度 = （图片的总数 - div中显示的数量） * （li的宽度 + 20）
        let endPosition = (liNodes.length - 5) * (liNodes[0].offsetWidth + 20)

        // 发生事件
        prev.onclick = function () {
            start -= step
            if (start < 0) {
                start = 0
            }
            ul.style.left = -start + "px"
        }
        next.onclick = function () {
            start += step
            if (start > endPosition) {
                start = endPosition
            }
            ul.style.left = -start + "px"
        }



    }

    // #endregion

    // #region 商品详情数据的动态渲染
    rightTopData()
    function rightTopData() {
        /**
         * 思路
         * 1. 查找rightTop元素
         * 2. 查找data.js-》goodData->goodsDetail
         * 3. 建立一个字符串变量， 将原来的布局结构贴进去，对应的数据放在对应的位置重新渲染rightTop元素
         * 
         */

        // 查找元素
        const rightTop = document.querySelector('#wrapper #content .contentMain #center .right .rightTop')

        // 查找数据
        const goodsDetail = goodData.goodsDetail

        // 创建字符串变量
        const s = `
            <h3>${goodsDetail.title}</h3>
            <p>${goodsDetail.recommend}</p>
            <div class="priceWrap">
                <div class="priceTop">
                <span>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</span>
                <div class="price">
                    <span>￥</span>
                    <p>${goodsDetail.price}</p>
                    <i>降价通知</i>
                </div>
            <p>
                <span>累计评价</span>
                <span>${goodsDetail.evaluateNum}</span>
            </p>
            </div>

            <div class="priceBottom">
                <span>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</span>
            <p>
                <span>${goodsDetail.promoteSales.type}</span>
                <span>${goodsDetail.promoteSales.content}</span>
            </p>
            </div>

            </div>
            <div class="support">
                <span>支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</span>
                <p>${goodsDetail.support}</p>
            </div>

            <div class="address">
                <span>配&nbsp;送&nbsp;至</span>
                <p>${goodsDetail.address}</p>
            </div>
        `
        // 重新渲染rightTop元素
        rightTop.innerHTML = s


    }

    // #endregion




}

