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


function countOfLetters (str) {
    let map = {}
    let stack = []
    let i = 0
    while (i < str.length) {
        let code = str[i].charCodeAt()
        if (code >= 65 && code <= 122) {
            let num = ''
            i += 1
            while (i < str.length) {
                if (str[i] >= 48 && str[i] <= 57) {
                    num +=str[i]
                    i += 1
                } else {
                  break
                }
            }

            if (map[str[i]]) {
                map[str[i]] += 1
            } else {
                map[str[i]] = 1
            }
        } else {
            if (code === 40) {

            }
            if (code === 41) {
                let num = ''
                i += 1
                while (i < str.length) {
                    if (str[i] >= 48 && str[i] <= 57) {
                        num +=str[i]
                        i += 1
                    } else {
                        break
                    }
                }
            }
        }
    }
}


/**
 * 平铺节点数组转嵌套树
 * 说明：将一个包含深度信息的节点数组转换成一棵树，要求只能遍历一次该数组
 * 输入值：TreeNode数组 TreeNode为包含depth(正整数，深度不限)字段的Object
 * 输出值：组装好的嵌套树，子节点挂载在对应父节点的children字段上
 */
/*
输入：[
  { depth: 1 },
  { depth: 2 },
  { depth: 3 },
  { depth: 3 },
  { depth: 2 },
  { depth: 1 },
  { depth: 2 },
]
输出：[
  {
    "depth": 1,
    "children": [
      {
        "depth": 2,
        "children": [
          {
            "depth": 3
          },
          {
            "depth": 3
          }
        ]
      },
      {
        "depth": 2
      }
    ]
  },
  {
    "depth": 1,
    "children": [
      {
        "depth": 2
      }
    ]
  }
]
*/
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





