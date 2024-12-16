
const UserTradePostInfo = ({ owner, id, artist_name, group, image, cost, title, details, type, posting_date }) => {
  const costNumber = cost && cost.$numberDecimal ? parseFloat(cost.$numberDecimal) : 0;

  return (
    <div className="UserTradePostInfo pt-12 post-info flex justify-center px-4 py-8">
      <div className="w-1/3 flex justify-center items-center drop-shadow-lg">
        <img id='photocard-image'
          className="object-contain h-80 border rounded-lg 
                      drop-shadow-lg hover:cursor-pointer hover:scale-105 
                      hover:ease-in-out duration-300"
          src={image}
          alt='photocard to buy or sell'
        />
      </div>

      <div id='post-details' className="w-1/3 min-w-32">
        <div id='post-header' className="">
          <p id='buy-or-sell' className="text-xl font-black underline">
            {type ? type.toUpperCase() : 'N/A'}
          </p>

          <div id="poster-info" className="text-sm space-x-1 flex items-center">
            {/* <div id="poster-pfp" className="flex justify-center items-center">
              <img
                src={owner?.profile_pic}
                alt={`${owner?.username}'s profile`}
                className="w-6 h-6 rounded-full mr-2"
              />
            </div> */}
            <div id="poster-username" className="text-xs flex items-center">
              {owner?.username || 'Unknown'}
            </div>
          </div>

          <p id='photocard-title' className="">
            {group} - {artist_name} (album/collection)
          </p>
        </div>

        <hr className="h-px my-2 bg-gray-200 border-1 dark:bg-gray-200"></hr>

        <div id='photocard-price' className="text-lg font-bold">
          ${costNumber.toFixed(2)}
        </div>

        <hr className="h-px my-2 bg-gray-200 border-1 dark:bg-gray-200"></hr>

        <div id='post-desc' className="">
          <p>{title}</p>
          <p>{details}</p>
        </div>

        <hr className="h-px my-2 bg-gray-200 border-1 dark:bg-gray-200"></hr>

        <div id='trade-buttons' className="space-y-1">
          <div id='msg-poster'>
            <button className="drop-shadow-md text-sm border rounded px-12 py-2 bg-[#434343] text-white font-bold
                                hover:brightness-90 hover:scale-105 ease-in-out duration-300">
              Message tradePoster!
            </button>
          </div>

          <div id='bookmark-post'>
            <button className="drop-shadow-md text-sm border rounded px-12 py-2 bg-[#434343] text-white font-bold
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

export default UserTradePostInfo;
