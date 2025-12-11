import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings as SettingsIcon,
  Palette,
  BarChart3,
  Sliders,
  Save,
  RotateCcw,
  AlertCircle,
  Zap,
} from "lucide-react";
import GeneralSetting from "./Settings/GeneralSetting";
import AppearanceSetting from "./Settings/AppearanceSetting";
import SeoSetting from "./Settings/SeoSetting";
import AnalyticsSetting from "./Settings/AnalyticsSetting";
import IntegrationSetting from "./Settings/IntegrationSetting";
import BackupSetting from "./Settings/BackupSetting";
import AdvanceSetting from "./Settings/AdvanceSetting";
import UpgradeSetting from "./Settings/UpgradeSetting";
import { useAuth } from "../../contexts/AuthContext";
import { upgradeRoleAPI } from "../../service/operations/ContentOpern";
import { useToast } from "../../components/ToastProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { useProfile } from "../../contexts/ProfileContext";
import { updateUserPasswordAPI } from "../../service/operations/ProfileOpern";

function Settings() {
  const [activeTab, setActiveTab] = useState("general");
  const [hasChanges, setHasChanges] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("system");
  const [userRole, setUserRole] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const profile = useProfile();

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
    if (location.state?.currentRole) {
      setUserRole(location.state.currentRole);
    }
    setHasChanges(false);
  }, [location.state?.tab]);

  // Form states
  const [generalSettings, setGeneralSettings] = useState({
    name: "",
    email: "",
    bio: "",
    address: "",
    userName: "",
    gender: "",
    dateOfBirth: "",
    about: "",
  });

  // setGeneralSettings(profile?.profileData || {});
  // sessionStorage.setItem(
  //   "userProfile",
  //   JSON.stringify(profile?.profileData || {})
  // );

  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "system",
    primaryColor: "#3b82f6",
    accentColor: "#8b5cf6",
    layout: "default",
    sidebarCollapsed: false,
    showBreadcrumbs: true,
    showReadingTime: true,
    showAuthorInfo: true,
    showRelatedPosts: true,
    enableComments: true,
    commentSystem: "built-in",
  });

  const [analyticsSettings, setAnalyticsSettings] = useState({
    googleAnalytics: "",
    googleTagManager: "",
    facebookPixel: "",
    hotjarId: "",
    customAnalytics: "",
    trackingEnabled: true,
    anonymizeIp: true,
    respectDnt: true,
    trackAdminUsers: false,
  });

  const tabs = [
    { id: "general", label: "General", icon: SettingsIcon },
    { id: "appearance", label: "Appearance", icon: Palette },
    // { id: "seo", label: "SEO", icon: Search },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "upgrade", label: "Upgrade", icon: Zap },
    // { id: "integrations", label: "Integrations", icon: Plug },
    // { id: "backup", label: "Backup", icon: Database },
    { id: "advanced", label: "Advanced", icon: Sliders },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const handleSave = () => {
    // Save settings logic here
    setHasChanges(false);
    // Show success notification
  };

  const handleReset = () => {
    // Reset to default values
    setHasChanges(false);
  };

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const authData = useAuth();
  const authValue = authData.getValue();
  const token = authValue?.token;
  const toast = useToast();
  const logout = authData.LogOut;

  async function handleUpgrade(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await upgradeRoleAPI(token, email);
      setIsLoading(false);
      if (response.status === 200) {
        toast.success(response?.data?.message || "Upgrade successful!");
        const user = response?.data?.data?.user;
        const token = response?.data?.data?.token;
        authData.setValue(token, user);
        navigate("/dashboard/create-post");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Upgrade failed:", error);
      toast.error("Upgrade failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handlePasswordUpdate() {
    // Add validation and API call here
    setHasChanges(true);
    try {
      setIsUpdatingPassword(true);
      const response = await updateUserPasswordAPI(
        token,
        password.oldPassword,
        password.newPassword
      );
      setIsUpdatingPassword(false);
      if (response.status === 200) {
        toast.success("Password updated successfully!");
        setPassword({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        logout();
      }
    } catch (error) {
      setIsUpdatingPassword(false);
      toast.error(
        error?.response?.data?.message ||
          "Password update failed. Please try again."
      );
    } finally {
      setIsUpdatingPassword(false);
    }
  }

  async function handleDeleteAccount() {
    // Implement will here later
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-5xl mx-auto space-y-6"
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Settings
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Configure your blog's settings and preferences
          </p>
        </div>
        <div className="flex items-center gap-2">
          {hasChanges && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 px-3 py-2 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 rounded-lg text-sm font-medium"
            >
              <AlertCircle className="h-4 w-4" />
              Unsaved changes
            </motion.div>
          )}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleReset}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="btn-primary flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </motion.button>
        </div>
      </div>

      {/* Tabs */}
      <motion.div
        variants={itemVariants}
        className="border-b border-gray-200 dark:border-gray-700"
      >
        <nav className="flex space-x-1 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-primary-500 text-primary-600 dark:text-primary-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              <div className="flex items-center gap-2">
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </div>
            </button>
          ))}
        </nav>
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="space-y-6"
        >
          {/* General Settings */}
          {activeTab === "general" && (
            <GeneralSetting
              generalSettings={generalSettings}
              setGeneralSettings={setGeneralSettings}
              setHasChanges={setHasChanges}
            />
          )}

          {/* Appearance Settings */}
          {activeTab === "appearance" && (
            <AppearanceSetting
              appearanceSettings={appearanceSettings}
              setAppearanceSettings={setAppearanceSettings}
              selectedTheme={selectedTheme}
              setSelectedTheme={setSelectedTheme}
              setHasChanges={setHasChanges}
            />
          )}

          {/* SEO Settings */}
          {activeTab === "seo" && <SeoSetting setHasChanges={setHasChanges} />}

          {/* Analytics Settings */}
          {activeTab === "analytics" && (
            <AnalyticsSetting
              analyticsSettings={analyticsSettings}
              setAnalyticsSettings={setAnalyticsSettings}
              setHasChanges={setHasChanges}
            />
          )}

          {/* Upgrade Settings */}
          {activeTab === "upgrade" && (
            <UpgradeSetting
              userRole={userRole}
              isLoading={isLoading}
              email={email}
              setEmail={setEmail}
              handleUpgrade={handleUpgrade}
            />
          )}

          {/* Integrations Settings */}
          {activeTab === "integrations" && (
            <IntegrationSetting setHasChanges={setHasChanges} />
          )}

          {/* Backup Settings */}
          {activeTab === "backup" && (
            <BackupSetting setHasChanges={setHasChanges} />
          )}

          {/* Advanced Settings */}
          {activeTab === "advanced" && (
            <AdvanceSetting
              passwordValue={password}
              setPassword={setPassword}
              setHasChanges={setHasChanges}
              handlePasswordUpdate={handlePasswordUpdate}
              isUpdatingPassword={isUpdatingPassword}
              handleDeleteAccount={handleDeleteAccount}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export default Settings;
