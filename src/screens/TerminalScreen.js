/**
 * 终端页面
 * 功能：显示SSH终端，执行命令，显示输出
 */

import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {colors, spacing, globalStyles} from '../styles/globalStyles';

const TerminalScreen = ({route, navigation}) => {
  const {connection} = route.params;
  
  // 状态管理
  const [output, setOutput] = useState('');
  const [input, setInput] = useState('');
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(true);
  const scrollViewRef = useRef(null);

  /**
   * 组件挂载时连接SSH
   */
  useEffect(() => {
    connectSSH();
    
    // 组件卸载时断开连接
    return () => {
      disconnectSSH();
    };
  }, []);

  /**
   * 连接SSH服务器
   */
  const connectSSH = async () => {
    try {
      setOutput(`正在连接到 ${connection.username}@${connection.host}:${connection.port}...\n`);
      
      // 模拟连接延迟
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 模拟连接成功
      setConnected(true);
      setConnecting(false);
      setOutput(prev => prev + `\n✓ 连接成功！\n\n欢迎使用 MobileSSH\n输入命令开始使用...\n\n$ `);
      
      // 注意：实际项目中需要使用 react-native-ssh2 或其他SSH库
      // 这里是模拟实现，用于演示UI和交互流程
      
    } catch (error) {
      setConnecting(false);
      Alert.alert('连接失败', error.message, [
        {text: '返回', onPress: () => navigation.goBack()},
      ]);
    }
  };

  /**
   * 断开SSH连接
   */
  const disconnectSSH = () => {
    if (connected) {
      setOutput(prev => prev + '\n\n连接已断开\n');
      setConnected(false);
    }
  };

  /**
   * 执行命令
   */
  const executeCommand = async () => {
    if (!input.trim() || !connected) {
      return;
    }

    const command = input.trim();
    setInput('');

    // 显示命令
    setOutput(prev => prev + command + '\n');

    try {
      // 模拟命令执行
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 模拟命令输出
      let result = '';
      
      if (command === 'ls' || command === 'ls -la') {
        result = 'total 48\ndrwxr-xr-x  5 user user 4096 Feb  8 23:00 .\ndrwxr-xr-x 10 user user 4096 Feb  8 22:00 ..\n-rw-r--r--  1 user user  220 Feb  8 22:00 .bash_logout\n-rw-r--r--  1 user user 3526 Feb  8 22:00 .bashrc\ndrwxr-xr-x  2 user user 4096 Feb  8 22:30 Documents\ndrwxr-xr-x  2 user user 4096 Feb  8 22:30 Downloads\n';
      } else if (command === 'pwd') {
        result = '/home/user\n';
      } else if (command === 'whoami') {
        result = connection.username + '\n';
      } else if (command === 'date') {
        result = new Date().toString() + '\n';
      } else if (command === 'clear') {
        setOutput('$ ');
        return;
      } else if (command === 'exit') {
        disconnectSSH();
        Alert.alert('提示', '连接已断开', [
          {text: '返回', onPress: () => navigation.goBack()},
        ]);
        return;
      } else if (command.startsWith('echo ')) {
        result = command.substring(5) + '\n';
      } else {
        result = `bash: ${command}: command not found\n`;
      }
      
      setOutput(prev => prev + result + '$ ');
      
      // 注意：实际项目中需要通过SSH连接执行真实命令
      // 例如使用 react-native-ssh2:
      // const result = await sshClient.exec(command);
      // setOutput(prev => prev + result + '$ ');
      
    } catch (error) {
      setOutput(prev => prev + `错误: ${error.message}\n$ `);
    }
  };

  /**
   * 处理断开连接按钮
   */
  const handleDisconnect = () => {
    Alert.alert(
      '确认断开',
      '确定要断开SSH连接吗？',
      [
        {text: '取消', style: 'cancel'},
        {
          text: '断开',
          style: 'destructive',
          onPress: () => {
            disconnectSSH();
            navigation.goBack();
          },
        },
      ],
    );
  };

  // 连接中状态
  if (connecting) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>正在连接...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 终端输出区域 */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.terminal}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({animated: true})}>
        <Text style={styles.terminalText}>{output}</Text>
      </ScrollView>

      {/* 命令输入区域 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="输入命令..."
          placeholderTextColor={colors.textSecondary}
          autoCapitalize="none"
          autoCorrect={false}
          onSubmitEditing={executeCommand}
          editable={connected}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            !connected && styles.sendButtonDisabled,
          ]}
          onPress={executeCommand}
          disabled={!connected}>
          <Text style={styles.sendButtonText}>发送</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.disconnectButton}
          onPress={handleDisconnect}>
          <Text style={styles.disconnectButtonText}>断开</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    color: colors.textSecondary,
    marginTop: spacing.md,
    fontSize: 16,
  },
  terminal: {
    flex: 1,
    padding: spacing.md,
  },
  terminalText: {
    fontFamily: 'monospace',
    fontSize: 14,
    color: colors.success,
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    color: colors.text,
    padding: spacing.md,
    borderRadius: 8,
    fontSize: 14,
    fontFamily: 'monospace',
    marginRight: spacing.sm,
  },
  sendButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: 8,
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  sendButtonDisabled: {
    backgroundColor: colors.border,
  },
  sendButtonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: 'bold',
  },
  disconnectButton: {
    backgroundColor: colors.error,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: 8,
    justifyContent: 'center',
  },
  disconnectButtonText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default TerminalScreen;
