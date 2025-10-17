"use client";

export function ColorPaletteShowcase() {
  return (
    <div className="min-h-screen bg-neutral-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            Updated Color Palette
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Professional color scheme inspired by modern design principles, perfect for pharmaceutical consulting services.
          </p>
        </div>

        {/* Primary Colors */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Primary Color Scheme</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-primary-50 rounded-lg mx-auto mb-3 border border-neutral-200"></div>
              <p className="font-medium text-neutral-900">Primary 50</p>
              <p className="text-sm text-neutral-500">#DBEAFE</p>
              <p className="text-xs text-neutral-400 mt-1">Background, highlights</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-primary-500 rounded-lg mx-auto mb-3 border border-neutral-200"></div>
              <p className="font-medium text-neutral-900">Primary 500</p>
              <p className="text-sm text-neutral-500">#2563EB</p>
              <p className="text-xs text-neutral-400 mt-1">Main buttons, links</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-primary-600 rounded-lg mx-auto mb-3 border border-neutral-200"></div>
              <p className="font-medium text-neutral-900">Primary 600</p>
              <p className="text-sm text-neutral-500">#1E40AF</p>
              <p className="text-xs text-neutral-400 mt-1">Hover states</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-primary-700 rounded-lg mx-auto mb-3 border border-neutral-200"></div>
              <p className="font-medium text-neutral-900">Primary 700</p>
              <p className="text-sm text-neutral-500">#1D4ED8</p>
              <p className="text-xs text-neutral-400 mt-1">Active states</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-primary-900 rounded-lg mx-auto mb-3 border border-neutral-200"></div>
              <p className="font-medium text-neutral-900">Primary 900</p>
              <p className="text-sm text-neutral-500">#1E3A8A</p>
              <p className="text-xs text-neutral-400 mt-1">Text on light</p>
            </div>
          </div>
        </section>

        {/* Neutral Colors */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Supporting Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-neutral-50 rounded-lg mx-auto mb-3 border border-neutral-200"></div>
              <p className="font-medium text-neutral-900">Neutral 50</p>
              <p className="text-sm text-neutral-500">#F9FAFB</p>
              <p className="text-xs text-neutral-400 mt-1">Lightest gray</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-neutral-100 rounded-lg mx-auto mb-3 border border-neutral-200"></div>
              <p className="font-medium text-neutral-900">Neutral 100</p>
              <p className="text-sm text-neutral-500">#F3F4F6</p>
              <p className="text-xs text-neutral-400 mt-1">Background, cards</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-neutral-200 rounded-lg mx-auto mb-3 border border-neutral-200"></div>
              <p className="font-medium text-neutral-900">Neutral 200</p>
              <p className="text-sm text-neutral-500">#E5E7EB</p>
              <p className="text-xs text-neutral-400 mt-1">Borders</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-neutral-500 rounded-lg mx-auto mb-3 border border-neutral-200"></div>
              <p className="font-medium text-neutral-900">Neutral 500</p>
              <p className="text-sm text-neutral-500">#6B7280</p>
              <p className="text-xs text-neutral-400 mt-1">Text, borders</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-neutral-900 rounded-lg mx-auto mb-3 border border-neutral-200"></div>
              <p className="font-medium text-neutral-900">Neutral 900</p>
              <p className="text-sm text-neutral-500">#1F2937</p>
              <p className="text-xs text-neutral-400 mt-1">Headings</p>
            </div>
          </div>
        </section>

        {/* Accent Colors */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Accent Colors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-success-500 rounded-lg mx-auto mb-3 border border-neutral-200"></div>
              <p className="font-medium text-neutral-900">Success</p>
              <p className="text-sm text-neutral-500">#10B981</p>
              <p className="text-xs text-neutral-400 mt-1">Positive actions</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-warning-500 rounded-lg mx-auto mb-3 border border-neutral-200"></div>
              <p className="font-medium text-neutral-900">Warning</p>
              <p className="text-sm text-neutral-500">#F59E0B</p>
              <p className="text-xs text-neutral-400 mt-1">Alerts, notifications</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-error-500 rounded-lg mx-auto mb-3 border border-neutral-200"></div>
              <p className="font-medium text-neutral-900">Error</p>
              <p className="text-sm text-neutral-500">#EF4444</p>
              <p className="text-xs text-neutral-400 mt-1">Errors, destructive</p>
            </div>
          </div>
        </section>

        {/* Usage Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Usage Examples</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Buttons */}
            <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-soft">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Buttons</h3>
              <div className="space-y-3">
                <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                  Primary Button
                </button>
                <button className="w-full bg-white border border-primary-500 text-primary-500 hover:bg-primary-50 font-medium py-3 px-4 rounded-lg transition-colors">
                  Secondary Button
                </button>
                <button className="w-full bg-success-500 hover:bg-success-600 text-white font-medium py-3 px-4 rounded-lg transition-colors">
                  Success Button
                </button>
              </div>
            </div>

            {/* Cards */}
            <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-soft">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Cards</h3>
              <div className="space-y-3">
                <div className="bg-neutral-100 p-4 rounded-lg border border-neutral-200">
                  <h4 className="font-medium text-neutral-900 mb-2">Card Title</h4>
                  <p className="text-sm text-neutral-600">This is an example card using the new neutral colors.</p>
                </div>
                <div className="bg-primary-50 p-4 rounded-lg border border-primary-200">
                  <h4 className="font-medium text-primary-900 mb-2">Primary Card</h4>
                  <p className="text-sm text-primary-700">This card uses the primary color scheme.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Typography</h2>
          <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-soft">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-neutral-900">Heading 1 - Main Title</h1>
              <h2 className="text-3xl font-semibold text-neutral-800">Heading 2 - Section Title</h2>
              <h3 className="text-2xl font-semibold text-neutral-800">Heading 3 - Subsection</h3>
              <h4 className="text-xl font-medium text-neutral-700">Heading 4 - Card Title</h4>
              <p className="text-base text-neutral-600 leading-relaxed">
                This is body text using the new neutral color palette. It provides excellent readability 
                while maintaining the professional appearance that pharmaceutical consulting services require.
              </p>
              <p className="text-sm text-neutral-500">
                Smaller text for captions, metadata, and secondary information.
              </p>
            </div>
          </div>
        </section>

        {/* Color Classes Reference */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">Tailwind Classes Reference</h2>
          <div className="bg-white p-6 rounded-lg border border-neutral-200 shadow-soft">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-neutral-900 mb-3">Primary Colors</h4>
                <div className="space-y-2 text-sm">
                  <code className="bg-neutral-100 px-2 py-1 rounded text-neutral-700">bg-primary-50</code>
                  <code className="bg-neutral-100 px-2 py-1 rounded text-neutral-700">bg-primary-500</code>
                  <code className="bg-neutral-100 px-2 py-1 rounded text-neutral-700">bg-primary-600</code>
                  <code className="bg-neutral-100 px-2 py-1 rounded text-neutral-700">text-primary-500</code>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-neutral-900 mb-3">Neutral Colors</h4>
                <div className="space-y-2 text-sm">
                  <code className="bg-neutral-100 px-2 py-1 rounded text-neutral-700">bg-neutral-100</code>
                  <code className="bg-neutral-100 px-2 py-1 rounded text-neutral-700">bg-neutral-200</code>
                  <code className="bg-neutral-100 px-2 py-1 rounded text-neutral-700">text-neutral-900</code>
                  <code className="bg-neutral-100 px-2 py-1 rounded text-neutral-700">border-neutral-200</code>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
