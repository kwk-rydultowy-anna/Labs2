import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

type Props = {
  label: string;
  value: boolean;
  onChange: () => void;
  theme: any;
};

export function SettingsRow({ label, value, onChange, theme }: Props) {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.card,
        },
      ]}
    >
      <Text
        style={[
          styles.label,
          {
            color: theme.text,
          },
        ]}
      >
        {label}
      </Text>

      <Switch value={value} onValueChange={onChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
  },
});
