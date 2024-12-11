import { Link } from 'react-router-dom';

const UserTradePostCard = ({ id, owner, artist_name, group, image, cost, title, details, type, posting_date }) => {
  
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
        <div id='trader-info' className='flex justify-center items-center'>
          {owner?.profile_pic && <img src={owner.profile_pic} alt={`${owner.username}'s profile`} className="w-6 h-6 rounded-full mr-2" />}
          <span id='trade-post-username' className='text-xs pt-0.5'>{owner?.username || 'Unknown'}</span>
        </div>
        <span className='BuySell text-xl font-extrabold'>
          {displayType} - ${costNumber.toFixed(2)}
        </span>
      </div>

      <Link to={`/tradepost/${id}`} className='flex justify-center drop-shadow-md'>
        <img className='TradePostImage max-h-72 rounded-lg drop-shadow-md' 
        src={image} 
        alt={`${artist_name} photocard`} 
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
