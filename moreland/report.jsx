import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  Monitor, 
  Wifi, 
  BookOpen, 
  TrendingUp, 
  Users, 
  Server, 
  Lightbulb, 
  CheckCircle,
  LayoutDashboard,
  ShieldAlert
} from 'lucide-react';

// --- Data Aggregated from Survey & Interviews ---
const challengeData = [
  { name: 'Wi-Fi / Connectivity', votes: 8 },
  { name: 'Student Distraction', votes: 7 },
  { name: 'Hardware Damage', votes: 5 },
  { name: 'Lack of Training', votes: 4 },
];

const preferenceData = [
  { name: 'iPads / Tablets', value: 45 },
  { name: 'Chromebooks', value: 35 },
  { name: 'Teacher Laptops', value: 15 },
  { name: 'Desktops', value: 5 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'admin', label: 'Admin Vision', icon: Lightbulb },
    { id: 'teachers', label: 'Teacher Insights', icon: Users },
    { id: 'it', label: 'IT Infrastructure', icon: Server },
    { id: 'action', label: 'Action Plan', icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800">
      
      {/* Sidebar Navigation */}
      <nav className="w-full md:w-64 bg-slate-900 text-white p-6 shadow-xl flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            EdTech Capstone
          </h1>
          <p className="text-slate-400 text-sm mt-1">Infrastructure Report</p>
        </div>
        
        <div className="flex flex-col space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="animate-fadeIn">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">Project Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <StatCard icon={Users} title="Stakeholders" value="3 Groups" desc="Admin, IT, Teachers" />
              <StatCard icon={Monitor} title="Device Focus" value="1:1" desc="Target Ratio" />
              <StatCard icon={BookOpen} title="Pedagogy" value="TPACK" desc="Integration Model" />
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold mb-4">Executive Summary</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                This interactive report evaluates the current technological infrastructure, device utilization, and pedagogical vision at our campus to inform future technology integration strategies. 
              </p>
              <p className="text-slate-600 leading-relaxed">
                By analyzing perspectives from administration, the IT department, and classroom teachers, this document outlines how technology currently impacts the learning environment and provides research-backed recommendations for a sustainable, effective device rollout and professional development plan.
              </p>
            </div>
          </div>
        )}

        {/* ADMIN TAB */}
        {activeTab === 'admin' && (
          <div className="animate-fadeIn">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">Administrator Vision</h2>
            <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-8 text-white shadow-lg mb-8">
              <h3 className="text-2xl font-semibold mb-4 flex items-center">
                <Lightbulb className="mr-3 text-yellow-400" />
                Pedagogical Goals
              </h3>
              <p className="text-blue-100 text-lg leading-relaxed">
                "Technology must act as an invisible catalyst for Inquiry-Based Learning (IBL) and Project-Based Learning (PBL). We must move away from passive screen time toward student-led creation and global collaboration."
              </p>
            </div>
            
            <h3 className="text-xl font-bold mb-4">Proposed Tiered 1:1 Rollout</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-blue-500">
                <h4 className="font-bold text-lg mb-2">Grades K - 2</h4>
                <p className="text-slate-600 mb-4"><strong>Device:</strong> iPads / Tablets</p>
                <p className="text-sm text-slate-500">Rationale: Intuitive touch interfaces and mobility are critical for young learners currently developing fine motor skills.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 border-l-4 border-l-purple-500">
                <h4 className="font-bold text-lg mb-2">Grades 3 - 12</h4>
                <p className="text-slate-600 mb-4"><strong>Device:</strong> Chromebooks</p>
                <p className="text-sm text-slate-500">Rationale: Cost-effective, keyboard-ready solutions required for older students writing research papers and utilizing cloud-based collaborative platforms.</p>
              </div>
            </div>
          </div>
        )}

        {/* TEACHERS TAB */}
        {activeTab === 'teachers' && (
          <div className="animate-fadeIn">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">Teacher Insights & Data</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Chart 1: Challenges */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold mb-6 flex items-center">
                  <ShieldAlert className="mr-2 text-red-500" size={20} />
                  Top Tech Challenges
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={challengeData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={120} tick={{fontSize: 12}} />
                      <Tooltip cursor={{fill: '#f1f5f9'}} />
                      <Bar dataKey="votes" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Chart 2: Preferences */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="text-lg font-bold mb-6 flex items-center">
                  <Monitor className="mr-2 text-indigo-500" size={20} />
                  Overall Device Preferences
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={preferenceData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {preferenceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={36}/>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
              <h3 className="font-bold text-blue-900 mb-2">Primary Professional Development Need</h3>
              <p className="text-blue-800">
                Teachers expressed a pressing need for targeted PD. They are requesting training not just on basic troubleshooting, but on <strong>advanced integration strategies</strong>, classroom tech management routines, and maximizing device potential for differentiation.
              </p>
            </div>
          </div>
        )}

        {/* IT TAB */}
        {activeTab === 'it' && (
          <div className="animate-fadeIn">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">IT & Infrastructure</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Wifi className="text-green-600" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Current State</h3>
                <p className="text-slate-600">Network runs on a fiber backbone distributed through managed wireless access points. However, frequent "dead zones" exist, directly correlating with teacher frustrations.</p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Server className="text-purple-600" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Future Vision</h3>
                <p className="text-slate-600">Transitioning to a robust automated ticketing system and standardizing hardware via cloud-based Mobile Device Management (MDM) to reduce immense support loads.</p>
              </div>
            </div>

            {/* Media Placeholders */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-200 rounded-xl h-48 flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-slate-400">
                <Server size={32} className="mb-2" />
                <span>[Image 1: IT Server Rack Management]</span>
              </div>
              <div className="bg-slate-200 rounded-xl h-48 flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-slate-400">
                <Monitor size={32} className="mb-2" />
                <span>[Video 1: MDM Dashboard Demo]</span>
              </div>
            </div>
          </div>
        )}

        {/* ACTION PLAN TAB */}
        {activeTab === 'action' && (
          <div className="animate-fadeIn">
            <h2 className="text-3xl font-bold mb-6 text-slate-900">Conclusion & Next Steps</h2>
            
            <p className="text-slate-600 mb-8 text-lg">
              To bridge the gap between our current infrastructure and our pedagogical goals, the following initial steps are recommended to the administrative stakeholders:
            </p>

            <div className="space-y-4">
              <ActionStep 
                number="1"
                title="Phased Device Standardization"
                desc="Initiate procurement aligned with vision: 1:1 iPads (K-2) and 1:1 Chromebooks (3-12). This relieves IT bottlenecks and creates predictability."
              />
              <ActionStep 
                number="2"
                title="Comprehensive Infrastructure Audit"
                desc="Before new devices are deployed, IT must conduct a Wi-Fi heat-mapping audit to eliminate dead zones identified in teacher surveys."
              />
              <ActionStep 
                number="3"
                title="Establish Tech-Integration Task Force"
                desc="Form a committee of IT, Admin, and lead teachers to meet monthly, ensuring IT capabilities align seamlessly with instructional needs."
              />
              <ActionStep 
                number="4"
                title="TPACK-aligned Professional Development"
                desc="Pivot PD away from 'how to click' to 'how to teach'. Focus on moving student tech usage into the Modification/Redefinition phases of the SAMR model."
              />
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

// --- Helper Components ---

function StatCard({ icon: Icon, title, value, desc }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4">
      <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm text-slate-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        <p className="text-xs text-slate-400">{desc}</p>
      </div>
    </div>
  );
}

function ActionStep({ number, title, desc }) {
  return (
    <div className="flex bg-white p-5 rounded-xl shadow-sm border border-slate-100 items-start">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold mr-4 mt-1">
        {number}
      </div>
      <div>
        <h3 className="font-bold text-lg text-slate-900 mb-1">{title}</h3>
        <p className="text-slate-600">{desc}</p>
      </div>
    </div>
  );
}