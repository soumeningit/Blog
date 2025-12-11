function Notification({ notifications, setNotifications, handleEditMap }) {
  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Notification Preferences
      </h3>
      <div className="space-y-4">
        {Object.entries(notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <div>
              <label className="font-medium text-gray-900 dark:text-gray-100">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {key === "emailNotifications" &&
                  "Receive email notifications about your account activity"}
                {key === "pushNotifications" &&
                  "Receive push notifications in your browser"}
                {key === "newsletter" &&
                  "Receive weekly newsletter with latest updates"}
                {key === "newComments" &&
                  "Get notified when someone comments on your posts"}
                {key === "newFollowers" &&
                  "Get notified when someone follows you"}
                {key === "weeklyDigest" &&
                  "Receive a weekly digest of your blog performance"}
                {key === "productUpdates" &&
                  "Get notified about new features and updates"}
                {key === "securityAlerts" &&
                  "Receive alerts about security-related activities"}
              </p>
            </div>
            <button
              onClick={() => {
                setNotifications({ ...notifications, [key]: !value });
                handleEditMap(`notifications.${key}`, !value);
              }}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                value ? "bg-primary-600" : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  value ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notification;
