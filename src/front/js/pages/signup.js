import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";

export const Signup = () => {
	const { store, actions } = useContext(Context);

	const [names, setNames] = useState([]);
	const [emails, setEmails] = useState([]);
	const [passwords, setPasswords] = useState([]);

	async function newName(event) {
		setNames(event.target.value);
	}

	async function newEmail(event) {
		setEmails(event.target.value);
	}
	async function newPass(event) {
		setPasswords(event.target.value);
	}

	const signup = async (email, password, name) => {
		const resp = await fetch("https://3001-amethyst-beaver-dk04lqtb.ws-eu16.gitpod.io/api/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ names: name, emails: email, passwords: password })
		});
		{
			useEffect(() => {
				getName();
				getEmail();
				getPassword();
			}, []);
		}

		if (!resp.ok) throw Error("There was a problem in the login request");

		if (resp.status === 401) {
			throw "Invalid credentials";
		} else if (resp.status === 400) {
			throw "Invalid email or password format";
		}

		const responseJson = await response.json();
		setNames(responseJson.name);
		console.log(responseJson.name + "123");
		setEmails(responseJson.email);
		setPasswords(responseJson.password);

		// save your token in the localStorage
		//also you should set your user into the store using the setStore function
		localStorage.setItem("jwt-token", responseJson.token);

		return responseJson;
	};
	return (
		<form>
			<div className="form-group">
				<label htmlFor="exampleInputEmail1">Email address</label>
				<input
					type="email"
					className="form-control"
					id="exampleInputEmail1"
					aria-describedby="emailHelp"
					placeholder="Enter email"
					onChange={newEmail}
				/>
				<small id="emailHelp" className="form-text text-muted">
					We will never share your email with anyone else.
				</small>
			</div>
			<div className="form-group">
				<label htmlFor="exampleInputName1">Name</label>
				<input
					type="text"
					className="form-control"
					id="exampleInputName1"
					aria-describedby="nameHelp"
					placeholder="Enter name"
					onChange={newName}
				/>
			</div>
			<div className="form-group">
				<label htmlFor="exampleInputPassword1">Password</label>
				<input
					type="password"
					className="form-control"
					id="exampleInputPassword1"
					placeholder="Password"
					onChange={newPass}
				/>
			</div>
			<div className="form-check">
				<input type="checkbox" className="form-check-input" id="exampleCheck1" />
				<label className="form-check-label" htmlFor="exampleCheck1">
					Check me out
				</label>
			</div>
			<button
				type="submit"
				className="btn btn-primary"
				onClick={() => {
					signup(names, emails, passwords);
				}}>
				Submit
			</button>
		</form>
	);
};
