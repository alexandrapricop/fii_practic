import React, { Component } from 'react';

const Context = React.createContext('light');

class ContextProvider extends Component {
    // Context state
    state = {
        user: {
            name: 'John Smith',
            imageUrl:
                'https://i.pinimg.com/originals/a6/f3/c5/a6f3c55ace829310723adcb7a468869b.png'
        },
        theme: 'light'
    };

    // Methods to update state
    setUser = user => {
        this.setState(() => {
            return { user };
        });
    };

    setTheme = theme => {
        this.setState(() => {
            return { theme };
        });
    };

    render() {
        const { children } = this.props;
        const { user, theme } = this.state;
        const { setUser, setTheme } = this;

        return (
            <Context.Provider value={{ user, setUser, theme, setTheme }}>
                {children}
            </Context.Provider>
        );
    }
}

export { ContextProvider };

export default Context;
