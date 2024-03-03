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
        bigPic.addEventListener('mouseenter', show)
        bigPic.addEventListener('mouseleave', hide)

    }

    // 鼠标经过小图框，显示隐藏蒙版元素\
    const mask = document.querySelector('#wrapper #content .contentMain #center #left #leftTop #smallPic .mask')
    smallPic.addEventListener('mouseenter', function() {
        mask.style.display = 'block'
    })
    smallPic.addEventListener('mouseleave', function() {
        mask.style.display = 'none'
    })

    // 移动蒙版元素
    smallPic.addEventListener('mousemove', function(e){
        // 鼠标在小图框里的坐标 = 鼠标在页面中的坐标 - 小图框的坐标
        let x = e.pageX - smallPic.getBoundingClientRect().left
        let y = e.pageY - smallPic.getBoundingClientRect().top - document.documentElement.scrollTop
        // console.log(x,y);

        // 蒙版元素移动 在小图框 盒子内，限定移动的距离
        if (x >= 0 && x <= 400 && y >= 0 && y <= 400){
            // 蒙版元素不是一直移动的
            // 声明两个变量  蒙版元素移动的 mx  my  变量
            let mx = 0, my = 0
            if(x <= 100)  mx = 0
            if(x >= 100 && x <= 300) mx = x -100
            if(x >= 300) mx = 200

            if(y <= 100)  my = 0
            if(y >= 100 && y <= 300) my = y -100
            if(y >= 300) my = 200
            mask.style.left = mx + 'px'
            mask.style.top = my + 'px'
            const bigImg = document.querySelector('#wrapper #content .contentMain #center #left #leftTop #bigPic img')
            var scale = (smallPic.clientWidth-mask.offsetWidth)/(bigImg.offsetWidth-bigPic.clientWidth)
            // 大图框里的大图片跟随蒙版元素移动
            bigImg.style.left = -mx/scale + 'px';
            bigImg.style.top = -my/scale + 'px';
            
        }

    })  

    // // 放大镜的移入移出效果

    // bigClassBind()
    // function bigClassBind(){
    //     /**
    //      * 思路:
    //      * 1. 获取小图框元素对象, 并且设置移入事件(onmouseenter)
    //      * 2. 动态创建蒙版元素以及大图框和大图片元素
    //      * 3. 移出时需要移除蒙版元素和大图框
    //      * **/ 

    //     // 1. 获取小图框元素
    //     var smallPic = document.querySelector('#wrapper #content .contentMain #center #left #leftTop #smallPic')
    //     // 获取leftTop元素
    //     var leftTop = document.querySelector('#wrapper #content .contentMain #center #left #leftTop')
    //     // 2. 设置移入事件
    //     smallPic.onmouseenter = function(){

    //         // 3. 创建蒙版元素
    //         var maskDiv = document.createElement('div')
    //         maskDiv.className = 'mask'

    //         // 4. 创建大图框元素
    //         var bigPic = document.createElement('div')
    //         bigPic.id = "bigPic"

    //         // 5. 创建大图片元素
    //         var bigImg = document.createElement('img')
    //         bigImg.src = "images/b1.png"

    //         // 6. 大图框追加大图片
    //         bigPic.appendChild(bigImg)

    //         // 7. 让小图框追加蒙版元素
    //         smallPic.appendChild(maskDiv)

    //         // 8. 让leftTop元素追加大图框
    //         leftTop.appendChild(bigPic)

    //         // 设置移动事件
    //         smallPic.onmousemove = function(){
    //             // Event.clientX: 鼠标点距离浏览器左侧X轴的值
    //             // smallPic.getBoundingClientRect().left: 小图框元素距离浏览器左侧可视left的值
    //             // maskDiv.offset: 元素的占位宽度
    //             event
    //             var left = Event.clientX - smallPic.getBoundingClientRect().left - maskDiv.offsetWidth / 2
    //             var top = Event.clientY - smallPic.getBoundingClientRect().top - maskDiv.offsetHeight / 2
    //             console.log(left);
    //             console.log(top);
    //         }


    //         // 设置移出事件
    //         smallPic.onmouseleave = function(){

    //             // 让小图框移除蒙版元素
    //             smallPic.removeChild(maskDiv)

    //             // 让leftTop移出大图框
    //             leftTop.removeChild(bigPic)
    //         }
    //     }
    // }
}