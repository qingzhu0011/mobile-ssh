# MobileSSH 项目结构说明

## 完整目录结构

```
mobile-ssh-native/
├── android/                    # Android 原生代码目录（需要 react-native init 生成）
│   ├── app/
│   │   ├── src/
│   │   │   └── main/
│   │   │       ├── AndroidManifest.xml
│   │   │       └── java/
│   │   └── build.gradle
│   ├── gradle/
│   ├── build.gradle
│   └── settings.gradle
│
├── src/                        # 源代码目录
│   ├── screens/               # 页面组件
│   │   ├── LoginScreen.js     # 登录页面（SSH连接配置）
│   │   └── TerminalScreen.js  # 终端页面（命令执行）
│   │
│   ├── styles/                # 样式文件
│   │   └── globalStyles.js    # 全局样式定义
│   │
│   └── utils/                 # 工具函数（预留）
│
├── App.js                     # 应用主入口，配置导航
├── index.js                   # React Native 注册入口
├── package.json               # 项目依赖配置
├── babel.config.js            # Babel 编译配置
├── metro.config.js            # Metro 打包配置
├── app.json                   # 应用元数据
├── .gitignore                 # Git 忽略文件
├── README.md                  # 项目说明文档
└── PROJECT_STRUCTURE.md       # 本文件

```

## 核心文件说明

### 1. 配置文件

#### package.json
- 定义项目依赖
- 配置 npm 脚本命令
- 包含 React Native 0.73.6 和导航库

#### babel.config.js
- Babel 转译配置
- 支持 React Native 语法

#### metro.config.js
- Metro 打包工具配置
- 处理 JavaScript 模块

#### app.json
- 应用基本信息
- 应用名称和版本

#### .gitignore
- Git 版本控制忽略规则
- 排除 node_modules、构建产物等

### 2. 应用入口

#### index.js
- React Native 应用注册入口
- 注册根组件

#### App.js
- 应用主组件
- 配置 React Navigation
- 定义页面路由

### 3. 页面组件

#### src/screens/LoginScreen.js
**功能**：
- SSH 服务器连接配置
- 表单输入和验证
- 连接状态管理
- 错误处理

**主要功能**：
- 输入服务器地址、端口、用户名、密码
- 表单非空验证
- 端口号格式验证
- 连接加载状态
- 错误提示（超时、认证失败、连接拒绝）
- 连接成功后跳转到终端页

#### src/screens/TerminalScreen.js
**功能**：
- SSH 终端界面
- 命令输入和执行
- 输出显示
- 连接管理

**主要功能**：
- 接收 SSH 连接信息
- 显示连接状态
- 命令输入框
- 实时输出显示
- 命令历史记录
- 断开连接功能
- 支持常用命令（ls, pwd, whoami, date, echo, clear, exit）

### 4. 样式文件

#### src/styles/globalStyles.js
**内容**：
- 颜色定义（深色主题）
- 间距定义
- 字体样式
- 全局组件样式

**设计原则**：
- 统一的视觉风格
- 深色主题适合终端
- 易于维护和扩展

## 技术架构

### 导航流程

```
App.js (NavigationContainer)
  └── Stack.Navigator
      ├── LoginScreen (初始页面)
      └── TerminalScreen (终端页面)
```

### 数据流

```
LoginScreen
  ├── 用户输入 → 表单验证
  ├── 连接 SSH → 模拟连接
  └── 成功 → 传递连接信息 → TerminalScreen

TerminalScreen
  ├── 接收连接信息
  ├── 建立 SSH 会话
  ├── 用户输入命令 → 执行命令
  └── 显示输出 → 更新终端
```

### 状态管理

使用 React Hooks：
- `useState` - 组件状态
- `useEffect` - 生命周期
- `useRef` - 引用管理

## 依赖说明

### 核心依赖

1. **react** (18.2.0)
   - React 核心库

2. **react-native** (0.73.6)
   - React Native 框架

3. **@react-navigation/native** (^6.1.9)
   - 导航核心库

4. **@react-navigation/stack** (^6.3.20)
   - 堆栈导航

5. **react-native-screens** (^3.29.0)
   - 原生屏幕组件

6. **react-native-safe-area-context** (^4.8.2)
   - 安全区域处理

7. **react-native-gesture-handler** (^2.14.1)
   - 手势处理

8. **react-native-ssh2** (^1.0.0)
   - SSH 连接库（需要原生模块）

## 开发规范

### 代码风格

1. **文件命名**
   - 组件文件：PascalCase（如 LoginScreen.js）
   - 工具文件：camelCase（如 globalStyles.js）

2. **组件结构**
   ```javascript
   // 导入
   import ...
   
   // 组件定义
   const ComponentName = () => {
     // 状态
     // 副作用
     // 函数
     // 渲染
   };
   
   // 样式
   const styles = StyleSheet.create({...});
   
   // 导出
   export default ComponentName;
   ```

3. **注释规范**
   - 文件顶部：功能说明
   - 函数：JSDoc 注释
   - 复杂逻辑：行内注释

### Git 提交规范

```
feat: 新功能
fix: 修复bug
docs: 文档更新
style: 代码格式
refactor: 重构
test: 测试
chore: 构建/工具
```

## 扩展指南

### 添加新页面

1. 在 `src/screens/` 创建新组件
2. 在 `App.js` 中注册路由
3. 使用 `navigation.navigate()` 跳转

### 添加新功能

1. 在 `src/utils/` 创建工具函数
2. 在组件中导入使用
3. 添加单元测试

### 集成真实 SSH

1. 安装原生 SSH 库
2. 创建 SSH 客户端封装
3. 替换模拟连接代码
4. 处理真实的命令执行

## 构建流程

### 开发构建

```bash
npm install          # 安装依赖
npm start           # 启动 Metro
npm run android     # 运行 Android
```

### 生产构建

```bash
cd android
./gradlew assembleRelease
```

## 注意事项

1. **SSH 连接**
   - 当前使用模拟连接
   - 生产环境需要真实 SSH 库

2. **安全性**
   - 密码明文存储在内存
   - 建议添加加密
   - 不要在公共网络使用

3. **性能**
   - 大量输出可能导致卡顿
   - 建议限制输出长度
   - 使用虚拟列表优化

4. **兼容性**
   - 仅支持 Android
   - iOS 需要额外配置

## 常见问题

### Q: 如何初始化 Android 项目？
A: 使用 `npx react-native init MobileSSH` 生成完整项目，然后替换源代码。

### Q: 如何集成真实 SSH？
A: 需要原生模块支持，可以使用 `react-native-ssh2` 或自行开发。

### Q: 如何调试？
A: 使用 React Native Debugger 或 Chrome DevTools。

### Q: 如何优化性能？
A: 使用 React.memo、useMemo、useCallback 等优化手段。

## 更新日志

### v1.0.0 (2026-02-08)
- ✅ 初始版本
- ✅ 登录页面
- ✅ 终端页面
- ✅ 基础导航
- ✅ 模拟 SSH 连接
- ✅ 命令执行演示

---

**文档版本**: 1.0.0  
**最后更新**: 2026-02-08
