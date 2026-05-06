import React from "react";
import { StyleSheet, TextInput } from "react-native";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  theme: any;
  multiline?: boolean;
};

export function CustomInput({
  value,
  onChangeText,
  placeholder,
  theme,
  multiline,
}: Props) {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={theme.placeholder}
      multiline={multiline}
      style={[
        multiline ? styles.bioInput : styles.input,
        {
          backgroundColor: theme.card,
          color: theme.text,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 12,
    fontSize: 16,
  },

  bioInput: {
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 12,
    minHeight: 110,
    textAlignVertical: "top",
    fontSize: 16,
  },
});
