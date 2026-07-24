# Explorer Website

探索者（Explorer Collective）官方网站源码。

线上站点：<https://explorer.org.cn/>

## Source of truth

本仓库保存可公开的网站静态源码。网站由 Nginx 提供服务；服务器配置、登录凭据、日志、临时部署文件和本地发布依赖均不纳入版本控制。

## Local preview

可使用任意静态 HTTP 服务在仓库根目录预览，例如：

```powershell
python -m http.server 8000
```

然后访问 <http://localhost:8000/>。

## Release practice

每次发布前应至少检查：HTML 引用与锚点、JavaScript 语法、JSON-LD、CSS 文件完整性，以及线上 HTTPS 静态资源响应。部署时应仅上传确认变更的文件，并在服务器保留可回滚备份。
