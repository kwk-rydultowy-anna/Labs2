// screens/ProfileScreen.tsx

import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ProfileCard } from "../components/ProfileCard";
import { SettingsRow } from "../components/SettingsRow";
import { ThemeButton } from "../components/ThemeButton";
import { CustomInput } from "../components/CustomInput";

import { darkTheme, lightTheme } from "../theme/colors";

type ProfileType = {
  name: string;
  email: string;
  city: string;
  bio: string;
};

type Props = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;

  profile: ProfileType;

  setProfile: React.Dispatch<React.SetStateAction<ProfileType>>;
};

export default function ProfileScreen({
  darkMode,
  setDarkMode,
  profile,
  setProfile,
}: Props) {
  const theme = darkMode ? darkTheme : lightTheme;

  const [name, setName] = useState(profile.name);

  const [email, setEmail] = useState(profile.email);

  const [city, setCity] = useState(profile.city);

  const [bio, setBio] = useState(profile.bio);

  const [notifications, setNotifications] = useState(true);

  const [privacyMode, setPrivacyMode] = useState(false);

  const [appSounds, setAppSounds] = useState(true);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    bio: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const bioCharacters = useMemo(() => {
    return bio.length;
  }, [bio]);

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      bio: "",
    };

    let valid = true;

    if (!name.trim()) {
      newErrors.name = "Imię jest wymagane";

      valid = false;
    }

    if (!email.includes("@")) {
      newErrors.email = "Email musi zawierać znak @";

      valid = false;
    }

    if (bio.length > 100) {
      newErrors.bio = "Bio może mieć maksymalnie 100 znaków";

      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  const handleSave = () => {
    setSuccessMessage("");

    const valid = validateForm();

    if (!valid) {
      return;
    }

    setProfile({
      name,
      email,
      city,
      bio,
    });

    setSuccessMessage("Profil został zapisany.");
  };

  return (
    <ScrollView
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
        },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View>
          <Text
            style={[
              styles.title,
              {
                color: theme.text,
              },
            ]}
          >
            Profil użytkownika
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                color: theme.secondaryText,
              },
            ]}
          >
            Zarządzaj profilem
          </Text>
        </View>

        <ThemeButton
          darkMode={darkMode}
          onPress={() => setDarkMode((prev) => !prev)}
          theme={theme}
        />
      </View>

      <ProfileCard
        theme={theme}
        name={profile.name}
        bio={profile.bio}
        city={profile.city}
      />

      <Text
        style={[
          styles.sectionTitle,
          {
            color: theme.text,
          },
        ]}
      >
        Edycja profilu
      </Text>

      <CustomInput
        value={name}
        onChangeText={setName}
        placeholder="Imię"
        theme={theme}
      />

      {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

      <CustomInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        theme={theme}
      />

      {errors.email ? (
        <Text style={styles.errorText}>{errors.email}</Text>
      ) : null}

      <CustomInput
        value={city}
        onChangeText={setCity}
        placeholder="Miasto"
        theme={theme}
      />

      <CustomInput
        value={bio}
        onChangeText={setBio}
        placeholder="Bio"
        theme={theme}
        multiline
      />

      <Text
        style={[
          styles.counter,
          {
            color: theme.secondaryText,
          },
        ]}
      >
        {bioCharacters}/100
      </Text>

      {errors.bio ? <Text style={styles.errorText}>{errors.bio}</Text> : null}

      <Pressable
        onPress={handleSave}
        style={({ pressed }) => [
          styles.saveButton,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.saveButtonText}>Zapisz zmiany</Text>
      </Pressable>

      {successMessage ? (
        <Text style={styles.successText}>{successMessage}</Text>
      ) : null}

      <Text
        style={[
          styles.sectionTitle,
          {
            color: theme.text,
          },
        ]}
      >
        Ustawienia
      </Text>

      <SettingsRow
        label="Powiadomienia"
        value={notifications}
        onChange={() => setNotifications((prev) => !prev)}
        theme={theme}
      />

      <SettingsRow
        label="Tryb prywatny"
        value={privacyMode}
        onChange={() => setPrivacyMode((prev) => !prev)}
        theme={theme}
      />

      <SettingsRow
        label="Dźwięki aplikacji"
        value={appSounds}
        onChange={() => setAppSounds((prev) => !prev)}
        theme={theme}
      />

      <SettingsRow
        label="Tryb ciemny"
        value={darkMode}
        onChange={() => setDarkMode((prev) => !prev)}
        theme={theme}
      />

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 15,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 14,
  },

  counter: {
    textAlign: "right",
    marginBottom: 12,
  },

  saveButton: {
    backgroundColor: "#4a67ff",
    paddingVertical: 14,
    borderRadius: 14,
    marginBottom: 16,
  },

  saveButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 16,
  },

  successText: {
    color: "#2e8b57",
    fontWeight: "600",
    marginBottom: 20,
  },

  errorText: {
    color: "#d32f2f",
    marginBottom: 10,
    marginLeft: 4,
  },

  buttonPressed: {
    opacity: 0.7,
  },
});
