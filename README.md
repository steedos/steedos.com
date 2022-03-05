# 华炎魔方官网

- cn：<https://www.steedos.cn/>，缓存1小时。
- com：<https://www.steedos.com/>，缓存1小时。
- beta：<https://beta.steedos.cn/>，缓存1分钟。

## 开发流程

请在dev分支开发，而不是在master分支或beta分支开发。

### 安装依赖包

请命令行执行以下指令安装依赖项：

```sh
yarn
```

### 开发调式

请命令行执行以下指令，跑起服务后可以改代码在浏览器中输入 [http://localhost:3000/](http://localhost:3000/) 地址看效果：

```sh
yarn dev
```

## 发布到官网流程

### 打包确认

请先在命令行执行以下指令确保能正常打包而不会报错，如遇有错误信息则需要修正，有未修正的错误时不可以进行下一步：

```sh
yarn build
```

### 发布到Beta

请把dev分支代码合并到beta分支，合并代码后 [Git Actions](https://github.com/steedos/steedos.com/actions) 会自动开始打包并发布到beta官网。

待 [Git Actions](https://github.com/steedos/steedos.com/actions) 执行成功后请到 <https://beta.steedos.cn/> 确认下，功能正常才可以进行下一步。

### 发布到官网

请把beta分支代码合并到master分支，请注意合并分支后并不会自动打包发布到官网，需要手动创建releases，创建后才会开始自动发布到.com和.cn官网。

#### 如何创建releases？

访问项目的Github仓库： <https://github.com/steedos/steedos.com>
右侧有一个名为“Releases”的链接，点击它进入Releases列表，然后依次执行以下操作步骤即可：

- 点击右上角的“Draft a new release”按钮
- 在跳转后的页面上点击名为“Choose a Tag”的下拉框
- 在下拉显示的文本输入框中输入要发布的下一个tag版本号，比如当前最后一个版本为v1.0.1的话，相应的输入v1.0.2。
- 按下回车键就可以创建一个新Tag了
- 最后点击表单底下的Publish release即可。

创建releases后 [Git Actions](https://github.com/steedos/steedos.com/actions) 会再次自动开始打包并发布到.com和.cn官网，相关Actions执行完成后官网应该就上线了。
