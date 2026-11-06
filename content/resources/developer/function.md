---
title: "华炎魔方对象函数应用指南"
description: "借助对象函数，自定义接口，灵活扩展业务流程，实现自动化与高效协作。"
slug: "function"
blog: "developer"
status: "published"
cover: "/images/cms/68538aae5c7a28060df6981c.webp"
created: "2025-06-19T03:55:28.858Z"
modified: "2025-06-19T04:07:41.737Z"
b6_id: "68538a305c7a28060df6981b"
---

## 对象函数简介

华炎魔方中的对象函数（Object Function）可以帮助快速实现各种业务逻辑。

例如：在项目管理场景中，当用户点击“任务完成”按钮时，通过后台调用对象函数，将对应任务状态更新为“已完成”。

### 应用场景

- 处理业务流程中的关键操作（如：任务完成、里程碑更新、审批流程等）  
- 自动化常见数据更新（如：批量归档合同、一次性更新相关字段等）  
- 提供可通过 API 访问的自定义接口，为外部系统或前端页面调用  

## 对象函数创建

1. 打开“设置”应用 → “自定义应用” → “对象”，选择目标对象，进入对象详情页面后，在“函数”选项卡中点击“新建”。  
2. 填写“API名称”：该名称需符合以下规则：只能包含小写字母、数字，必须以字母开头，不能以下划线字符结尾或包含两个连续的下划线字符。  
3. 如果要立即启用该函数，勾选“已启用”。  
4. 在代码编辑框中编写 JS 逻辑。  
5. 如果需要启用 API 访问（POST 和 GET 请求），则勾选“启用API”。访问路径格式参考：  
   {ROOT_URL}/api/v1/:objectName/functions/:functionApiName  
6. 根据需要为函数填写“备注”。  
7. 点击“保存”完成创建。

![](/images/cms/68538adc5c7a28060df6981d.webp)

### 注意

1. 启用函数：确保已勾选“已启用”才能正常被调用。  
2. 测试函数：若勾选“启用API”，可通过 POST/GET 请求测试函数，也可在代码中自行调用。  
3. 如需在函数中引用其他对象或进行数据库操作，可使用系统提供的全局变量或方法（见下文“代码编写说明”）。  

## 代码编写说明

### 变量说明

在对象函数的代码编辑区域内，可直接使用以下变量与方法来实现业务逻辑：

1. global  
   - global._：JavaScript 实用工具库（Lodash）。  
   - global.moment：强大的日期处理库，可执行解析、计算与格式化等操作。  
   - global.validator：字符串验证与清理库。  

2. objects：对象元数据访问入口，可执行对象 CRUD 操作。示例： 

   ```js
   const contractDocs = await objects.contracts.find({
     filters: [["is_archived", "=", true]]
   });
   ```

3. ctx：函数上下文对象。常用属性：

   - ctx.input：函数的参数；若函数启用了 API，则包含 HTTP 请求的 Body、Query、Params。  
   - ctx.params.userId：当前用户 ID。  
   - ctx.params.spaceId：当前工作区 ID。  
   - ctx.broker：Broker 实例，可通过它调用其他 Action。  
   - ctx.getObject(objectName)：获取对象实例，与 objects 类似，可进行 CRUD 操作。  
   - ctx.getUser(userId, spaceId)：获取用户信息。  

### 在函数中调用另一个函数

若需在对象函数内调用同一对象或其他对象的函数，可使用 runFunction 方法。示例：  

```js
const obj = ctx.getObject("contracts"); // 获取目标对象实例
const input = {}; // 传递到被调用函数的参数
const userSession = await ctx.getUser(userId, spaceId); // 获取用户信息
const result = await obj.runFunction("test", input, userSession); 
// “test”是目标函数的API名称；如需用户上下文，则传 userSession
return result;
```

### 函数返回值格式

对于启用了 API 的函数，其返回值会自动包装为以下格式并作为接口响应：

```json
{
  "status": 0,      // 函数执行状态：0 表示成功，非 0 表示失败
  "msg": "",        // 执行结果描述信息
  "data": result    // 函数的实际返回值
}
```

### 调试

可通过 console.log 进行调试，输出关键信息以确认逻辑无误。

## 项目管理场景示例

在项目管理中，经常需要在用户点击按钮后，将任务状态更新为“已完成”。通过对象函数可轻松实现此需求。

### 创建函数

以“项目任务”对象（示例对象名为 task1）为例，在该对象中新建函数： 

- API 名称：task_completed  
- 函数代码示例：

```js
const { projectTaskId } = ctx.input; // 从参数中获取任务ID
const projectTaskObj = ctx.getObject("task1");
const projectTaskDoc = {
  has_complete: true,
  completed_date: new Date()
};
const result = await projectTaskObj.update(projectTaskId, projectTaskDoc);
return result;
```
配置完成后，可以在对象详情页面右上角使用“请求API”进行测试。

![](/images/cms/68538b695c7a28060df6981f.webp)

### 配置按钮调用函数

在“项目任务”对象中，为用户提供一个“任务完成”按钮，并调用刚创建的函数：  

1. 新增按钮：在对象设置中，找到“操作按钮”选项卡来新增页面业务按钮。  

![](/images/cms/68538b6f5c7a28060df69821.webp)

2. 定义请求接口：

按钮基础设置完成后，进入设计器来设置按钮逻辑；选中按钮后，可以看到右侧属性中出现事件，新增点击事件后选择“发送请求”类型事件即可；

   ![](/images/cms/68538b745c7a28060df69823.webp)
   ![](/images/cms/68538b795c7a28060df69825.webp)

   - 在按钮事件配置中选择“发送请求”类型，并指定接口地址为：  
     /api/v1/task1/functions/task_completed  
     
   ![](/images/cms/68538b7d5c7a28060df69827.webp)



3. 发送请求示例（POST），在 Body 中传入 projectTaskId：  
   - 在 HTTP 配置“发送数据”中添加相关参数。 

   ![](/images/cms/68538b805c7a28060df69829.webp)

4. 一旦调用成功，需要给用户提示信息。  

   ![](/images/cms/68538b825c7a28060df6982b.webp)

5. 如果需要刷新当前记录页面，可在函数调用完成后，再添加一个“刷新页面”的事件。  

   ![](/images/cms/68538b855c7a28060df6982d.webp)

### 最终效果

通过以上接口定义以及按钮逻辑配置，就实现我们的“任务按钮”的业务需求了。

   ![](/images/cms/68538b8b5c7a28060df6982f.webp)

## 总结

通过“对象函数”可以灵活地实现业务逻辑，并支持通过 API 或系统内部调用。结合以上项目管理场景示例，您可在各类业务需求中自定义更多函数来提升效率与可维护性。  
如有更复杂的业务场景，您可以继续创建更多对象函数进行搭配，实现更完善的业务逻辑。
