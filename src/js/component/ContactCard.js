import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import WomenPhoto from "../../img/women.jpg";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";

export const ContactCard = props => {
	const { store } = useContext(Context);

	const contactCardReturned = store.myContactList.map((contact, index) => {
		return (
			<li className="list-group-item" key={index} id={contact.id}>
				<div className="row w-100">
					<div className="col-12 col-sm-6 col-md-3 px-0">
						<img src={WomenPhoto} alt="Women mural" className="rounded-circle mx-auto d-block img-fluid" />
					</div>
					<div className="col-12 col-sm-6 col-md-9 text-center text-sm-left">
						<div className=" float-right">
							<Link to="/edit">
								<button
									className="btn"
									onClick={() => {
										store.idToEdit = contact.id;
										store.indexToEdit = index;
									}}>
									<i className="fas fa-pencil-alt mr-3" />
								</button>
							</Link>
							<button
								className="btn"
								onClick={() => {
									props.onDelete();
									store.idToDelete = contact.id;
								}}>
								<i className="fas fa-trash-alt" />
							</button>
						</div>
						<label className="name lead">{contact.full_name}</label>
						<br />
						<i className="fas fa-map-marker-alt text-muted mr-3" />
						<span className="text-muted">{contact.address}</span>
						<br />
						<span
							className="fa fa-phone fa-fw text-muted mr-3"
							data-toggle="tooltip"
							title=""
							data-original-title="(870) 288-4149"
						/>
						<span className="text-muted small">{contact.phone}</span>
						<br />
						<span
							className="fa fa-envelope fa-fw text-muted mr-3"
							data-toggle="tooltip"
							data-original-title=""
							title=""
						/>
						<span className="text-muted small text-truncate">{contact.email}</span>
					</div>
				</div>
			</li>
		);
	});

	return contactCardReturned;
};

/**
 * Define the data-types for
 * your component's properties
 **/
ContactCard.propTypes = {
	history: PropTypes.object,
	onDelete: PropTypes.func
};

/**
 * Define the default values for
 * your component's properties
 **/
ContactCard.defaultProps = {
	onDelete: null
};
