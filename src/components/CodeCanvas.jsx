import React, { useState, useEffect, useRef } from "react";
import { Terminal, Code, Database } from "lucide-react";

const files = [
  {
    name: "Developer.jsx",
    icon: <Code size={14} className="text-[#61DAFB]" />,
    code: `import React from 'react';

const Developer = () => {
  return (
    <main className="flex flex-col">
      <h1 className="text-neon">
        Building Pixel-Perfect UIs
      </h1>
      <MERNStack level="Expert" />
      <Performance isOptimized={true} />
    </main>
  );
};

export default Developer;`
  },
  {
    name: "backend.js",
    icon: <Database size={14} className="text-[#68A063]" />,
    code: `const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('DB Connected!'))
  .catch(err => console.error(err));

app.listen(5000, () => {
  console.log('Server running on port 5000');
});`
  },
  {
    name: "terminal.sh",
    icon: <Terminal size={14} className="text-[#3b82f6]" />,
    code: `$ npm start portfolio

> portfolio@1.0.0 start
> node server.js

[Info] Server running on port 5000
[Info] Database connection established.
[Success] All systems go! Ready for action.`
  }
];

const CodeCanvas = () => {
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const tabsContainerRef = useRef(null);

  useEffect(() => {
    if (tabsContainerRef.current) {
      const activeTab = tabsContainerRef.current.children[currentFileIndex];
      const container = tabsContainerRef.current;
      if (activeTab && container) {
        const tabOffsetLeft = activeTab.offsetLeft;
        const tabWidth = activeTab.offsetWidth;
        const containerWidth = container.offsetWidth;
        
        // Calculate the scroll position to center the tab
        const scrollPosition = tabOffsetLeft - (containerWidth / 2) + (tabWidth / 2);
        
        container.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [currentFileIndex]);

  useEffect(() => {
    const currentCode = files[currentFileIndex].code;
    
    let timer;
    if (isDeleting) {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1));
        }, 15); // Fast delete
      } else {
        setIsDeleting(false);
        setCurrentFileIndex((prev) => (prev + 1) % files.length);
      }
    } else {
      if (displayedText.length < currentCode.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentCode.slice(0, displayedText.length + 1));
        }, 35); // Typing speed
      } else {
        // Wait before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 3000);
      }
    }
    
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentFileIndex]);

  // Safe syntax highlighting using unique tokens
  const getHighlightedText = () => {
    // 1. Escape HTML first
    let html = displayedText
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // 2. Wrap strings in a safe token
    html = html.replace(/('[^']*')/g, "___STR_S___$1___STR_E___");
    html = html.replace(/("[^"]*")/g, "___STR_S___$1___STR_E___");

    // 3. Highlight keywords
    const keywords = ["import", "from", "const", "return", "export", "default", "require", "function"];
    keywords.forEach(kw => {
      const regex = new RegExp("\\b" + kw + "\\b", "g");
      html = html.replace(regex, "___KW_S___" + kw + "___KW_E___");
    });

    // 4. Highlight objects
    const objects = ["console", "app", "mongoose", "process", "React"];
    objects.forEach(obj => {
      const regex = new RegExp("\\b" + obj + "\\b", "g");
      html = html.replace(regex, "___OBJ_S___" + obj + "___OBJ_E___");
    });

    // 5. Convert tokens to styled spans
    html = html.replace(/___STR_S___/g, '<span style="color: #E6C07B">');
    html = html.replace(/___STR_E___/g, '</span>');
    
    html = html.replace(/___KW_S___/g, '<span style="color: #FF7B72">'); // Pink/Red
    html = html.replace(/___KW_E___/g, '</span>');
    
    html = html.replace(/___OBJ_S___/g, '<span style="color: #79C0FF">'); // Blue
    html = html.replace(/___OBJ_E___/g, '</span>');

    return { __html: html };
  };

  return (
    <div className="w-full max-w-[600px] rounded-xl overflow-hidden bg-[#0A0C10] border border-[#3b82f6]/20 shadow-[0_20px_50px_rgba(0,0,0,0.5),_0_0_30px_rgba(59,130,246,0.05)] font-mono text-sm leading-relaxed transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),_0_0_50px_rgba(59,130,246,0.15)]">
      {/* Mac Header */}
      <div className="bg-[#16181C] pl-4 pr-0 sm:px-4 h-12 flex items-end border-b border-white/5 relative w-full overflow-hidden">
        {/* Window Controls */}
        <div className="flex gap-2 h-full items-center shrink-0 mr-4 sm:mr-6">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-[inset_0_0_4px_rgba(0,0,0,0.5)]"></div>
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-[inset_0_0_4px_rgba(0,0,0,0.5)]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-[inset_0_0_4px_rgba(0,0,0,0.5)]"></div>
        </div>
        
        {/* File Tabs */}
        <div ref={tabsContainerRef} className="flex gap-1 h-full pt-3 overflow-x-auto scroll-smooth flex-1 w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {files.map((file, idx) => (
              <div 
                key={file.name} 
                className={"flex items-center gap-1.5 px-2 sm:px-4 py-1 sm:py-1.5 rounded-t-lg border border-b-0 transition-all duration-300 whitespace-nowrap " + (idx === currentFileIndex ? "bg-[#0A0C10] border-[#3b82f6]/20 text-[#3b82f6]" : "bg-[#1A1D24] border-transparent text-[#606060]")}
              >
                {file.icon}
                <span className="text-[10px] sm:text-xs font-medium tracking-wide">{file.name}</span>
              </div>
            ))}
          </div>
        </div>

      {/* Code Editor Body */}
      <div className="p-3 sm:p-6 h-[320px] sm:h-[380px] overflow-hidden relative">
        {/* Line Numbers */}
        <div className="absolute top-0 left-0 w-8 sm:w-12 h-full bg-[#16181C]/30 border-r border-white/5 flex flex-col items-center py-4 sm:py-6 text-[#404040] text-xs select-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="leading-relaxed opacity-60">{i + 1}</div>
          ))}
        </div>
        
        {/* Typing Area */}
        <div className="pl-6 sm:pl-12 text-[#A0A0A0] whitespace-pre-wrap font-mono text-[10px] sm:text-sm">
          <span dangerouslySetInnerHTML={getHighlightedText()} />
          <span className="animate-pulse inline-block w-[8px] h-[16px] bg-[#3b82f6] ml-[2px] align-middle shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
        </div>
      </div>
    </div>
  );
};

export default CodeCanvas;
