import { Monitor, Moon, Sun } from "lucide-react";
import React from "react";

function AppearanceSetting({
  selectedTheme,
  setSelectedTheme,
  appearanceSettings,
  setAppearanceSettings,
  setHasChanges,
}) {
  return (
    <>
      <div className="space-y-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Theme
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { value: "light", label: "Light", icon: Sun },
              { value: "dark", label: "Dark", icon: Moon },
              { value: "system", label: "System", icon: Monitor },
            ].map((theme) => (
              <button
                key={theme.value}
                onClick={() => {
                  setSelectedTheme(theme.value);
                  setAppearanceSettings({
                    ...appearanceSettings,
                    theme: theme.value,
                  });
                  setHasChanges(true);
                }}
                className={`p-4 border-2 rounded-lg transition-all ${
                  selectedTheme === theme.value
                    ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <theme.icon className="h-8 w-8 mx-auto mb-2 text-gray-600 dark:text-gray-400" />
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {theme.label}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Colors
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Primary Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={appearanceSettings.primaryColor}
                  onChange={(e) => {
                    setAppearanceSettings({
                      ...appearanceSettings,
                      primaryColor: e.target.value,
                    });
                    setHasChanges(true);
                  }}
                  className="h-10 w-20 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={appearanceSettings.primaryColor}
                  onChange={(e) => {
                    setAppearanceSettings({
                      ...appearanceSettings,
                      primaryColor: e.target.value,
                    });
                    setHasChanges(true);
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Accent Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={appearanceSettings.accentColor}
                  onChange={(e) => {
                    setAppearanceSettings({
                      ...appearanceSettings,
                      accentColor: e.target.value,
                    });
                    setHasChanges(true);
                  }}
                  className="h-10 w-20 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={appearanceSettings.accentColor}
                  onChange={(e) => {
                    setAppearanceSettings({
                      ...appearanceSettings,
                      accentColor: e.target.value,
                    });
                    setHasChanges(true);
                  }}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Layout Options
          </h3>
          <div className="space-y-4">
            {[
              {
                key: "showBreadcrumbs",
                label: "Show Breadcrumbs",
                description: "Display breadcrumb navigation",
              },
              {
                key: "showReadingTime",
                label: "Show Reading Time",
                description: "Display estimated reading time for posts",
              },
              {
                key: "showAuthorInfo",
                label: "Show Author Info",
                description: "Display author information on posts",
              },
              {
                key: "showRelatedPosts",
                label: "Show Related Posts",
                description: "Display related posts at the end of articles",
              },
              {
                key: "enableComments",
                label: "Enable Comments",
                description: "Allow comments on blog posts",
              },
            ].map((option) => (
              <div
                key={option.key}
                className="flex items-center justify-between"
              >
                <div>
                  <label className="font-medium text-gray-900 dark:text-gray-100">
                    {option.label}
                  </label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {option.description}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setAppearanceSettings({
                      ...appearanceSettings,
                      [option.key]: !appearanceSettings[option.key],
                    });
                    setHasChanges(true);
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    appearanceSettings[option.key]
                      ? "bg-primary-600"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      appearanceSettings[option.key]
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AppearanceSetting;
