import { Link } from "react-router-dom";
import { FiStar, FiMapPin } from "react-icons/fi";
import { ChefHat, Clock } from "lucide-react";

const MealCard = ({ meal }) => {
  return (
    <Link to={`/meal/${meal._id}`} className="group">
      <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2 h-full flex flex-col">
        {/* Image */}
        <div className="relative overflow-hidden flex-shrink-0">
          <img
            src={
              meal.foodImage ||
              "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop"
            }
            alt={meal.foodName}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          {/* Price Badge */}
          <div className="absolute top-4 right-4 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm px-3 py-1 rounded-xl shadow-lg">
            <span className="text-lg font-bold text-primary-600">
              ৳{meal.price}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Title & Rating */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2 line-clamp-1">
              {meal.foodName}
            </h3>
            {/* SHORT DESCRIPTION - NEW REQUIREMENT */}
            <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-3">
              {meal.shortDescription ||
                "Delicious homemade meal prepared with fresh ingredients and love by local chef. Perfect for any occasion."}
            </p>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`w-4 h-4 ${
                      i < (meal.rating || 0)
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-neutral-300 dark:text-neutral-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                {meal.rating || "No ratings"}
              </span>
            </div>
          </div>

          {/* Meta Info */}
          <div className="space-y-3 mb-4">
            {/* Chef Info */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-500/10 flex items-center justify-center">
                <ChefHat className="w-4 h-4 text-primary-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">
                  {meal.chefName}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                  {meal.chefExperience}
                </p>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
              <FiMapPin className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">
                {meal.deliveryArea || "City-wide"}
              </span>
            </div>

            {/* Time Info */}
            <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
              <Clock className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">
                {meal.estimatedDeliveryTime || "30-45 mins"}
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <button className="w-full mt-auto py-3 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default MealCard;
