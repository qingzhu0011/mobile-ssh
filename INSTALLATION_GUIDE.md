# MobileSSH 安装和使用指南

## 快速开始（纯新手版）

### 第一步：安装必需软件

#### 1. 安装 Node.js

**Windows:**
1. 访问 https://nodejs.org/
2. 下载 LTS 版本（推荐 18.x 或更高）
3. 双击安装包，一路"下一步"
4. 打开命令提示符（CMD），输入 `node --version` 验证

**macOS:**
```bash
# 使用 Homebrew 安装
brew install node

# 验证
node --version
```

**Linux:**
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 验证
node --version
```

#### 2. 安装 JDK (Java Development Kit)

**Windows:**
1. 访问 https://www.oracle.com/java/technologies/downloads/
2. 下载 JDK 11 或更高版本
3. 安装后配置环境变量：
   - 右键"此电脑" → 属性 → 高级系统设置 → 环境变量
   - 新建 `JAVA_HOME`，值为 JDK 安装路径（如 `C:\Program Files\Java\jdk-11`）
   - 在 Path 中添加 `%JAVA_HOME%\bin`
4. 打开新的 CMD，输入 `java -version` 验证

**macOS:**
```bash
# 使用 Homebrew 安装
brew install openjdk@11

# 配置环境变量
echo 'export PATH="/usr/local/opt/openjdk@11/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc

# 验证
java -version
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install openjdk-11-jdk

# 验证
java -version
```

#### 3. 安装 Android Studio

1. 访问 https://developer.android.com/studio
2. 下载并安装 Android Studio
3. 首次启动时选择 "Standard" 安装
4. 等待下载 Android SDK 和其他组件

#### 4. 配置 Android SDK

**在 Android Studio 中:**
1. 打开 Android Studio
2. 点击 "More Actions" → "SDK Manager"
3. 在 "SDK Platforms" 标签下，勾选：
   - Android 13.0 (Tiramisu) - API Level 33
4. 在 "SDK Tools" 标签下，勾选：
   - Android SDK Build-Tools
   - Android Emulator
   - Android SDK Platform-Tools
5. 点击 "Apply" 下载安装

**配置环境变量:**

**Windows:**
1. 右键"此电脑" → 属性 → 高级系统设置 → 环境变量
2. 新建系统变量：
   - 变量名：`ANDROID_HOME`
   - 变量值：`C:\Users\你的用户名\AppData\Local\Android\Sdk`
3. 编辑 Path 变量，添加：
   - `%ANDROID_HOME%\platform-tools`
   - `%ANDROID_HOME%\tools`
   - `%ANDROID_HOME%\tools\bin`

**macOS/Linux:**
```bash
# 编辑 ~/.bashrc 或 ~/.zshrc
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin

# 使配置生效
source ~/.bashrc  # 或 source ~/.zshrc
```

### 第二步：获取项目代码

#### 方式一：从 GitHub 克隆（推荐）

```bash
# 打开终端/命令提示符
git clone https://github.com/qingzhu0011/mobile-ssh.git
cd mobile-ssh
```

#### 方式二：下载 ZIP

1. 访问 https://github.com/qingzhu0011/mobile-ssh
2. 点击绿色的 "Code" 按钮
3. 选择 "Download ZIP"
4. 解压到任意目录
5. 打开终端，进入解压后的目录

### 第三步：安装项目依赖

```bash
# 在项目根目录执行
npm install
```

**如果遇到错误，尝试：**
```bash
npm install --legacy-peer-deps
```

**常见错误处理：**

1. **网络问题**：
   ```bash
   # 使用淘宝镜像
   npm config set registry https://registry.npmmirror.com
   npm install
   ```

2. **权限问题（Linux/macOS）**：
   ```bash
   sudo npm install
   ```

3. **依赖冲突**：
   ```bash
   rm -rf node_modules package-lock.json
   npm install --legacy-peer-deps
   ```

### 第四步：准备 Android 环境

#### 方式一：使用 Android 模拟器（推荐新手）

1. 打开 Android Studio
2. 点击 "More Actions" → "Virtual Device Manager"
3. 点击 "Create Device"
4. 选择设备型号（推荐 Pixel 5）
5. 选择系统镜像（推荐 API 33）
6. 点击 "Finish" 创建
7. 点击播放按钮启动模拟器

#### 方式二：使用真实手机

1. **启用开发者选项：**
   - 打开手机"设置"
   - 找到"关于手机"
   - 连续点击"版本号"7次
   - 返回设置，找到"开发者选项"

2. **启用 USB 调试：**
   - 进入"开发者选项"
   - 打开"USB 调试"开关

3. **连接手机：**
   - 用 USB 线连接手机到电脑
   - 手机上会弹出授权提示，点击"允许"

4. **验证连接：**
   ```bash
   adb devices
   ```
   应该显示你的设备

### 第五步：运行应用

#### 1. 启动 Metro Bundler

打开终端，在项目根目录执行：

```bash
npm start
```

看到类似输出表示成功：
```
Welcome to Metro!
Fast - Scalable - Integrated

To reload the app press "r"
To open developer menu press "d"
```

**保持这个终端窗口打开！**

#### 2. 运行 Android 应用

打开**新的**终端窗口，在项目根目录执行：

```bash
npm run android
```

**首次运行会比较慢（5-10分钟），需要下载 Gradle 和依赖。**

看到类似输出表示成功：
```
info Launching emulator...
info Successfully launched emulator.
info Installing the app...
BUILD SUCCESSFUL
```

应用会自动安装并启动在模拟器/手机上。

### 第六步：使用应用

#### 1. 登录页面

应用启动后会显示登录页面：

1. **服务器地址**：输入 SSH 服务器的 IP 或域名
   - 例如：`192.168.1.100`
   - 例如：`example.com`

2. **端口**：默认 `22`，如果服务器使用其他端口请修改

3. **用户名**：SSH 登录用户名
   - 例如：`root`
   - 例如：`ubuntu`

4. **密码**：SSH 登录密码

5. 点击"连接"按钮

#### 2. 终端页面

连接成功后会跳转到终端页面：

1. **输入命令**：在底部输入框输入 Linux 命令
2. **执行命令**：点击"发送"按钮或按回车
3. **查看输出**：终端区域会显示命令输出
4. **断开连接**：点击右下角"断开"按钮

#### 3. 支持的命令示例

```bash
ls              # 列出当前目录文件
ls -la          # 详细列出文件（包括隐藏文件）
pwd             # 显示当前目录路径
whoami          # 显示当前用户名
date            # 显示当前日期时间
echo Hello      # 输出文本
clear           # 清空终端屏幕
exit            # 断开连接并返回登录页
```

## 常见问题解决

### 1. Metro Bundler 无法启动

**错误信息**：`Error: ENOSPC: System limit for number of file watchers reached`

**解决方法（Linux）**：
```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

### 2. Android 构建失败

**错误信息**：`Could not find com.android.tools.build:gradle:x.x.x`

**解决方法**：
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### 3. 设备未识别

**错误信息**：`No devices found`

**解决方法**：
```bash
# 重启 adb
adb kill-server
adb start-server

# 检查设备
adb devices
```

### 4. 应用闪退

**可能原因**：
- 依赖未正确安装
- 原生模块链接失败

**解决方法**：
```bash
# 清理并重新构建
cd android
./gradlew clean
cd ..
rm -rf node_modules
npm install
npm run android
```

### 5. 无法连接 SSH 服务器

**检查清单**：
- [ ] 服务器地址是否正确
- [ ] 端口号是否正确
- [ ] 用户名和密码是否正确
- [ ] 手机/模拟器能否访问服务器网络
- [ ] SSH 服务是否在服务器上运行

**测试方法**：
在电脑上用 SSH 客户端测试：
```bash
ssh username@server_ip -p port
```

## 开发调试

### 启用开发者菜单

**在模拟器中**：
- 按 `Ctrl + M` (Windows/Linux)
- 按 `Cmd + M` (macOS)

**在真实设备上**：
- 摇晃手机

### 重新加载应用

**方式一**：在开发者菜单中选择 "Reload"

**方式二**：在 Metro 终端按 `r`

### 查看日志

```bash
# Android 日志
adb logcat

# React Native 日志
npx react-native log-android
```

### 调试 JavaScript

1. 在开发者菜单中选择 "Debug"
2. 浏览器会打开调试页面
3. 按 F12 打开开发者工具
4. 在 Console 中查看日志

## 构建 APK

### 调试版 APK

```bash
cd android
./gradlew assembleDebug
```

APK 位置：`android/app/build/outputs/apk/debug/app-debug.apk`

### 发布版 APK

1. **生成签名密钥**：
   ```bash
   keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **将密钥文件放到 android/app/ 目录**

3. **编辑 android/gradle.properties**，添加：
   ```
   MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
   MYAPP_RELEASE_KEY_ALIAS=my-key-alias
   MYAPP_RELEASE_STORE_PASSWORD=你设置的密码
   MYAPP_RELEASE_KEY_PASSWORD=你设置的密码
   ```

4. **编辑 android/app/build.gradle**，在 `android` 块中添加：
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

5. **构建发布版**：
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

APK 位置：`android/app/build/outputs/apk/release/app-release.apk`

## 获取帮助

- **GitHub Issues**: https://github.com/qingzhu0011/mobile-ssh/issues
- **React Native 文档**: https://reactnative.dev/docs/getting-started
- **Stack Overflow**: 搜索 "react-native" 标签

## 下一步

- 阅读 [README.md](README.md) 了解项目详情
- 阅读 [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) 了解代码结构
- 开始开发你的功能！

---

**祝您使用愉快！** 🎉
