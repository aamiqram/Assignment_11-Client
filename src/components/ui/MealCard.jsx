import { Link } from "react-router-dom";

const MealCard = ({ meal }) => {
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition">
      <figure className="h-64">
        <img
          src={meal.foodImage || "https://i.ibb.co.com/placeholder.jpg"}
          alt={meal.foodName}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{meal.foodName}</h2>
        <p className="text-sm text-gray-600">
          by {meal.chefName} ({meal.chefId})
        </p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-bold text-primary">৳{meal.price}</span>
          <div className="rating rating-sm">
            {[...Array(5)].map((_, i) => (
              <input
                key={i}
                type="radio"
                className="mask mask-star-2 bg-orange-400"
                disabled
                checked={i < meal.rating}
              />
            ))}
          </div>
        </div>
        <p className="text-sm mt-2">Delivery: {meal.deliveryArea}</p>
        <div className="card-actions mt-6">
          <Link to={`/meal/${meal._id}`} className="btn btn-primary w-full">
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
