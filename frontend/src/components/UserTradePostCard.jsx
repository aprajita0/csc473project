import { Link } from 'react-router-dom';

const UserTradePostCard = ({ id, artist_name, group, image, cost, title, details, type, posting_date }) => {
  const costNumber = parseFloat(cost.$numberDecimal);
  
  const displayType = type ? type.toUpperCase() : `${typeof type}`;  // for debugging 'undefined' values
  const displayGroup = group ? group.toUpperCase() : `${typeof group}`; // for debugging 'undefined' values

  return (
    <div className='UserTradePostCard bg-neutral-100 p-2 w-64 
                    drop-shadow-lg text-center border rounded-lg
                    hover:brightness-95 hover:scale-105 ease-in-out duration-300'>

      <p id='trade-post-card-date' className='text-xs text-gray-500'>
        Posted: {new Date(posting_date).toLocaleDateString()}
      </p>

      <div id='trade-post-card-header' className='flex flex-col justify-center'>
        <div id='trader-info' className='flex justify-center'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
            <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z" clipRule="evenodd" />
          </svg>
          <span id='trade-post-username' className='text-xs pt-0.5'>
            userName
          </span>
        </div>
        <span className='BuySell text-xl font-extrabold'>
          {displayType} - ${costNumber.toFixed(2)}
        </span>
      </div>

      <Link to={`/tradepost/${id}`} className='flex justify-center drop-shadow-md'>
        <img className='TradePostImage max-h-72 rounded-lg drop-shadow-md' 
        src={image} alt={`${artist_name} photocard`} 
        />
      </Link>

      <div id='trade-desc'>
        <div className=''>
          <p id='trade-post-card-idol' className='text-xl font-bold'>
            {artist_name} ({displayGroup})
          </p>
          <p id='trade-post-card-title' className='text-md'>
            {title}
          </p>
          <p id='trade-post-card-details' className='text-xs'>
            {details}
          </p>
        </div>
      </div>
      
    </div>
  );
}

export default UserTradePostCard;
