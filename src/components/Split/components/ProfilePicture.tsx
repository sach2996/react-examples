interface IProfilePicture {
  firstName: string;
  lastName: string;
}
export default function ProfilePicture({
  firstName,
  lastName,
}: IProfilePicture) {
  const firstNameInitial = firstName[0].toUpperCase();
  let lastNameInitial = lastName[0].toUpperCase();
  if (lastName === "G") {
    const newInitial = firstName.split(" ")[1] || firstName.split("_")[1];
    lastNameInitial = newInitial[0].toUpperCase();
  }
  return (
    <div className="round-div user-profile">
      {firstNameInitial}
      {lastNameInitial}
    </div>
  );
}
