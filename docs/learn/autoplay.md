controls 是可以展示控制条 这里面也可以配置些东西
crossorigin 跨域属性
muted 是是否静音


看了下 基本没啥问题  按照规则可以自动播放 想要有声播放就要 提高网站的MEI分数
对于第一次用户或者匿名用户有个预种子网站列表 这个网站根据算法生成 主要是访问这个网站的用户允许够多可以进行自动播放 是个百分比
最开始实施前一阵这个算法就打开了 统计MEI的分数 所以主流网站无影响基本


自动播放浏览器厂商制定规则

1.内容是静音的或者只有画面没有声音

2.会话期间点击了网站某个地方

3.手机上网站添加到了主屏幕

4.具有Media Engagement Index(MEI) 指数足够可以播放

5.顶级可以委托autoplay 到iframe 来自动播放

6.pc使用pwa

MEI指数 衡量用户在网站中的期望 来源是访问比例

1.音频/视频的使用时间必须大于7秒

2.音频存在并且没有静音

3.视频标签处于活动状态

4.视频大小大于200x140 (单位px)

MEI这个每个人都有 看描述是存在本地的 和用户相关 对于无用户和新用户 有一个pre-seeded site list(预种子网站列表)如果访问改网站的用户允许该网站自动播放的数量足够多 就可以增加入这个列表，该阈值是基于百分比的，以免偏向较大的站点。

历史更新前其实已经运行和收集一段时间的MEI 以防止网站在开始没有MEI导致的问题 但是浏览器建议每个人都不要认为自己就是可以自动播放

如何查看MEI? 打开 [chrome://media-engagement](chrome://media-engagement)

0.05 会导致可以实现自动播放

(如果是第一次的流可能存在第一次能够播放的)

但是这个数据具体怎么组合而来还不清楚具体的算法 pre list 和个人之间是不同权重？ 还是个人大于pre list？还是怎么计算 没有找到具体的算法公式

(我自己尝试自动打开的网站的然后关闭播放视频 当时并没有降低 但是下午的时候从0.22降到了0.21 可能存在滞后性， 下午又测试了下 几分钟就改了 降到了0.2)


[https://developer.chrome.com/blog/autoplay/](https://developer.chrome.com/blog/autoplay/)
[https://developers.google.com/web/updates/2018/11/web-audio-autoplay?hl=en](https://developers.google.com/web/updates/2018/11/web-audio-autoplay?hl=en)
[https://sites.google.com/a/chromium.org/dev/audio-video/autoplay](https://sites.google.com/a/chromium.org/dev/audio-video/autoplay)
[https://docs.google.com/document/d/1EH7qZatVnTXsBGvQc_53R97Z0xqm6zRblKg3eVmNp30/edit](https://docs.google.com/document/d/1EH7qZatVnTXsBGvQc_53R97Z0xqm6zRblKg3eVmNp30/edit)
