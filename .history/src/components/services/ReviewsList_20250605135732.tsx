import React from "react";

export interface ReviewsListProps {
  reviews: any[];
  isLoading: boolean;
  currentUserId?: string | null;
  onDeleteReview?: (reviewId: string) => Promise<void>;
}

const ReviewsList = ({
  reviews,
  isLoading,
  currentUserId,
  onDeleteReview,
}: ReviewsListProps) => {
  if (isLoading) {
    return <div>Chargement des avis...</div>;
  }

  if (reviews.length === 0) {
    return (
      <div className="text-gray-500 italic">Aucun avis pour le moment.</div>
    );
  }

  return (
    <div className="space-y-4 mt-4">
      {reviews.map((review, index) => (
        <div key={index} className="border-b pb-4">
          {/* Affichage du prénom + nom de l’auteur */}
          <p className="font-semibold text-gray-800">{review.user_name}</p>
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < review.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {new Date(review.created_at).toLocaleDateString("fr-FR")}
            </span>
          </div>
          <p className="mt-2">{review.comment}</p>

          {/* Add delete button for user's own reviews */}
          {currentUserId &&
            review.user_id === currentUserId &&
            onDeleteReview && (
              <button
                onClick={() => onDeleteReview(review.id)}
                className="mt-2 text-sm text-red-500 hover:text-red-700"
              >
                Supprimer
              </button>
            )}
        </div>
      ))}
    </div>
  );
};

export default ReviewsList;
