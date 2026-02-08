/**
 * 登录页面
 * 功能：输入SSH服务器信息，连接SSH服务器
 */

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {colors, spacing, globalStyles} from '../styles/globalStyles';

const LoginScreen = ({navigation}) => {
  // 表单状态
  const [host, setHost] = useState('');
  const [port, setPort] = useState('22');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  /**
   * 表单验证
   * @returns {boolean} 验证是否通过
   */
  const validateForm = () => {
    if (!host.trim()) {
      Alert.alert('错误', '请输入服务器地址');
      return false;
    }
    if (!port.trim()) {
      Alert.alert('错误', '请输入端口号');
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
    
    // 验证端口号格式
    const portNum = parseInt(port, 10);
    if (isNaN(portNum) || portNum < 1 || portNum > 65535) {
      Alert.alert('错误', '端口号必须在 1-65535 之间');
      return false;
    }
    
    return true;
  };

  /**
   * 连接SSH服务器
   */
  const handleConnect = async () => {
    // 验证表单
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // 注意：react-native-ssh2 需要原生模块支持
      // 这里使用模拟连接，实际项目中需要集成原生SSH库
      
      // 模拟连接延迟
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 模拟连接成功
      const connectionInfo = {
        host: host.trim(),
        port: parseInt(port, 10),
        username: username.trim(),
        password: password,
      };

      // 跳转到终端页面，传递连接信息
      navigation.navigate('Terminal', {connection: connectionInfo});
      
      // 清空密码（安全考虑）
      setPassword('');
      
    } catch (error) {
      // 处理各种错误情况
      let errorMessage = '连接失败';
      
      if (error.message.includes('timeout')) {
        errorMessage = '连接超时，请检查网络和服务器地址';
      } else if (error.message.includes('authentication')) {
        errorMessage = '认证失败，请检查用户名和密码';
      } else if (error.message.includes('refused')) {
        errorMessage = '连接被拒绝，请检查服务器地址和端口';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      Alert.alert('连接失败', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          {/* 标题 */}
          <Text style={styles.title}>SSH 连接</Text>
          <Text style={styles.subtitle}>请输入服务器信息</Text>

          {/* 服务器地址 */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>服务器地址</Text>
            <TextInput
              style={[globalStyles.input, styles.input]}
              placeholder="例如: 192.168.1.100"
              placeholderTextColor={colors.textSecondary}
              value={host}
              onChangeText={setHost}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />
          </View>

          {/* 端口 */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>端口</Text>
            <TextInput
              style={[globalStyles.input, styles.input]}
              placeholder="默认: 22"
              placeholderTextColor={colors.textSecondary}
              value={port}
              onChangeText={setPort}
              keyboardType="numeric"
              editable={!loading}
            />
          </View>

          {/* 用户名 */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>用户名</Text>
            <TextInput
              style={[globalStyles.input, styles.input]}
              placeholder="例如: root"
              placeholderTextColor={colors.textSecondary}
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />
          </View>

          {/* 密码 */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>密码</Text>
            <TextInput
              style={[globalStyles.input, styles.input]}
              placeholder="请输入密码"
              placeholderTextColor={colors.textSecondary}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              editable={!loading}
            />
          </View>

          {/* 连接按钮 */}
          <TouchableOpacity
            style={[
              globalStyles.button,
              styles.connectButton,
              loading && globalStyles.buttonDisabled,
            ]}
            onPress={handleConnect}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color={colors.text} />
            ) : (
              <Text style={globalStyles.buttonText}>连接</Text>
            )}
          </TouchableOpacity>

          {/* 提示信息 */}
          <Text style={styles.hint}>
            提示：请确保您的设备可以访问目标服务器
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: 14,
    color: colors.text,
    marginBottom: spacing.sm,
    fontWeight: '600',
  },
  input: {
    marginBottom: 0,
  },
  connectButton: {
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  hint: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});

export default LoginScreen;
