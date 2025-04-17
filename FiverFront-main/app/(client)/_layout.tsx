import React from "react";
import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function ClientTabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0066FF",
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="requests"
        options={{
          title: "Demandes",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="list-alt" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "Historique",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="history" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Compte",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
