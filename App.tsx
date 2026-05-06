import React, { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { EventCard } from "./components/EventCard";
import { EVENTS_DATA } from "./mockupData/events";

const CATEGORIES = ["Wszystkie", "Nauka", "Sport", "Muzyka", "Film", "Skating"];

export default function App() {
  const [events, setEvents] = useState(EVENTS_DATA);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Wszystkie");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Text style={styles.header}>Katalog wydarzeń</Text>

      <Text style={styles.description}>
        Znajdź interesujące wydarzenia w swojej okolicy.
      </Text>

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Wyszukaj wydarzenie..."
        style={styles.input}
      />

      <View style={styles.categoriesContainer}>
        {CATEGORIES.map((category) => {
          const active = category === selectedCategory;

          return (
            <Pressable
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={({ pressed }) => [
                styles.categoryButton,
                active && styles.categoryButtonActive,
                pressed && styles.buttonPressed,
              ]}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  active && styles.categoryButtonTextActive,
                ]}
              >
                {category}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        onPress={() => setShowFavoritesOnly((prev) => !prev)}
        style={({ pressed }) => [
          styles.filterButton,
          showFavoritesOnly && styles.filterButtonActive,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.filterButtonText}>
          {showFavoritesOnly ? "Pokaż wszystkie" : "Tylko ulubione"}
        </Text>
      </Pressable>

      <Text style={styles.resultsText}>Wyniki: {filteredEvents.length}</Text>

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <EventCard
            title={item.title}
            date={item.date}
            category={item.category}
            location={item.location}
            favorite={item.favorite}
            popular={item.popular}
            onToggleFavorite={() => toggleFavorite(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Brak wyników.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  header: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },

  description: {
    fontSize: 15,
    color: "#666",
    marginBottom: 16,
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 16,
  },

  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 16,
  },

  categoryButton: {
    backgroundColor: "#ddd",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
  },

  categoryButtonActive: {
    backgroundColor: "#222",
  },

  categoryButtonText: {
    color: "#222",
    fontWeight: "600",
  },

  categoryButtonTextActive: {
    color: "#fff",
  },

  filterButton: {
    backgroundColor: "#4a67ff",
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 14,
  },

  filterButtonActive: {
    backgroundColor: "#243ec7",
  },

  filterButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },

  resultsText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },

  listContent: {
    paddingBottom: 30,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    flex: 1,
    marginRight: 10,
  },

  cardText: {
    fontSize: 15,
    marginBottom: 6,
    color: "#444",
  },

  favoriteButton: {
    marginTop: 14,
    backgroundColor: "#333",
    borderRadius: 10,
    paddingVertical: 12,
  },

  favoriteButtonActive: {
    backgroundColor: "#c62828",
  },

  favoriteButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
  },

  badge: {
    backgroundColor: "#ff9800",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  badgeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: "#666",
  },

  buttonPressed: {
    opacity: 0.7,
  },
});
