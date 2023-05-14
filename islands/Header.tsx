export default function Header() {
  return (
    <div className="z-50 sticky w-screen top-0 left-0 header-bar px-4 py-4 flex items-center bg-white bg-opacity-80 shadow-2xl  border-b border-gray-400">
        <span className="text-2xl font-bold text-blue-600 pr-2">bias.ai</span>
      <a href="/" className="text-black text-md border-black border-2 rounded-full py-2 px-4 mx-2">Home</a>
<a href="/upload" className="text-red-400 text-md border-red-400 border-2 rounded-full py-2 px-4 mx-2">Upload</a>
<a href="/analyze" className="text-blue-600 text-md border-blue-600 border-2 rounded-full py-2 px-4 mx-2">Analyze</a>
    </div>
  );
}