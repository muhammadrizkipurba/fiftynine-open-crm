import { RootState } from './redux/store';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

const AuthRoute = ({ children }: any) => {
	const { isAuthenticated } = useSelector((state: RootState) => state.auth);

	if (isAuthenticated)
		return (
			<Navigate
				to='/dashboard'
				replace
			/>
		);

	return children;
};

export default AuthRoute;
