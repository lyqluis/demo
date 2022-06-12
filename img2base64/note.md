### 实现

>[stackoverflow - js 将图片转化为 base64 编码](https://stackoverflow.com/questions/6150289/how-can-i-convert-an-image-into-base64-string-using-javascript)

1. FileReader

```js
function toDataURL(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var reader = new FileReader();
    reader.onloadend = function() {
      callback(reader.result);
    }
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}

toDataURL('https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0', function(dataUrl) {
  console.log('RESULT:', dataUrl)
})
```

2. Canvas

```js
function toDataURL(src, callback, outputFormat) {
  var img = new Image();
  img.crossOrigin = 'Anonymous';
  img.onload = function() {
    var canvas = document.createElement('CANVAS');
    var ctx = canvas.getContext('2d');
    var dataURL;
    canvas.height = this.naturalHeight;
    canvas.width = this.naturalWidth;
    ctx.drawImage(this, 0, 0);
    dataURL = canvas.toDataURL(outputFormat);
    callback(dataURL);
  };
  img.src = src;
  if (img.complete || img.complete === undefined) {
    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
    img.src = src;
  }
}

toDataURL(
  'https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0',
  function(dataUrl) {
    console.log('RESULT:', dataUrl)
  }
)
```

3. 本地图片 & FileReader

```js
function encodeImageFileAsURL(element) {
  var file = element.files[0];
  var reader = new FileReader();
  reader.onloadend = function() {
    console.log('RESULT', reader.result)
  }
  reader.readAsDataURL(file);
}
<input type="file" onchange="encodeImageFileAsURL(this)" />
```

### 实践

> [MDN - 在 web 中使用文件](https://developer.mozilla.org/zh-CN/docs/Web/API/File_API/Using_files_from_web_applications)

这里使用方案 3，实现2种形态

- 普通按钮点击选择图片
- 拖拽图片文件

#### 普通按钮

````html
<input type="file" class="no" />
<button class="input_btn">upload image</button>
<div class="input_area"></div>
<div class="output_area"></div>
````

- 点击 `<button>` 按钮后触发 `<input>` 打开文件选择框
- `<input>` 标签添加 `display: none;` 样式使之隐藏

#### 拖拽文件

- 添加拖拽区域 `<div class="drag">`
- 为拖拽区域添加事件监听 `dragenter`、`dragover`、`drop`
