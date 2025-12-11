import React from "react";

function AnalyticsSetting({
  analyticsSettings,
  setAnalyticsSettings,
  setHasChanges,
}) {
  return (
    <>
      <div className="space-y-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Tracking Services
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Google Analytics ID
              </label>
              <input
                type="text"
                placeholder="G-XXXXXXXXXX"
                value={analyticsSettings.googleAnalytics}
                onChange={(e) => {
                  setAnalyticsSettings({
                    ...analyticsSettings,
                    googleAnalytics: e.target.value,
                  });
                  setHasChanges(true);
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Google Tag Manager ID
              </label>
              <input
                type="text"
                placeholder="GTM-XXXXXXX"
                value={analyticsSettings.googleTagManager}
                onChange={(e) => {
                  setAnalyticsSettings({
                    ...analyticsSettings,
                    googleTagManager: e.target.value,
                  });
                  setHasChanges(true);
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Facebook Pixel ID
              </label>
              <input
                type="text"
                placeholder="XXXXXXXXXXXXXXXX"
                value={analyticsSettings.facebookPixel}
                onChange={(e) => {
                  setAnalyticsSettings({
                    ...analyticsSettings,
                    facebookPixel: e.target.value,
                  });
                  setHasChanges(true);
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Privacy Settings
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-900 dark:text-gray-100">
                  Enable Tracking
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Allow analytics tracking on your site
                </p>
              </div>
              <button
                onClick={() => {
                  setAnalyticsSettings({
                    ...analyticsSettings,
                    trackingEnabled: !analyticsSettings.trackingEnabled,
                  });
                  setHasChanges(true);
                }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  analyticsSettings.trackingEnabled
                    ? "bg-primary-600"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    analyticsSettings.trackingEnabled
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-900 dark:text-gray-100">
                  Anonymize IP Addresses
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Mask IP addresses for privacy compliance
                </p>
              </div>
              <button
                onClick={() => {
                  setAnalyticsSettings({
                    ...analyticsSettings,
                    anonymizeIp: !analyticsSettings.anonymizeIp,
                  });
                  setHasChanges(true);
                }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  analyticsSettings.anonymizeIp
                    ? "bg-primary-600"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    analyticsSettings.anonymizeIp
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-900 dark:text-gray-100">
                  Respect Do Not Track
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Honor browser DNT settings
                </p>
              </div>
              <button
                onClick={() => {
                  setAnalyticsSettings({
                    ...analyticsSettings,
                    respectDnt: !analyticsSettings.respectDnt,
                  });
                  setHasChanges(true);
                }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  analyticsSettings.respectDnt
                    ? "bg-primary-600"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    analyticsSettings.respectDnt
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AnalyticsSetting;
