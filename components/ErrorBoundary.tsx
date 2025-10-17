'use client'

import React, { ReactNode, ReactElement } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactElement
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
              <div className="text-center">
                <div className="text-red-500 text-5xl mb-4">⚠️</div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Something went wrong
                </h1>
                <p className="text-gray-600 mb-4">
                  We encountered an unexpected error. Please try refreshing the page.
                </p>
                {this.state.error && (
                  <details className="text-left bg-gray-50 p-3 rounded mb-4 text-sm text-gray-700">
                    <summary className="cursor-pointer font-semibold">
                      Error details
                    </summary>
                    <pre className="mt-2 overflow-auto text-xs">
                      {this.state.error.toString()}
                    </pre>
                  </details>
                )}
                <button
                  onClick={() => window.location.reload()}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  Refresh Page
                </button>
              </div>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}

