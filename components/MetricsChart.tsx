import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const visibilityData = [
  { date: "Jan 18", visibility: 6.8, presence: 68 },
  { date: "Jan 19", visibility: 7.2, presence: 71 },
  { date: "Jan 20", visibility: 6.9, presence: 69 },
  { date: "Jan 21", visibility: 7.8, presence: 73 },
  { date: "Jan 22", visibility: 8.1, presence: 76 },
  { date: "Jan 23", visibility: 8.4, presence: 74 },
  { date: "Jan 24", visibility: 8.4, presence: 74 },
];

const mentionsData = [
  { date: "Jan 18", mentions: 156, citations: 89 },
  { date: "Jan 19", mentions: 203, citations: 112 },
  { date: "Jan 20", mentions: 178, citations: 95 },
  { date: "Jan 21", mentions: 234, citations: 134 },
  { date: "Jan 22", mentions: 289, citations: 167 },
  { date: "Jan 23", mentions: 312, citations: 189 },
  { date: "Jan 24", mentions: 298, citations: 172 },
];

export function MetricsChart() {
  return (
    <div className="light-card">
      <div className="pb-6">
        <h3 className="text-xl font-bold text-light-primary mb-2">Visibility & Presence Trends</h3>
        <p className="text-light-secondary font-medium">
          Track your brand&apos;s performance across AI models over the last 7 days
        </p>
      </div>
      <div>
        <Tabs defaultValue="visibility" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100 border border-light-color">
            <TabsTrigger 
              value="visibility" 
              className="text-sm font-semibold data-[state=active]:bg-light-cta data-[state=active]:text-white text-light-secondary"
            >
              Visibility & Presence
            </TabsTrigger>
            <TabsTrigger 
              value="mentions" 
              className="text-sm font-semibold data-[state=active]:bg-light-cta data-[state=active]:text-white text-light-secondary"
            >
              Mentions & Citations
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="visibility" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={visibilityData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#6B7280"
                    fontSize={12}
                    fontWeight={500}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#6B7280"
                    fontSize={12}
                    fontWeight={500}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: "12px",
                      boxShadow: "rgba(0, 0, 0, 0.1) 0px 8px 24px",
                      fontWeight: 500,
                      color: "#1F2937"
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="visibility" 
                    stroke="#2563EB" 
                    strokeWidth={3}
                    dot={{ fill: "#2563EB", strokeWidth: 0, r: 5 }}
                    activeDot={{ r: 7, stroke: "#2563EB", strokeWidth: 2, fill: "#FFFFFF" }}
                    name="Visibility Score"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="presence" 
                    stroke="#059669" 
                    strokeWidth={3}
                    dot={{ fill: "#059669", strokeWidth: 0, r: 5 }}
                    activeDot={{ r: 7, stroke: "#059669", strokeWidth: 2, fill: "#FFFFFF" }}
                    name="Presence %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="mentions" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mentionsData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#6B7280"
                    fontSize={12}
                    fontWeight={500}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#6B7280"
                    fontSize={12}
                    fontWeight={500}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: "12px",
                      boxShadow: "rgba(0, 0, 0, 0.1) 0px 8px 24px",
                      fontWeight: 500,
                      color: "#1F2937"
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="mentions" 
                    stroke="#2563EB" 
                    strokeWidth={3}
                    dot={{ fill: "#2563EB", strokeWidth: 0, r: 5 }}
                    activeDot={{ r: 7, stroke: "#2563EB", strokeWidth: 2, fill: "#FFFFFF" }}
                    name="Total Mentions"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="citations" 
                    stroke="#059669" 
                    strokeWidth={3}
                    dot={{ fill: "#059669", strokeWidth: 0, r: 5 }}
                    activeDot={{ r: 7, stroke: "#059669", strokeWidth: 2, fill: "#FFFFFF" }}
                    name="Citations"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}