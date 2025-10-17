
import { Eye, Target, Trophy, MessageSquare, Download, TrendingUp } from "lucide-react";
import { MetricsChart } from "../MetricsChart";
import { OptimizationDonut } from "../OptimizationDonut";
import { ModelPerformanceGrid } from "../ModelPerformanceGrid";
import { TopPerformingPrompts } from "../TopPerformingPrompts";
import { CompetitorRanking } from "../CompetitorRanking";

const metrics = [
  {
    title: "Visibility Score",
    value: "8.4",
    change: "+12.5%",
    icon: Eye,
    iconColor: "text-blue-500",
    isPositive: true
  },
  {
    title: "Presence Score", 
    value: "74%",
    change: "+8.2%",
    icon: Target,
    iconColor: "text-green-500",
    isPositive: true
  },
  {
    title: "Average Rank",
    value: "2.3",
    change: "-0.4",
    icon: Trophy,
    iconColor: "text-orange-500",
    isPositive: false
  },
  {
    title: "Mentions",
    value: "1,247",
    change: "+23.1%",
    icon: MessageSquare,
    iconColor: "text-purple-500",
    isPositive: true
  },
];

export function DashboardPage() {
  return (
    <>
      {/* Header */}
      <header className="bg-light-card border-b border-light-color px-8 py-8 light-shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-light-primary mb-2">Dashboard</h1>
            <p className="text-light-secondary font-medium">Monitor your brand&apos;s visibility across AI models</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700 border border-green-200">
              Live Data
            </div>
            <button className="light-button-primary gap-2 flex items-center">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8 bg-light-bg">
        {/* Top-level Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            
            return (
              <div key={metric.title} className="light-card hover:light-shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center`}>
                    <Icon className={`w-7 h-7 ${metric.iconColor}`} />
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className={`w-4 h-4 ${metric.isPositive ? 'text-light-positive' : 'text-light-negative'}`} />
                    <span className={`text-sm font-bold ${metric.isPositive ? 'text-light-positive' : 'text-light-negative'}`}>
                      {metric.change}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-light-primary mb-2">{metric.value}</h3>
                  <p className="text-sm font-medium text-light-secondary">{metric.title}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <div className="lg:col-span-2">
            <MetricsChart />
          </div>
          <div>
            <OptimizationDonut />
          </div>
        </div>

        {/* Model Performance */}
        <div className="mb-10">
          <ModelPerformanceGrid />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TopPerformingPrompts />
          <CompetitorRanking />
        </div>
      </main>
    </>
  );
}