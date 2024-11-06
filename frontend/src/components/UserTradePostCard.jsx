
const UserTradePostCard = () => {
  return (
    <div className='UserTradePostCard bg-neutral-100 p-2 w-64 text-center border rounded-lg'>
      
      <div id='trade-post-card-header' className='flex flex-col justify-center'>
        <div id='trader-info' className='flex justify-center'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
            <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z" clipRule="evenodd" />
          </svg>
          <span id='trade-post-username' className='text-xs pt-0.5'>userName</span>
        </div>
        <span className='BuySell text-xl font-bold'>BUY/SELL - $price</span>
      </div>

      <div className='flex justify-center'>
        <img className='TradePostImage max-h-72' src='https://i.pinimg.com/736x/ad/92/a8/ad92a8a6ac100aebec21e18630325346.jpg' />
      </div>

      <div id='trade-desc'>
        <div className=''>
          <span id='trade-post-card-idol' className='text-lg font-bold'>idolName</span>
          <span id='trade-post-card-album' className='text-sm'> - collectionName (year)</span>
        </div>
      </div>

    </div>
  )
}

export default UserTradePostCard