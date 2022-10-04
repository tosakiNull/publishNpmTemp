## 架構

```
├── example // demo用, 本機測試時run起來看的地方
│   └── src
│       ├── index.html
│       └── app.js
├── package.json
├── src
│   └── index.js // 要發佈的組件原始碼(功能在這裡寫)
├── .babelrc
├── .editorconfig
├── .gitignore
├── .npmignore // 上傳至npm需忽略的項目
└── webpack.config.js
```
<br>
<hr>

## 指令
```bash

# 安裝
npm i

# 啟動
npm run start

# 啟動
npm run start

# 編譯(產出 lib)
npm run compile

# 發佈 demo(build + deploy)
npm run publish-demo

# deploy
npm run deploy

# build
npm run build

# test
npm run test

# 發佈到 npm 上,同 npm publish --access=public
npm run publish-pub

# npm 上移除發佈後的包(徹底刪除)
# npm 相關删除限制：
# 删除的版本 24hr 後才可重新再發佈.
# 只有發佈 72hr 内的包才可以删除
npm unpublish @username/your_package_name --force

# 廢棄指定版本 npm deprecate <pkg>[@<version>] <message>
npm deprecate @username/your_package_name@1.1.0 '廢棄的原因/訊息'
```

<br>
<hr>

## npm 發佈流程
<br>

### Step 1. 執行編譯
- 產生 lib/index.js
- 若之前有發佈過版本,需要先到 package.json 更改 version 值

```bash
# 編譯(產出 lib)
npm run compile
```

### Step 2. cmd 登入npm
- 若沒有npm帳戶需要先註冊
- 登入時會顯示需輸入的欄位, 依序輸入當時註冊的帳戶資訊即可
- 會寄送驗證碼到你的信箱

```bash
# 編譯(產出 lib)
npm login # 或是 npm adduser

# 登入成功訊息
Username: ＸＸＸ
Password:
Email: (this IS public)
npm notice Please check your email for a one-time password (OTP) # 輸入email驗證碼
Enter one-time password:
Logged in as ＸＸＸ on https://registry.npmjs.org/.
```

### Step 3. 發佈到npm上
- 如果包前面有加域名的話需設定 public 參數

```bash
npm publish --access=public
```
<br/>

- 如果沒有域名的話直接用
```bash
npm publish
```

<br>
<hr>

## 執行 npm publish 錯誤排除:

### 1. 需設置 npm 網址
- 當 npm 網址非 https 協定時出現
- 執行 npm set registry=https://registry.npmjs.org/
- 即可再發佈

```bash
npm notice
npm notice Beginning October 4, 2021, all connections to the npm registry - including for package installation - must use TLS 1.2 or higher. You are currently using plaintext http to connect. Please visit the GitHub blog for more information: https://github.blog/2021-08-23-npm-registry-deprecating-tls-1-0-tls-1-1/
npm ERR! code E426
npm ERR! 426 Upgrade Required - PUT http://registry.npmjs.org/包名
```

<br/>

### 2. 需設置正確包域名
- 包的域名不能亂打
- 練習的時候會建議包前方加自己帳號的域名

> 格式 @[註冊時用的名稱]/[包名]<br>
> ex: @username/react-tools-owner

- 更正package.json 中的 name 項目, 再執行 npm publish 即可

```bash
npm notice
npm ERR! code E404
npm ERR! 404 Not Found - PUT https://registry.npmjs.org/@testlearnnpmpackagetolocal22222333333testbeta%2freact-tools-owner - Scope not found
npm ERR! 404
# 會提示亂打的名稱
npm ERR! 404  '@testlearnnpmpackagetolocal22222333333testbeta/react-tools-owner@1.0.0' is not in the npm registry.
npm ERR! 404 You should bug the author to publish it (or use the name yourself!)
npm ERR! 404
npm ERR! 404 Note that you can also install from a
npm ERR! 404 tarball, folder, http url, or git url.

npm ERR! A complete log of this run can be found in:
npm ERR!     /ＸＸＸ/ＸＸＸ/.npm/_logs/2022-10-03T06_06_19_613Z-debug.log
```

<br/>

### 3. 不能使用私人包發佈
- 當包名前方有加域名時發佈指令需換成 npm publish --access=public
- 發佈私人包需要付費

```bash
npm ERR! code E402
npm ERR! 402 Payment Required - PUT https://registry.npmjs.org/@testlearnnpmpackagetolocal22222333333testbeta%2freact-tools-owner - You must sign up for private packages

npm ERR! A complete log of this run can be found in:
npm ERR!     /ＸＸＸ/ＸＸＸ/.npm/_logs/2022-10-03T06_05_31_377Z-debug.log
```

<br>
<hr>

## 專案內使用自己的package
- 與平時安裝包無異, 同樣下 npm i 自己的包
- 再到專案 import 即可使用
```bash
# ex:
npm i @username/react-tools-owner
```

```js
// ex:
import TestComp from '@username/react-tools-owner';
```


```bash
# 發佈新版本後可查看是否有更新
npm outdate

# 顯示可更新項目
Package                          Current  Wanted   Latest  Location
@username/react-tools-owner      1.0.0   1.0.2    1.0.2  your-projects


# 更新
npm update @username/react-tools-owner
```

<br>
<hr>

## 基礎必要安裝的包
```bash
# react
npm i react react-dom -D

# babel
npm i @babel/cli @babel/core @babel/preset-env @babel/preset-react -D
npm i babel-loader -D

# webpack
npm i webpack webpack-cli webpack-dev-server -D

# 生成html
npm i html-webpack-plugin -D
```

<br>
<hr>

## 來源參考
- 從 0 開始:
    - [如何封装一个react组件(类库)发布到npm](https://juejin.cn/post/7101217198483439629)
    - [详解从 0 发布 react 组件到 npm 上](https://cloud.tencent.com/developer/article/1397904)
    - [【从0到1】使用React开发一个分页组件并发布到NPM (Webpack5 +React18 + Sass + TS)](https://blog.csdn.net/web22050702/article/details/124725034)
    - [开发React组件 发布npm包 (使用TSDX)](https://blog.51cto.com/u_15081058/2594751)
- 廢棄/刪除:
    - [npm发布包教程（五）：废弃/删除](https://segmentfault.com/a/1190000017479985)
    - [npm 删除(废弃)发布包或版本](https://blog.csdn.net/zz00008888/article/details/115698036)

