我个人认为很重要的一个概念 这里只是记录 并不做更多的描述 其实就是规范的信息抄录出来(看到这里如果你也感兴趣可以直接去看规范)


| Field Name | Value | Meaning |
| ----- | ----  |   ----  |
| [[Base]] | 除了undefined和null的其他es language val | 保存的绑定的值 |
|          | 一个环境记录项 | 保存绑定的环境记录项 |
|          | unresolvable | 绑定没赋值的 |
| [[ReferencedName]] | string、 symbol、 private name | 就是绑定的名字 如果[[Base]]是环境记录项一定是string， |
| [[Strict]] | Boolean | 是不是严格模式 |
| [[ThisValue]] | es language val or empty | （翻译不清楚 扔原文...） If not empty, the Reference Record represents a property binding that was expressed using the super keyword; it is called a Super Reference Record and its [[Base]] value will never be an Environment Record. In that case, the [[ThisValue]] field holds the this value at the time the Reference Record was created. |



