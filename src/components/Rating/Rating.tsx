import React, { useState, useEffect, useContext } from 'react';
import { collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';
import { database } from '../../services/firebase';
import { User } from 'firebase/auth';
import { UserFire } from '../../types';
import { Context } from '../../context/Context';

interface StarRatingProps {
  user: User | UserFire | null;
  imageId: string;
}

const StarRating: React.FC<StarRatingProps> = ({ imageId }) => {
  const { showNotification, user } = useContext(Context);
  const [rating, setRating] = useState(0);
  const [hasUserRated, setHasUserRated] = useState(false);
  const [totalRatings, setTotalRatings] = useState(0);
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    const ratingsRef = collection(database, "ratings");
    const ratingsQuery = query(ratingsRef, where("imageId", "==", imageId));

    const unsubscribe = onSnapshot(ratingsQuery, (snapshot) => {
      let total = 0;
      snapshot.forEach((doc) => {
        total += doc.data().rating;
        if (user && doc.data().userId === user.uid) {
          setHasUserRated(true);
          setRating(doc.data().rating);
        }
      });
      setTotalRatings(snapshot.size);
      setAvgRating(total / snapshot.size);
    });

    return () => unsubscribe();
  }, [user, imageId]);

  const handleRating = async (rating: number) => {
    if (!user || Object.keys(user).length === 0 ){
      showNotification('É preciso fazer login para votar.');
      return;
    }

    if (hasUserRated) {
      showNotification('Você já votou nesta imagem.');
      return;
    }

    const ratingsRef = collection(database, "ratings");
    await addDoc(ratingsRef, {
      userId: user.uid,
      imageId,
      rating
    });

    setRating(rating);
    setHasUserRated(true);
  };

  return (
    <div className="flex justify-center mt-2">
      {[...Array(5)].map((_star, i) => {
        const ratingValue = i + 1;
  
        return (
          <button
            key={i}
            onClick={() => handleRating(ratingValue)}
            className="cursor-pointer"
          >
            <svg
            style={{ width: "1.5rem", height: "1.5rem" }}
              className={ratingValue <= avgRating ? "fill-yellow-400 width-" : "fill-gray-400"}
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;