
import { RootState } from './redux/store';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

const ProtectedRoute = ({ children }: any) => {
	const { isAuthenticated } = useSelector((state: RootState) => state.auth);

	if (!isAuthenticated)
		return (
			<Navigate
				to='/login'
				replace
			/>
		);

	return children;
};

export default ProtectedRoute;
