import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();
  if (!user) return <p>ERROR! COULDN'T FIND USER</p>;
  return (
    <div
      className={`min-h-screen ${user && user.role == "restaurant" ? "bg-surface-2" : "text-surface"}`}
    >
      <div className="flex flex-col gap-4 text-text">
        <div>
          <h2>{user.role} Profile</h2>
        </div>
        <div>
          <span>Name: </span>{" "}
          <span>
            {user.firstName} {user.lastName}
          </span>
        </div>

        <div>
          <span>Email: </span> <span>{user.email}</span>
        </div>

        <div>
          <span>Mobile Number: </span> <span>{user.mobileNumber}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
