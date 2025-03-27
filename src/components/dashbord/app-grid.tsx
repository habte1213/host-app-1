"use client"

import { useState } from "react";
import {
  Assessment as AuditingIcon,
  Work as HrIcon,
  People as RecruitmentIcon,
  BarChart,
  CalendarMonth,
  Email,
  CheckCircle,
  Description,
  FolderOpen,
  Settings,
  Apps,
  Close,
} from "@mui/icons-material";
import dynamic from "next/dynamic";

const AuditingHome = dynamic(() => import("auditing-remote/Home"), { ssr: false });
const HRDashboard = dynamic(() => import("hr-remote/HRDashboard"), { ssr: false });
const RecruitmentHome = dynamic(() => import("recruitment-remote/RecruitmentHome"), { 
  ssr: false,
  loading: () => <div className="p-3">Loading Recruitment Module...</div>
});

interface AppData {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface ModuleTab {
  id: string;
  label: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export default function AppGrid() {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [moduleTabs, setModuleTabs] = useState<ModuleTab[]>([]);

  const apps: AppData[] = [
    { id: "auditing", name: "Auditing", icon: "Assessment", color: "bg-blue-500" },
    { id: "hr", name: "HR", icon: "Work", color: "bg-purple-500" },
    { id: "recruitment", name: "Recruitment", icon: "People", color: "bg-green-500" },
  ];

  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      Assessment: <AuditingIcon />,
      Work: <HrIcon />,
      People: <RecruitmentIcon />,
      BarChart: <BarChart />,
      CalendarMonth: <CalendarMonth />,
      Email: <Email />,
      CheckCircle: <CheckCircle />,
      Description: <Description />,
      FolderOpen: <FolderOpen />,
      Settings: <Settings />,
      Apps: <Apps />,
    };
    return iconMap[iconName] || <Apps />;
  };

  const handleAppClick = (appId: string) => {
    if (!moduleTabs.some(tab => tab.id === appId)) {
      const app = apps.find(a => a.id === appId);
      if (!app) return;

      const moduleContent =
        appId === "auditing" ? <AuditingHome /> :
        appId === "hr" ? <HRDashboard /> :
        appId === "recruitment" ? (
          <div className="bg-white [&_*]:text-shadow-none">
            <RecruitmentHome />
          </div>
        ) : <div>Module not implemented</div>;

      setModuleTabs([...moduleTabs, { 
        id: appId, 
        label: app.name, 
        icon: getIconComponent(app.icon), 
        content: moduleContent 
      }]);
    }
    setActiveTab(appId);
  };

  return (
    <div className="w-full p-4 bg-gray-100 [&_*]:text-shadow-none">
      <div className="flex overflow-x-auto mb-4 bg-white rounded-lg">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`flex items-center px-4 py-3 ${activeTab === "dashboard" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-700"}`}
        >
          <Apps className="mr-2" />
          Dashboard
        </button>
        
        {moduleTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-3 ${activeTab === tab.id ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-700"}`}
          >
            <div className="flex items-center">
              {tab.icon}
              <span className="ml-2">{tab.label}</span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setModuleTabs(moduleTabs.filter(t => t.id !== tab.id));
                  if (activeTab === tab.id) setActiveTab(moduleTabs.length > 1 ? moduleTabs[0].id : "dashboard");
                }}
                className="ml-2 p-1 rounded-full hover:bg-gray-200"
              >
                <Close className="text-sm" />
              </button>
            </div>
          </button>
        ))}
      </div>

      <div className="border-b border-gray-300 mb-6"></div>

      {activeTab === "dashboard" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {apps.map((app) => (
            <div
              key={app.id}
              onClick={() => handleAppClick(app.id)}
              className="h-full flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-sm transition-all duration-200 hover:scale-102 hover:shadow-md cursor-pointer"
            >
              <div className="flex flex-col items-center text-center w-full">
                <div className={`flex items-center justify-center rounded-full p-4 w-14 h-14 text-white mb-4 ${app.color}`}>
                  {getIconComponent(app.icon)}
                </div>
                <h3 className="mt-2 text-lg font-semibold">
                  {app.name}
                </h3>
                <p className="mt-2 text-gray-500 leading-snug">
                  Click to open {app.name.toLowerCase()} module
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {moduleTabs.map((tab) => (
        <div 
          key={tab.id} 
          hidden={activeTab !== tab.id}
          className="p-6 rounded-lg shadow-sm [&_*]:text-shadow-none"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}