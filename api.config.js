const dev = process.env.NODE_ENV === 'development' ? true : false;
module.exports = {
    // 服务器的接口
    baseUrl: dev ? 'http://localhost:8000' : 'http://api.pandashuai.com',
    // 七牛的路径
    qnUrl: 'http://res.pandashuai.com',
    // 博客的地址
    blogUrl: 'http://blog.pandashuai.com'
}