export default function SecureInterviewClientDemo() {
  return (
    <div className="w-full h-full min-h-screen bg-[#0D0D15] flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500 to-fuchsia-500 flex items-center justify-center">
          <svg className="w-10 h-10 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-white">EdgeLancer Interview</h1>
          <p className="text-gray-400">Secure Interview Client Demo</p>
        </div>
        <p className="text-sm text-gray-500">
          Navigate to /interview to view the full interview experience
        </p>
      </div>
    </div>
  );
}
