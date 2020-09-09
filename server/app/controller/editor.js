
const Controller = require("../core/base_controller")

const fs = require('fs')
const path = require('path')
class EditorController extends Controller {
    // 发表评论
    async uploadImg() {

        let { ctx } = this
       //let a = await ctx.helper.uploadImg();
       console.log("dfddddddd");
        const parts = ctx.multipart();
        console.log("par",parts);
        let part;
        let resultFile = []
        // parts() 返回 promise 对象
        while ((part = await parts()) != null) {
            let length = 0
            if (part.length) {
                length = part[1]
                // 获取其他参数
            } else {
                if (!part.filename) return
                // 处理文件流
                let file = {}
                file.name = part.filename
                file.type = part.mimeType
                let filePath = path.join('/', part.filename) // 保存地址
                let writable = fs.createWriteStream(filePath)// 创建写入流
                await part.pipe(writable) // 开始写入
                file.path = 'https://www.xxx.xxx/public/upload/' + part.filename
                resultFile.push(file)
            }
        }


        let result = {}


        result = {
            code: 200,
            message: "操作成功",
            data: resultFile
        }
        this.ctx.body = result
    }



}
module.exports = EditorController
