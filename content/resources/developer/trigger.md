---
title: "对象触发器配置案例"
description: "项目对象触发器应用入门指南：在业务对象发生增、删、改、查操作时，通过触发器自动执行自定义逻辑，实现业务场景开发，助力您高效构建灵活的项目管理与数据处理流程。"
slug: "trigger"
blog: "developer"
status: "published"
cover: "/images/cms/684bc7f85c7a28060df6980e.webp"
created: "2025-06-13T06:36:49.411Z"
modified: "2025-06-13T06:43:02.351Z"
b6_id: "684bc7015c7a28060df697ff"
---

## 概述与基础概念

华炎魔方对象触发器（Trigger）是当对象（表）发生增、删、改、查操作时，自动执行的脚本函数。它可以帮助我们在这些数据操作的前后时机点插入自定义逻辑，实现多样化的业务需求：  

- 插入前校验数据或自动补充字段；  
- 删除前阻止非法删除；  
- 更新后同步其他相关对象数据；  
- 查询前后对结果做权限或数据格式化处理；  
- ……

### 触发器的执行时机

- beforeInsert / afterInsert: 在新记录插入数据库之前/之后执行  
- beforeUpdate / afterUpdate: 在记录更新数据库之前/之后执行  
- beforeDelete / afterDelete: 在记录删除数据库之前/之后执行  
- beforeFind / afterFind: 在数据库查询之前/之后执行  

### 触发器的可用参数

当触发器被调用时，会传入一个上下文 ctx。除了常见的 ctx.params 里包含的 isInsert、doc、userId 等关键信息外，还可以使用以下一些全局可用对象和参数：  

- global: {_: lodash, moment, validator, filters}  
  - _: lodash 工具库，提供聚合、数组、对象等众多实用函数  
  - moment: 时间处理库，用于格式化日期、计算时间差等  
  - validator: 字符串验证库（验证邮箱、URL 等）  
  - filters: Steedos 自带的过滤器函数  
- objects: 系统中定义的所有业务对象，可以通过 objects["对象APIName"] 获取并进行 CRUD、查询等操作  
- services: 系统中的所有服务，按需调用其他可用的微服务逻辑  

通过这些参数，可以在触发器中更灵活地处理数据、调用跨对象或跨服务的功能。

## 场景说明

本案例基于一个项目管理场景中的“项目”对象(API 名称：project1)。我们将围绕该对象的创建、更新、删除、查询，演示常见的触发器逻辑需求，包括：  

- 创建项目时自动指定当前用户为所有者；  
- 更新项目时根据状态变化自动填充结束日期；  
- 删除项目时若锁定则禁止；  

## 环境准备

在正式编写触发器之前，请先确认已创建并配置好相关的业务对象与所需字段。

![](/images/cms/684bc70b5c7a28060df69800.webp)
![](/images/cms/684bc7105c7a28060df69802.webp)

## 触发器入口

使用具有管理员权限的账号进入项目对象的“触发器”设置页面，添加或编辑触发器脚本以实现所需的业务逻辑。

![](/images/cms/684bc7135c7a28060df69804.webp)
![](/images/cms/684bc7155c7a28060df69806.webp)

## 示例代码

下面是一段示例代码，使用触发器 + global + objects + services，展示了如何针对 “project1” 对象编写触发器，并在逻辑中使用 ctx、global、objects、services 等。

### 在新建项目前，自动填写 项目经理 和默认状态

```js
// 1. 在插入项目前，自动填写 项目经理 和默认状态
const { isInsert, doc, userId } = ctx.params;

if (isInsert) {
    // 设置当前用户为项目经理
    doc.manager = userId;

    const defdoc = {};
    // 如果没有设置状态，则设置为“进行中”
    if (!doc.status) {
        defdoc.status = "进行中";
    }

    // 示例：使用 lodash 进行去重处理
    const { _ } = global;
    if (defdoc.staff && Array.isArray(doc.staff)) {
        defdoc.staff = _.uniq(doc.staff);
    }
    return {
        doc: defdoc
    }
}
```
![](/images/cms/684bc71a5c7a28060df69808.webp)

### 修改记录后，如果项目从“进行中”变为“已完成”，自动设置结束日期

```js
// 2. 更新后，如果项目从“进行中”变为“已完成”，自动设置结束日期
const { isUpdate, id, doc, previousDoc } = ctx.params;

if (isUpdate) {
    // 若项目状态从“进行中”变为“已完成”，且没有填结束日期
    if (previousDoc.status !== "已完成" && doc.status === "已完成" && !doc.end) {
        // 示例：使用 moment
        const { moment } = global;
        const today = moment().format("YYYY-MM-DD");

        // 通过 objects 对该记录进行二次更新
        await objects.project1.update(id, { end: today });

        // 示例（仅示意）：调用 services 中某个日志服务记录审计
        // services["auditLogger"].call("writeLog", { message: `项目${id}已完成` });
    }
}
```
![](/images/cms/684bc71c5c7a28060df6980a.webp)

### 删除记录前，如果记录已锁定(locked)就禁止删除

```js
// 3. 删除前，如果已锁定(locked)就禁止删除
const { isDelete, id } = ctx.params;
const record = await objects.project1.findOne(id);

if (isDelete && record.locked) {
    // 抛出错误，阻止后续删除操作
    throw new Error("该项目已锁定，无法删除！");
}
```

![](/images/cms/684bc71e5c7a28060df6980c.webp)

## 代码要点

### 使用 global

- 您可以通过 global._ (lodash) 对数组、对象做快速处理。  
- global.moment 用于各种日期操作。  
- global.validator 可用于验证邮箱、URL 等字符串格式。  

### 使用 objects

- 通过 objects["project1"] 可对同一个或其他对象进行 CRUD、find 等操作。  
- 在 afterUpdate 等阶段使用二次更新时，要注意可能引发重复触发器调用，应妥善设计逻辑避免死循环。  

### 使用 services

- 可以通过 services["serviceName"] 调用平台或自定义的微服务，实现记录审计日志、与其他系统对接等跨系统功能。  

### 错误抛出与事务回滚

- 在 before* 阶段 (如 beforeInsert、beforeUpdate、beforeDelete) 中通过 throw new Error("xxx") 可直接中断操作并回滚事务。  
- 在 after* 阶段出现异常通常不会回滚已完成的数据库操作，需要视实际需求做补偿或提示。  

## 总结

在“项目”对象的生命周期内，每一次插入、更新、删除、或查询都能借助触发器执行自定义逻辑，并可访问如 global（lodash、moment、validator）、objects、services 等丰富资源来满足更复杂的业务需求。学会灵活运用这些触发器功能后，您可以轻松实现权限隔离、字段自动填充、跨对象联动及数据审计等高级功能，为“项目(演示)”及更多业务对象带来更高效、可维护的自动化流程。
