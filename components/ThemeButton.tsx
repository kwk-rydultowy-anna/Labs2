import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  darkMode: boolean;
  onPress: () => void;
  theme: any;
};

export function ThemeButton({ darkMode, onPress, theme }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: theme.card,
        },
      ]}
    >
      <Text style={styles.text}>{darkMode ? "☀️" : "🌙"}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    fontSize: 22,
  },
});
