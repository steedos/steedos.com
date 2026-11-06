---
title: "Records API"
description: "Records API是华炎魔方低代码平台为开发人员提供的关键接口，用于对平台中各种业务对象的数据执行增删改查等操作。通过调用本接口，您可以实现对象数据在前端系统和华炎魔方服务端之间的快速交互，包括创建新记录、查询并筛选数据、更新或删除记录等。"
slug: "records-api"
blog: "developer"
status: "hidden"
created: "2025-05-23T07:25:18.330Z"
modified: "2025-05-23T07:33:47.800Z"
b6_id: "683022de5c7a28060df6978f"
---

Records API 是华炎魔方低代码平台为开发人员提供的关键接口，用于对平台中各种业务对象的数据执行增删改查等操作。通过调用本接口，您可以实现对象数据在前端系统和华炎魔方服务端之间的快速交互，包括创建新记录、查询并筛选数据、更新或删除记录等。它在便捷性和灵活性上具备显著优势，可以帮助开发者大幅缩短开发周期，并提升整体系统的可维护性。

在使用 Records API 的过程中，开发者无需深入了解底层数据库的结构和实现机制，就能方便地进行数据查询与更新，这在构建自定义应用、管理业务数据和实现与第三方系统的集成时尤为高效。通过灵活运用分页、过滤、排序以及外部 ID 操作等功能，您可以根据项目需求灵活地定制数据访问策略，从而构建出更加丰富和多样化的业务应用场景。

本章节将系统介绍如何通过 Records API 进行创建、查询、更新与删除等常见操作，并附带结合场景的示例和示范性代码片段，以帮助您快速掌握本接口的使用方法，顺利落地到实际项目中。

## 认证要求 

要调用 Records API，通常需要携带有效的身份凭据（例如 Bearer Token）。当用户成功登录或通过其他授权方式获取令牌后，需要在每次请求时在请求头中附加该令牌，以保证请求确实来自合法用户或系统。示例：

```
Authorization: Bearer apikey,<Your_API_KEY>
```

如果未携带或携带了失效的认证信息，系统将返回相应的错误码（如 HTTP 401 Unauthorized），提示身份验证失败。确保在正式开发环境中保管好密钥与令牌，不要将其暴露给无关人员。

## 创建记录 

在华炎魔方中，可以使用 POST /api/v6/direct/{objectName} 接口来创建一条新的对象记录。通常，如果不指定 _id，系统会自动生成一个唯一 ID 并附加到返回结果中。以下是一个示例场景：您希望在对象“customer”中存储一条新客户信息，包括姓名和年龄。

示例请求： 
```
POST /api/v6/direct/customer
Content-Type: application/json
Authorization: Bearer <Your_JWT_Token>

{
  "name": "张三",
  "age": 25
}
```

如果请求成功，接口将返回新创建记录的详细信息，其中包含系统自动生成的 _id、created、owner 等字段：

```
{
  "_id": "f5e2b3c4-1b1b-4b1b-9b1b-1b1b1b1b1b1b",
  "name": "张三",
  "age": 25,
  "created": "2025-05-19T06:21:15.701Z",
  "created_by": "current_user_id",
  "modified": "2025-05-19T06:21:15.701Z",
  "modified_by": "current_user_id",
  "owner": "current_user_id",
  "space": "current_tenant_id"
}
```

## 查询记录 

如果需要检索某个对象内的记录，可以使用 GET /api/v6/direct/{objectName} 接口来查看记录列表，并可结合各种查询参数进行过滤、排序和分页。以下是常见的查询操作：

### 基本查询

```
GET /api/v6/direct/customer
Authorization: Bearer <Your_JWT_Token>
```

请求结果将返回所有可见的“customer”记录，每页默认返回 100 条。

### 分页和排序

当数据量较大时，可使用 skip 和 top 参数进行分页处理，并使用 sort 参数对结果排序。如下示例展示了分页和对“created”字段进行降序排列的请求方式：
```
GET /api/v6/direct/customer?skip=100&top=50&sort=created desc
Authorization: Bearer <Your_JWT_Token>
```

### 过滤

可使用 filters 参数进行复杂的条件筛选。下面的例子表示筛选年龄大于 20 的客户：
```
GET /api/v6/direct/customer?filters=["age",">",20]
Authorization: Bearer <Your_JWT_Token>
```
filters 可以接收更复杂的嵌套数组结构，从而实现多重条件的逻辑组合。

## 查询指定字段 

可以指定需要返回的字段列表，以减少网络流量和提高性能。可使用逗号分隔或数组格式。例如 fields=name,created。  

示例：获取年龄大于 20，并且只显示 name 与 age 字段的前十条记录：

```
GET /api/v6/direct/customer?filters=["age", ">", 20]&top=10&fields=name, age
Authorization: Bearer <Your_JWT_Token>
```

## 排序

为了让列表数据显示具有更高的可读性，通常需要对结果进行排序。sort 参数能够指定排序字段和顺序，多个字段可使用英文逗号隔开，如下示例：

```
GET /api/v6/direct/customer?sort=name asc, age desc
Authorization: Bearer <Your_JWT_Token>
```

上例先按姓名升序排列，如果姓名相同再按年龄降序排列。灵活使用此参数便于在列表视图或数据导出场景中保持数据的一致性。

## 更新记录 

通常，可通过两种方式单独更新记录：直接使用 PATCH /api/v6/direct/{objectName}/{id}，或根据外部字段进行更新。先介绍最常见的按 ID 更新方式：

如果您想更新某个客户记录的年龄字段（假设 _id 为 recABC123），可以执行如下操作：

```
PATCH /api/v6/direct/customer/recABC123
Content-Type: application/json
Authorization: Bearer <Your_JWT_Token>

{
  "age": 30
}
```

成功后，返回值中可见最新更新时间和修改人信息。例如：
```
{
  "_id": "recABC123",
  "name": "张三",
  "age": 30,
  "created": "2025-05-19T06:21:15.701Z",
  "created_by": "current_user_id",
  "modified": "2025-06-01T08:00:00.000Z",
  "modified_by": "admin_user_id",
  "space": "current_tenant_id",
  "owner": "current_user_id"
}
```

这种部分更新方式在应对需求频繁变动的场景下极为灵活，例如在线编辑客户信息或动态更新表单。

## 批量更新 

当需要一次性更新多个记录时，可使用 PATCH /api/v6/direct/{objectName} 并在请求体中附上多个记录的数据。对于希望批量更新“customer”对象中若干客户的年龄信息，示例请求如下：

```
PATCH /api/v6/direct/customer
Content-Type: application/json
Authorization: Bearer <Your_JWT_Token>

{
  "records": [
    {
      "_id": "recABC123",
      "age": 28
    },
    {
      "_id": "recXYZ456",
      "age": 35
    }
  ],
  "performUpsert": false
}
```

当 performUpsert 为 false 时，如果指定的 _id 不存在，则该条记录不会被新增。而当 performUpsert 为 true 时，系统会在找不到时自动插入新记录。此功能适用于需要一次性同时更新多个客户档案、产品项、订单等场景，大幅减少 API 调用次数。

## 删除记录 

删除记录时，可使用 DELETE /api/v6/direct/{objectName}/{id} 进行单条删除。如果您确定要删除主键为 recXYZ456 的客户记录，示例请求如下：

```
DELETE /api/v6/direct/customer/recXYZ456
Authorization: Bearer <Your_JWT_Token>
```

请求成功后，响应通常包括 HTTP 200 状态码，表示该记录已被删除。请谨慎操作，因为删除会永久移除记录（具体是否支持回收站功能取决于部署配置），在生产环境最好做二次确认。

## 批量删除 

若要一次性删除多条记录，可使用 DELETE /api/v6/direct/{objectName} 接口，并通过请求体传入需要删除的记录 ID 列表。假设您要删除多位客户，同时删除 ID 为 recABC123 和 recXYZ456 的记录，请执行如下请求：

```
DELETE /api/v6/direct/customer
Content-Type: application/json
Authorization: Bearer <Your_JWT_Token>

{
  "records": [
    "recABC123",
    "recXYZ456"
  ]
}
```

成功响应后这些记录即可被移除，无需多次调用接口。此功能常用于批量的数据清理、归档或执行定期维护操作。

## 外部 ID 操作 

在某些情况下，您可能拥有别的业务系统分配的唯一外部 ID，可以无需直接使用华炎魔方内部的 _id，而是通过外部 ID 来进行查询、更新和删除。例如，如果某个“customer”对象配置了字段 externalId，可以使用 GET /api/v6/direct/{objectName}/{fieldName}/{fieldValue} 根据外部 ID 执行查询：

```
GET /api/v6/direct/customer/externalId/CUS-10086
Authorization: Bearer <Your_JWT_Token>
```

若要根据外部 ID 更新一个客户记录，可执行：
```
PATCH /api/v6/direct/customer/externalId/CUS-10086
Content-Type: application/json
Authorization: Bearer <Your_JWT_Token>

{
  "age": 40
}
```

外部 ID 操作对于在多系统之间打通数据，或在迁移时保持原系统数据的标识有重要意义。

## 单条记录的查询 

如果只想根据 _id 获取单条记录，每个对象都提供了 GET /api/v6/direct/{objectName}/{recordId} 接口。例如查询主键为 recABC123 的客户信息，请求如下：
```
GET /api/v6/direct/customer/recABC123
Authorization: Bearer <Your_JWT_Token>
```

返回的结果是该记录完整数据的 JSON 格式。（若指定的 _id 不存在，会返回空结果或相应的错误信息。）

## 错误处理与调试 

在使用 Records API 的过程中，如果请求参数不正确或缺少必要的认证信息，通常会返回 HTTP 4xx（如 400、401、404 等），并在响应体中附上可读的错误描述。常见错误及含义：

1. 400 Bad Request：请求格式或字段有误，服务器无法处理请求。  
2. 401 Unauthorized：认证失败或令牌失效，需要重新登录获得有效 Token。  
3. 404 Not Found：指定的对象或记录未找到。  
4. 500 Internal Server Error：服务器端产生了未知错误或异常，需要联系系统管理员。  

在调试时，为了提高效率，建议在请求时打开日志或在客户端中捕捉并打印完整的 HTTP 响应数据（尤其是 status code 和响应体），并结合系统日志来快速定位问题所在。

## 使用场景示例 

假设您在构建一个在线教育管理系统，需要管理“student”对象中的大量学生数据，并对其执行增删改查操作。常见需求包括：

1. 创建学生档案：新增学生时，需要记录姓名、年龄、班级和联系方式，以便后续在排课或考试管理中进行检索和统计。  
   ```
   POST /api/v6/direct/student
   Content-Type: application/json
   Authorization: Bearer <Your_JWT_Token>

   {
     "name": "李四",
     "age": 18,
     "class": "高三（1）班",
     "phone": "13800138000"
   }
   ```

2. 查询学生名单：需要根据班级、姓名关键字等搜索条件进行筛选，还可根据“age”字段进行排序，以快速浏览符合特定条件的学生。  
   ```
   GET /api/v6/direct/student?filters=[["class","=","高三（1）班"],"and",["name","contains","李"]]&sort=age asc
   Authorization: Bearer <Your_JWT_Token>
   ```

3. 更新学生信息：学生年级升级后或联系方式变化时，调用 PATCH /api/v6/direct/student/{id} 即可修改对应字段，避免重复创建档案或手工迁移数据。  
4. 删除学生记录：毕业生信息或因其他原因需要清除档案，可通过 DELETE /api/v6/direct/student/{id} 进行安全删除；若要批量移除多个毕业生，可调用批量删除接口。  

通过以上场景示例，可以看出 Records API 在常见的基础业务数据处理上具备简洁与高效的特点，对于需要频繁管理实体记录的系统尤为适用。
