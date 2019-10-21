# 用 ES6 撸一个俄罗斯方块

## 前言
用es6来写俄罗斯方块这类小游戏也已经是老掉牙的东西了；
但是对于我们这种初学者来说还是很有必要加以练习的；
究其原因，主要还是心血来潮的写了一个，也没什么其他的更深层次因素；
本项目全部用es6以及面向对象编写；

## CELL模型
- 保存每个格子的坐标和class；
- 绘制div
- 消除div

这样面向对象的好处就是之后写起来的会非常方便，不用考虑太多其他的方法

## 方块模型
```
constructor(map, fixed, arr, color) {
  this.blockCells = [];
  this.color = color;
  this.arr = arr; //方块的形态
  this.fixed = fixed; //位置是否随机
  this.x = 1; //记录移动位置
  this.y = 1; //记录移动位置
  this.map = map;
  this.pos = null; //所有方块cell的位置[]
  this.rotateFlag = true; //是否可以旋转
  this.moveFlag = true; //是否可以移动
}
```

### 初始化
- 随机生成方块形状
- 随机生成方块坐标
- 随机生成方块颜色
- 渲染出方块

#### 方块形状
用`this.arr`来保存当前方块的形状；
采用二维数组来保存各种形状
```
[
  [1, 0],
  [1, 0],
  [1, 1]
]
```
这一个代表一个2*3的L型方块，`1`代表了需要渲染的位置，`0`代表了不需要渲染的位置；

#### 绘制方块
- 首先分析形状二维数组中对应的`1`和`0`
- 根据`1`和`0`绘制

#### 获得1的坐标
**`getXY()`**
对形状进行双层循环，得到1的位置角标 `[0,0], [1,0], [2,0], [2,1]`，然后再根据位置角标进行渲染

### 旋转变化
其实可以用数组将全部的形状以及对应的旋转形状都写出，然后在数组里调用就可以了，但是年少如我，还是写了一个旋转公式 😈
顺时针旋转的话，假设
```
[
  [1, 0],
  [1, 0],
  [1, 1]
]
```
变换为
```
[
  [1, 1, 1],
  [1, 0, 0]
]
```
可以发现其所有`1`和`0`的坐标都只是x和y互换(同一`1`或`0`不存在对应呼唤关系)；
所以其实就是一个近似矩阵转置的问题，但还是有区别
```
let rotateArr = [];
for (let i = 0, len = arr.length; i < len; i++) {
  let inArr = [];
  for (let j = arr.length - 1; j >= 0; j--) {
    inArr.push(arr[j][i]);
  }
  rotateArr.push(inArr);
}
return rotateArr;
```

#### 旋转后重绘
这边其实没必要旋转后没有重绘`dom`，以此节省`dom`操作；直接让位置不同的cell在`css`上进行位移；
在`getXY()`中添加判定，获得`1`的坐标后，是初始化绘制方块，还是旋转完移动方块；

**每一步移动完后，都需要在block里记录移动后的位置，否则旋转变化结束会回到起始点**

### 判断边界
这里是根据获得的下一步所占用的坐标位置来检测，在移动和旋转时都需要用到
- 移动
  - 获得移动方向上下一步的位置
  - 判断边界
- 旋转
  - 获得旋转后形成的新形状所占的位置
  - 判断边界

#### 判断逻辑
- 有方块堆积
  - 使用一个数组来存储所有一堆积的方格位置，看是否和下一步位置重合
- 无方块堆积
  - 判定下一步位置是否超出了`map`的边界即可

### 移动
因为之前写了`cell`类，所以这里的移动其实很简单，如果边界判断通过，只需要把方块里的每个方格对应移动到获得的下一步位置
- `block对象`的坐标移动
- `dom`操作对应`block对象`移动

### 堆积
这里就是在方块向下到达边界的时候对堆积方块进行记录，并且改变起`class`
```
// 给map记录deadblock位置信息
this.blockCells.forEach(el => {
  for (let i = 0, len = map.deadBlocks.length; i < len; i++) {
    if (el.x === map.deadBlocks[i][0] && el.y === map.deadBlocks[i][1]) break;
    map.deadBlocks.push(el);
    break;
  }
  if (!map.deadBlocks.length) map.deadBlocks.push(el);
})

// 改变class
this.blockCells.forEach(el => {
  el.cell.style.background = '#7f8c8d';
})

//消行
this.eliminate();

//控制游戏重启
game.stop();
game.start();
```
### 消行
对所有记录的堆积方块进行遍历，当同一行的方块数和地图大小一致时，在数组和`dom`中删除对应的方块
```
for (let r = MAP_COL - 1; r > 0; r--) {
  let idxs = []
  let num = 0; //该行的cell个数
  deadBlocks.forEach((el, i) => {
    if (el.y === 0) {
      game.over();
      return;
    }
    if (el.y === r) {
      num++;
      idxs.push(i);
    };
  })

  // 消行
  if (num === MAP_LEN) {
    idxs.forEach(i => {
      deadBlocks[i].remove(this.map);
      delete deadBlocks[i];
    })

    //下移
    deadBlocks.forEach((el, i) => {
      if (el.y < r) el.move(el.x, el.y + 1);
    })
    r++; //调整当前行数

    //记分
    game.addScore();
  }
}
```
## Game模型
给game添加一个`timer`，用来实现方块的自动落下; 当停止游戏的时候就去除`timer`；
- 启动
- 记分
- 暂停
  ```
  handlePause() {
    this.pause = !this.pause;
    if (this.pause) {
      this.stop();
      return;
    }
    this.timer = setInterval(() => {
      block.check('down')
    }, this.speed);
  }
  ```
- 游戏结束

## 小结
- 没有添加可调节游戏难度的变量
- 没有写直接下落的功能

## 传送门
[在线食用](https://xiannvjiadexiaogouzi.github.io/demo/tetris/tetris.html)
[源码](https://github.com/xiannvjiadexiaogouzi/demo/blob/master/tetris/tetris.html)

😺 喜欢的朋友欢迎 star 🌟