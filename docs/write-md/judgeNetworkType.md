嗯 这个是正好有需求看了下别人实现的 不过这玩意其实判断不是很准...

不过他判不出来也都归到wifi了 只是简单的还可以

```javascript
   var networkResult = {
        result: !1,
        networkType: ""
    };
    netTypeArr = ["2g", "3g", "4g", "5g", "wifi", "NotReachable"]
    function getNetworkType() {
        if (navigator.connection && navigator.connection.type) {
            var type = navigator.connection.type;
            switch ("string" == typeof type ? type.toLowerCase() : type) {
                case 0:
                    networkResult = {
                        result: !0,
                        networkType: "UNKNOWN"
                    };
                    break;
                case 1:
                    networkResult = {
                        result: !0,
                        networkType: "ETHERNET"
                    };
                    break;
                case 2:
                case "wifi":
                    getNetworkType_ua(),
                    networkResult.result || (networkResult = {
                        result: !0,
                        networkType: "wifi"
                    });
                    break;
                case 3:
                case "2g":
                    networkResult = {
                        result: !0,
                        networkType: "2g"
                    };
                    break;
                case 4:
                case "3g":
                    networkResult = {
                        result: !0,
                        networkType: "3g"
                    };
                    break;
                case 5:
                case "4g":
                    networkResult = {
                        result: !0,
                        networkType: "4g"
                    };
                    break;
                case 6:
                case "5g":
                    networkResult = {
                        result: !0,
                        networkType: "5g"
                    };
                    break;
                case "cellular":
                    networkResult = {
                        result: !0,
                        networkType: "cellular"
                    };
                    break;
                default:
                    getNetworkType_ua()
            }
        } else
            getNetworkType_ua();
        return networkResult
    }
    function getNetworkType_ua() {
        for (var _userAgent = navigator.userAgent.toLowerCase(), i = 0; i < netTypeArr.length; i++)
            -1 != _userAgent.indexOf(netTypeArr[i]) && (networkResult = {
                result: !0,
                networkType: netTypeArr[i]
            })
    }
```
