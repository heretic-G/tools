数组转树结构

主要就是每个item信息其实在从头到尾的时候你不知道全部的结构逻辑

但是你可以构建一个所有存在children的map 然后在一次把各个存在children的结构合成树

也就是第一次只做一层的关联这里其实不包括父节点的信息 只保存id 但是建立上这个父存在的所有子的联系 然后在建立父的关联 因为引用类型的联系所以整个树就连上了 哎 感觉还是没说明白


```javascript

function arrToTree (arr) {
    let parentMap = {}
    for (let i = 0;i < arr.length; i++) {
        let parentId = arr[i].parentId
        if (parentMap[parentId]) {
            parentMap[parentId].push(arr[i])
        } else {
            parentMap[parentId] = [arr[i]]
        }
    }
    for (let i = 0;i < arr.length; i++) {
        let id = arr[i].id
        if (parentMap[id]) {
            arr[i].children = parentMap[id]
            delete  parentMap[id]
        }
    }
    return parentMap
}


```



```javascript

function depthArray2Tree(data) {
    let result = []
    let node
    for (let i = 0; i < data.length; i++) {
        if (data[i].depth === 1) {
            if (node) {
                result.push(node)
            }
            node = {
                depth: 1,
                children: []
            }
        } else {
            let depth = data[i].depth - 1
            let temp = node
            while (depth > temp.depth) {
                if (!temp.children) {
                    temp.children = []
                    
                }
                temp = temp.children[temp.children.length - 1]
            }
            if (!temp.children) {
                temp.children = []        
            }
            temp.children.push(data[i])
        }
    }
    result.push(node)
    return result
}

```
