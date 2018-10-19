const articleTags = require('../model/articleTags.js')
const article = require('../model/article.js')
const tags = require('../model/tags.js')

// 返回给浏览器
// key：tagsName，value：[[文章数据1],[文章数据2],[文章数据3]]
const all = {
    path: '/api/tags/all',
    method: 'get',
    func: function(request, response) {
        var data = []
        data[0] = articleTags.getTagsIdArticleIdObj()
        data[1] = tags.all()
        data[2] = article.dataAll()


        var r = JSON.stringify(data)
        response.send(r)
    }
}


const articleAll = {
    path: '/api/tagsID',
    method: 'get',
    func: function(request, response) {
        // tagsID
        var tagsID = request.query.tagsID
        var data = []
        // 返回tagsID对应的tagsName
        var tagName = tags.returnTagsName(tagsID)
        data.push(tagName)
        // 返回tagsID对应的articleID数组
        var articleIDArr = articleTags.articleIDTagsAll(tagsID)
        console.log('articleIDArr', articleIDArr)

        // 传给article model 返回文章数据
        data.push(article.arrayIdAll(articleIDArr))

        var r = JSON.stringify(data)
        response.send(r)
    }
}
const routes = [
    all,
    articleAll
]

module.exports.routes = routes