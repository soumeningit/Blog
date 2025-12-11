import { useState } from "react";

function SeoSetting({ setHasChanges }) {
  const [seoSettings, setSeoSettings] = useState({
    metaTitle: "%sitename% - %tagline%",
    metaDescription: "A blog about web development, design, and technology",
    keywords: "blog, web development, react, nextjs, javascript",
    ogImage: "/images/og-default.jpg",
    twitterHandle: "@myblog",
    jsonLdEnabled: true,
    sitemapEnabled: true,
    robotsTxt: "User-agent: *\nAllow: /",
  });
  return (
    <>
      <div className="space-y-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Meta Tags
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Meta Title Template
              </label>
              <input
                type="text"
                value={seoSettings.metaTitle}
                onChange={(e) => {
                  setSeoSettings({
                    ...seoSettings,
                    metaTitle: e.target.value,
                  });
                  setHasChanges(true);
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Available variables: %sitename%, %tagline%, %title%, %category%
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Meta Description
              </label>
              <textarea
                rows={3}
                value={seoSettings.metaDescription}
                onChange={(e) => {
                  setSeoSettings({
                    ...seoSettings,
                    metaDescription: e.target.value,
                  });
                  setHasChanges(true);
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Keywords
              </label>
              <input
                type="text"
                value={seoSettings.keywords}
                onChange={(e) => {
                  setSeoSettings({
                    ...seoSettings,
                    keywords: e.target.value,
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
            Social Media
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Default OG Image
              </label>
              <input
                type="text"
                value={seoSettings.ogImage}
                onChange={(e) => {
                  setSeoSettings({
                    ...seoSettings,
                    ogImage: e.target.value,
                  });
                  setHasChanges(true);
                }}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Twitter Handle
              </label>
              <input
                type="text"
                value={seoSettings.twitterHandle}
                onChange={(e) => {
                  setSeoSettings({
                    ...seoSettings,
                    twitterHandle: e.target.value,
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
            Advanced SEO
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-900 dark:text-gray-100">
                  Enable JSON-LD Structured Data
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Add structured data for better search engine understanding
                </p>
              </div>
              <button
                onClick={() => {
                  setSeoSettings({
                    ...seoSettings,
                    jsonLdEnabled: !seoSettings.jsonLdEnabled,
                  });
                  setHasChanges(true);
                }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  seoSettings.jsonLdEnabled
                    ? "bg-primary-600"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    seoSettings.jsonLdEnabled
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-900 dark:text-gray-100">
                  Enable XML Sitemap
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Generate XML sitemap for search engines
                </p>
              </div>
              <button
                onClick={() => {
                  setSeoSettings({
                    ...seoSettings,
                    sitemapEnabled: !seoSettings.sitemapEnabled,
                  });
                  setHasChanges(true);
                }}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  seoSettings.sitemapEnabled
                    ? "bg-primary-600"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    seoSettings.sitemapEnabled
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

export default SeoSetting;
