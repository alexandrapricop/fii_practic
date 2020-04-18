import React from 'react';
import firebaseProvider from '../../config/Firebase';

// available info for every child component
export const AuthContext = React.createContext(null);

class AuthProvider extends React.Component {
	state = {
		currentUser: undefined
	};

	componentDidMount() {
		firebaseProvider.auth().onAuthStateChanged(currentUser => {
			this.setState({
				currentUser
			});
		});
	}

	render() {
		const {currentUser} = this.state;
		const {children} = this.props;
		return (
			<AuthContext.Provider value={{currentUser}}>
				{children}
			</AuthContext.Provider>
		);
	}
}

export default AuthProvider;
