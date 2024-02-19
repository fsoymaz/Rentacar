import { useSelector } from "react-redux"; import { Navigate } from "react-router-dom"; 
function UserRoute({ children} : any) 
{
	const authState = useSelector((store: any) => store.auth);
	const handleCarId = useSelector((state: any) => state.rental.carId);
	 if (!authState.role || authState.id === 0 || handleCarId === 0) { return <Navigate to={"/"} />; }
	  return children;
} export default UserRoute;