import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const EditForm = () => {
    const [formData, setFormData] = useState(null);
    const params = useParams();
    const history = useHistory();

    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const editFilm = e => {
        e.preventDefault();
        const editedFilm = {
            ...formData,
            stars: formData.stars.split(","),
            metascore: parseInt(formData.metascore)
        };
        axios
            .put(`http://localhost:5000/api/movies/${params.id}`, editedFilm)
            .then(res => {
                setFormData(null);
                history.push(`/`);
            })
            .catch(err => {
                console.log(err);
            });
    }
    
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${params.id}`)
            .then(res => {
                console.log(res);
                setFormData({
                    ...res.data,
                    stars: res.data.stars.join(",")
                })
            })
            .catch(err => {
                console.log(err.response);
            })
    }, [])

    return (
        <div className='form-container'>
            {formData && <form onSubmit={editFilm}>
                <h1>Edit Film</h1>
                <label htmlFor='title'>Title:&nbsp;</label>
                <input 
                    type='text'
                    id='title'
                    name='title'
                    value={formData.title}
                    onChange={handleInputChange}
                /><br/><br/>
                <label htmlFor='director'>Director:&nbsp;</label>
                <input 
                    type='text'
                    id='director'
                    name='director'
                    value={formData.director}
                    onChange={handleInputChange}
                /><br/><br/>
                <label htmlFor='metascore'>Metascore:&nbsp;</label>
                <input 
                    type='number'
                    id='metascore'
                    name='metascore'
                    value={formData.metascore}
                    onChange={handleInputChange}
                /><br/><br/>
                <label htmlFor='stars'>Stars:&nbsp;</label>
                <input 
                    type='text'
                    id='stars'
                    name='stars'
                    value={formData.stars}
                    onChange={handleInputChange}
                /><br/><br/>
                <button>Submit changes</button>
            </form>}
        </div>
    )
};

export default EditForm;