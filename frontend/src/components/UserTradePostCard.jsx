import { Link } from 'react-router-dom';

const UserTradePostCard = ({ id, owner, artist_name, group, image, cost, title, details, type, posting_date }) => {
  // console.log({ id, owner, artist_name, group, image, cost, title, details, type, posting_date }); // Debugging

  const displayCost = typeof cost === 'object' && cost.$numberDecimal
    ? parseFloat(cost.$numberDecimal).toFixed(2)
    : cost;

  const displayType = type ? type.toUpperCase() : '';
  const displayGroup = group ? group : '';

  let displayDate = new Date(posting_date);
  let formattedDate = isNaN(displayDate.getTime()) ? new Date().toLocaleDateString() : displayDate.toLocaleDateString()
  
  return (
    <div className='UserTradePostCard bg-neutral-100 p-2 w-64 
                    drop-shadow-lg text-center border rounded-lg
                    hover:brightness-95 hover:scale-105 ease-in-out duration-300'>

      <p id='trade-post-card-date' className='text-xs text-gray-500'>
        {`Posted: ${formattedDate}` || ''}
      </p>

      <div id='trade-post-card-header' className='flex flex-col justify-center'>
        <div id='trader-info' className='flex justify-center items-center'>
          {owner?.profile_pic && <img src={owner.profile_pic} alt={`${owner.username}'s profile`} className="w-6 h-6 rounded-full mr-2" />}
          <span id='trade-post-username' className='text-xs pt-0.5'>{owner?.username || ''}</span>
        </div>

        <span className='BuySell text-xl font-extrabold'>
          {displayType} {displayCost && `- $${displayCost}`}
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
            {artist_name || ''} {displayGroup && `(${displayGroup})`}
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
