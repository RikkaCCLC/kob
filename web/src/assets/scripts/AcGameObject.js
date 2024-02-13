// 为了让我们每一秒都能刷新一个游戏对象，我们可以先把所有的游戏对象都存下来
const AC_GAME_OBJECTS = [];

export class AcGameObject { 
    //这个基类需要export出去，未来其它类引用这个文件的时候主要是引用这个类
    constructor() {
        AC_GAME_OBJECTS.push(this); //然后在构造函数中把这个类加入到 AC_GAME_OBJECT 中
        this.timedelta = 0; //本帧执行距离上一帧的时间间隔，用于计算速度
        this.has_called_start = false; //开一个变量记录当前函数有没有执行过
    }
    //游戏对象需要有几个函数，第一个是start函数，这个函数只执行一次
    start(){

    }

    update() { //每一帧执行一次，除了第一帧之外
        
    }

    on_destroy() { //删除之前执行 
        
    }

    destroy() { //删除对象函数，就是把上面数组里的当前对象删除

        this.on_destroy();

        for(let i in AC_GAME_OBJECTS) {
            const obj = AC_GAME_OBJECTS[i]; //取出当前对象
            if (obj == this) {
                AC_GAME_OBJECTS.splice(i); //js中删除对象使用splice函数即可
                break;
            }
        }
    }
}

let last_timestamp; // 定义辅助变量表示上一帧执行的时刻

//实现每一帧实时刷新，使用requestAnimationFrame这个函数
//这个函数会在下一帧浏览器渲染之前执行一遍
//如何实现每一帧刷新呢，写一个回调函数
//下一帧刷新之后，它又会调用自己，从而刷新下下帧。

const step = timestamp => { 
    //step函数会传入一个参数叫timestamp，它传入的是我们当前函数执行的时刻

    for (let obj of AC_GAME_OBJECTS) { //用of遍历的是值，用in的话遍历的是下标
         if(!obj.has_called_start) {   //如果当前对象还没有执行start()，则执行start()
            obj.has_called_start = true; //执行之前赋一下值，表示它已经执行过了
            obj.start();
         } else {
            obj.timedelta = timestamp - last_timestamp;
            // 如果执行过了，那么就计算timedelta，当前执行时刻减去上一次执行时刻即可

            obj.update();
         }
    }
    last_timestamp = timestamp; //执行完后更新上一次执行时刻为当前执行时刻
        
    requestAnimationFrame(step)
}



requestAnimationFrame(step)