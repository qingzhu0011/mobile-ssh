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

  // 初始化SSH会话并监听数据流
  const initSSHSession = async () => {
    try {
      setOutput(`连接到 ${connectionInfo.username}@${connectionInfo.host}:${connectionInfo.port}\n\n`);
      
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

        stream.on('data', (data) => {
          const text = data.toString('utf-8');
          setOutput(prev => prev + text);
        });

        stream.on('close', () => {
          setConnected(false);
          setOutput(prev => prev + '\n\n会话已断开\n');
          Alert.alert('提示', 'SSH会话已断开', [{text: '返回', onPress: () => navigation.goBack()}]);
        });

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

  // 发送命令到SSH会话并保存历史
  const sendCommand = () => {
    if (!input.trim() || !connected || !sshStreamRef.current) return;

    const command = input.trim();
    setCommandHistory(prev => [...prev, command]);
    setInput('');

    try {
      sshStreamRef.current.write(command + '\n');
    } catch (error) {
      setOutput(prev => prev + `\n错误: ${error.message}\n$ `);
      Alert.alert('命令执行失败', error.message);
    }
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

  // 清理SSH资源释放连接
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
