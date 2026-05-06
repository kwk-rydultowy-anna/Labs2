// App.tsx

import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import EventsScreen from "./screens/EventsScreen";
import ProfileScreen from "./screens/ProfileScreen";

import {
  darkTheme,
  lightTheme,
} from "./theme/colors";

export default function App() {
  const [darkMode, setDarkMode] =
    useState(false);

  const [activeScreen, setActiveScreen] =
    useState<"events" | "profile">(
      "events"
    );

  const [profile, setProfile] = useState({
    name: "Jan Developer",
    email: "jan@example.com",
    city: "Wrocław",
    bio: "React Native Developer",
  });

  const theme = darkMode
    ? darkTheme
    : lightTheme;

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor:
            theme.background,
        },
      ]}
    >
      <StatusBar
        barStyle={
          darkMode
            ? "light-content"
            : "dark-content"
        }
      />

      <View
        style={[
          styles.navigation,
          {
            backgroundColor: theme.card,
          },
        ]}
      >
        <Pressable
          onPress={() =>
            setActiveScreen("events")
          }
          style={[
            styles.navButton,
            activeScreen === "events" &&
              styles.activeButton,
          ]}
        >
          <Text
            style={[
              styles.navButtonText,
              {
                color:
                  activeScreen === "events"
                    ? "#fff"
                    : theme.text,
              },
            ]}
          >
            Wydarzenia
          </Text>
        </Pressable>

        <Pressable
          onPress={() =>
            setActiveScreen("profile")
          }
          style={[
            styles.navButton,
            activeScreen === "profile" &&
              styles.activeButton,
          ]}
        >
          <Text
            style={[
              styles.navButtonText,
              {
                color:
                  activeScreen === "profile"
                    ? "#fff"
                    : theme.text,
              },
            ]}
          >
            Profil
          </Text>
        </Pressable>
      </View>

      {activeScreen === "events" ? (
        <EventsScreen
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      ) : (
        <ProfileScreen
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          profile={profile}
          setProfile={setProfile}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  navigation: {
    flexDirection: "row",
    margin: 16,
    borderRadius: 16,
    padding: 6,
  },

  navButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  activeButton: {
    backgroundColor: "#4a67ff",
  },

  navButtonText: {
    fontSize: 16,
    fontWeight: "700",
  },
});