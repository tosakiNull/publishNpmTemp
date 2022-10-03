[如何封装一个react组件(类库)发布到npm](https://juejin.cn/post/7101217198483439629)
[详解从 0 发布 react 组件到 npm 上](https://cloud.tencent.com/developer/article/1397904)


├── example // 示例代码，在自己测试的时候可以把测试文件放到 src 里
│   └── src // 示例源代码
│       ├── index.html // 示例 html
│       └── app.js // 添加到 react-dom 的文件
├── package.json
├── src // 组件源代码
│   └── index.js // 组件源代码文件
├── .babelrc
├── .editorconfig // 不必须的，但是建议有
├── .gitignore // 如果要放到 github 上，这个是需要有的
└── webpack.config.js
