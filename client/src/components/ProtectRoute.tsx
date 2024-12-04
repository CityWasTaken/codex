import { useStore } from "../store";
import { useLocation, Navigate } from "react-router-dom";

function ProtectRoute(props: any) {
  const { state } = useStore()!;
  const location = useLocation();

  // If a user is logged in keep the auth form page hidden
  if (!state.loading && state.user && location.pathname.match(/(register|login)/gi)) {

    return <Navigate to="/profile" />
  }

  // If a user is not logged in take them to the login page
  if (!state.loading && !state.user && location.pathname.match(/(post|profile)/gi)) {

    return <Navigate to="/login" />
  }

  return props.children;
}

export default ProtectRoute;