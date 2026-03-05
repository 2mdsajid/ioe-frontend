import { Mail, ArrowRight } from 'lucide-react';

export default function ComingSoonProfessional() {
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white overflow-hidden p-4">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }}
      ></div>

      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-purple-400">
            लोकसेवा सोपान
          </h2>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mt-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            Loksewa Sopan
          </h1>
        </div>

        <p className="mt-4 text-2xl md:text-3xl font-light text-gray-300">
          A New Chapter in Public Service Preparation Begins Soon.
        </p>
        <p className="mt-6 max-w-xl mx-auto text-lg text-gray-400">
          We are building the ultimate platform to guide your journey towards a successful career in public service. Get ready for a smarter, more effective way to prepare.
        </p>

      </div>
    </main>
  );
}