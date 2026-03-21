// `@expo/metro-runtime` MUST be the first import to ensure Fast Refresh works
// on web.
import "@expo/metro-runtime";

import { App } from "expo-router/build/qualified-entry";
import { renderRootComponent } from "expo-router/build/renderRootComponent";
import {
    registerWidgetConfigurationScreen,
    registerWidgetTaskHandler,
} from "react-native-android-widget";
import { widgetTaskHandler } from "./src/widget/widget-task-handler";
import { WidgetConfigurationScreen } from "./src/widget/WidgetConfigurationScreen";

// This file should only import and register the root. No components or exports
// should be added here.

registerWidgetTaskHandler(widgetTaskHandler);
registerWidgetConfigurationScreen(WidgetConfigurationScreen);

renderRootComponent(App);
