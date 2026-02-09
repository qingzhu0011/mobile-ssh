import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import SSH2 from 'react-native-ssh2';
import styles, {colors} from '../styles';

const LoginScreen = ({navigation}) => {
  const [host, setHost] = useState('');
  const [port, setPort] = useState('22');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // 校验IP地址格式合法性
  const validateIP = (ip) => {
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipRegex.test(ip)) return false;
    return ip.split('.').every(num => parseInt(num) >= 0 && parseInt(num) <= 255);
  };

  // 校验表单输入完整性和格式
  const validateForm = () => {
    if (!host.trim()) {
      Alert.alert('错误', '请输入服务器地址');
      return false;
    }
    if (!validateIP(host.trim()) && !host.includes('.')) {
      Alert.alert('错误', '请输入有效的IP地址或域名');
      return false;
    }
    if (!port.trim()) {
      Alert.alert('错误', '请输入端口号');
      return false;
    }
    const portNum = parseInt(port, 10);
    if (isNaN(portNum) || portNum < 1 || portNum > 65535) {
      Alert.alert('错误', '端口号必须在 1-65535 之间');
      return false;
    }
    if (!username.trim()) {
      Alert.alert('错误', '请输入用户名');
      return false;
    }
    if (!password) {
      Alert.alert('错误', '请输入密码');
      return false;
    }
    return true;
  };

  // 建立SSH连接并跳转到终端页
  const handleConnect = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const sshClient = new SSH2();
      
      const connectPromise = new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('连接超时')), 10000);

        sshClient.on('ready', () => {
          clearTimeout(timeout);
          resolve(sshClient);
        });

        sshClient.on('error', (err) => {
          clearTimeout(timeout);
          reject(err);
        });

        sshClient.connect({
          host: host.trim(),
          port: parseInt(port, 10),
          username: username.trim(),
          password: password,
        });
      });

      const client = await connectPromise;

      navigation.navigate('Terminal', {
        sshClient: client,
        connectionInfo: {host: host.trim(), port: parseInt(port, 10), username: username.trim()},
      });

      setPassword('');

    } catch (error) {
      let errorMessage = '连接失败';
      if (error.message.includes('timeout') || error.message.includes('ETIMEDOUT')) {
        errorMessage = '连接超时，请检查网络和服务器地址';
      } else if (error.message.includes('ECONNREFUSED')) {
        errorMessage = '端口拒绝连接，请检查端口号和SSH服务状态';
      } else if (error.message.includes('authentication') || error.message.includes('auth')) {
        errorMessage = '认证失败，请检查用户名和密码';
      } else if (error.message.includes('ENETUNREACH') || error.message.includes('EHOSTUNREACH')) {
        errorMessage = '网络不通，请检查网络连接';
      } else if (error.message) {
        errorMessage = error.message;
      }
      Alert.alert('连接失败', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <Text style={styles.title}>SSH 连接</Text>
          <Text style={styles.subtitle}>请输入服务器信息</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>服务器地址</Text>
            <TextInput
              style={styles.textInput}
              placeholder="例如: 192.168.1.100"
              placeholderTextColor={colors.textSecondary}
              value={host}
              onChangeText={setHost}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>端口</Text>
            <TextInput
              style={styles.textInput}
              placeholder="默认: 22"
              placeholderTextColor={colors.textSecondary}
              value={port}
              onChangeText={setPort}
              keyboardType="numeric"
              editable={!loading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>用户名</Text>
            <TextInput
              style={styles.textInput}
              placeholder="例如: root"
              placeholderTextColor={colors.textSecondary}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>密码</Text>
            <TextInput
              style={styles.textInput}
              placeholder="请输入密码"
              placeholderTextColor={colors.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
            />
          </View>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleConnect}
            disabled={loading}>
            {loading ? <ActivityIndicator color={colors.text} /> : <Text style={styles.buttonText}>连接</Text>}
          </TouchableOpacity>

          <Text style={styles.hintText}>提示：请确保您的设备可以访问目标服务器</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
