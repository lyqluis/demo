# 用 ES6 撸一个贪吃蛇

### 传送门
[源码](https://github.com/xiannvjiadexiaogouzi/demo/blob/master/%E8%B4%AA%E5%90%83%E8%9B%87/snake.html)
[在线试玩](https://xiannvjiadexiaogouzi.github.io/demo/%E8%B4%AA%E5%90%83%E8%9B%87/snake.html)

### 前言
那天放假休息，看到网上有个用js算法写出自动巡径的贪吃蛇，虽然算法是抄的，但是不明觉厉，于是心血来潮，想撸一个低配的正常版贪吃蛇
...
本项目用 **es6** 和 **面向对象** 完成

### 准备
首先需要先定义一些表准的定量；
```
const MAP_WIDTH = 20; //地图大小
const CELL = 16; //单元长度
const SPEED = 400; //初始速度
const SNAKE_LEN = 5; //蛇初始长度
const MAP = document.querySelector('.map-wrapper');
```

### 绘制地图
其实我看到很多的版本大家都没有绘制地图中的网格，但其实这个网格可以有，用来减低游戏的难度；
```
let frag = document.createDocumentFragment();
for (let i = 0; i < mapWidth; i++) {
  let row = document.createElement('div'); // 行
  let column = document.createElement('div'); // 列
  row.style.width = mapWidth * CELL + 'px';
  column.style.height = mapWidth * CELL + 'px';
  row.style.height = CELL + 'px';
  column.style.width = CELL + 'px';
  row.style.top = i * CELL + 'px';
  column.style.left = i * CELL + 'px';
  row.className = 'line row';
  column.className = 'line column';
  frag.appendChild(row);
  frag.appendChild(column);
}
MAP.appendChild(frag);
frag = null;
```
采用`fragment`的好处自不必多说，就是减少`DOM`操作

### cell类
```
constructor(x, y, classname) {
  this.x = x;
  this.y = y;
  this.cell = document.createElement('div');
  this.classname = classname
}
```
对每个格子进行对象化的好处就是随时都可以针对单个格子进行操作，而且不用考虑太多；
并增添`add()` 和`remove()`方法用来对格子对应的`dom`进行增减；

### 蛇class
蛇的移动其实是将蛇身上的每一个方块在方向上进行向前移动一个，然而这样的本办法肯定是不可取的，因为这样对`dom`操作太过频繁；
蛇的移动可以考虑成将蛇尾和蛇头的移动即可；
所以我们需要在对象蛇身上存储蛇头和蛇尾的信息
```
constructor() {
  this.head = null; //蛇头
  this.headPos = [];
  this.tail = null; //蛇尾
  this.pos = []; //身体位置 二维数组
  this.direction = null; //行走方向
}
```
#### 蛇的初始化
- 创建蛇头
- 创建蛇身

#### 判断下一步
当蛇在前进时，我们需要对蛇头的前进方向上的下一格进行判断：
- 下一格为蛇身，停止，game over
- 下一格为墙，停止，game over
- 下一格为食物，继续前进，蛇身+1

而这个下一步判断也非常简单，只需要判断蛇头当前位置根据当前方向增减后的位置即可
我定义了一个方向的常量
```
const DIR = {
  left: {
    x: -1,
    y: 0
  },
  right: {
    x: 1,
    y: 0
  },
  up: {
    x: 0,
    y: -1
  },
  down: {
    x: 0,
    y: 1
  }};
```
这样每当移动时只要判断当前方向并从常量中导入
```
this.direction = (function randomDir(x, y) {
                    let dirArr = [];
                    dirArr.length = 2;
                    dirArr[0] = x < MAP_WIDTH / 2 ? 'right' : 'left';
                    dirArr[1] = x < MAP_WIDTH / 2 ? 'down' : 'up';
                    return DIR[dirArr[random(0, 1)]];
                  })(_x, _y)
```
所以下一步就是
```
let nextPos = [this.head.x + this.direction.x, this.head.y + this.direction.y];
```

#### 移动
按照之前的思路
- 在原来蛇头的位置创建新蛇身在原来蛇头的位置，出去原来的蛇头
- 在蛇头下一位创建新蛇头
- 判断是否吃到食物，从而删去蛇尾
```
move(nextPos, getFood) {
  //创建一个新身体在原来蛇头的位置
  let newBody = new Cell(this.head.x, this.head.y, 'snakebody');
  newBody.nxt = this.head.nxt;
  this.head.nxt.pre = newBody;
  this.head.remove();
  newBody.add();
  //在蛇头下一个位置创建一个新蛇头
  let newHead = new Cell(nextPos[0], nextPos[1], 'snakehead');
  newHead.add();
  newBody.pre = newHead;
  this.head = newHead; //更新蛇头
  newHead.nxt = newBody;
  this.pos.unshift(nextPos); //更新this.pos
  //移除旧蛇尾
  if (!getFood) { //没食物, this.tail变前面一个, 删除tail
    // console.log('remove tail');
    this.tail.remove();
    this.tail = this.tail.pre;
    this.pos.pop();
  }
}
```

### 游戏模型
`start()`中为游戏增添`timer`自动实现动画；
`stop()`中除去`timer`来停止游戏；
并加上gameover的控制
```
start() {
  this.timer = setInterval(() => {
    snake.check();
  }, SPEED / this.level);
}

stop() {
  clearInterval(this.timer);
}

over() {
  this.stop();
  GAMEOVER.style.display = 'block';
  GAME.style.display = 'none';
  MAP.innerHTML = '';
  this.restart = true;
}
```

### 小结
贪吃蛇相比于俄罗斯方块就简单很多，整体代码也没有多少，真的很适合新手小白来练习js和es6；

### 传送门
[源码](https://github.com/xiannvjiadexiaogouzi/demo/blob/master/%E8%B4%AA%E5%90%83%E8%9B%87/snake.html)
[在线试玩](https://xiannvjiadexiaogouzi.github.io/demo/%E8%B4%AA%E5%90%83%E8%9B%87/snake.html)

😀 各位喜欢的看官，欢迎 star 🌟