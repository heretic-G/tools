
二叉树leetcode 都是数组的 这里存个转换结构的方法 好实用leetcode做本地测试用


```javascript

function TreeNode(val) {
    this.val = val;
    this.left = this.right = null;
}

var buildTree = function(nums){
    var root = new TreeNode(nums[0]);
    var queue = [];
    queue.push(root);
    var cur;
    var lineNodeNum = 2;
    var startIndex = 1;
    var restLength = nums.length - 1;
    while(restLength > 0) {
        for (var i = startIndex; i < startIndex + lineNodeNum; i = i + 2) {
            if (i == nums.length) return root;
            cur = queue.shift();
            if (nums[i] != null) {
                cur.left = new TreeNode(nums[i]);
                queue.push(cur.left);
            }

            if (i + 1 == nums.length) return root;
            if (nums[i + 1] != null) {
                cur.right = new TreeNode(nums[i + 1]);
                queue.push(cur.right);
            }
        }
        startIndex += lineNodeNum;
        restLength -= lineNodeNum;
        lineNodeNum = queue.length * 2;
    }
    return root;
}


```
