import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import UserComment from "../components/UserComment";
import UserTradePostInfo from "../components/UserTradePostInfo";

const UserTradePost = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/users/get-photocard-info/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="UserTradePost">
      <Navbar />
      <div className="TradePost mt-28 flex grow flex-col min-h-screen">
        <UserTradePostInfo {...product} />
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
  );
};

export default UserTradePost;
