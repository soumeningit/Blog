import { Download, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

function BackupSetting({ setHasChanges }) {
  const [seoSettings, setSeoSettings] = useState({});
  const [generalSettings, setGeneralSettings] = useState({});
  const [appearanceSettings, setAppearanceSettings] = useState({});
  const [analyticsSettings, setAnalyticsSettings] = useState({});
  const [integrations, setIntegrations] = useState({});
  const exportSettings = () => {
    const settings = {
      general: generalSettings,
      appearance: appearanceSettings,
      seo: seoSettings || {},
      analytics: analyticsSettings,
      integrations: integrations,
    };
    const blob = new Blob([JSON.stringify(settings, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "settings-backup.json";
    a.click();
  };

  const importSettings = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const settings = JSON.parse(e.target.result);
          // Apply imported settings
          setHasChanges(true);
        } catch (error) {
          console.error("Invalid settings file");
        }
      };
      reader.readAsText(file);
    }
  };
  return (
    <>
      <div className="space-y-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Backup & Restore
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                  Export Settings
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Download all your settings as a JSON file
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={exportSettings}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export
              </motion.button>
            </div>
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                  Import Settings
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Restore settings from a backup file
                </p>
              </div>
              <label className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center gap-2 cursor-pointer">
                <Upload className="h-4 w-4" />
                Import
                <input
                  type="file"
                  accept=".json"
                  onChange={importSettings}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Automatic Backups
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-900 dark:text-gray-100">
                  Enable Automatic Backups
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Automatically backup your settings and content
                </p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary-600">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Backup Frequency
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BackupSetting;
