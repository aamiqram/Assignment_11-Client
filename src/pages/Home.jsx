import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../utils/axiosSecure";
import MealCard from "../components/ui/MealCard";
import { Link } from "react-router-dom";

const Home = () => {
  // Fetch 6 daily meals
  const { data: dailyMeals = [], isLoading } = useQuery({
    queryKey: ["dailyMeals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/meals?limit=6");
      return res.data;
    },
  });

  // Mock reviews (replace with real fetch later)
  const reviews = [
    {
      name: "Sarah Ahmed",
      rating: 5,
      comment: "Best homemade biryani ever!",
      image: "https://i.ibb.co.com/sample1.jpg",
    },
    {
      name: "Rahim Khan",
      rating: 4.5,
      comment: "Fresh and delicious every time.",
      image: "https://i.ibb.co.com/sample2.jpg",
    },
    {
      name: "Ayesha Siddika",
      rating: 5,
      comment: "Highly recommend the grilled chicken!",
      image: "https://i.ibb.co.com/sample3.jpg",
    },
  ];

  return (
    <div>
      {/* Hero Section with Animation */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="hero min-h-screen bg-base-200 rounded-box relative overflow-hidden"
      >
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold"
            >
              Fresh Homemade Meals
              <br />
              From Local Chefs
            </motion.h1>
            <p className="py-6 text-xl">
              Discover authentic, healthy, and affordable home-cooked food
              delivered straight to your door.
            </p>
            <Link to="/meals" className="btn btn-primary btn-lg">
              Explore Meals
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 -z-10">
          <img
            src="https://i.ibb.co.com/hero-food-bg.jpg"
            alt="Food background"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
      </motion.section>

      {/* Daily Meals Section */}
      <section className="py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Today&apos;s Special Meals
        </h2>
        {isLoading ? (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {dailyMeals.map((meal) => (
              <MealCard key={meal._id} meal={meal} />
            ))}
          </div>
        )}
        <div className="text-center mt-10">
          <Link to="/meals" className="btn btn-outline btn-primary">
            View All Meals
          </Link>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-20 bg-base-200">
        <h2 className="text-4xl font-bold text-center mb-12">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="card bg-base-100 shadow-xl"
            >
              <div className="card-body items-center text-center">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-20 h-20 rounded-full mb-4"
                />
                <h3 className="font-bold">{review.name}</h3>
                <div className="rating rating-md">
                  {[...Array(5)].map((_, idx) => (
                    <input
                      key={idx}
                      type="radio"
                      className="mask mask-star-2 bg-orange-400"
                      disabled
                      checked={idx < Math.floor(review.rating)}
                    />
                  ))}
                </div>
                <p className="italic">&quot;{review.comment}&quot;</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Extra Section: Why Choose Us */}
      <section className="py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Why Choose LocalChefBazaar?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="text-center">
            <div className="text-6xl mb-4">🏠</div>
            <h3 className="text-2xl font-bold">Home-Cooked Quality</h3>
            <p>Authentic taste just like mom&apos;s cooking</p>
          </div>
          <div className="text-center">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold">Fast Delivery</h3>
            <p>Hot meals delivered within estimated time</p>
          </div>
          <div className="text-center">
            <div className="text-6xl mb-4">💰</div>
            <h3 className="text-2xl font-bold">Affordable Prices</h3>
            <p>Restaurant quality at home-cooked prices</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
