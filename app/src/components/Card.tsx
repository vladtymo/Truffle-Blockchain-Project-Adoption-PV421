import React from 'react'
import { Pet } from '../models/pets';
import { adopt } from '../blockchainUtils';

type Props = {
    item: Pet;
    adopted: boolean;
    afterAdopt: () => void;
}

export default function Card({ item, adopted, afterAdopt }: Props) {

    const adoptHandle = async () => {
        await adopt(item.id);
        afterAdopt();
    }

    return (
        <div className="col-sm-6 col-md-4 col-lg-3">
            <div className="panel panel-default panel-pet">
                <div className="panel-heading">
                    <h3 className="panel-title">{item.name}</h3>
                </div>
                <div className="panel-body">
                    <img alt="140x140" data-src="holder.js/140x140" className="img-rounded img-center" style={{ width: "100%" }} src={'./assets/' + item.picture} data-holder-rendered="true" />
                    <br /><br />
                    <strong>Breed</strong>: <span className="pet-breed">{item.breed}</span><br />
                    <strong>Age</strong>: <span className="pet-age">{item.age}</span><br />
                    <strong>Location</strong>: <span className="pet-location">{item.location}</span><br /><br />
                    <button onClick={adoptHandle}
                        className="btn btn-default btn-adopt"
                        type="button"
                        data-id="0"
                        disabled={adopted}>
                        {adopted ? "Success" : "Adopt"}
                    </button>
                </div>
            </div>
        </div>
    )
}
