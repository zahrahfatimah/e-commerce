import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ServerProtected = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const cookiesStore = cookies();

  const token = cookiesStore.get("token");

  if (!token || token.value.length <= 0) {
    redirect("/login");
  }

  return <>{children}</>;
};

export default ServerProtected;
