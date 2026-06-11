// NovaStar 自动发推 — GitHub Actions
const { TwitterApi } = require('twitter-api-v2');
const fs = require('fs');

const client = new TwitterApi({
  appKey: process.env.TWITTER_APP_KEY,
  appSecret: process.env.TWITTER_APP_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

const TWEETS = [
  `🚀 $NOVA — BSC 最透明新代币

✅ 所有权已放弃
🔒 LP 锁仓
💧 USDT+BNB 双池 $880+
🦎 CoinGecko 审核中

🛒 https://pancakeswap.finance/swap?outputCurrency=0xA59bd1777e8eB5A20Ee51a6CF7C51aA31b6a18e5&use=V2

#BSC #NOVA #Crypto`,

  `99% BSC 新币两周归零。$NOVA 不一样：

✅ 所有权 renounce → 无后门
🔒 LP 锁 180 天 → 不跑路
💧 双池子 → 随时交易
🔒 质押系统 → 3-15%

链上验证 👇
bscscan.com/address/0xA59bd1777e8eB5A20Ee51a6CF7C51aA31b6a18e5

#BSCGem #DeFi`,

  `$NOVA 设施齐全:

📊 APP 可装手机桌面
🔒 质押 30/60/90 天
💧 USDT+BNB 双池
🦎 等 CoinGecko 收录

迷你市值 + 完整基建 = 早期机会 👀

#CryptoGems #BSC #NOVA`,

  `貔貅币不能卖，地毯币跑得快。

$NOVA 两个都不是：
→ 所有权 renounce 了
→ LP 锁 180 天
→ 源码公开 Sourcify 验证
→ 池子 $880 深度够

不是金融建议，自己研究 👇

#BSC #MemeCoin`,

  `$NOVA 官网升级 📱

→ 实时仪表盘
→ 质押一键操作
→ 支持 USDT/BNB 购买
→ APP 可装桌面

nova star . github . io

#Web3 #BSC #NOVA`,
];

// 读取上次索引
const STATE_FILE = '/tmp/nova-tweet-state.txt';
let index = 0;
try {
  if (fs.existsSync(STATE_FILE)) {
    index = parseInt(fs.readFileSync(STATE_FILE, 'utf8')) || 0;
  }
} catch (e) {}

const tweet = TWEETS[index % TWEETS.length];

(async () => {
  try {
    const r = await client.v2.tweet(tweet);
    console.log('✅ 推文已发送! ID:', r.data.id, 'Index:', index);
    fs.writeFileSync(STATE_FILE, String((index + 1) % TWEETS.length));
  } catch (e) {
    console.error('❌ 失败:', e.data?.detail || e.message);
    process.exit(1);
  }
})();
