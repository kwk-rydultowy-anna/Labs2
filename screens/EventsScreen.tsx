// screens/EventsScreen.tsx

import React, { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { EventCard } from "../components/EventCard";
import { EVENTS_DATA } from "../mockupData/events";
import { darkTheme, lightTheme } from "../theme/colors";

const CATEGORIES = ["Wszystkie", "Nauka", "Sport", "Muzyka", "Film", "Skating"];

type Props = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function EventsScreen({ darkMode }: Props) {
  const [events, setEvents] = useState(EVENTS_DATA);

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("Wszystkie");

  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const theme = darkMode ? darkTheme : lightTheme;

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch = event.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "Wszystkie" || event.category === selectedCategory;

      const matchesFavorites = !showFavoritesOnly || event.favorite;

      return matchesSearch && matchesCategory && matchesFavorites;
    });
  }, [events, search, selectedCategory, showFavoritesOnly]);

  const toggleFavorite = (id: string) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id
          ? {
              ...event,
              favorite: !event.favorite,
            }
          : event
      )
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
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
        Katalog wydarzeń
      </Text>

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Wyszukaj wydarzenie..."
        placeholderTextColor={theme.placeholder}
        style={[
          styles.input,
          {
            backgroundColor: theme.card,
            color: theme.text,
          },
        ]}
      />

      <View style={styles.categories}>
        {CATEGORIES.map((category) => {
          const active = category === selectedCategory;

          return (
            <Pressable
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={[
                styles.categoryButton,
                {
                  backgroundColor: active ? "#4a67ff" : theme.card,
                },
              ]}
            >
              <Text
                style={{
                  color: active ? "#fff" : theme.text,
                }}
              >
                {category}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        onPress={() => setShowFavoritesOnly((prev) => !prev)}
        style={[
          styles.favoriteFilter,
          {
            backgroundColor: showFavoritesOnly ? "#243ec7" : "#4a67ff",
          },
        ]}
      >
        <Text style={styles.favoriteFilterText}>
          {showFavoritesOnly ? "Pokaż wszystkie" : "Tylko ulubione"}
        </Text>
      </Pressable>

      <Text
        style={[
          styles.results,
          {
            color: theme.text,
          },
        ]}
      >
        Wyniki: {filteredEvents.length}
      </Text>

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
        renderItem={({ item }) => (
          <EventCard
            title={item.title}
            date={item.date}
            category={item.category}
            location={item.location}
            favorite={item.favorite}
            popular={item.popular}
            darkMode={darkMode}
            onToggleFavorite={() => toggleFavorite(item.id)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 18,
  },

  input: {
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 16,
    fontSize: 16,
  },

  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 16,
  },

  categoryButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
  },

  favoriteFilter: {
    paddingVertical: 14,
    borderRadius: 14,
    marginBottom: 14,
  },

  favoriteFilterText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },

  results: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 14,
  },
});
