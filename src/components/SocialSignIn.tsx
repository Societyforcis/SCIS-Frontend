import { Github, Mail } from 'lucide-react';

export default function SocialSignIn() {
  return (
    <div className="flex flex-col gap-4 mt-6">
      {/* Google Sign In */}
      <button className="flex items-center justify-center gap-3 w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-all duration-200 font-sans">
      <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-5 h-5" />
        <span className="text-gray-700">Continue with Google</span>
      </button>

      {/* GitHub Sign In */}
      <button className="flex items-center justify-center gap-3 w-full px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-all duration-200 font-sans">
        <Github className="w-5 h-5" />
        <span>Continue with GitHub</span>
      </button>

      {/* Apple Sign In */}
      <button className="flex items-center justify-center gap-3 w-full px-4 py-2 bg-none text-white rounded-md hover:bg-gray-900 transition-all duration-200 font-sans">
        <svg className="w-5 h-7 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z"/>
        </svg>
        <span>Continue with Apple</span>
      </button>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500 font-sans">Or continue with</span>
        </div>
      </div>
    </div>
  )
}
