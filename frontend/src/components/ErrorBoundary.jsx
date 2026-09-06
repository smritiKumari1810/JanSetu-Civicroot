import React from 'react';
import { ShieldAlert, RefreshCw, Home, AlertTriangle } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught a runtime error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4 sm:p-6 font-sans">
          <div className="max-w-lg w-full bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 text-center backdrop-blur">
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-center mx-auto text-red-400">
              <ShieldAlert className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Application Recovered from Error
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                JanSetu detected an unexpected interface state and prevented a system crash. Your data is safe.
              </p>
            </div>

            {this.state.error && (
              <div className="text-left bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 text-xs font-mono text-red-300 overflow-x-auto max-h-32">
                <div className="flex items-center space-x-1.5 text-amber-400 font-bold mb-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Error Diagnostics:</span>
                </div>
                <div>{this.state.error.toString()}</div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center space-x-2 transition shadow-lg shadow-blue-600/30 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reload Page</span>
              </button>

              <button
                onClick={this.handleGoHome}
                className="flex-1 py-3 px-4 bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold text-xs sm:text-sm rounded-xl flex items-center justify-center space-x-2 transition cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>Return to Home</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-500">
              JanSetu Digital Public Infrastructure • Fault Tolerant Architecture
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
