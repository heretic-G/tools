debugger 导致MutationObserver和promise的顺序不一致

暂时不清楚 没找到资料 


```html
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
    .outer {
      width: 100px;
      height: 100px;
      background: green;
    }

    .inner {
      width: 50px;
      height: 50px;
      background: red;
    }
  </style>
  </head>

  <body>
    <div class="outer">
      <div class="inner"></div>
    </div>

    <script>
    var outer = document.querySelector('.outer');
    var inner = document.querySelector('.inner');

    // 监听outer元素的属性变化
    new MutationObserver(function () {
      console.log('mutate');
    }).observe(outer, {
      attributes: true,
    });

    // click事件
    function onClick() {
      // debugger
      console.log('click');

      setTimeout(function () {
        console.log('timeout');
      }, 0);

      Promise.resolve().then(function () {
        console.log('promise');
      });

      outer.setAttribute('data-random', Math.random());
    }

    // 监听inner和outer的点击事件
    inner.addEventListener('click', onClick);
    outer.addEventListener('click', onClick);
  </script>
  </body>

</html>
```
