
### Execution Contexts(执行上下文)

涉及缩写含义 

    EC = Execution Contexts 
    REC = running execution contexts
    ER = Environment Record

粗俗的理解 这玩意就是个对象 
所有的EC都存在以下组件

```typescript
// 伪代码
EC = {
  'code evaluation state': 'perform' | 'suspend' | 'resume',
  'Function': Function | null,
  'Realm': 'Realm Record',
  'ScriptOrModule': 'Module Record' | 'Script Record',
}

```

而且在规范中有意思的是 特别说了绝大多数都是LIFO的stack结构 但是存在特殊情况会不是LIFO 这里是Generator Functions
[具体讲解](https://github.com/tc39/ecma262/issues/1089)

我的简单理解就是 原有的LIFO结构他说就是一个创建->推入 弹出->销毁的逻辑  现在因为Generator 他会自己保存住context 然后在他需要
的地方暂停REC 然后执行他的，然后他出来 在恢复top 这个逻辑和原本的逻辑是不同的

这里和以前有个差异在于以前定义了3种会生成EC的code 是 `Global Code` `Function Code` `Eval Code`

但是现在规范并没有定义 其实逻辑还是一样的 在EC中的 `Function` `ScriptOrModule` 表达的就是一样的含义

还有三个可能存在的组件
```typescript
EC = {
    'LexicalEnvironment': 'Environment Record',
    'VariableEnvironment': 'Environment Record',
    'PrivateEnvironment': 'PrivateEnvironment Record' | null,
}

```

Generators还存在一个特殊的
```typescript
EC = {
    'Generator': 'Environment Record',
}

```

### Environment Record 

那些会创建一个新的ER `FunctionDeclaration` `BlockStatement` `a Catch clause of a TryStatement`只有这三种

然后他的基础结构就是
```typescript
ER = {
    'ER': 'ER',
    'OuterEnv': 'ER' | null
}

```

Environment Record
        |-------declarative Environment Record
        |					 |------Function Environment Records
        |			         |------module Environment Records
        |-------global Environment Record
        |-------object Environment Record

##### declarative Environment Record

主要工作就是标识符绑定 variable, constant, let, class, module, import, and/or function declarations

##### function Environment Record

结构
```typescript
FER = {
    'ThisValue': any,
    'ThisBindingStatus': 'lexical' | 'initialized' | 'uninitialized',
    'FunctionObject': Object,
    'NewTarget': Object | undefined,
}
```

##### module Environment Record

##### object Environment Record

结构
```typescript
OER = {
    'BindingObject': Object,
    'IsWithEnvironment': Boolean,
}
```

##### global Environment Record

结构
```typescript
GER = {
    'ObjectRecord': 'Object Environment Record',
    'GlobalThisValue': Object,
    'DeclarativeRecord': 'Declarative Environment Record',
    'VarNames': 'List of String',
}
```

GER 的属性需要说下 ObjectRecord 就是个OER 但是实质这里其实object是global object 然后有一些声明会绑定到这个对象上
FunctionDeclaration, GeneratorDeclaration, AsyncFunctionDeclaration, AsyncGeneratorDeclaration, and VariableDeclaration
简单来说就是fun和var 你可以测试就是声明一个函数 然后window上面就可以同名访问 

GlobalThisValue就是this返回值

DeclarativeRecord这里存的就是排除上面ObjectRecord的绑定剩下都存在这里

然后都是先查DeclarativeRecord 再查 ObjectRecord

##### PrivateEnvironment Record  

还有个这个  规范中定义They are similar to, but distinct from, Environment Records

基本ER就是这样

EC里面就是套的这些ER 然后如果存在于LexicalEnvironment 和VariableEnvironment的时候 优先级是LexicalEnvironment 更高


VariableEnvironment目前我的理解 好像只有 var会写到里面 


### Realm Record

结构
```typescript
RR = {
    'Intrinsics': 'Intrinsic Objects',
    'GlobalObject': 'Object',
    'GlobalEnv': 'global Environment Record',
    'TemplateMap': { 'Site': 'Parse Node', 'Array': Object },
    'HostDefined': any | undefined,
}
```
Intrinsics其实就是内置对象 (built-in objects) [查看地址](https://tc39.es/ecma262/#table-7)

GlobalObject就是global object

TemplateMap其实是模板字符串生成的东西 逻辑是为了保持每个site的模板字符串在创建后的不变性 那这玩意其实会导致一定的内存泄漏 
因为并不是你不用就销毁了 而是需要等site的概念销毁才会有可能回收(看到了一个早期他们讨论这玩意需要一个weakMap去保存的讨论) site就是
一个Script or Module 然后在解析后就是个 Parse Node 

[TemplateMap讨论地址](https://github.com/tc39/ecma262/issues/840)

HostDefined没理解还 不过在html 中定义是 the Realm's settings object 

[agent理解](https://github.com/tc39/ecma262/issues/1357)








