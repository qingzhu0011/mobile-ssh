# MobileSSH 快速开始指南

## 最简单的启动方式（5分钟）

### 前提条件
- ✅ 已安装 Node.js (>= 18)
- ✅ 已安装 Android Studio
- ✅ 已配置 Android SDK
- ✅ 已启动 Android 模拟器或连接真实设备

### 三步启动

```bash
# 第一步：克隆并进入项目
git clone https://github.com/qingzhu0011/mobile-ssh.git
cd mobile-ssh

# 第二步：安装依赖
npm install

# 第三步：运行应用
npm start          # 终端1：启动 Metro
npm run android    # 终端2：运行 Android
```

就这么简单！🎉

---

## 完整的 React Native 项目初始化

由于 GitHub 仓库中只包含源代码，不包含 Android 原生目录，您需要：

### 方式一：使用 React Native CLI 初始化（推荐）

```bash
# 1. 创建新的 React Native 项目
npx react-native init MobileSSH --version 0.73.6

# 2. 进入项目目录
cd MobileSSH

# 3. 下载源代码
git clone https://github.com/qingzhu0011/mobile-ssh.git temp
cp -r temp/src ./
cp temp/App.js ./
cp temp/package.json ./
cp temp/babel.config.js ./
cp temp/metro.config.js ./
rm -rf temp

# 4. 安装依赖
npm install

# 5. 运行
npm start
npm run android
```

### 方式二：手动配置（高级用户）

```bash
# 1. 克隆项目
git clone https://github.com/qingzhu0011/mobile-ssh.git
cd mobile-ssh

# 2. 初始化 React Native
npx react-native init MobileSSH --version 0.73.6

# 3. 复制源代码到新项目
cp -r src MobileSSH/
cp App.js MobileSSH/
cp package.json MobileSSH/

# 4. 进入新项目
cd MobileSSH

# 5. 安装依赖
npm install

# 6. 运行
npm start
npm run android
```

---

## 测试应用

### 1. 启动应用后

应用会显示登录页面，包含以下输入框：
- 服务器地址
- 端口（默认 22）
- 用户名
- 密码

### 2. 测试连接（模拟模式）

由于当前使用模拟 SSH 连接，您可以输入任意信息进行测试：

```
服务器地址: 192.168.1.100
端口: 22
用户名: root
密码: 123456
```

点击"连接"按钮，等待 1.5 秒后会跳转到终端页面。

### 3. 测试命令

在终端页面底部输入框输入以下命令测试：

```bash
ls          # 列出文件
pwd         # 显示目录
whoami      # 显示用户
date        # 显示时间
echo Hello  # 输出文本
clear       # 清空终端
exit        # 断开连接
```

---

## 常见问题快速解决

### Q1: npm install 失败

```bash
# 清理缓存重试
npm cache clean --force
npm install --legacy-peer-deps
```

### Q2: Android 构建失败

```bash
# 清理构建
cd android
./gradlew clean
cd ..
npm run android
```

### Q3: Metro 无法启动

```bash
# 重置缓存
npm start -- --reset-cache
```

### Q4: 设备未识别

```bash
# 重启 adb
adb kill-server
adb start-server
adb devices
```

### Q5: 应用闪退

```bash
# 完全重新构建
rm -rf node_modules
npm install
cd android && ./gradlew clean && cd ..
npm run android
```

---

## 开发调试技巧

### 1. 启用开发者菜单

**模拟器**: `Ctrl + M` (Windows/Linux) 或 `Cmd + M` (macOS)  
**真机**: 摇晃手机

### 2. 重新加载应用

在 Metro 终端按 `r` 键

### 3. 查看日志

```bash
# React Native 日志
npx react-native log-android

# Android 系统日志
adb logcat
```

### 4. 调试 JavaScript

1. 开发者菜单 → Debug
2. 浏览器打开 http://localhost:8081/debugger-ui
3. 按 F12 打开开发者工具

---

## 构建 APK

### 调试版（快速测试）

```bash
cd android
./gradlew assembleDebug
```

APK 位置: `android/app/build/outputs/apk/debug/app-debug.apk`

### 发布版（正式发布）

```bash
# 1. 生成签名密钥
keytool -genkeypair -v -storetype PKCS12 \
  -keystore my-release-key.keystore \
  -alias my-key-alias \
  -keyalg RSA -keysize 2048 -validity 10000

# 2. 构建发布版
cd android
./gradlew assembleRelease
```

APK 位置: `android/app/build/outputs/apk/release/app-release.apk`

---

## 性能优化建议

### 1. 启用 Hermes 引擎

编辑 `android/app/build.gradle`:

```gradle
project.ext.react = [
    enableHermes: true,  // 启用 Hermes
]
```

### 2. 启用 ProGuard

编辑 `android/app/build.gradle`:

```gradle
buildTypes {
    release {
        minifyEnabled true
        shrinkResources true
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }
}
```

### 3. 减小 APK 体积

```gradle
android {
    splits {
        abi {
            enable true
            reset()
            include "armeabi-v7a", "arm64-v8a"
            universalApk false
        }
    }
}
```

---

## 集成真实 SSH 连接

### 步骤 1: 安装 SSH 库

```bash
npm install react-native-ssh2
cd android && ./gradlew clean && cd ..
```

### 步骤 2: 创建 SSH 客户端

创建 `src/utils/SSHClient.js`:

```javascript
import SSH2 from 'react-native-ssh2';

export class SSHClient {
  constructor() {
    this.client = null;
    this.stream = null;
  }

  async connect(host, port, username, password) {
    this.client = new SSH2();
    
    return new Promise((resolve, reject) => {
      this.client.on('ready', () => {
        this.client.shell((err, stream) => {
          if (err) {
            reject(err);
            return;
          }
          this.stream = stream;
          resolve();
        });
      });

      this.client.on('error', (err) => {
        reject(err);
      });

      this.client.connect({
        host,
        port,
        username,
        password,
      });
    });
  }

  async exec(command) {
    return new Promise((resolve, reject) => {
      if (!this.stream) {
        reject(new Error('Not connected'));
        return;
      }

      let output = '';
      
      this.stream.on('data', (data) => {
        output += data.toString();
      });

      this.stream.write(command + '\n');

      setTimeout(() => {
        resolve(output);
      }, 1000);
    });
  }

  disconnect() {
    if (this.stream) {
      this.stream.end();
    }
    if (this.client) {
      this.client.end();
    }
  }
}
```

### 步骤 3: 更新页面代码

在 `LoginScreen.js` 和 `TerminalScreen.js` 中导入并使用真实的 SSH 客户端。

---

## 下一步学习

1. **React Native 官方文档**: https://reactnative.dev/
2. **React Navigation 文档**: https://reactnavigation.org/
3. **Android 开发文档**: https://developer.android.com/

---

## 获取帮助

- **GitHub Issues**: https://github.com/qingzhu0011/mobile-ssh/issues
- **React Native 社区**: https://reactnative.dev/community/overview
- **Stack Overflow**: 搜索 "react-native" 标签

---

**祝您开发顺利！** 🚀
