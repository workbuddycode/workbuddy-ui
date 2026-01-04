export const redirectAfterLogin = (
  user: any,
  navigate: (path: string) => void
) => {
  if (!user || !user.role) {
    navigate("/login");
    return;
  }

  switch (user.role) {
    case "ADMIN":
    case "MANAGER":
      navigate("/dashboard");
      break;

    default:
      navigate("/profile");
      break;
  }
};
