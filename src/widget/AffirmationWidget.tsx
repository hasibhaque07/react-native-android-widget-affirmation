"use no memo";

import React from "react";
import type { ColorProp } from "react-native-android-widget";
import { FlexWidget, TextWidget } from "react-native-android-widget";

interface Props {
  affirmation: string;
  backgroundColor?: ColorProp;
}

export function AffirmationWidget({
  affirmation,
  backgroundColor = "#F97316",
}: Props) {
  const isDark =
    backgroundColor !== "#FFFFFF" &&
    backgroundColor !== "#FACC15" &&
    backgroundColor !== "#FDE68A";

  const textColor = isDark ? "#FFFFFF" : "#000000";

  return (
    <FlexWidget
      style={{
        height: "match_parent",
        width: "match_parent",
        backgroundColor,
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
      }}
      clickAction="OPEN_APP"
    >
      <TextWidget
        text={affirmation}
        style={{
          fontSize: 22,
          textAlign: "center",
          color: textColor,
          fontWeight: "600",
        }}
      />
    </FlexWidget>
  );
}
