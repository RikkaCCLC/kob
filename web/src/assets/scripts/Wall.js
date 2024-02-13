import { AcGameObject } from "./AcGameObject";

export class Wall extends AcGameObject {
    constructor(r, c, gamemap) { //传横纵坐标和gamemap
        super(); //先调用基类的构造函数

        this.r = r;
        this.c = c;
        this.gamemap = gamemap;
        this.color = "#B37226";
    }

    update() {
        this.render(); //墙也需要渲染，每一帧渲染一次
    }

    render() {
        const L = this.gamemap.L; //先把一个单位格的边长取出来，逐帧取，因为L会动态变化
        const ctx = this.gamemap.ctx; //把gamemap的画布取出来用

        ctx.fillStyle = this.color;
        ctx.fillRect(this.c * L, this.r * L, L, L); //参数分别是左上角横纵坐标与边长
    }
}