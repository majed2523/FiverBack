'use client';

import type React from 'react';
import { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  type TextInputProps,
} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { COLORS, FONTS, BORDER_RADIUS, SPACING } from '@/constants/theme';
import { Eye, EyeOff } from 'lucide-react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: any;
}

export function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  secureTextEntry,
  containerStyle,
  style,
  ...props
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = secureTextEntry !== undefined;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <ThemedText style={styles.label}>{label}</ThemedText>}
      <View style={[styles.inputContainer, error ? styles.inputError : null]}>
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
        <TextInput
          style={[
            styles.input,
            leftIcon ? styles.inputWithLeftIcon : null,
            rightIcon || isPassword ? styles.inputWithRightIcon : null,
            style,
          ]}
          placeholderTextColor={COLORS.gray}
          secureTextEntry={isPassword ? !isPasswordVisible : false}
          {...props}
        />
        {isPassword ? (
          <TouchableOpacity
            style={styles.rightIconContainer}
            onPress={togglePasswordVisibility}
          >
            {isPasswordVisible ? (
              <EyeOff size={20} color={COLORS.gray} />
            ) : (
              <Eye size={20} color={COLORS.gray} />
            )}
          </TouchableOpacity>
        ) : (
          rightIcon && (
            <View style={styles.rightIconContainer}>{rightIcon}</View>
          )
        )}
      </View>
      {error && <ThemedText style={styles.errorText}>{error}</ThemedText>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    ...FONTS.body2,
    color: COLORS.text,
    marginBottom: SPACING.xs,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: BORDER_RADIUS.md,
    backgroundColor: COLORS.white,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: SPACING.md,
    color: COLORS.text,
    ...FONTS.body1,
  },
  inputWithLeftIcon: {
    paddingLeft: 0,
  },
  inputWithRightIcon: {
    paddingRight: 0,
  },
  leftIconContainer: {
    paddingHorizontal: SPACING.md,
  },
  rightIconContainer: {
    paddingHorizontal: SPACING.md,
  },
  errorText: {
    ...FONTS.caption,
    color: COLORS.error,
    marginTop: SPACING.xs,
  },
});
