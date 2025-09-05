import './App.css'
import LoginForm from "./components/LoginForm";
import {useContext, useEffect, useState} from "react";
import {IUser} from "./models/response/IUser";
import UserService from "./services/UserService";
import {Context} from "./context";
import {observer} from "mobx-react-lite";

function App() {
    const {store} = useContext(Context);
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        if(localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    async function getUsers() {
        try {
            const response = await UserService.fetchUsers();
            setUsers(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    if (store.isLoading) {
        return <div>Загрузка...</div>
    }

    if(!store.isAuth) {
        return (
            <div>
            <LoginForm />
            <button onClick={getUsers}>Отримати список користувачів</button>
        </div>
        )
    }

  return (
    <>
        <h1>{store.isAuth ? `Користувач авторизований ${store.user.email}` : 'АВТОРИЗУЙТЕСЬ!'}</h1>
        <h1>{store.user.isActivated ? 'Аккаунт піддтвердженний по пошті' : 'Зробіть підтвердження аккаунта!!'}</h1>
        <button onClick={() => store.logout()}>Вийти</button>
        <div>
            <button onClick={getUsers}>Отримати список користувачів</button>
        </div>
        {users.map(user =>
            <div key={user.email}>{user.email}</div>
        )}
    </>
  )
}

export default observer(App);
