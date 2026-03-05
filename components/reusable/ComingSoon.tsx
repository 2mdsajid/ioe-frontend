'use client';

import React from 'react';

type ComingSoonProps = {
  title?: string; // e.g. "Second Paper"
  subtitle?: string; // optional smaller line
  message?: string; // optional custom message
};

export default function ComingSoon({
  title = "Loksewa Sopan",
  subtitle = "लोकसेवा सोपान",
  message = "A New Chapter in Public Service Preparation Begins Soon."
}: ComingSoonProps) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white overflow-hidden p-6">
      {/* Subtle SVG background pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}
      ></div>

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        {/* Subtitle */}
        <h2 className="text-3xl md:text-4xl font-semibold text-purple-400">
          {subtitle}
        </h2>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mt-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
          {title}
        </h1>

        {/* “Coming Soon” label */}
        <div className="mt-6 inline-block bg-purple-500/10 border border-purple-400/30 px-6 py-2 rounded-full text-purple-300 font-semibold tracking-wide">
          🚧 Coming Soon 🚧
        </div>

        {/* Message */}
        <p className="mt-8 text-xl md:text-2xl text-gray-300 max-w-xl mx-auto">
          {message}
        </p>
      </div>
    </div>
  );
}
