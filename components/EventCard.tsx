import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  date: string;
  category: string;
  location: string;
  favorite: boolean;
  popular?: boolean;
  onToggleFavorite: () => void;
  darkMode?: boolean;
};

const lightTheme = {
  card: "#ffffff",
  text: "#111111",
};

const darkTheme = {
  card: "#1f1f1f",
  text: "#ffffff",
};

export function EventCard({
  title,
  date,
  category,
  location,
  favorite,
  popular,
  darkMode,
  onToggleFavorite,
}: Props) {
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
        },
      ]}
    >
      <Text
        style={[
          styles.title,
          {
            color: theme.text,
          },
        ]}
      >
        {title}
        {favorite ? " ⭐" : ""}
        {popular ? " 🔝" : ""}
      </Text>

      <Text style={{ color: theme.text }}>{date}</Text>

      <Text style={{ color: theme.text }}>{category}</Text>

      <Text style={{ color: theme.text }}>{location}</Text>

      <Pressable
        style={[styles.button, favorite && styles.buttonActive]}
        onPress={onToggleFavorite}
      >
        <Text style={styles.buttonText}>
          {favorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },

  button: {
    marginTop: 12,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#444",
  },

  buttonActive: {
    backgroundColor: "#2e8b57",
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});
