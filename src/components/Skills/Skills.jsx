/* src/components/Skills/Skills.js */
import React from 'react';
import './Skills.css';

// Import specific icons from react-icons
import { 
  SiMysql, SiPython, 
  SiReact, SiJavascript, SiNodedotjs, SiGit, 
  SiMongodb, SiApachespark, SiNextdotjs, SiTableau 
} from "react-icons/si";

// Added FaChartBar, FaCloud, FaShareAltSquare, FaProjectDiagram for the missing icons
import { 
  FaDatabase, FaFileExcel, FaCode, FaCogs, 
  FaChartBar, FaCloud, FaShareAltSquare, FaProjectDiagram 
} from "react-icons/fa";

import { TbApi } from "react-icons/tb";

const skillsData = [
  {
    category: "Data & Analytics",
    tools: [
      { name: "Power BI", icon: <FaChartBar />, color: "#F2C811" }, // Swapped for FaChartBar
      { name: "SQL", icon: <SiMysql />, color: "#00758F" },
      { name: "DAX", icon: <FaCode />, color: "#00D1C1" }, 
      { name: "M Query", icon: <FaCogs />, color: "#A1A1AA" }, 
      { name: "Excel", icon: <FaFileExcel />, color: "#217346" },
      { name: "Tableau", icon: <SiTableau />, color: "#E97627" },
      { name: "MS Fabric", icon: <FaProjectDiagram />, color: "#0078D4" } // Swapped for FaProjectDiagram
    ]
  },
  {
    category: "Engineering & Cloud",
    tools: [
      { name: "Azure", icon: <FaCloud />, color: "#0078D4" }, // Swapped for FaCloud
      { name: "Python", icon: <SiPython />, color: "#3776AB" },
      { name: "SharePoint", icon: <FaShareAltSquare />, color: "#0078D4" }, // Swapped for FaShareAltSquare
      { name: "Databricks", icon: <FaDatabase />, color: "#FF3621" },
      { name: "Spark", icon: <SiApachespark />, color: "#E25A1C" },
      { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" }
    ]
  },
  {
    category: "Development",
    tools: [
      { name: "React", icon: <SiReact />, color: "#61DAFB" },
      { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E" },
      { name: "Node.js", icon: <SiNodedotjs />, color: "#339933" },
      { name: "Next.js", icon: <SiNextdotjs />, color: "#ffffff" }, 
      { name: "Git", icon: <SiGit />, color: "#F05032" },
      { name: "REST APIs", icon: <TbApi />, color: "#A1A1AA" }
    ]
  }
];

export default function Skills() {
  return (
    <div className="skills-container">
      <h2 className="section-title">Technical Toolkit</h2>
      
      <div className="skills-grid">
        {skillsData.map((group, index) => (
          <div key={index} className="skill-card">
            <h3 className="skill-category">{group.category}</h3>
            <div className="skill-tags">
              {group.tools.map((tool, i) => (
                <div 
                  key={i} 
                  className="skill-tag" 
                  style={{ '--hover-color': tool.color }} 
                >
                  <span className="skill-icon" style={{ color: tool.color }}>
                    {tool.icon}
                  </span>
                  {tool.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}