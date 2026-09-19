const RestaurantCard = ({ restaurant }) => {
  return (
    <div className="bg-surface flex flex-col gap-2 w-64 text-text">
      {restaurant.image ? (
        <img src={restaurant.image} alt={restaurant.name} />
      ) : (
        <div>No image</div>
      )}
      <h2>{restaurant.name}</h2>
      <p>{restaurant.address}</p>
      <p>{restaurant.description}</p>
    </div>
  );
};

export default RestaurantCard;
