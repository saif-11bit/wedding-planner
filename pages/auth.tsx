const Auth = () => {
    return ( 
        <div className="relative h-full w-full bg-[url('/images/couple.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
          <div className="bg-black w-full h-full bg-opacity-50">
            <nav className="px-12 py-5">
              <div className="text-white font-bold">My Logo</div>
            </nav>
            <div className=" h-5/6 flex flex-col items-center justify-center gap-4">
              <div className="font-semibold text-3xl text-white">
              The Poetry of Love
              </div>
              <div className=" font-thin text-xl text-gray-100">
              Start your journey to perfect wedding!
              </div>
              <div>
              <button 
               className="bg-transparent border border-white-500 px-5 py-2 text-white hover:bg-amber-600 hover:text-white transition-colors duration-300"
               disabled={false}
               type={"button"}
               onClick={() => {}}
              >
                ENTER →
              </button>
              </div>
            </div>
          </div>
        </div>
     );
}
 
export default Auth;