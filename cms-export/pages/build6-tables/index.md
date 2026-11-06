# Airtable 设计

我在开发一个云端的 Airtable，使用 AWS Serverless + DynamoDB。

## 定义一个对象保存数据表结构

table.object.yml
```yaml
# 表名
name: project
# 字段
fields: 
  _id:  
    label: ID
  space:
    label: 工作区
    type: lookup
  user:
    label: 所有者
    type: lookup
# 索引
indexes:
  $space:
    fields: space
  $space$user:
    fields: ['space', 'user']
  $user:
    fields: user  
```

## 保存记录

保存记录的 DynamoDB 表：

```yaml
RecordsDynamoDbTable:
  Type: 'AWS::DynamoDB::Table'
  DeletionPolicy: Retain
  Properties:
    AttributeDefinitions:
      - AttributeName: id
        AttributeType: S
      - AttributeName: tableId
        AttributeType: S
    KeySchema:
      - AttributeName: tableId
        KeyType: HASH
      - AttributeName: id
        KeyType: RANGE
    BillingMode: PAY_PER_REQUEST
    TableName: ${self:provider.environment.RECORDS_TABLE}
```

## 保存索引

索引可以提高在 Airtable 中查询时的性能。

设计一个索引表来存储各种索引记录。这个表的结构如下：

- **索引表**：`IndexesDynamoDbTable`
- **主键**：`pk`（表名$索引字段名）
- **排序键**：`sk`（记录中索引对应的字段值）
- **附加属性**：`pk1`（表名）、`sk1`（记录 ID）

```yaml
IndexesDynamoDbTable:
  Type: 'AWS::DynamoDB::Table'
  DeletionPolicy: Retain
  Properties:
    AttributeDefinitions:
      - AttributeName: pk
        AttributeType: S
      - AttributeName: sk
        AttributeType: S
    KeySchema:
      - AttributeName: pk
        KeyType: HASH
      - AttributeName: sk
        KeyType: RANGE
    BillingMode: PAY_PER_REQUEST
    TableName: ${self:provider.environment.INDEXES_TABLE}
```

## 数据案例

### 表结构定义

```yaml
# 表名
name: project
# 字段
fields: 
  _id:  
    label: ID
  space:
    label: 工作区
    type: lookup
  user:
    label: 所有者
    type: lookup
  status:
    label: 状态
    type: string
# 索引
indexes:
  $space:
    fields: space
  $space$user:
    fields: ['space', 'user']
  $user:
    fields: user
  $status:
    fields: status
```

### 数据关系
- **User 表**：保存用户信息。
- **Space 表**：保存工作区信息。
- **Project 表**：保存项目信息，并通过 `space` 和 `user` 字段关联到相应的工作区和用户。

好的，以下是三个数据表（user、space、project）的具体化数据案例，以表格形式展示：

### 索引

以下是 project 表的索引定义：

- **$space**
  - 字段：space
  - 示例：索引所有 space 为 1 的项目，即 Project Alpha、Project Beta。

- **$space$user**
  - 字段：['space', 'user']
  - 示例：索引所有 space 为 1 且 user 为 1 的项目，即 Project Alpha。

- **$user**
  - 字段：user
  - 示例：索引所有 user 为 1 的项目，即 Project Alpha、Project Delta。

- **$status**
  - 字段：status
  - 示例：索引所有 status 为 ongoing 的项目，即 Project Alpha、Project Gamma、Project Epsilon。


## 自动生成索引记录

根据 project 表中的数据示例，我们需要为每个记录生成相应的索引记录。以下是具体的索引记录：
好的，以下是根据 project 表中的数据示例，使用简短的 ID 前缀自动生成的索引记录：

### user 表
| _id  | name      | email               |
|------|-----------|---------------------|
| u-1    | Alice     | alice@example.com   |
| u-2    | Bob       | bob@example.com     |
| u-3    | Charlie   | charlie@example.com |

### space 表
| _id  | name        | description           |
|------|-------------|-----------------------|
| sp-1    | Dev Team    | Development projects  |
| sp-2    | Marketing   | Marketing campaigns   |
| sp-3    | Sales       | Sales initiatives     |

### project 表记录

| _id  | name             | space | user | status   |
|------|------------------|-------|------|----------|
| p-1  | Project Alpha    | sp-1  | u-1  | ongoing  |
| p-2  | Project Beta     | sp-1  | u-2  | completed|
| p-3  | Project Gamma    | sp-2  | u-3  | ongoing  |
| p-4  | Project Delta    | sp-3  | u-1  | planned  |
| p-5  | Project Epsilon  | sp-2  | u-2  | ongoing  |

### 根据 project 表记录自动生成的索引记录

| pk                | sk         | pk1     | sk1  |
|-------------------|------------|---------|------|
| project$space     | sp-1       | project | p-1  |
| project$space     | sp-1       | project | p-2  |
| project$space     | sp-2       | project | p-3  |
| project$space     | sp-3       | project | p-4  |
| project$space     | sp-2       | project | p-5  |
| project$space$user| sp-1,u-1   | project | p-1  |
| project$space$user| sp-1,u-2   | project | p-2  |
| project$space$user| sp-2,u-3   | project | p-3  |
| project$space$user| sp-3,u-1   | project | p-4  |
| project$space$user| sp-2,u-2   | project | p-5  |
| project$user      | u-1        | project | p-1  |
| project$user      | u-2        | project | p-2  |
| project$user      | u-3        | project | p-3  |
| project$user      | u-1        | project | p-4  |
| project$user      | u-2        | project | p-5  |
| project$status    | ongoing    | project | p-1  |
| project$status    | completed  | project | p-2  |
| project$status    | ongoing    | project | p-3  |
| project$status    | planned    | project | p-4  |
| project$status    | ongoing    | project | p-5  |

### 详细解释

- **pk**：主键，由表名和索引字段名组合而成。例如，`project$space` 表示 project 表根据 space 字段创建的索引。
- **sk**：排序键，对应记录中索引字段的值。例如，`1` 表示 space 字段值为 1 的记录。
- **pk1**：表名，表示记录所属的表。
- **sk1**：记录 ID，对应 project 表中的 _id 字段值。

### 生成索引记录的步骤

1. **遍历 project 表中的每条记录**。
2. **根据索引定义**，为每个索引字段生成相应的索引记录。
3. **组合主键和排序键**，并保存原始记录的表名和 ID。

通过这种方式，可以在查询时快速定位到符合条件的记录，提高查询性能。

### 查询操作

- **查询表 `project` 的所有索引记录**：`pk1 = project`，删除数据表时需要清空索引。
- **查询记录 `project.recordId` 的所有索引记录**：`pk1 = project AND sk1 = pr1`，删除和修改记录时，先删除记录所有索引再重新创建。
- **查询表索引 `project$space` 的所有索引记录**：`pk = project$space`，删除表索引时，需要清空。
- **查询表索引 `project$space` 的特定值 `sp1` 的所有记录**：`pk = project$space AND sk = sp1`，查询记录，按索引字段精确匹配，查询记录列表。

### 日期和数值类型查询

对于日期和数值类型，`sk` 支持 `BETWEEN`、`<`、`<=`、`>`、`>=` 等操作符。

- **查询 `project.created` 属于日期范围的所有记录**：`pk = project$created AND sk BETWEEN :start_date AND :end_date`

### 文本类型搜索

对于文本类型的搜索，应该使用单独的函数，调用全文检索引擎来检索，并返回记录 ID。