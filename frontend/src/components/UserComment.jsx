
const UserComment = () => {
  return (
    <div className='UserComment flex items-center py-2 space-x-4'>

      <div id='commenter-info' className="flex items-center space-x-1">
        {/* <img id='commenter-pfp' src="" alt='pfp' /> */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
          className="size-6 flex justify-center items-center">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
        <div>
          <div id='commenter-username' className="font-bold text-sm">userName</div>
          <div id='m-d-y-time' className="text-xs text-gray-400">Month, Day, Year</div>
        </div>
      </div>

      <div id='comment'>
        <p className="text-gray-600">
          hi i would like to buy this! thank you! i sent you a dm!
        </p>
      </div>
    </div>
  )
}

export default UserComment