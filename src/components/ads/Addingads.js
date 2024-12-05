import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { create } from "../../datasource/api-ads";
import AdsModel from "../../datasource/adsModel";

const AddAds = () => {
    let navigate = useNavigate();
    let [ad, setAd] = useState(new AdsModel());

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAd((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let newAd = {
            title: ad.title,
            description: ad.description,
            price: ad.price,
            createdAt: new Date(),
            expiresAt: ad.expiresAt,
            isActive: true,
            owner: ad.owner
        };

        create(newAd).then(response => {
            if (response && response.id) {
                alert("Ad added with the id " + response.id);
                navigate("/ads/list");
            } else {
                alert(response.message);
            }
        }).catch(err => {
            alert(err.message);
            console.log(err);
        });
    };

    return (
        <div className="container" style={{ paddingTop: 80 }}>
            <div className="row">
                <div className="offset-md-3 col-md-6">
                    <h1>Add a new ad</h1>
                    <form onSubmit={handleSubmit} className="form">
                        <div className="form-group">
                            <label htmlFor="titleTextField">Title</label>
                            <input type="text" className="form-control"
                                id="titleTextField"
                                placeholder="Enter the title"
                                name="title"
                                value={ad.title || ''}
                                onChange={handleChange}
                                required>
                            </input>
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="descriptionTextField">Description</label>
                            <textarea className="form-control"
                                id="descriptionTextField"
                                placeholder="Enter the description"
                                name="description"
                                value={ad.description || ''}
                                onChange={handleChange}
                                required>
                            </textarea>
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="priceTextField">Price</label>
                            <input type="text" className="form-control"
                                id="priceTextField"
                                placeholder="Enter the price"
                                name="price"
                                value={ad.price || ''}
                                onChange={handleChange}
                                required>
                            </input>
                        </div>
                        <br />
                        <div className="form-group">
                            <label htmlFor="expiresAtTextField">Expires At</label>
                            <input type="date" className="form-control"
                                id="expiresAtTextField"
                                name="expiresAt"
                                value={ad.expiresAt || ''}
                                onChange={handleChange}
                                required>
                            </input>
                        </div>
                        <br />
                        <button className="btn btn-primary" type="submit">
                            <i className="fas fa-edit"></i>
                            Submit
                        </button>
                        <Link href="#" to="/ads/list" className="btn btn-warning">
                            <i className="fas fa-undo"></i>
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddAds;
