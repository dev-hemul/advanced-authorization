import React, {FC, useContext, useState} from 'react';
import {Context} from "../context";
import {observer} from "mobx-react-lite";

const LoginForm: FC = observer( () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const {store} = useContext(Context);

    return (
        <div>
            <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="text"
                placeholder={'Email'}/>
            <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="text"
                placeholder={'Password'}/>
            <button onClick={() => store.login(email, password)}>Логін</button>
            <button onClick={() => store.registration(email, password)}>Реєстрація</button>
        </div>
    );
});

export default LoginForm;