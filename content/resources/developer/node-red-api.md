---
title: "如何使用 Node-RED 自定义API"
description: "本文将详细介绍如何利用Node-RED结合华炎魔方，实现可视化创建API、调用华炎魔方接口，以及配置定时任务等功能，并通过项目与任务管理的场景案例，帮助您快速理解并应用这一整合方案，为企业运营与协作带来高效助力。"
slug: "node-red-api"
blog: "developer"
status: "published"
cover: "/images/cms/682fdb2b5c7a28060df6976a.webp"
created: "2025-05-23T02:01:18.427Z"
modified: "2025-06-09T07:30:09.505Z"
b6_id: "682fd6ee5c7a28060df6974b"
---

本教程示例将向您展示如何使用 Node-RED（IBM 提供的可视化流程编排工具）快速创建可外部访问的 API，并实现与华炎魔方的无缝集成。通过此教程，您将学会配置 HTTP In、HTTP Response、HTTP Request、Function 节点等核心节点，以及如何绑定定时任务自动进行数据查询与通知，从而打造一体化的流程自动化方案。

Node-RED 是一款基于流程的编程工具，使用可视化拖拽的方式让开发者或业务人员都能轻松构建应用逻辑。华炎魔方则作为低代码平台，提供了丰富的 Open API 接口，可将内外部系统无缝连接。本教程将从定义 API 节点开始，逐步展示如何在 Node-RED 内部调用华炎魔方查询接口、配置定时触发消息通知以及使用 Debug 节点调试流程等关键步骤。

## 定义一个 API 节点

首先，我们需要定义一个可被外部系统访问的 API。为此，Node-RED 提供了两个关键节点：  

- HTTP In 节点：充当 API 入口，用以处理外部发起的请求。  
- HTTP Response 节点：对外部请求作出相应回复。

从 Node-RED 左侧节点面板中的“网络”分类下，拖拽一个 HTTP In 节点到工作区。双击该节点进行配置时，可设置以下核心属性：  

- URL 路径：如 “/project/infor”，用于指定访问路径。  
- 请求方法：如 GET、POST、PUT、DELETE 等，用于区分 API 的调用类型。  
- 其他高级选项：包括需要携带的参数、输入格式、身份认证选项等。

![](/images/cms/682fd74c5c7a28060df6974e.webp)

完成 HTTP In 节点的配置后，拖拽一个 HTTP Response 节点放置在工作区中，并将它与 HTTP In 节点连线。这样，外部系统只需访问您配置的目标地址，即可由 Node-RED 返回响应结果。

![](/images/cms/682fd7c85c7a28060df69752.webp)

这是最基础的配置示例。如果您需要在请求和响应之间执行自定义逻辑，例如请求参数处理、数据过滤、条件判断等，可搭配使用 Function 节点、Switch 节点或其他所需节点来进行逻辑编排，例如对传入参数的处理或对响应数据的重新组织。

![](/images/cms/682fd7f75c7a28060df69754.webp)

配置完成后，点击右上角的“部署（Deploy）”按钮，您的 API 便正式启用并可对外部提供服务。如您的华炎魔方实例地址为“https://demo3.steedos.cn”，设置的 API 路径为 `/project/infor`，则对外访问地址将会是 `https://demo3.steedos.cn/flows/project/infor` 

![](/images/cms/682fd83b5c7a28060df69756.webp)

## 调用华炎魔方查询接口

一旦您在 Node-RED 中实现了可被外部访问的 API，即可在此流程中向华炎魔方发起查询请求，以获取业务对象的数据并返回给调用方。例如，需要查询“Project（项目）”对象中符合特定条件的记录时，可使用 Node-RED 提供的 HTTP Request 节点。

将一个 HTTP Request 节点拖拽到工作区后，设置请求的目标 URL 地址为华炎魔方的 Open API 接口，如：
`https://demo3.steedos.cn/api/v6/direct/project?skip=0&top=100&sort=name%20asc%2C%20created%20desc&filters=%5B%20%22status%22%2C%20%22%3D%22%2C%20%22pause%22%20%5D&fields=name%2C%20status%2C%20project_manager`

![](/images/cms/682fd88a5c7a28060df69758.webp)

在请求头（Headers）部分，需要配置身份验证信息（如 API KEY 或 OAuth token），具体获取方式请参考华炎魔方的相关文档或在管理后台进行配置。这样，Node-RED 就可以在流程中使用华炎魔方安全地查询项目数据。

![](/images/cms/682fd8b95c7a28060df6975a.webp)

除了在配置面板中设置验证信息，也可以在 Function 节点中动态拼接请求头和 URL 参数。例如，根据外部请求传入的项目 ID 或关键字进行过滤查询。您可以灵活地决定使用：

### 当前用户 token：获取当前用户有权限查看的记录。

![](/images/cms/682fd8e95c7a28060df6975c.webp)

### 管理员 API KEY：获取业务对象全部记录。  


若查询成功，华炎魔方会将结果返回给 Node-RED。您可以直接将该结果发送至 HTTP Response 节点，或进一步使用 Function 节点来做数据映射与编排。最终，Node-RED 便充当了一个对外暴露的服务端，能够动态地查询华炎魔方系统数据并返回给外部系统。

![](/images/cms/682fd91c5c7a28060df6975e.webp)

## 配置定时任务，进行消息通知

在项目管理场景中，您可能需要在固定时间自动执行某些任务，比如下班前自动检查异常项目并通知项目负责人。Node-RED 提供的 Inject 节点可用于时间或周期性触发，从而在指定时刻激活后续流程。

将一个 Inject 节点拖拽到工作区后，双击以进行以下配置：  

- 设置触发时间：可选择特定时间点（如每天 17:00）或间隔（如每隔 1 小时）。  
- 自定义重复：可按天、周、月、年等复杂规律灵活设置。

![](/images/cms/682fd9885c7a28060df69762.webp)

然后，将此 Inject 节点与 HTTP Request 节点连接起来，以在每次定时触发时自动向华炎魔方发送查询请求，获取最新的异常项目数据。为实现自动通知项目负责人，可在查询后调用华炎魔方的通知接口，将异常信息以消息形式发送给相关负责人。这样，相关负责人在登录华炎魔方时即可收到系统通知，提醒他们及时关注和处理异常项目状态。

由于查询接口与通知接口需要的数据格式往往不同，您可以通过 Function 节点进行数据解析、转换、筛选，再结合 Split 节点等对结果进行进一步拆分。下面是一个示例 Function 节点代码，用于将查询返回的数据转换成华炎魔方创建通知需要的 JSON 结构：

```javascript
// Function 节点: parse & transform
// 假设 msg.payload 是一个字符串，形如：
// "{"data":[{"_id":"...","name":"...","status":"...","project_manager":"..."}], "totalCount":2}"

var oldPayloadStr = msg.payload;

// 1. 先把JSON字符串解析成对象
var oldResponse;
try {
    oldResponse = JSON.parse(oldPayloadStr);
} catch (e) {
    node.error("JSON.parse失败: " + e.message);
    msg.payload = [];
    return msg;
}

// 2. 取出 oldResponse.data (它应该是一个数组)
if (!oldResponse || !Array.isArray(oldResponse.data)) {
    node.warn("oldResponse.data 不是一个有效的数组, 返回空");
    msg.payload = [];
    return msg;
}

// 3. 将数组中的每条记录转成“新增接口需要”的格式
var newDataArr = oldResponse.data.map(function (item) {
    return {
        name: "项目异常通知",
        body: "您负责的项目状态异常，请及时跟进项目情况。",
        related_to: {
            o: "project",
            ids: [item._id],             // 从旧接口的 _id 赋值
            related_name: "project",
            owner: item.project_manager  // 从旧接口的 project_manager 赋值
        }
    };
});

// 4. 把这个新的数组放回 msg.payload，供后续通道使用
msg.payload = newDataArr;

// 返回 msg，往下流转
return msg;
```

处理完成后，将数据发送至华炎魔方的通知接口，即可在系统前台自动生成相应提醒。下图展示了配置完成后的 Node-RED 流程，以及在华炎魔方前端页面中收到的通知效果：

![](/images/cms/682fdaa65c7a28060df69764.webp)

![](/images/cms/682fdac65c7a28060df69766.webp)

## Debug 调试

在开发和配置流程时，Node-RED 提供了 Debug 节点帮助我们观察流程数据、排查问题。如果右侧面板未显示，可在编辑器中独立设置并勾选“显示侧边栏（Show Sidebar）”选项。

![](/images/cms/682fdafa5c7a28060df69768.webp)

拖拽一个 Debug 节点到流程中并连接您想要查看的节点输出，即可在右侧面板中查看该节点的实时调试信息。这对于检查数据结构、确认请求响应格式非常有帮助。

通过本教程所示的示例流程，您便可以使用 Node-RED 灵活构建对外 API 服务，并将华炎魔方提供的业务对象数据、通知机制等功能深度集成到同一个可视化编排平台中。更多高级应用场景，例如多系统数据整合与高级权限控制，可参考华炎魔方文档或联系我们获取进一步技术支持。祝您在华炎魔方的低代码开发旅程中一切顺利！
