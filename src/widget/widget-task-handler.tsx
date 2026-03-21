import Storage from "expo-sqlite/kv-store";
import React from "react";
import { Linking } from "react-native";
import type {
    ColorProp,
    WidgetTaskHandlerProps,
} from "react-native-android-widget";

import { AFFIRMATIONS } from "../data/AffirmationsData";
import { AffirmationWidget } from "./AffirmationWidget";

export const BG_KEY = "affirmation:bg";
export const LAST_UPDATE_KEY = "affirmation:lastUpdate";
export const CURRENT_AFFIRMATION_KEY = "affirmation:text";

function getRandomAffirmation() {
  const index = Math.floor(Math.random() * AFFIRMATIONS.length);
  return AFFIRMATIONS[index];
}

function getBackgroundColor(): ColorProp {
  return (Storage.getItemSync(BG_KEY) || "#F97316") as ColorProp;
}

function getAffirmation() {
  const now = Date.now();

  const lastUpdate = Number(Storage.getItemSync(LAST_UPDATE_KEY) || 0);
  const stored = Storage.getItemSync(CURRENT_AFFIRMATION_KEY);

  if (stored && now - lastUpdate < 3600000) {
    return stored;
  }

  const newAffirmation = getRandomAffirmation();

  Storage.setItemSync(CURRENT_AFFIRMATION_KEY, newAffirmation);
  Storage.setItemSync(LAST_UPDATE_KEY, `${now}`);

  return newAffirmation;
}

export async function widgetTaskHandler(props: WidgetTaskHandlerProps) {
  const widgetInfo = props.widgetInfo;

  switch (props.widgetAction) {
    case "WIDGET_ADDED":
    case "WIDGET_UPDATE":
    case "WIDGET_RESIZED": {
      const affirmation = getAffirmation();
      const bg = getBackgroundColor();

      props.renderWidget(
        <AffirmationWidget affirmation={affirmation} backgroundColor={bg} />,
      );

      break;
    }

    case "WIDGET_CLICK": {
      if (props.clickAction === "OPEN_APP") {
        Linking.openURL("android-widget://index");
        break;
      }

      break;
    }

    default:
      break;
  }
}
