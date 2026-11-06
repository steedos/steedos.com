---
title: "面向对象的跨数据库查询语法ObjectQL"
description: "ObjectQL 是一种面向对象的跨数据库查询语法。 用统一的语法形式来对平台中的结构化数据对象执行创建 (Create)、读取 (Read)、更新 (Update)、删除 (Delete) 等操作。"
slug: "objectql"
blog: "developer"
status: "published"
cover: "/images/cms/6846959a5c7a28060df697f6.webp"
created: "2025-06-09T08:03:37.345Z"
modified: "2025-06-20T03:50:11.059Z"
b6_id: "684695595c7a28060df697f5"
---

ObjectQL 是一门与 Steedos 平台中的数据对象交互的查询语言，灵感源自 SQL。本质上，ObjectQL 用统一的语法形式来对平台中的结构化数据对象执行创建 (Create)、读取 (Read)、更新 (Update)、删除 (Delete) 等操作——这些对象数据可以存储在不同种类的数据库（MongoDB、MySQL、PostgreSQL 等）当中。对于开发人员来说，这意味着无需操心底层数据库的差异，就能在同一个查询语言层面进行跨库操作和数据管理。

## 核心概念和名词解释

在深入了解具体的函数调用之前，以下概念对于理解 ObjectQL 十分重要：

1. 对象 (Object)  
   - 在 Steedos 平台中，“对象”是对数据的逻辑抽象，一个对象类似一张“表”或“集合”。例如，“accounts” 就可能是一个关于客户或账户信息的对象。  
   - objectApiName 指对象的唯一标识或开发名 (如 accounts、tasks、leads 等)。

2. 触发器 (Trigger)  
   - 触发器是一段在数据库操作前后自动执行的逻辑，用于满足业务需求或扩展系统功能。在执行操作（如插入、更新、删除、查找）时，ObjectQL 会在相应时机触发相应的触发器（beforeInsert、afterInsert 等）。  
   - 在 Steedos Admin 中编写触发器时，可以在对应对象的配置中编写函数，以便在执行 CRUD 操作时自动执行该函数。

3. userSession (用户会话)  
   - userSession 通常包含用户 ID、权限信息以及其他与当前登录用户相关的数据。  
   - 当进行数据操作时，需要将 userSession 传给 ObjectQL，以便在执行操作前后进行权限验证。如果用户权限不足，将抛出错误。

4. 权限检查  
   - ObjectQL 方法执行时会自动进行权限检查，只有在传入 userSession 并检测到用户拥有相应权限的情况下，操作才会被允许。  
   - 若未提供正确的 userSession，可能导致无法进行权限校验，引发安全风险。

5. 忽略触发器 (direct 方法)  
   - 若需要绕过触发器（如批量导入、数据迁移等场景），可使用 directFind、directInsert、directUpdate、directDelete、directAggregate 等方法，这些方法不会执行触发器也不会进行权限校验。需评估安全风险后再使用。

## 获取对象实例

当您在定义触发器时，可使用以下方式来获取对象实例：

```js
objects.<objectApiName>
```

例如，如果要在触发器中获取 “accounts” 对象，则写：  
```js
objects.accounts
```

此后，就可以基于该对象实例来调用各种 ObjectQL 方法。

## ObjectQL 的增删改查 (CRUD) 方法

ObjectQL 提供了一系列核心方法来执行数据库中的 CRUD 操作。以下示例都基于在触发器中通过 objects.< objectApiName >获取到对象后进行调用。

### find

用于查找符合条件的多条记录，会依次触发 beforeFind 和 afterFind 触发器。

• 用法:  

```js
  objects.<objectApiName>.find(query, userSession?)
```
• 参数说明:  
  - query: JSON（可选，用于指定查找条件和投影字段）  
    - fields: Array → 指定要返回的字段列表，例如 ['field1', 'field2']。若不指定，默认返回所有字段。  
    - filters: Array → 多维数组，用于设置查询过滤规则（见下文“查询过滤器语法”）。  
    - sort: String → 排序方式，例如 'name desc'。  
    - top: Number → 要返回的记录数。  
    - skip: Number → 要跳过的记录数（常用于分页）。  
  - userSession: (可选) 用户会话。若要进行权限校验，必须传入。

• 返回结果:  
  - 满足条件的记录数组。如果无匹配记录，则返回空数组 []。

#### 示例代码

```js
const records = await objects.accounts.find(
  {
    fields: ['name', 'owner'],
    filters: ['owner', '=', userSession.userId],
    sort: 'name desc'
  },
  userSession
);
```

#### 场景说明

- 场景 1：获取当前用户拥有(owner)的账户信息，并返回 name 和 owner 字段，按 name 倒序排列。  
- 触发器执行时，会先后调用 beforeFind() 和 afterFind() 做业务逻辑扩展。

---

### findOne

用于查找特定 ID 的单条记录，会依次触发 beforeFind 和 afterFindOne 触发器。

• 用法:  

```js
  objects.<objectApiName>.findOne(id, query, userSession?)
```

• 参数说明:  
  - id: String | Number → 记录的唯一主键。  
  - query: JSON（可选），可以指定 fields 等其他参数。  
  - userSession: (可选) 用户会话，用于权限验证。

• 返回结果:  
  - 符合条件的记录 JSON。如果找不到对应记录，通常返回 null 或抛出异常（取决于对象配置）。

#### 示例代码

```js
const record = await objects.accounts.findOne(
  'CChCmkiHrNeTM9jgA',
  {
    fields: ['name', 'owner']
  },
  userSession
);
```

#### 场景说明

- 场景 2：在触发器中只需要获取某个具体账户(通过 ID 查找)的部分字段，可使用 findOne。

---

### insert

插入（创建）一条新记录，依次触发 beforeInsert 和 afterInsert 触发器。对于某些对象（如任务），系统可能自动给相关用户发送通知。

• 用法: 

```js
  objects.<objectApiName>.insert(doc, userSession?)
```

• 参数说明:  
  - doc: 需要插入的字段 JSON 对象。必须包含对象要求的必填字段，否则插入会失败。  
  - userSession: 可选，用于权限校验。

• 返回结果:  
  - 成功插入后的记录，包括自动生成的系统字段（id、owner、created_by、created 等）。

#### 示例代码

```js
const newRecord = await objects.accounts.insert(
  {
    name: '新插入的账户名称'
  },
  userSession
);
```

#### 场景说明

- 场景 3：创建新账户时，必须填写 name 字段；space、id、owner 等由系统维护。  
- 会依次调用 beforeInsert 和 afterInsert 触发器。

---

### update

更新 (修改) 指定记录的某些字段，依次触发 beforeUpdate 和 afterUpdate 触发器。对于特定对象（如任务），更新后也可通知相关人员。

• 用法:  

```js
  objects.<objectApiName>.update(id, doc, userSession?)
```

• 参数说明:  
  - id: String | Number → 待更新记录的唯一标识。  
  - doc: JSON → 要更新的键值对，若无权限或字段不存在会抛出异常。  
  - userSession: 可选，用于权限校验。

• 返回结果:  
  - 更新后的完整记录数据。

#### 示例代码

```js
const updatedRecord = await objects.accounts.update(
  'CChCmkiHrNeTM9jgA',
  {
    name: '更新后的账户名称'
  },
  userSession
);
```

#### 场景说明

- 场景 4：对已有账户的 name 字段进行更新，其他字段保持不变。  
- 在触发前后会调用 beforeUpdate 与 afterUpdate，以便执行相应的业务逻辑。

---

### delete

删除指定 ID 的记录，依次触发 beforeDelete 和 afterDelete 触发器。对于特殊对象（如任务），删除后也可发送通知或执行其他逻辑。

• 用法:  

```js
  objects.<objectApiName>.delete(id, userSession?)
```

• 参数说明:  
  - id: String | Number → 待删除记录的主键 ID。  
  - userSession: 可选，用于权限校验。

• 返回结果:  
  - 被删除的记录。

#### 示例代码

```js
const deletedRecord = await objects.accounts.delete(
  'CChCmkiHrNeTM9jgA',
  userSession
);
```

#### 场景说明

- 场景 5：删除一条已不再需要的账户记录。  
- 会依次调用 beforeDelete 和 afterDelete，执行必要的收尾或通知逻辑。

## 权限检查 (userSession)

当使用上述 .find、.findOne、.insert、.update、.delete 等方法时，会根据所传入的 userSession 进行权限校验：

- 判断当前用户是否有权限读写该对象；  
- 判断用户是否可写入或修改字段；  
- 如果违规，抛出异常；  
- 确保安全访问，防止越权操作。

若在触发器或其他业务逻辑中忘记传入 userSession，默认会跳过权限检查，有较大潜在风险。

:::warning
一定要在操作数据时传入 userSession 以确保正确的权限验证！
:::



## 查询过滤器语法

在调用 .find、.findOne 等方法时，可以通过 filters 参数来筛选数据。filters 通常以数组形式传入，可包含一个或多个条件。  

### 常用操作符

• "=" : 等于  
• "!=" : 不等于  
• ">" : 大于  
• ">=" : 大于等于  
• "<" : 小于  
• "<=" : 小于等于  
• "startswith" : 以...开始  
• "contains" : 包含  
• "notcontains" : 不包含  
• "between" : 范围查询，仅支持数字或日期时间类型  

### 基础用法

示例 1：  
```js
filters: [
  ["priority", "=", "high"],
  ["owner", "=", "{userId}"],
  ["created", "=", this_month]
]
```
• 同时满足优先级为 "high"、指派给当前用户且创建时间在本月的记录。  
• 如果不显式写 and 或 or，系统默认使用 and。

示例 2：  
```js
filters: [
  ["status", "=", ["closed", "open"]]
]
```
• 当 "=" 配合数组时，会自动拆分成多个 or 条件，实现 in 功能。  
• 等价于 [ [ "status", "=", "closed" ], "or", [ "status", "=", "open" ] ]。

示例 3：  
```js
filters: [
  ["age", "between", [20, 30]]
]
```
• 相当于 age >= 20 and age <= 30。  
• 若 [20, null]，则只会保留 age >= 20；若 [null,30]，则只会保留 age <= 30。

### 组合过滤器

可以使用 "and" 或 "or" 在不同条件之间组合。例如：

• [ [ "value", ">", 3 ], "and", [ "value", "<", 7 ] ]  
• [ [ "value", ">", 10 ], "or", [ "value", "<", 3 ] ]

若不指定逻辑操作符，系统默认使用 "and"。

### 日期时间字段

Steedos 中，日期和时间字段以 UTC 存储：  
- 对日期类型字段，系统保存为 UTC 时区的 00:00:00。  
- 若按本地时间筛选，需先将时间转换为 UTC 再查询。

示例(北京时间 2019-08-06 15:00:00 转为 UTC 2019-08-06T07:00:00Z)：  
```js
filters: [
  ["created", "<=", "2019-08-06T07:00:00Z"]
]
```
## 业务应用代码示例

删除记录前，如果记录已锁定(locked)就提醒用户禁止删除记录

```js
const { isDelete, id } = ctx.params;
const record = await objects.project1.findOne(id);

if (isDelete && record.locked) {
    // 抛出错误，阻止后续删除操作
    throw new Error("该项目已锁定，无法删除！");
}
```

![](/images/cms/684bc71e5c7a28060df6980c.webp)
