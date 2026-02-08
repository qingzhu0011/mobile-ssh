# MobileSSH - React Native SSH 客户端

一个基于 React Native 开发的 Android SSH 客户端应用，支持连接远程服务器并执行命令。

## 功能特点

- ✅ SSH 连接管理
- ✅ 终端命令执行
- ✅ 实时输出显示
- ✅ 命令历史记录
- ✅ 深色主题界面
- ✅ 错误处理和提示

## 环境要求

### 必需软件

1. **Node.js** >= 18.0.0
   - 下载地址: https://nodejs.org/
   - 验证安装: `node --version`

2. **JDK** (Java Development Kit) >= 11
   - 下载地址: https://www.oracle.com/java/technologies/downloads/
   - 验证安装: `java -version`

3. **Android Studio**
   - 下载地址: https://developer.android.com/studio
   - 需要安装 Android SDK (API Level 33+)
   - 需要配置 Android SDK 环境变量

4. **React Native CLI**
   ```bash
   npm install -g react-native-cli
   ```

### Android 环境配置

1. 安装 Android Studio 后，打开 SDK Manager
2. 安装以下组件：
   - Android SDK Platform 33
   - Android SDK Build-Tools
   - Android Emulator
   - Android SDK Platform-Tools

3. 配置环境变量（Windows）：
   ```
   ANDROID_HOME = C:\Users\你的用户名\AppData\Local\Android\Sdk
   Path 添加:
   - %ANDROID_HOME%\platform-tools
   - %ANDROID_HOME%\tools
   - %ANDROID_HOME%\tools\bin
   ```

4. 配置环境变量（macOS/Linux）：
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

## 安装步骤

### 1. 克隆项目

```bash
git clone https://github.com/qingzhu0011/mobile-ssh.git
cd mobile-ssh
```

### 2. 安装依赖

```bash
npm install
```

如果遇到依赖安装问题，可以尝试：

```bash
npm install --legacy-peer-deps
```

### 3. 清理 Android 构建缓存（可选）

```bash
cd android
./gradlew clean
cd ..
```

## 运行应用

### 方式一：使用 Android 模拟器

1. 启动 Android Studio
2. 打开 AVD Manager (Android Virtual Device Manager)
3. 创建或启动一个模拟器
4. 在项目根目录运行：

```bash
npm start
```

5. 在另一个终端运行：

```bash
npm run android
```

### 方式二：使用真实 Android 设备

1. 在手机上启用开发者选项：
   - 设置 → 关于手机 → 连续点击"版本号"7次
   
2. 启用 USB 调试：
   - 设置 → 开发者选项 → USB 调试

3. 用 USB 线连接手机到电脑

4. 验证设备连接：
   ```bash
   adb devices
   ```
   应该显示你的设备

5. 运行应用：
   ```bash
   npm start
   npm run android
   ```

## 使用说明

### 1. 连接 SSH 服务器

1. 打开应用，进入登录页面
2. 填写服务器信息：
   - **服务器地址**: 例如 `192.168.1.100` 或 `example.com`
   - **端口**: 默认 `22`
   - **用户名**: 例如 `root` 或 `ubuntu`
   - **密码**: 您的 SSH 密码

3. 点击"连接"按钮

### 2. 使用终端

连接成功后会自动跳转到终端页面：

1. 在底部输入框输入 Linux 命令
2. 点击"发送"按钮或按回车执行命令
3. 终端区域会实时显示命令输出

### 3. 支持的命令示例

```bash
ls              # 列出文件
ls -la          # 详细列出文件
pwd             # 显示当前目录
whoami          # 显示当前用户
date            # 显示日期时间
echo Hello      # 输出文本
clear           # 清空终端
exit            # 断开连接
```

### 4. 断开连接

点击右下角的"断开"按钮，确认后会断开 SSH 连接并返回登录页面。

## 构建 APK

### 生成调试版 APK

```bash
cd android
./gradlew assembleDebug
```

APK 文件位置：`android/app/build/outputs/apk/debug/app-debug.apk`

### 生成发布版 APK

1. 生成签名密钥：
   ```bash
   keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. 配置签名（编辑 `android/gradle.properties`）：
   ```
   MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
   MYAPP_RELEASE_KEY_ALIAS=my-key-alias
   MYAPP_RELEASE_STORE_PASSWORD=你的密码
   MYAPP_RELEASE_KEY_PASSWORD=你的密码
   ```

3. 构建发布版：
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

APK 文件位置：`android/app/build/outputs/apk/release/app-release.apk`

## 项目结构

```
mobile-ssh/
├── android/                 # Android 原生代码
├── src/
│   ├── screens/            # 页面组件
│   │   ├── LoginScreen.js  # 登录页面
│   │   └── TerminalScreen.js # 终端页面
│   ├── styles/             # 样式文件
│   │   └── globalStyles.js # 全局样式
│   └── utils/              # 工具函数
├── App.js                  # 应用入口
├── index.js                # 注册入口
├── package.json            # 依赖配置
├── babel.config.js         # Babel 配置
├── metro.config.js         # Metro 配置
└── README.md              # 项目文档
```

## 常见问题

### 1. 无法连接到 Metro Bundler

**解决方法**：
```bash
# 清理缓存
npm start -- --reset-cache

# 或者
npx react-native start --reset-cache
```

### 2. Android 构建失败

**解决方法**：
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### 3. 依赖安装失败

**解决方法**：
```bash
# 删除 node_modules 和 package-lock.json
rm -rf node_modules package-lock.json

# 重新安装
npm install --legacy-peer-deps
```

### 4. 设备未识别

**解决方法**：
```bash
# 重启 adb
adb kill-server
adb start-server
adb devices
```

### 5. SSH 连接失败

**可能原因**：
- 服务器地址或端口错误
- 用户名或密码错误
- 网络不通
- SSH 服务未启动

**解决方法**：
- 检查服务器信息是否正确
- 确保设备和服务器在同一网络
- 在电脑上用 SSH 客户端测试连接

## 技术栈

- **React Native** 0.73.6 - 跨平台移动应用框架
- **React Navigation** 6.x - 页面导航
- **React Native SSH2** - SSH 连接库（需要原生模块支持）

## 注意事项

⚠️ **重要提示**：

1. 当前版本使用模拟 SSH 连接进行演示
2. 实际生产环境需要集成真实的 SSH 原生模块
3. 建议使用 `react-native-ssh2` 或自行开发原生桥接
4. 密码会在内存中明文存储，请注意安全
5. 不建议在公共网络环境下使用

## 开发计划

- [ ] 集成真实 SSH 连接
- [ ] 支持 SSH 密钥认证
- [ ] 添加连接历史记录
- [ ] 支持多会话管理
- [ ] 添加 SFTP 文件传输
- [ ] 支持终端主题自定义
- [ ] 添加快捷命令功能

## 许可证

MIT License

## 联系方式

- GitHub: https://github.com/qingzhu0011/mobile-ssh
- Issues: https://github.com/qingzhu0011/mobile-ssh/issues

## 贡献

欢迎提交 Issue 和 Pull Request！

---

**祝您使用愉快！** 🚀
