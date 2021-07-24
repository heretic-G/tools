
找第一个相交node 其实A+B B+A 直接便利就好了一个m+n就出来了

```javascript

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function(headA, headB) {
    let currA = headA
    let currB = headB
    while (currA !== currB) {
        currA = currA === null ? headB : currA.next
        currB = currB === null ? headA : currB.next
    }
    return currA
};

```
