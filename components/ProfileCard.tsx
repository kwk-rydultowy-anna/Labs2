// components/ProfileCard.tsx

import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  theme: any;
  name: string;
  bio: string;
  city: string;
};

export function ProfileCard({ theme, name, bio, city }: Props) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
        },
      ]}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>

      <Text
        style={[
          styles.name,
          {
            color: theme.text,
          },
        ]}
      >
        {name}
      </Text>

      <Text
        style={[
          styles.bio,
          {
            color: theme.secondaryText,
          },
        ]}
      >
        {bio}
      </Text>

      <Text
        style={[
          styles.city,
          {
            color: theme.secondaryText,
          },
        ]}
      >
        📍 {city}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginBottom: 24,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#4a67ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  avatarText: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
  },

  bio: {
    marginTop: 6,
    fontSize: 15,
    textAlign: "center",
  },

  city: {
    marginTop: 8,
    fontSize: 14,
  },
});
