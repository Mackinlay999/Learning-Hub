// import { useState } from "react";

// const  Settings= () =>{
//   const [settings, setSettings] = useState({
//     notifications: true,
//     darkMode: false,
//     language: "English",
//   });

//   const handleToggle = (key) => {
//     setSettings({ ...settings, [key]: !settings[key] });
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Settings</h1>
//       <div className="space-y-4">
//         <div className="flex justify-between items-center p-4 border rounded">
//           <span>Enable Notifications</span>
//           <input 
//             type="checkbox" 
//             checked={settings.notifications} 
//             onChange={() => handleToggle("notifications")} 
//             className="toggle-checkbox"
//           />
//         </div>
//         <div className="flex justify-between items-center p-4 border rounded">
//           <span>Dark Mode</span>
//           <input 
//             type="checkbox" 
//             checked={settings.darkMode} 
//             onChange={() => handleToggle("darkMode")} 
//             className="toggle-checkbox"
//           />
//         </div>
//         <div className="flex justify-between items-center p-4 border rounded">
//           <span>Language</span>
//           <select 
//             value={settings.language} 
//             onChange={(e) => setSettings({ ...settings, language: e.target.value })} 
//             className="p-2 border rounded"
//           >
//             <option>English</option>
//             <option>Spanish</option>
//             <option>French</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Settings;


import { useState } from "react";
import "../style/Setting.css"
const Setting = () => {
  const [settings, setSettings] = useState({
    siteName: "EduTech Admin",
    theme: "Light",
    notifications: true,
    security: {
      twoFactorAuth: false,
      auditLogs: true,
    },
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSecurityToggle = (key) => {
    setSettings((prev) => ({
      ...prev,
      security: { ...prev.security, [key]: !prev.security[key] },
    }));
  };

  return (
    <div className="settings">
      <h1 className="page-title">Admin Settings</h1>
      <div className="settings-section">
        <h3>General Settings</h3>
        <label>
          Site Name: <input type="text" value={settings.siteName} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })} />
        </label>
        <label>
          Theme:
          <select value={settings.theme} onChange={(e) => setSettings({ ...settings, theme: e.target.value })}>
            <option value="Light">Light</option>
            <option value="Dark">Dark</option>
          </select>
        </label>
      </div>

      <div className="settings-section">
        <h3>Notifications</h3>
        <label>
          <input type="checkbox" checked={settings.notifications} onChange={() => handleToggle("notifications")} /> Enable Notifications
        </label>
      </div>

      <div className="settings-section">
        <h3>Security</h3>
        <label>
          <input type="checkbox" checked={settings.security.twoFactorAuth} onChange={() => handleSecurityToggle("twoFactorAuth")} /> Enable Two-Factor Authentication
        </label>
        <label>
          <input type="checkbox" checked={settings.security.auditLogs} onChange={() => handleSecurityToggle("auditLogs")} /> Enable Audit Logs
        </label>
      </div>
    </div>
  );
}

export default Setting;


