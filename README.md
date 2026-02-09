# Mobile SSH - React Native SSH 客户端

一个基于 React Native 开发的 Android SSH 客户端应用，支持连接远程服务器并执行命令。

---

## 📋 环境要求

### 必需软件及版本

| 软件 | 最低版本 | 验证命令 |
|------|---------|---------|
| **Node.js** | 18.0.0+ | `node --version` |
| **npm** | 8.0.0+ | `npm --version` |
| **React Native CLI** | 最新版 | `npx react-native --version` |
| **JDK (Java)** | 11.0+ | `java -version` |
| **Android SDK** | API Level 21+ (Android 5.0) | 通过 Android Studio 查看 |
| **Android Build Tools** | 33.0.0+ | 通过 Android Studio SDK Manager 查看 |

### Android 开发环境配置

#### 1. 安装 Android Studio
- 下载地址: https://developer.android.com/studio
- 安装时选择 "Android SDK"、"Android SDK Platform" 和 "Android Virtual Device"

#### 2. 配置 Android SDK
打开 Android Studio → Settings/Preferences → Appearance & Behavior → System Settings → Android SDK

安装以下组件：
- ✅ Android SDK Platform 33 (或更高)
- ✅ Android SDK Build-Tools 33.0.0+
- ✅ Android SDK Platform-Tools
- ✅ Android Emulator
- ✅ Intel x86 Emulator Accelerator (HAXM installer) - 仅 Intel CPU

#### 3. 配置环境变量

**Windows:**
```cmd
setx ANDROID_HOME "%LOCALAPPDATA%\Android\Sdk"
setx PATH "%PATH%;%LOCALAPPDATA%\Android\Sdk\platform-tools"
```

**macOS/Linux:**
```bash
# 添加到 ~/.bash_profile 或 ~/.zshrc
export ANDROID_HOME=$HOME/Library/Android/sdk  # macOS
# export ANDROID_HOME=$HOME/Android/Sdk        # Linux
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin

# 使配置生效
source ~/.bash_profile  # 或 source ~/.zshrc
```

#### 4. 验证环境
```bash
adb version          # 应显示 Android Debug Bridge 版本
java -version        # 应显示 Java 11+
node --version       # 应显示 Node.js 18+
```

---

## 🚀 安装步骤

### 一键安装（推荐）

```bash
# 1. 克隆项目
git clone https://github.com/qingzhu0011/mobile-ssh.git
cd mobile-ssh

# 2. 安装依赖
npm install

# 3. 初始化 Android 项目（首次运行）
npx react-native init-android

# 4. 启动 Metro Bundler
npm start
```

在新终端窗口：
```bash
# 5. 运行 Android 应用
npm run android
```

### 分步安装

#### 步骤 1: 克隆仓库
```bash
git clone https://github.com/qingzhu0011/mobile-ssh.git
cd mobile-ssh
```

#### 步骤 2: 安装 Node 依赖
```bash
npm install
```

如遇依赖冲突：
```bash
npm install --legacy-peer-deps
```

#### 步骤 3: 清理缓存（可选）
```bash
# 清理 npm 缓存
npm cache clean --force

# 清理 Metro bundler 缓存
npx react-native start --reset-cache
```

---

## 📱 安卓端启动/打包步骤

### 方式一：使用 Android 模拟器

#### 1. 创建模拟器
```bash
# 打开 Android Studio
# Tools → Device Manager → Create Device
# 选择设备型号（推荐 Pixel 5）
# 选择系统镜像（推荐 API 33, Android 13）
# 完成创建
```

#### 2. 启动模拟器
```bash
# 方法 A: 通过 Android Studio 启动
# Device Manager → 点击播放按钮

# 方法 B: 命令行启动
emulator -avd Pixel_5_API_33
```

#### 3. 验证设备连接
```bash
adb devices
# 应显示:
# List of devices attached
# emulator-5554   device
```

#### 4. 运行应用
```bash
# 终端 1: 启动 Metro
npm start

# 终端 2: 安装并运行
npm run android
```

### 方式二：使用真实 Android 设备

#### 1. 启用开发者模式
1. 打开手机 **设置**
2. 进入 **关于手机**
3. 连续点击 **版本号** 7次
4. 返回设置，找到 **开发者选项**

#### 2. 启用 USB 调试
1. 进入 **开发者选项**
2. 开启 **USB 调试**
3. 开启 **USB 安装**（部分设备需要）

#### 3. 连接设备
```bash
# 用 USB 线连接手机到电脑
# 手机上会弹出授权提示，点击"允许"

# 验证连接
adb devices
# 应显示:
# List of devices attached
# XXXXXXXX   device
```

#### 4. 运行应用
```bash
# 终端 1: 启动 Metro
npm start

# 终端 2: 安装并运行
npm run android
```

### 打包 APK

#### 生成调试版 APK
```bash
cd android
./gradlew assembleDebug
cd ..
```
**输出位置:** `android/app/build/outputs/apk/debug/app-debug.apk`

#### 生成发布版 APK

**步骤 1: 生成签名密钥**
```bash
keytool -genkeypair -v -storetype PKCS12 \
  -keystore my-release-key.keystore \
  -alias my-key-alias \
  -keyalg RSA -keysize 2048 \
  -validity 10000
```
按提示输入密码和信息。

**步骤 2: 配置签名**

编辑 `android/gradle.properties`，添加：
```properties
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=你的密钥库密码
MYAPP_RELEASE_KEY_PASSWORD=你的密钥密码
```

编辑 `android/app/build.gradle`，在 `android` 块中添加：
```gradle
signingConfigs {
    release {
        if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
            storeFile file(MYAPP_RELEASE_STORE_FILE)
            storePassword MYAPP_RELEASE_STORE_PASSWORD
            keyAlias MYAPP_RELEASE_KEY_ALIAS
            keyPassword MYAPP_RELEASE_KEY_PASSWORD
        }
    }
}
buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled true
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }
}
```

**步骤 3: 构建发布版**
```bash
cd android
./gradlew assembleRelease
cd ..
```
**输出位置:** `android/app/build/outputs/apk/release/app-release.apk`

**步骤 4: 安装到设备**
```bash
adb install android/app/build/outputs/apk/release/app-release.apk
```

---

## 🔧 SSH 工具使用方法

### 1. 连接服务器

#### 启动应用
打开 Mobile SSH 应用，进入登录页面。

#### 填写服务器信息
| 字段 | 说明 | 示例 |
|------|------|------|
| **服务器地址** | IP 地址或域名 | `192.168.1.100` 或 `example.com` |
| **端口** | SSH 端口号 | `22`（默认） |
| **用户名** | SSH 登录用户名 | `root`、`ubuntu`、`admin` |
| **密码** | SSH 登录密码 | 您的服务器密码 |

#### 点击连接
点击 **"连接"** 按钮，应用会：
1. 验证输入格式
2. 建立 SSH 连接
3. 创建终端会话
4. 自动跳转到终端页面

### 2. 发送命令

连接成功后，您将看到终端界面：

#### 基本操作
1. 在底部输入框输入 Linux 命令
2. 点击 **"发送"** 按钮或按回车键执行
3. 命令输出会实时显示在终端区域

#### 常用命令示例
```bash
# 文件和目录操作
ls                    # 列出当前目录文件
ls -la                # 详细列出所有文件（包括隐藏文件）
pwd                   # 显示当前工作目录
cd /var/log           # 切换到指定目录
mkdir test            # 创建目录
rm -rf test           # 删除目录

# 系统信息
whoami                # 显示当前用户
hostname              # 显示主机名
uname -a              # 显示系统信息
df -h                 # 显示磁盘使用情况
free -m               # 显示内存使用情况
top                   # 显示进程信息（按 q 退出）

# 文件查看
cat /etc/os-release   # 查看文件内容
head -n 20 file.txt   # 查看文件前20行
tail -f /var/log/syslog  # 实时查看日志

# 网络操作
ping -c 4 google.com  # 测试网络连接
ifconfig              # 查看网络接口
netstat -tuln         # 查看端口监听

# 进程管理
ps aux                # 列出所有进程
kill -9 1234          # 强制终止进程（PID 1234）

# 其他
date                  # 显示当前日期时间
echo "Hello World"    # 输出文本
clear                 # 清空终端（部分支持）
history               # 查看命令历史
```

### 3. 断开连接

#### 方法一：使用断开按钮
点击右下角的 **"断开"** 按钮 → 确认断开 → 返回登录页面

#### 方法二：使用 exit 命令
在终端输入：
```bash
exit
```
或
```bash
logout
```

### 4. 常见错误及解决办法

#### ❌ 错误 1: "连接超时"
**原因:**
- 服务器地址或端口错误
- 网络不通
- 防火墙阻止连接

**解决方法:**
```bash
# 1. 验证服务器地址
ping 192.168.1.100

# 2. 检查 SSH 服务是否运行（在服务器上）
sudo systemctl status sshd

# 3. 检查防火墙规则（在服务器上）
sudo ufw status
sudo ufw allow 22/tcp

# 4. 确保手机和服务器在同一网络
```

#### ❌ 错误 2: "认证失败"
**原因:**
- 用户名或密码错误
- SSH 配置禁止密码登录

**解决方法:**
```bash
# 1. 确认用户名和密码正确
# 2. 检查 SSH 配置（在服务器上）
sudo nano /etc/ssh/sshd_config

# 确保以下配置：
PasswordAuthentication yes
PermitRootLogin yes  # 如果使用 root 登录

# 3. 重启 SSH 服务
sudo systemctl restart sshd
```

#### ❌ 错误 3: "端口拒绝连接"
**原因:**
- SSH 服务未启动
- 端口号错误
- 服务器防火墙阻止

**解决方法:**
```bash
# 1. 启动 SSH 服务（在服务器上）
sudo systemctl start sshd
sudo systemctl enable sshd

# 2. 检查 SSH 监听端口
sudo netstat -tuln | grep :22

# 3. 检查防火墙
sudo iptables -L -n | grep 22
```

#### ❌ 错误 4: "网络不通"
**原因:**
- 手机未连接 Wi-Fi
- 服务器不在同一网络
- 路由器阻止连接

**解决方法:**
1. 确保手机连接到 Wi-Fi
2. 确认手机和服务器在同一局域网
3. 尝试 ping 服务器 IP
4. 检查路由器设置

#### ❌ 错误 5: "无法创建终端会话"
**原因:**
- SSH 连接不稳定
- 服务器资源不足
- Shell 配置错误

**解决方法:**
```bash
# 1. 检查服务器负载（在服务器上）
uptime
free -m

# 2. 检查用户 Shell 配置
echo $SHELL
cat /etc/passwd | grep 你的用户名

# 3. 重新连接
```

#### ❌ 错误 6: "命令无响应"
**原因:**
- 命令执行时间过长
- 命令需要交互输入
- 网络延迟

**解决方法:**
1. 等待命令执行完成
2. 避免使用需要交互的命令（如 `vim`、`nano`）
3. 使用 `Ctrl+C` 中断命令（发送 `^C`）
4. 断开重连

#### ⚠️ 使用限制
当前版本不支持：
- 交互式编辑器（vim、nano）
- 需要 TTY 的命令（如 `sudo -i`）
- 文件上传/下载（SFTP）
- 多会话管理

---

## 📂 项目结构

```
mobile-ssh/
├── android/                    # Android 原生代码（需初始化）
│   ├── app/
│   │   ├── build.gradle       # 应用级 Gradle 配置
│   │   └── src/               # Java/Kotlin 源码
│   ├── build.gradle           # 项目级 Gradle 配置
│   └── gradle.properties      # Gradle 属性配置
├── src/
│   ├── screens/               # 页面组件
│   │   ├── LoginScreen.js     # SSH 登录页面
│   │   └── TerminalScreen.js  # SSH 终端页面
│   ├── styles/                # 样式文件
│   │   └── index.js           # 全局样式定义
│   └── utils/                 # 工具函数（预留）
├── App.js                     # 应用入口，配置导航
├── index.js                   # React Native 注册入口
├── package.json               # 项目依赖配置
├── babel.config.js            # Babel 编译配置
├── metro.config.js            # Metro 打包配置
└── README.md                  # 项目文档
```

---

## 🛠️ 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| **React** | 18.2.0 | UI 框架 |
| **React Native** | 0.73.6 | 跨平台移动应用框架 |
| **React Navigation** | 6.x | 页面导航和路由 |
| **react-native-ssh2** | 1.0.0 | SSH 连接库（需原生支持） |
| **react-native-gesture-handler** | 2.14.1 | 手势处理 |
| **react-native-safe-area-context** | 4.8.2 | 安全区域适配 |

---

## ⚠️ 注意事项

1. **SSH 连接安全**
   - 密码在内存中明文存储，请勿在公共网络使用
   - 建议仅在可信网络环境下使用
   - 生产环境建议使用 SSH 密钥认证

2. **网络要求**
   - 需要手机和服务器网络互通
   - 建议在同一局域网内使用
   - 公网连接需确保服务器 SSH 端口可访问

3. **性能限制**
   - 不适合执行长时间运行的命令
   - 大量输出可能导致界面卡顿
   - 建议命令输出控制在合理范围

4. **兼容性**
   - 当前仅支持 Android 平台
   - 最低支持 Android 5.0 (API 21)
   - 推荐 Android 8.0+ 以获得最佳体验

---

## 🐛 故障排查

### Metro Bundler 无法启动
```bash
# 清理缓存
rm -rf node_modules
npm cache clean --force
npm install

# 重置 Metro
npx react-native start --reset-cache
```

### Android 构建失败
```bash
# 清理 Gradle 缓存
cd android
./gradlew clean
./gradlew cleanBuildCache
cd ..

# 删除 .gradle 目录
rm -rf android/.gradle

# 重新构建
npm run android
```

### 设备未识别
```bash
# 重启 ADB 服务
adb kill-server
adb start-server
adb devices

# 检查 USB 驱动（Windows）
# 在设备管理器中更新 Android 设备驱动
```

### 应用闪退
```bash
# 查看日志
adb logcat | grep ReactNative

# 或使用 React Native 日志
npx react-native log-android
```

---

## 📝 开发计划

- [ ] 支持 SSH 密钥认证
- [ ] 添加连接历史记录
- [ ] 支持多会话管理
- [ ] 实现 SFTP 文件传输
- [ ] 支持终端主题自定义
- [ ] 添加快捷命令功能
- [ ] 支持命令自动补全
- [ ] 实现会话保持和断线重连
- [ ] 支持 iOS 平台

---

## 📄 许可证

MIT License

---

## 👥 联系方式

- **GitHub:** https://github.com/qingzhu0011/mobile-ssh
- **Issues:** https://github.com/qingzhu0011/mobile-ssh/issues
- **贡献指南:** 欢迎提交 Issue 和 Pull Request

---

## 🙏 致谢

感谢以下开源项目：
- [React Native](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [react-native-ssh2](https://github.com/example/react-native-ssh2)

---

**祝您使用愉快！** 🚀
