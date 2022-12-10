import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Block, usersAll } from "../../features/auth/authApi";
import { PaginatedItems } from "../Pagination";
import DashStyle from "./DashBigDiv.module.css"
import TableDiv from "./TableDiv.module.css"


export const Dashboard = () => {
    const { users } = useSelector((state) => state.auth);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(usersAll())
    }, [])

    const blockUser = (id) => {
        dispatch(Block(id))
        console.log(id);

    }

    return (
        <div className={DashStyle.dS}>
            <div className={TableDiv.tDiv}><br />
                <h1>Users</h1><br />
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Email</th>
                            <th>User Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.surname}</td>
                                        <td>{user.email}</td>
                                        <td>{user.userType}</td>
                                        <td><button onClick={blockUser.bind(null, user.id)}>Block</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <PaginatedItems/>
        </div>

    )
}