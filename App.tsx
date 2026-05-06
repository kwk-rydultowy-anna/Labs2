import { useMemo, useState } from "react";
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

  const [darkMode, setDarkMode] = useState(false);

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
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
    >
      <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} />

      <View style={styles.topRow}>
        <View>
          <Text
            style={[
              styles.header,
              {
                color: theme.text,
              },
            ]}
          >
            Katalog wydarzeń
          </Text>

          <Text
            style={[
              styles.description,
              {
                color: theme.secondaryText,
              },
            ]}
          >
            Znajdź interesujące wydarzenia.
          </Text>
        </View>

        <Pressable
          onPress={() => setDarkMode((prev) => !prev)}
          style={({ pressed }) => [
            styles.themeButton,
            {
              backgroundColor: theme.card,
            },
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={{ fontSize: 20 }}>{darkMode ? "☀️" : "🌙"}</Text>
        </Pressable>
      </View>

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

      <View style={styles.categoriesContainer}>
        {CATEGORIES.map((category) => {
          const active = category === selectedCategory;

          return (
            <Pressable
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={({ pressed }) => [
                styles.categoryButton,
                {
                  backgroundColor: active
                    ? theme.activeCategory
                    : theme.category,
                },
                pressed && styles.buttonPressed,
              ]}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  {
                    color: active ? "#fff" : theme.text,
                  },
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
          {
            backgroundColor: showFavoritesOnly
              ? theme.filterButtonActive
              : theme.filterButton,
          },
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.filterButtonText}>
          {showFavoritesOnly ? "Pokaż wszystkie" : "Tylko ulubione"}
        </Text>
      </Pressable>

      <Text
        style={[
          styles.resultsText,
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
            darkMode={darkMode}
          />
        )}
        ListEmptyComponent={
          <Text
            style={[
              styles.emptyText,
              {
                color: theme.secondaryText,
              },
            ]}
          >
            Brak wyników.
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const lightTheme = {
  background: "#f2f2f2",
  card: "#ffffff",
  text: "#111111",
  secondaryText: "#666666",
  placeholder: "#999999",
  category: "#dddddd",
  activeCategory: "#222222",
  filterButton: "#4a67ff",
  filterButtonActive: "#243ec7",
};

const darkTheme = {
  background: "#121212",
  card: "#1f1f1f",
  text: "#ffffff",
  secondaryText: "#b0b0b0",
  placeholder: "#777777",
  category: "#2b2b2b",
  activeCategory: "#4a67ff",
  filterButton: "#3b55d9",
  filterButtonActive: "#1f36a8",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  themeButton: {
    width: 50,
    height: 50,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },

  description: {
    fontSize: 15,
    marginBottom: 16,
  },

  input: {
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
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
  },

  categoryButtonText: {
    fontWeight: "600",
  },

  filterButton: {
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 14,
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

  emptyText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
  },

  buttonPressed: {
    opacity: 0.7,
  },
});
