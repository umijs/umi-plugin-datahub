# umi-plugin-datahub

---

umi plugin for integrating [macaca-datahub](//github.com/macacajs/macaca-datahub), which is a GUI-style mock tool that can be used to replace umi's built-in mock solution.

<div align="center">
  <img src="https://wx2.sinaimg.cn/large/6d308bd9gy1fpbmdx2whdj21kw13a7fa.jpg" width="75%" />
</div>

## Setup

Install it via npm or yarn,

```bash
$ npm i umi-plugin-datahub -D
```

Configure and import this plugin in `.umirc.js`,

```js
export default {
  plugins: [
    'umi-plugin-datahub',
  ],
};
```

## Options

We can specify options for macaca-datahub, such as proxy and store.

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

Checkout [macaca-datahub](//macacajs.github.io/macaca-datahub/zh/guide/) for more options.

## Example

- [umi-examples](//github.com/umijs/umi-examples/tree/master/eleme-demo)

<!-- GITCONTRIBUTOR_START -->

## Contributors

|[<img src="https://avatars1.githubusercontent.com/u/35128?v=4" width="100px;"/><br/><sub><b>sorrycc</b></sub>](https://github.com/sorrycc)<br/>|[<img src="https://avatars1.githubusercontent.com/u/1011681?v=4" width="100px;"/><br/><sub><b>xudafeng</b></sub>](https://github.com/xudafeng)<br/>|[<img src="https://avatars2.githubusercontent.com/u/1134658?v=4" width="100px;"/><br/><sub><b>tudou527</b></sub>](https://github.com/tudou527)<br/>|
| :---: | :---: | :---: |


This project follows the git-contributor [spec](https://github.com/xudafeng/git-contributor), auto updated at `Fri Apr 05 2019 17:28:24 GMT+0800`.

<!-- GITCONTRIBUTOR_END -->

## LICENSE

MIT
