import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator} from 'react-native';
import styles, {colors} from '../styles';

const TerminalScreen = ({route, navigation}) => {
  const {sshClient, connectionInfo} = route.params;
  
  const [output, setOutput] = useState('');
  const [input, setInput] = useState('');
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(true);
  const [commandHistory, setCommandHistory] = useState([]);
  const scrollViewRef = useRef(null);
  const sshStreamRef = useRef(null);

  useEffect(() => {
    initSSHSession();
    return () => cleanupSSH();
  }, []);

  // 初始化SSH会话并监听数据流（模拟版本）
  const initSSHSession = async () => {
    try {
      setOutput(`连接到 ${connectionInfo.username}@${connectionInfo.host}:${connectionInfo.port}\n\n`);
      
      // 模拟连接延迟
      await new Promise(resolve => setTimeout(resolve, 1000));

      setConnected(true);
      setConnecting(false);
      setOutput(prev => prev + '✓ 终端会话已建立（演示模式）\n\n$ ');

    } catch (error) {
      setConnecting(false);
      Alert.alert('错误', error.message, [{text: '返回', onPress: () => navigation.goBack()}]);
    }
  };

  // 发送命令到SSH会话并保存历史（模拟版本）
  const sendCommand = () => {
    if (!input.trim() || !connected) return;

    const command = input.trim();
    setCommandHistory(prev => [...prev, command]);
    
    // 显示命令
    setOutput(prev => prev + command + '\n');
    setInput('');

    // 模拟命令响应
    setTimeout(() => {
      let response = '';
      
      if (command === 'ls' || command === 'ls -la') {
        response = 'total 48\ndrwxr-xr-x  5 user user 4096 Feb  9 01:00 .\ndrwxr-xr-x 10 user user 4096 Feb  8 12:00 ..\n-rw-r--r--  1 user user  220 Feb  8 12:00 .bash_logout\n-rw-r--r--  1 user user 3526 Feb  8 12:00 .bashrc\ndrwxr-xr-x  3 user user 4096 Feb  9 01:00 Documents\ndrwxr-xr-x  2 user user 4096 Feb  9 01:00 Downloads\n-rw-r--r--  1 user user  807 Feb  8 12:00 .profile\n';
      } else if (command === 'pwd') {
        response = '/home/user\n';
      } else if (command === 'whoami') {
        response = connectionInfo.username + '\n';
      } else if (command === 'date') {
        response = new Date().toString() + '\n';
      } else if (command.startsWith('echo ')) {
        response = command.substring(5) + '\n';
      } else if (command === 'uname -a') {
        response = 'Linux demo-server 5.15.0-91-generic #101-Ubuntu SMP x86_64 GNU/Linux\n';
      } else if (command === 'hostname') {
        response = connectionInfo.host + '\n';
      } else if (command === 'clear') {
        setOutput('$ ');
        return;
      } else if (command === 'exit' || command === 'logout') {
        setOutput(prev => prev + '\n会话已断开\n');
        setConnected(false);
        setTimeout(() => navigation.goBack(), 1000);
        return;
      } else {
        response = `bash: ${command}: command not found\n`;
      }
      
      setOutput(prev => prev + response + '$ ');
    }, 300);
  };

  // 断开SSH连接并返回登录页
  const handleDisconnect = () => {
    Alert.alert('确认断开', '确定要断开SSH连接吗？', [
      {text: '取消', style: 'cancel'},
      {text: '断开', style: 'destructive', onPress: () => {
        cleanupSSH();
        navigation.goBack();
      }},
    ]);
  };

  // 清理SSH资源释放连接（模拟版本）
  const cleanupSSH = () => {
    try {
      setConnected(false);
    } catch (error) {
      console.error('清理SSH资源失败:', error);
    }
  };

  if (connecting) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>正在初始化终端...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.terminal}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({animated: true})}>
        <Text style={styles.terminalOutput}>{output}</Text>
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.terminalInput}
          value={input}
          onChangeText={setInput}
          placeholder="输入命令..."
          placeholderTextColor={colors.textSecondary}
          autoCapitalize="none"
          autoCorrect={false}
          onSubmitEditing={sendCommand}
          editable={connected}
        />
        <TouchableOpacity
          style={[styles.sendButton, !connected && styles.sendButtonDisabled]}
          onPress={sendCommand}
          disabled={!connected}>
          <Text style={styles.sendButtonText}>发送</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.disconnectButton} onPress={handleDisconnect}>
          <Text style={styles.disconnectButtonText}>断开</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TerminalScreen;
