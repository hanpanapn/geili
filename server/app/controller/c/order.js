
// eslint-disable-next-line strict
const Controller = require("../../core/base_controller")
let serviceName = 'order';

//订单的操作 
class orderController extends Controller {
    // 发表
    async addModel() {

        const formData = this.ctx.request.body
        const modelResult = await this.ctx.service[serviceName].seaveOrUp(formData)
        if (modelResult) {
            this.success({
                code: 200,
                message: "操作成功",
            })
        } else {
            this.error({
                code: 10000,
                message: "操作失败",
            })
        }

    }

    // 查询列表
    async getList() {
        // const getListData = this.ctx.request.body
        let list = await this.ctx.service[serviceName].getList()

        this.success({
            code: 200,
            message: "操作成功",
            data: list
        })
    }

    // 回显
    async getModel() {
        const id = this.ctx.request.body.id
        const result = await this.ctx.service[serviceName].getModel(id)
        this.success({
            code: 200,
            message: "操作成功",
            data: result
        })
    }

    // 删除
    async delModel() {
        const id = this.ctx.request.body.id
        const result = await this.ctx.service[serviceName].delModel(id)
        this.success({
            code: 200,
            message: "操作成功",
            data: result
        })
    }


}

module.exports = orderController
