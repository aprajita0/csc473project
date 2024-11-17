
const UserTradePostInfo = () => {
  return (
    <div className="UserTradePostInfo pt-12 post-info flex justify-center px-4 py-8">
      <div className="w-1/3 flex justify-center items-center">
        <img id='photocard-image'
          className="object-contain h-80 border rounded-lg 
                      drop-shadow-lg hover:cursor-pointer hover:scale-105 
                      hover:ease-in-out duration-300"
          src='https://i.pinimg.com/originals/05/fc/f4/05fcf4013c7e9133920de6504a3cb9b1.jpg'
        />
      </div>
      <div id='post-details' className="w-1/3 min-w-32">
        <div id='post-header' className="">
          <p id='buy-or-sell' className="text-xl font-black underline">buyOrSell</p>
          <div id="poster-info" className="text-sm space-x-1 flex items-center">
            <div id="poster-pfp" claclassNamess="flex justify-center items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
              </svg>
            </div>
            <div id="poster-username" className="text-xs flex items-center">
              traderUsername
            </div>
          </div>
          <p id='photocard-title' className="">groupName - artistName (album/collection)</p>
        </div>
        <hr className="h-px my-2 bg-gray-200 border-1 dark:bg-gray-200"></hr>
        <div id='photocard-price' className="text-lg font-bold">
          $userSetPrice
        </div>
        <hr className="h-px my-2 bg-gray-200 border-1 dark:bg-gray-200"></hr>
        <div id='post-desc' className="text-sm">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
          esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
          sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <hr className="h-px my-2 bg-gray-200 border-1 dark:bg-gray-200"></hr>
        <div id='trade-buttons' className="space-y-1">
          <div id='msg-poster'>
            <button className="drop-shadow-md text-xs border rounded px-12 py-2 bg-[#434343] text-white font-bold
                                hover:brightness-90 hover:scale-105 ease-in-out duration-300">
              Message tradePoster!
            </button>
          </div>
          <div id='bookmark-post'>
            <button className="drop-shadow-md text-xs border rounded px-12 py-2 bg-[#434343] text-white font-bold
                                hover:brightness-90 hover:scale-105 ease-in-out duration-300">
              Bookmark it!
            </button>
          </div>
        </div>
      </div>
      <hr className="h-px my-2 bg-gray-200 border-1 dark:bg-gray-200"></hr>
    </div>
  )
}

export default UserTradePostInfo