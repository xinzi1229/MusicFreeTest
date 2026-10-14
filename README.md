# MusicFree·Test

模仿 [MusicFree](https://github.com/jiyanxu/MusicFree) 风格的极简双页面测试 App（React Native 0.75）。

## 页面

1. **首页** — 搜索框（仅演示）+ 推荐歌曲列表
2. **播放页** — 封面、歌曲信息、模拟进度条与播放控制

纯 React Native 内置组件 + 状态切换实现，无第三方依赖。

## 构建 APK

- 推送 `main` 分支后，GitHub Actions（`.github/workflows/build-apk.yml`）自动：
  1. 构建 release APK（arm64-v8a）
  2. 创建/替换 Release `apk-latest` 并附带 APK 下载
- 手动构建：`cd android && ./gradlew assembleRelease`
- 安装：手机允许"未知来源应用"后安装 APK

## 本地开发

```bash
npm install
npm start          # 启动 Metro
npm run android    # 需要 Android 模拟器/真机 + Android SDK
```
