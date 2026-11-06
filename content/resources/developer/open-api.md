---
title: "如何调用 OpenAPI？"
description: "本教程介绍了华炎魔方基于 OpenAPI 3.0 标准开放的一系列接口，通过示例为开发者提供了快速上手并与华炎魔方平台集成的基本流程与实操指引。"
slug: "open-api"
blog: "developer"
status: "published"
cover: "/images/cms/68427c5f5c7a28060df697e9.webp"
created: "2025-06-06T05:10:50.873Z"
modified: "2025-06-09T07:31:31.317Z"
b6_id: "6842785a5c7a28060df697db"
---

## 什么是 OpenAPI

OpenAPI 是一套描述和开发 RESTful API 的主流规范，能统一地定义接口的请求方法、参数和响应格式。华炎魔方在其平台中基于 OpenAPI 3.0 标准暴露了一系列接口，并借助 Swagger UI 工具为开发者提供可视化的文档与在线调试功能。使用这些接口，前端应用或第三方系统能够方便地访问和操作华炎魔方中的业务数据（例如用户、文件或对象记录），从而实现与平台的灵活集成与扩展。

---

## 准备工作

### 获取 API Key

由于华炎魔方开放的 OpenAPI 需要授权才能访问，因此在开始调用前，需要先获取对应的 API Key。API Key 一般由华炎魔方后台管理员配置，管理员进行华炎魔方平台「设置-开发-API key」中进行创建。请在取得正确的 API Key 后，妥善保存并避免泄露。

![](/images/cms/6842786a5c7a28060df697dc.webp)

### OpenAPI 访问地址

华炎魔方的 OpenAPI 通常可通过以下路径访问：

```
https://<your-steedos-server>/api/v6
```

在浏览器打开该地址，即可在前台页面查看所有可用的接口文档，并可在 OpenAPI UI 中进行在线测试。若平台路径与此不同，请以实际部署地址为准。

### 认证并登录

在使用 API 时，可以通过在请求头中携带 API Key 来完成基础认证，示例如下：

```
Bearer Authorization: apikey,<Your-API-Key>
```

或根据平台实际配置将 API Key 置于自定义 Header、Query 参数中。认证成功后即可调用华炎魔方的 OpenAPI 接口。

![](/images/cms/684278725c7a28060df697de.webp)

> **特别说明**：如果已在浏览器中登录了华炎魔方的管理员账号（即本地缓存中保存了管理员的认证信息），并且直接在同一浏览器中访问 OpenAPI 页面或接口，那么无需认证额外传入 API Key，就能访问对应权限下的接口。

### 查看对象名称

当 OpenAPI 页面调用接口时，需要在请求路径中指定 `{objectName}`。要查看某个对象的 API 名称，管理员可进入华炎魔方后台「设置-自定义应用-对象」，找到需要确认的对象点击进入详情页即可。

![](/images/cms/6842787e5c7a28060df697e0.webp)

### 查看字段 API

对指定对象进行查询或写入时，常需要在 `fields` 参数中列出具体字段名，或在 `Body` 中携带字段。具体字段 API 名称的查看方法：在刚刚对象的基础上切换到「字段与关系」选项卡，即可查看所有字段对应的 API 名称。

![](/images/cms/684278815c7a28060df697e2.webp)

---

以下以 `GET /api/v6/direct/{objectName}` 为例，展示如何查询记录并使用多种查询参数；其他操作（如增、删、改）可在相应接口中进行类似配置，此处不再赘述。

## 页面操作

1. 在浏览器访问华炎魔方的 OpenAPI UI 页面；  
2. 找到并点击 “Records” 分组以展开可用接口；  
3. 在列表中选择并展开 “List records” (GET /api/v6/direct/{objectName})；  
4. 点击 “Try it out” 按钮，填写查询对象名称、字段、过滤条件及其他查询参数（如分页、排序等）；  

![](/images/cms/6842788f5c7a28060df697e4.webp)

5. 在页面底部点击 “Execute” 执行查询请求，查看实时返回的结果数据。

![](/images/cms/684278925c7a28060df697e6.webp)

---

## 接口说明

- **接口地址**：`GET /api/v6/direct/{objectName}`
- **功能**：列表查询某个对象中的记录，每次返回一页（默认为 100 条）

---

## 常用请求参数

| 参数        | 位置  | 类型    | 说明                                                                                                                   |
|-------------|-------|---------|------------------------------------------------------------------------------------------------------------------------|
| `objectName`| path  | string  | 必填，要查询的对象名称，例如 `media_org_info`                                                                          |
| `skip`      | query | any     | 从上一页记录的偏移量开始，通常用于分页。示例：0 表示从头开始                                                            |
| `top`       | query | any     | 每次请求返回记录条数，默认为 100                                                                                       |
| `sort`      | query | string  | 指定排序字段及方向。多个排序字段可用逗号分隔。如：`name asc, created desc`                                             |
| `filters`   | query | string  | 用于过滤记录，格式为 `[ "field", "operator", "value" ]`。支持 `=, <, >, <=, >=, startsWith, endsWith, contains, notcontains` 等操作<br/>示例：`[ ["age", ">", 10 ], "and", ["name", "contains", "王"] ]` |
| `fields`    | query | string  | 仅返回指定字段，减少网络传输。可使用逗号分隔的字段列表或数组。如：`name, created` 或 `["name","created"]`              |

---

## 调用示例

在 OpenAPI UI 中或使用 cURL：

```
curl -X 'GET' \
  'https://v3.steedos.cn/api/v6/direct/media_org_info?skip=0&top=100&sort=name%20asc%2C%20created%20desc&fields=name%2C%20created' \
  -H 'Accept: */*'
```

- **请求 URL**：

  ```
  https://v3.steedos.cn/api/v6/direct/media_org_info?
    skip=0
    &top=100
    &sort=name asc, created desc
    &fields=name,created
  ```

- **请求头**：若需要授权，需附加 Token 或 Cookie

---

## 响应示例

成功时将返回类似以下 JSON 数据：

```json
{
  "data": [
    {
      "_id": "68425b8e88d35b0608af75a9",
      "name": "上海孵化软件科技有限公司",
      "created": "2025-06-06T02:55:58.262Z"
    }
  ],
  "totalCount": 1
}
```

- `data`：为记录数组，每个对象对应一条记录，包含相应字段  
- `totalCount`：符合条件的记录总数，可用于多页查询时做分页计算

---

## 总结

通过以上示例与说明，可以快速上手华炎魔方提供的 OpenAPI 接口，实现从身份验证、查询记录到增删改查等低代码开发需求。在实际项目中逐步扩展更多示例或结合特定业务逻辑，即可构建更灵活、更高效的应用与集成方案。
