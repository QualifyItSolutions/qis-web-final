"use client";
// ManagementModules component (from user)
import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  FileText, 
  BookOpen, 
  CheckCircle, 
  Shield, 
  AlertTriangle, 
  BarChart3,
  Cog
} from 'lucide-react';

const ManagementModules = () => {
  const router = useRouter();

  const modules = [
    {
      id: 'dms',
      title: 'DMS - Document Management',
      description: 'Audit-ready document control with versioning, e-signatures, and traceable workflows.',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      isComingSoon: false,
      path: 'http://localhost:3001'
    },
    {
      id: 'lms',
      title: 'LMS - Learning Management',
      description: 'Role-based training with assessments, certifications, and auto-retraining on SOP changes.',
      icon: BookOpen,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      isComingSoon: false,
      path: 'http://localhost:3002'
    },
    {
      id: 'vlm',
      title: 'VLM - Validation Lifecycle',
      description: 'End-to-end validation planning, execution, and evidence with risk-based traceability.',
      icon: CheckCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      isComingSoon: true,
      path: '/coming-soon'
    },
    {
      id: 'qms',
      title: 'QMS - Quality Management',
      description: 'CAPA, deviations, and change control unified with compliant approvals and audit trails.',
      icon: Shield,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      isComingSoon: true,
      path: '/coming-soon'
    },
    {
      id: 'mc',
      title: 'MC - Market Complaint',
      description: 'Intake-to-closure complaint handling with root-cause, trending, and regulatory reporting.',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      isComingSoon: true,
      path: '/coming-soon'
    },
    {
      id: 'mm',
      title: 'Material Management',
      description: 'Spec-to-release control with CoA linkage, status tracking, and genealogy.',
      icon: BarChart3,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      isComingSoon: true,
      path: '/coming-soon'
    },
    {
      id: 'mes',
      title: 'MES - Manufacturing Execution System',
      description: 'Real-time production monitoring, quality control, and compliance tracking.',
      icon: Cog,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      borderColor: 'border-cyan-200',
      isComingSoon: true,
      path: '/coming-soon'
    },
    {
      id: 'excel',
      title: 'Excel Workflow Automation',
      description: 'Governed spreadsheet processes with templates, validations, and controlled approvals.',
      icon: Cog, // You can replace with a more relevant icon if available
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      isComingSoon: true,
      path: '/coming-soon'
    },
    {
      id: 'itot',
      title: 'IT/OT Integration',
      description: 'Secure bridge from shop-floor to cloud for real-time events, records, and alarms.',
      icon: Cog, // You can replace with a more relevant icon if available
      color: 'text-blue-900',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      isComingSoon: true,
      path: '/coming-soon'
    },
    {
      id: 'audit',
      title: 'Audit & Compliance',
      description: 'Continuous readiness with evidence collections, gap checks, and inspector-friendly reports.',
      icon: Cog, // You can replace with a more relevant icon if available
      color: 'text-green-900',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      isComingSoon: true,
      path: '/coming-soon'
    }
  ];

  const handleModuleClick = (module: typeof modules[0]) => {
    if (module.isComingSoon) {
      router.push('/coming-soon');
    } else {
      // For external links (http), open in new tab; for internal, use router.push
      if (module.path.startsWith('http')) {
        window.open(module.path, '_blank');
      } else {
        router.push(module.path);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Management Modules</h2>
        <p className="text-gray-600">
          Access various management modules for comprehensive system control.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.map((module) => {
          const IconComponent = module.icon;
          return (
            <Card 
              key={module.id} 
              className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:border-blue-300 hover:bg-blue-50 ${module.bgColor} ${module.borderColor} border-2`}
              onClick={() => handleModuleClick(module)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <IconComponent className={`h-4 w-4 ${module.color}`} />
                  {module.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-xs text-gray-600 mb-3">
                  {module.description}
                </CardDescription>
                <div className="flex items-center justify-between">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleModuleClick(module);
                    }}
                  >
                    {module.isComingSoon ? 'Coming Soon' : 'Access'}
                  </Button>
                  {module.isComingSoon && (
                    <Badge variant="secondary" className="text-xs">
                      Soon
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ManagementModules;
