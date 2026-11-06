---
title: "Node-RED自定义触发器"
description: "本文将详细介绍如何利用Node-RED结合华炎魔方触发器，实现可视化数据校验开发，并通过项目与任务管理的场景案例，帮助您快速理解并应用这一整合方案，为企业运营与协作带来高效助力。"
slug: "node-red-trigger"
blog: "developer"
status: "published"
cover: "/images/cms/682fde995c7a28060df69776.webp"
created: "2025-05-23T02:26:50.689Z"
modified: "2025-06-09T07:30:09.462Z"
b6_id: "682fdcea5c7a28060df6976b"
---

华炎魔方低代码开发平台为企业数字化转型带来全新思路，借助Node-RED这种图形化编排工具，可以更轻松地搭建自动化流程，实现多系统的数据融合与业务流转。本文将详细介绍如何利用Node-RED结合华炎魔方触发器，实现可视化数据校验开发，并通过项目与任务管理的场景案例，帮助您快速理解并应用这一整合方案，为企业运营与协作带来高效助力。

##Node-RED简介

Node-RED是一款基于Node.js的可视化编排工具，提供拖拽式的节点连接方式来构建流程逻辑。它通过大量的内置节点以及社区节点，能够轻松与外部服务、数据库和不同系统进行对接，无需繁杂的代码开发便可搭建复杂的业务编排。对于需要快速完成API开发、维护和自动化操作的企业来说，Node-RED是一种低门槛、高效率的选择。借助它可以以流程图的方式对数据进行处理、逻辑判断、触发事件，甚至将不同系统的接口统一整合。

在Node-RED的流程设计页面内，用户可以使用各类节点进行输入输出操作，比如HTTP In/Out节点、Function节点、时间触发节点等，还能对接MQTT、数据库、云端平台等。正因如此，Node-RED一直以来是企业自动化、物联网应用与系统集成爱好者的心仪工具之一。

## 华炎魔方触发器简介

华炎魔方的对象触发器可根据不同运行时（如新增、修改、删除或查询记录的前后）自动执行相应的业务逻辑，实现对对象数据的精细化管控。无论是选择“接口”类型，通过配置URL与外部系统交互，还是选择“代码”类型自定义脚本，触发器都能高效地将对象事件与后端逻辑联动起来，使复杂流程的管理与扩展更加灵活便捷。

## 需求说明

在项目业务对象（project）中，当用户新建或编辑记录时，需要对“启动日期(kickoff)”和“截止日期(deadline)”这两个字段进行校验，确保项目截止日期必须大于项目启动日期。只有当截止日期大于启动日期时，才能提交并保存，否则给出错误提示，禁止提交保存该条记录。此需求功能可以直接使用华炎魔方对象上的验证规则来直接配置；

![](/images/cms/682fdcf75c7a28060df6976c.webp)

本教程主要是想通过华炎魔方触发器结合Node-RED来让大家更好的解决大家业务配置方面的疑惑，拓宽平台应用场景；

以下是一份融合了“需求说明”与“在华炎魔方中使用触发器，调用Node-RED自定义校验API实现日期校验”的图文教程示例，涵盖从需求背景、到Node-RED与华炎魔方的配置，再到在项目对象中录入并校验日期的完整流程。

## Node-RED 数据校验配置

1. 创建自定义数据校验 API (http in 节点)

(1) 新建一个 Flow 或在现有 Flow 中，拖入一个 http in 节点，用于接收来自华炎魔方的 POST 请求。

(2) 在该节点的“属性”里进行如下配置：

    • 请求方式：POST
    • URL 地址：/project/verify_date 
    • 名称：自定义数据校验API（可自由命名，方便识别）

配置好后，Node-RED 将对外暴露一个 POST 接口，访问路径例如：华炎魔方访问地址/flows/project/verify_date（例如 https://demo3.steedos.cn/flows/project/verify_date ）

![](/images/cms/682fdd475c7a28060df6976e.webp)

2. 编写日期校验逻辑 (function 节点)

(1) 在 http in 节点后面，添加一个 function 节点。

(2) 在 function 节点的“属性”中编写校验逻辑，示例代码如下（可根据项目实际需求自行调整）：

```
var doc = msg.payload.doc;
// 1) 如果 doc 不存在，则无需校验，直接返回
if (!doc) {
msg.payload = {
data: {
info: "doc not found, skip validation."
}
};
return [msg, null];
}
// 2) 如果没有 kickoff 或没有 deadline，则无需校验，直接返回
if (!doc.kickoff || !doc.deadline) {
msg.payload = {
data: {
info: "no kickoff or deadline, skip validation."
}
};
return [msg, null];
}
// 3) 若同时存在 kickoff 和 deadline，进行日期校验
var kickoff = new Date(doc.kickoff);
var deadline = new Date(doc.deadline);
if (deadline > kickoff) {
// 校验通过
msg.payload = {
data: {
info: "deadline > kickoff, valid."
}
};
return [msg, null];
} else {
// 校验失败，返回错误信息
msg.payload = {
error: {
code: "400",
message: "请保证结束时间大于开始时间"
}
};
return [msg, null];
}
```
• 注意，在本示例里，无论校验通过/失败都走第一个输出口 (return [msg, null])，以便直接输出到下游的 http response 节点。若需要更多场景可自行扩展。

• msg.payload 中的 “data” 和 “error” 是华炎魔方触发器预期的返回格式，其中 error 用来提示错误信息并阻止保存操作。

![](/images/cms/682fdda45c7a28060df69770.webp)

### 3. 输出响应给调用方 (http response 节点)

(1) 在 function 节点后面，拖入一个 http response 节点，用于最终返回响应给华炎魔方触发器。

(2) 无需额外复杂配置，仅需确保将 function 节点输出与 http response 节点相连。

(3) 默认情况下，会将 function 节点中设置的 msg.payload 中的数据内容返回给调用方 (华炎魔方触发器)。

## 华炎魔方触发器配置

### 1. 在项目对象中新建触发器

(1) 进入华炎魔方后台，找到“对象”→“项目”，打开需要配置触发器的对象设置。

(2) 点击“触发器”，新建一个触发器 (例如：project_verify_date)，然后在右侧面板中完成以下配置：

• Api Name：verify_date；
• 运行时：可选择“新增记录之前 / 修改记录之前”；
• 类型：接口；
• URL：填写 Node-RED 暴露出来的 API 地址，如：https://demo3.steedos.cn/flows/project/verify_date；
• 认证类型：不认证（如需认证，需要在Node-RED中http in节点请求头配置认证信息 ）；
• 已启用：✔；

这样，华炎魔方会在“项目”对象中进行新建或编辑提交时调用Node-RED自定义的校验接口，自动触发数据校验。

![](/images/cms/682fde1f5c7a28060df69772.webp)

2. 保存触发器并测试

完成上述设置后，直接点击保存，确保触发器“已启用”。一旦对“项目”对象进行“新建”或“编辑”操作，系统就会调用在 Node-RED 中配置的 /project/verify_date 接口进行日期校验。具体效果如下：

![](/images/cms/682fde5b5c7a28060df69774.webp)

## 总结

通过华炎魔方对象触发器与Node-RED自定义API相结合，华炎魔方可在对象数据新增、修改或删除时自动调用Node-RED中部署的校验流程，实现对业务数据的自动化审核与处理。

借助Node-RED的可视化逻辑编排能力，开发者无需编写代码即可对数据进行规则校验、格式检测和异常处理，触发器则负责在合适的节点将数据发送给Node-RED并获取结果。这样一来，业务数据的合法性就能得到有效保障，既节省了手动编写脚本的繁琐操作，也简化了不同系统之间的集成，让整个数据校验流程更加直观、灵活，真正做到“零代码”配置企业级的数据验证与处理逻辑。
