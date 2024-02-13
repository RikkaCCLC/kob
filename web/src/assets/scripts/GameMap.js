import { AcGameObject } from "./AcGameObject"; //把这个基类导入
import { Wall } from "./Wall";
//import时如果import的是export的内容，需要用括号括起来
//如果是export default的内容，则不需要用括号括起来
//每一个文件最多只能有一个export default，这个export default就类似于Java里的public class

export class GameMap extends AcGameObject { //定义地图类并将其export出去
    constructor(ctx, parent) { //构造函数里需要传两个参数，ctx是画布
        //前端游戏所有的东西都是在画布里面画
        //第二个是画布的父元素，用来动态渲染画布的长宽

        super(); //构造函数中一定要先执行基类的构造函数
        this.ctx = ctx;
        this.parent = parent;
        this.L = 0; //存储绝对距离，代表一个单位的长度，未来地图长度直接使用此单位

        this.rows = 13; //绝对距离的行数
        this.cols = 13; //绝对距离的列数

        this.inner_walls_count = 20;
        this.walls = []; //创建一个数组用来存储所有的墙
    }

    check_connectivity(g, sx, sy, tx, ty) {
        if (sx == tx && sy == ty) return true;
        g[sx][sy] = true;

        let dx = [-1, 0, 1, 0], dy = [0, 1, 0, -1];
        for (let i = 0; i < 4; i ++ ) {
            let x = sx + dx[i], y = sy + dy[i];
            if (!g[x][y] && this.check_connectivity(g, x, y, tx, ty))
                return true;
        }

        return false;
    }

    create_walls() {
        const g = [];
        for (let r = 0; r < this.rows; r ++ ) {
            g[r] = [];
            for (let c = 0; c < this.cols; c ++ ) {
                g[r][c] = false;
            }
        }

        // 给四周加上障碍物
        for (let r = 0; r < this.rows; r ++ ) {
            g[r][0] = g[r][this.cols - 1] = true;
        }

        for (let c = 0; c < this.cols; c ++ ) {
            g[0][c] = g[this.rows - 1][c] = true;
        }

        // 创建随机障碍物
        for (let i = 0; i < this.inner_walls_count / 2; i ++ ) {
            for (let j = 0; j < 1000; j ++ ) {
                let r = parseInt(Math.random() * this.rows);
                let c = parseInt(Math.random() * this.cols);
                if (g[r][c] || g[c][r]) continue;
                if (r == this.rows - 2 && c == 1 || r == 1 && c == this.cols - 2)
                    continue;

                g[r][c] = g[c][r] = true;
                break;
            }
        }

        const copy_g = JSON.parse(JSON.stringify(g));
        if (!this.check_connectivity(copy_g, this.rows - 2, 1, 1, this.cols - 2))
            return false;

        for (let r = 0; r < this.rows; r ++ ) {
            for (let c = 0; c < this.cols; c ++ ) {
                if (g[r][c]) {
                    this.walls.push(new Wall(r, c, this));
                }
            }
        }

        return true;
    }

    start(){
        for (let i = 0; i < 1000; i ++ ) 
        if (this.create_walls())
            break;
    }

    //因为浏览器框可以缩放，所以地图长度必须实时更新
    update_size() { //更新地图长度函数
        this.L = Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows)
        //游戏区域是一个在浏览器中的正方形区域。边长取浏览器宽和高的最小值
        //clientWidth和clientHeight是求div的长宽，这是一个api，想详细了解自行百度即可

        //求完小正方形的边长之后，就可以计算canvas的长宽
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;
        //求完之后可以去render中将地图画出来

    }

    update() { //每一帧执行一次，除了第一帧之外
        this.update_size(); //每一帧都更新长度
        this.render();
    }

    render() { //每一帧执行一次，实现地图渲染
        //画地图函数直接去mdn中查api粘过来即可
        //奇数格和偶数格用不同的颜色
        const color_even = "#AAD751", color_odd = "#A2D149";
        for (let r = 0; r < this.rows; r ++ ) {
            for (let c = 0; c < this.cols; c ++ ) {
                if ((r + c) % 2 == 0) {
                    this.ctx.fillStyle = color_even;
                } else {
                    this.ctx.fillStyle = color_odd;
                }
                this.ctx.fillRect(c * this.L, r * this.L, this.L, this.L);
            }
        }
    }
}