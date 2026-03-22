import { View } from "react-native";
import { WidgetPreview } from "react-native-android-widget";
import { AffirmationWidget } from "../widget/AffirmationWidget";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Text>Android Widget.</Text> */}
      <WidgetPreview
        renderWidget={() => (
          <AffirmationWidget
            affirmation="I am the greatest entrepreneur"
            backgroundColor="#EF4444"
          />
        )}
        width={320}
        height={200}
      />
      <WidgetPreview
        renderWidget={() => (
          <AffirmationWidget
            affirmation="I am building something people want"
            backgroundColor="#FB7185"
          />
        )}
        width={320}
        height={200}
      />
      <WidgetPreview
        renderWidget={() => (
          <AffirmationWidget
            affirmation="I am working on my projects"
            backgroundColor="#F97316"
          />
        )}
        width={320}
        height={200}
      />
    </View>
  );
}
