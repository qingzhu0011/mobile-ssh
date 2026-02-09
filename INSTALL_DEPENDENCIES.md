# 依赖安装说明

## 完整安装步骤

```bash
# 1. 克隆项目
git clone https://github.com/qingzhu0011/mobile-ssh.git
cd mobile-ssh

# 2. 安装依赖
npm install

# 3. 验证安装
npm list --depth=0
```

## 依赖安装失败解决方案

### 方案1: 使用淘宝镜像源
```bash
npm config set registry https://registry.npmmirror.com
npm install
```

### 方案2: 清理缓存重装
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### 方案3: 使用legacy-peer-deps
```bash
npm install --legacy-peer-deps
```

### 方案4: 指定Node版本
```bash
# 确保Node.js >= 18
node --version
# 如果版本过低，升级Node.js后重试
npm install
```

## 配置文件校验

### 验证package.json
```bash
# 检查JSON格式
node -e "console.log(JSON.parse(require('fs').readFileSync('package.json')))"

# 验证依赖完整性
npm ls
```

### 验证metro.config.js
```bash
# 检查语法
node -c metro.config.js

# 测试Metro配置
npx react-native config
```

### 验证babel.config.js
```bash
# 检查语法
node -c babel.config.js
```

### 验证app.json
```bash
# 检查JSON格式
node -e "console.log(JSON.parse(require('fs').readFileSync('app.json')))"
```

## 验证安装成功

```bash
# 检查所有依赖已安装
npm list react-native
npm list @react-navigation/native
npm list react-native-ssh2

# 启动Metro测试
npm start
```

## 常见错误处理

### 错误: EACCES权限错误
```bash
sudo chown -R $(whoami) ~/.npm
npm install
```

### 错误: peer dependencies冲突
```bash
npm install --legacy-peer-deps
```

### 错误: 网络超时
```bash
npm config set registry https://registry.npmmirror.com
npm config set timeout 60000
npm install
```

### 错误: node-gyp编译失败
```bash
# 安装构建工具
npm install -g node-gyp
# Windows需要安装windows-build-tools
npm install --global windows-build-tools
```
