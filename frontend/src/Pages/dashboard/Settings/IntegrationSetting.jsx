import { Eye, EyeOff, Mail, MessageSquare } from "lucide-react";
import { useState } from "react";

function IntegrationSetting({ setHasChanges }) {
  const [integrations, setIntegrations] = useState({
    mailchimp: { apiKey: "", listId: "", enabled: false },
    sendgrid: { apiKey: "", enabled: false },
    disqus: { shortname: "", enabled: false },
    cloudinary: { cloudName: "", apiKey: "", enabled: false },
    aws: { accessKey: "", secretKey: "", region: "", enabled: false },
  });
  const [showApiKey, setShowApiKey] = useState(false);

  return (
    <>
      <div className="space-y-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Email Services
          </h3>
          <div className="space-y-6">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    Mailchimp
                  </h4>
                </div>
                <button
                  onClick={() => {
                    setIntegrations({
                      ...integrations,
                      mailchimp: {
                        ...integrations.mailchimp,
                        enabled: !integrations.mailchimp.enabled,
                      },
                    });
                    setHasChanges(true);
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    integrations.mailchimp.enabled
                      ? "bg-primary-600"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      integrations.mailchimp.enabled
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              {integrations.mailchimp.enabled && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      API Key
                    </label>
                    <div className="relative">
                      <input
                        type={showApiKey ? "text" : "password"}
                        value={integrations.mailchimp.apiKey}
                        onChange={(e) => {
                          setIntegrations({
                            ...integrations,
                            mailchimp: {
                              ...integrations.mailchimp,
                              apiKey: e.target.value,
                            },
                          });
                          setHasChanges(true);
                        }}
                        className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showApiKey ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      List ID
                    </label>
                    <input
                      type="text"
                      value={integrations.mailchimp.listId}
                      onChange={(e) => {
                        setIntegrations({
                          ...integrations,
                          mailchimp: {
                            ...integrations.mailchimp,
                            listId: e.target.value,
                          },
                        });
                        setHasChanges(true);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Comment Systems
          </h3>
          <div className="space-y-6">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-gray-400" />
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    Disqus
                  </h4>
                </div>
                <button
                  onClick={() => {
                    setIntegrations({
                      ...integrations,
                      disqus: {
                        ...integrations.disqus,
                        enabled: !integrations.disqus.enabled,
                      },
                    });
                    setHasChanges(true);
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    integrations.disqus.enabled
                      ? "bg-primary-600"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      integrations.disqus.enabled
                        ? "translate-x-6"
                        : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              {integrations.disqus.enabled && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Shortname
                  </label>
                  <input
                    type="text"
                    value={integrations.disqus.shortname}
                    onChange={(e) => {
                      setIntegrations({
                        ...integrations,
                        disqus: {
                          ...integrations.disqus,
                          shortname: e.target.value,
                        },
                      });
                      setHasChanges(true);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IntegrationSetting;
