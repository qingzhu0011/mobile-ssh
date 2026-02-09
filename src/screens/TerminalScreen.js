/**
 * 终端页面 - SSH交互
 */

import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator} from 'react-native';
import {colors, globalStyles} from '../styles/globalStyles';

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

  // 初始化SSH会话：创建shell并监听数据
  const initSSHSession = async () => {
    try {
      setOutput(`连接到 ${connectionInfo.username}@${connectionInfo.host}:${connectionInfo.port}\n\n`);
      
      // 创建shell会话
      sshClient.shell((err, stream) => {
        if (err) {
          setConnecting(false);
          Alert.alert('错误', '无法创建终端会话', [{text: '返回', onPress: () => navigation.goBack()}]);
          return;
        }

        sshStreamRef.current = stream;
        setConnected(true);
        setConnecting(false);
        setOutput(prev => prev + '✓ 终端会话已建立\n\n$ ');

        // 监听stdout输出
        stream.on('data', (data) => {
          const text = data.toString('utf-8');
          setOutput(prev => prev + text);
        });

        // 监听会话关闭
        stream.on('close', () => {
          setConnected(false);
          setOutput(prev => prev + '\n\n会话已断开\n');
          Alert.alert('提示', 'SSH会话已断开', [{text: '返回', onPress: () => navigation.goBack()}]);
        });

        // 监听stderr错误输出
        stream.stderr.on('data', (data) => {
          const text = data.toString('utf-8');
          setOutput(prev => prev + text);
        });
      });

    } catch (error) {
      setConnecting(false);
      Alert.alert('错误', error.message, [{text: '返回', onPress: () => navigation.goBack()}]);
    }
  };

  // 执行命令：发送到SSH会话并保存历史
  const executeCommand = () => {
    if (!input.trim() || !connected || !sshStreamRef.current) return;

    const command = input.trim();
    setCommandHistory(prev => [...prev, command]);
    setInput('');

    try {
      // 发送命令到SSH会话
      sshStreamRef.current.write(command + '\n');
    } catch (error) {
      setOutput(prev => prev + `\n错误: ${error.message}\n$ `);
      Alert.alert('命令执行失败', error.message);
    }
  };

  // 断开连接：清理SSH资源并返回
  const handleDisconnect = () => {
    Alert.alert('确认断开', '确定要断开SSH连接吗？', [
      {text: '取消', style: 'cancel'},
      {text: '断开', style: 'destructive', onPress: () => {
        cleanupSSH();
        navigation.goBack();
      }},
    ]);
  };

  // 清理SSH资源：关闭stream和client
  const cleanupSSH = () => {
    try {
      if (sshStreamRef.current) {
        sshStreamRef.current.end();
        sshStreamRef.current = null;
      }
      if (sshClient) {
        sshClient.end();
      }
      setConnected(false);
    } catch (error) {
      console.error('清理SSH资源失败:', error);
    }
  };

  if (connecting) {
    return (
      <View style={globalStyles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={globalStyles.loadingText}>正在初始化终端...</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={globalStyles.terminal}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({animated: true})}>
        <Text style={globalStyles.terminalText}>{output}</Text>
      </ScrollView>

      <View style={globalStyles.inputContainer}>
        <TextInput
          style={globalStyles.terminalInput}
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
          style={[globalStyles.sendButton, !connected && globalStyles.sendButtonDisabled]}
          onPress={executeCommand}
          disabled={!connected}>
          <Text style={globalStyles.sendButtonText}>发送</Text>
        </TouchableOpacity>
        <TouchableOpacity style={globalStyles.disconnectButton} onPress={handleDisconnect}>
          <Text style={globalStyles.disconnectButtonText}>断开</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TerminalScreen;
