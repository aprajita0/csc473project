
const UserTradePostCard = () => {
  return (
    <div className='UserTradePostCard bg-neutral-100 p-2 w-64 
                    drop-shadow-lg text-center border rounded-lg
                    hover:brightness-95 hover:scale-105 ease-in-out duration-300'>
      
      <div id='trade-post-card-header' className='flex flex-col justify-center'>
        <div id='trader-info' className='flex justify-center'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
            <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z" clipRule="evenodd" />
          </svg>
          <span id='trade-post-username' className='text-xs pt-0.5'>userName</span>
        </div>
        <span className='BuySell text-xl font-extrabold'>BUY|SELL - $userSetPrice</span>
      </div>

      <a href='/tradepost' className='flex justify-center drop-shadow-md'>
        <img className='TradePostImage max-h-72 rounded-lg drop-shadow-md' src='https://i.pinimg.com/736x/ad/92/a8/ad92a8a6ac100aebec21e18630325346.jpg' />
      </a>

      <div id='trade-desc'>
        <div className=''>
          <p id='trade-post-card-idol' className='text-lg font-bold'>idolName (groupName)</p>
          <p id='trade-post-card-album' className='text-sm'>collectionName (year)</p>
        </div>
      </div>

    </div>
  )
}

export default UserTradePostCard