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
};

export function EventCard({
  title,
  date,
  category,
  location,
  favorite,
  popular,
  onToggleFavorite,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {title}
        {favorite ? "⭐" : ""}
        {popular ? "🔝" : ""}
      </Text>

      <Text>{date}</Text>
      <Text>{category}</Text>
      <Text>{location}</Text>

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
    backgroundColor: "#fff",
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
