import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  if (!user) return <p>ERROR! COULDN'T FIND USER</p>;
  const isRestaurant = user.role == "restaurant";

  return (
    <div
      className={`min-h-screen px-6 py-8 ${user && user.role == "restaurant" ? "bg-surface-2" : "bg-surface"}`}
    >
      <div className="max-w-md mx-auto bg-surface border border-border rounded-lg p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-surface-2 flex items-center justify-center text-2xl font-bold text-text">
            {user.firstName?.[0]?.toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold text-text">
              {user.firstName} {user.lastName}
            </h2>
            <span
              className={`text-xs font-semibold uppercase px-2 py-0.5 rounded-full text-text-on-primary ${isRestaurant ? "bg-secondary " : "bg-primary"}`}
            >
              {user.role}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          <div className="flex justify-between border-b border-border pb-2">
            <span className="text-text-muted">Email</span>
            <span className="text-text font-medium">{user.email}</span>
          </div>
          <div className="flex justify-between border-b border-border pb-2">
            <span className="text-text-muted">Mobile Number</span>
            <span className="text-text font-medium">{user.mobileNumber}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
