import React, {useState} from 'react';
import {Header} from "./Header/Header";
import Main from "./Main/Main";

function App() {
    const [themeDark, setThemeDark] = useState(false);

    const getThemeState = () => {
        setThemeDark(!themeDark)
    }

    return (
        <section className={`theme theme-${themeDark ? 'dark' : 'white'}`}>
            <Header getThemeState={getThemeState}/>
            <Main/>
        </section>
    );
}

export default App;
