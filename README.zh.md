<p align="center">
  <a href="//macacajs.github.io/macaca-datahub/zh">
    <img
      alt="Macaca"
      src="https://macacajs.github.io/macaca-datahub/logo/logo-color.svg"
      width="160"
    />
  </a>
</p>

# umi-plugin-datahub

[English Edition](./README.md) | [项目主页](//macacajs.github.io/macaca-datahub/zh)

---

[macaca-datahub](//github.com/macacajs/macaca-datahub) 的 umi 插件，解决从本地开发阶段，到集成测试阶段，以及上线前验证阶段的一系列数据环境需求，研发与测试工程师只需面向 DataHub 管理数据即可。

<div align="center">
  <img src="https://wx2.sinaimg.cn/large/6d308bd9gy1fpbmdx2whdj21kw13a7fa.jpg" width="75%" />
</div>

## 安装

```bash
$ npm i umi-plugin-datahub -D
```

在 `.umirc.js` 中增加如下配置：

```js
export default {
  plugins: [
    'umi-plugin-datahub',
  ],
};
```

## 配置项


```javascript
export default {
  plugins: [
    ['umi-plugin-datahub', {
      proxy: {
        '^/api': {
          hub: 'hubname',
        },
      },
      store: path.join(__dirname, 'data'),
    }],
  ],
};
```

更多配置见：[macaca-datahub](//macacajs.github.io/macaca-datahub/zh/guide/)

## 开发

调试插件

```bash
$ cd test/fixture
$ npm run dev
```

调试 UI

```bash
# watch build
$ npm run build -- -w
$ cd test/fixture
$ npm run dev:ui
```


## 工程示例

- [umi-examples](//github.com/umijs/umi-examples/tree/master/eleme-demo)
