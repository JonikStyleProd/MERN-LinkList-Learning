import React from "react";
import {Link} from "react-router-dom";

export const LinksList = ({ links }) => {
    if(!links.length) {
        return (
            <div>
            <p className="center flow-text">You dont have Links</p>
                <div className="right">
                    <Link className="btn-floating btn-large #00897b teal darken-1 pulse"><i className="material-icons ">create</i></Link>
                </div>
            </div>
        )

    }
    return (
        <div>
        <div>
            <table className="highlight flow-text">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Original</th>
                    <th>Shortest</th>
                    <th>Open</th>
                </tr>
                </thead>

                <tbody>
                { links.map((link, index) => {
                    return (
                        <tr key={link._id}>
                            <td>{index +1}</td>
                            <td>{link.from}</td>
                            <td>{link.to}</td>
                            <td>
                                <Link to={`/detail/${link._id}`} className="btn-floating #00897b teal darken-1"><i className="material-icons ">send</i></Link>
                            </td>
                        </tr>
                    )
                })}


                </tbody>
            </table>
        </div>
            <div className="right">
                <Link className="btn-floating btn-large #00897b teal darken-1 pulse"><i className="material-icons ">create</i></Link>
            </div>
        </div>
    )
}