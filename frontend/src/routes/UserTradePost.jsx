import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import UserComment from "../components/UserComment"
import UserTradePostInfo from "../components/UserTradePostInfo"

const UserTradePost = () => {
  return (
    <div className="UserTradePost">
      <Navbar />
      <div className="TradePost mt-28 flex grow flex-col min-h-screen">

        <UserTradePostInfo />

        <hr className="h-px my-2 bg-gray-200 border-1 dark:bg-gray-200"></hr>
        <div id='comment-section' className="flex flex-col items-center pb-4">
          <p className="text-xl font-bold py-2">Comments</p>
          <UserComment />
          <UserComment />
          <UserComment />
          <UserComment />
          <UserComment />
          <UserComment />
          <UserComment />
          <UserComment />
          <UserComment />
          <UserComment />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default UserTradePost