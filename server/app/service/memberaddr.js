
const Service = require("egg").Service
let modelName='MemberAddr';
//收货人地址
class memberaddrService extends Service {
    // 增加修改
    async seaveOrUpDate(data) {
        try {
            await this.ctx.model[modelName].upsert(data)
            return true
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    // 查询列表
    async getList() {
        return await this.ctx.model[modelName].findAndCountAll()
    }

    // 回显
    async getModel(aId) {
        return await this.ctx.model[modelName].findById(aId);
    }

    // 删除
    async delModel(aId) {
        let results
        let res = await this.ctx.model[modelName].destroy({
            where: {
                id: aId,
            },
        })
        if (res > 0) {
            results = {
                code: 200,
                message: "删除成功",
            }
        } else {
            results = {
                code: 10000,
                message: "删除失败",
            }
        }
        return results
    }
}

module.exports = memberaddrService
