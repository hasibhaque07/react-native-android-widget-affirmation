import Storage from "expo-sqlite/kv-store";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  requestWidgetUpdateById,
  type ColorProp,
  type WidgetConfigurationScreenProps,
} from "react-native-android-widget";
import { SafeAreaView } from "react-native-safe-area-context";

import { AffirmationWidget } from "./AffirmationWidget";
import { BG_KEY, CURRENT_AFFIRMATION_KEY } from "./widget-task-handler";

const COLORS: string[] = [
  "#EF4444",
  "#F97316",
  "#FBBF24",
  "#FACC15",
  "#A3E635",
  "#4ADE80",
  "#34D399",
  "#2DD4BF",
  "#22D3EE",
  "#38BDF8",
  "#60A5FA",
  "#818CF8",
  "#A78BFA",
  "#C084FC",
  "#E879F9",
  "#F472B6",
  "#FB7185",
  "#9CA3AF",
  "#747d86",
  "#000000",
];

function getTextColor(bg: string) {
  if (bg === "#FFFFFF" || bg === "#E5E7EB" || bg === "#FACC15") {
    return "#000000";
  }
  return "#FFFFFF";
}

export function WidgetConfigurationScreen({
  widgetInfo,
  setResult,
  renderWidget,
}: WidgetConfigurationScreenProps) {
  const storedColor = (Storage.getItemSync(BG_KEY) || "#F97316") as string;

  const [color, setColor] = useState<string>(storedColor);

  const handleSave = async () => {
    Storage.setItemSync(BG_KEY, color);

    const affirmation =
      Storage.getItemSync(CURRENT_AFFIRMATION_KEY) ||
      "I am the greatest entrepreneur";

    renderWidget(
      <AffirmationWidget
        affirmation={affirmation}
        backgroundColor={color as ColorProp}
      />,
    );

    await requestWidgetUpdateById({
      widgetName: widgetInfo.widgetName,
      widgetId: widgetInfo.widgetId,
      renderWidget: () => (
        <AffirmationWidget
          affirmation={affirmation}
          backgroundColor={color as ColorProp}
        />
      ),
    });

    setResult("ok");
  };

  const handleCancel = () => {
    setResult("cancel");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Configure Widget</Text>

        <Text style={styles.preview}>Preview</Text>

        <View style={[styles.previewCard, { backgroundColor: color }]}>
          <Text style={[styles.previewText, { color: getTextColor(color) }]}>
            I am the greatest entrepreneur
          </Text>
        </View>

        <Text style={styles.subtitle}>Choose a background color</Text>

        <View style={styles.colors}>
          {COLORS.map((c) => (
            <TouchableOpacity
              key={c}
              onPress={() => setColor(c)}
              style={[
                styles.color,
                { backgroundColor: c },
                color === c && styles.selected,
              ]}
            />
          ))}
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity style={styles.cancel} onPress={handleCancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.save} onPress={handleSave}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E7EB",
  },

  content: {
    flex: 1,
    padding: 24,
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
  },

  preview: {
    marginTop: 20,
    marginBottom: 12,
    fontSize: 16,
    color: "#6B7280",
  },

  previewCard: {
    height: 180,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  previewText: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 30,
    marginBottom: 20,
    fontSize: 16,
    color: "#6B7280",
  },

  colors: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 12,
  },

  color: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },

  selected: {
    borderWidth: 3,
    borderColor: "#2563EB",
  },

  buttons: {
    flexDirection: "row",
    marginTop: "auto",
    gap: 12,
  },

  cancel: {
    flex: 1,
    backgroundColor: "#D1D5DB",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
  },

  save: {
    flex: 1,
    backgroundColor: "#1D4ED8",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
  },

  cancelText: {
    fontSize: 18,
    fontWeight: "600",
  },

  saveText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
