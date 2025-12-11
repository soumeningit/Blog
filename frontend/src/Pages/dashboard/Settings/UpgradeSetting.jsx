import { Zap } from "lucide-react";

function UpgradeSetting({
  userRole,
  isLoading,
  email,
  setEmail,
  handleUpgrade,
}) {
  return (
    <>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card text-center flex flex-col items-center justify-center p-6">
            <Zap className="h-12 w-12 mb-4 text-yellow-500" />
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
              Upgrade to Pro
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
              Unlock advanced features and integrations by upgrading to the Pro
              plan.
            </p>
            <button className="btn btn-primary mt-2 px-6 py-2">
              Upgrade Now
            </button>
          </div>

          {/* Upgrade Role */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Upgrade Role
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-medium text-gray-900 dark:text-gray-100">
                    Current Role: {userRole || "User"}
                  </label>
                </div>
              </div>

              <form className="mt-2" onSubmit={handleUpgrade}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex-1 w-full">
                    <label htmlFor="upgrade-email" className="sr-only">
                      Registration Email
                    </label>
                    <input
                      id="upgrade-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter your registration email"
                      required
                    />
                  </div>

                  <div className="flex-shrink-0 w-full sm:w-auto">
                    <button
                      type="submit"
                      className="btn btn-primary w-full sm:w-auto px-4 py-2"
                      aria-disabled={isLoading}
                    >
                      {isLoading ? "Upgrading..." : "Upgrade Role"}
                    </button>
                  </div>
                </div>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Provide the email you registered with. We will send a
                  verification email to complete the role upgrade.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpgradeSetting;
