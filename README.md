# MomDownload

------

我爸不会下载车载MP4，每次都让我下载。开发这个小东西简化了下载流程，让他们自己可以动手下载，解放了我的宝贵时间。。
## 过程


### 1.创建项目
目录结果大致为：
```
your-app/
├── package.json
├── main.js
└── index.html
参考：https://electronjs.org/docs/tutorial/quick-start
```

### 2.获取视频资源
```
我选用的是 https://electronjs.org/docs/tutorial/quick-start 视频资源网站
常用接口：
    搜索歌曲：http://www.chedvd.com/so.html?k=歌曲名
    歌曲详情页：http://www.chedvd.com/song/xxx.html
    视频下载地址：http://www.chedvd.com/video/xx
```
    
### 3.编码
使用request获取网页源代码，使用cheerio快速找到网页DOM
[request](https://github.com/request/request)
官方简介：Request is designed to be the simplest way possible to make http calls. It supports HTTPS and follows redirects by default
[cheerio](https://github.com/cheeriojs/cheerio)
官方简介：Fast, flexible & lean implementation of core jQuery designed specifically for the server

### 4.调试启动
``` bash
# 安装依赖
cnpm install

# 启动项目
cnpm start

# 打包编译
cnpm run package-win    编译为windows可执行程序
cnpm run package-linux  编译为linux可执行程序
cnpm run package-mac    编译为mac可执行程序

```


> 本人CSS技术比较拙略，实在写不出啥好看的界面，哈哈。。。以上若有不太理解的地方，先看代码，看不懂可以跟我沟通交流。

------
