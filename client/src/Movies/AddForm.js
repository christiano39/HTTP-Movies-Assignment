import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const initialFormValues = {
    title: '',
    director: '',
    metascore: '',
    stars: ''
}

const AddForm = () => {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [error, setError] = useState('');
    const history = useHistory();

    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const addFilm = e => {
        e.preventDefault();
        const movie = {
            ...formValues,
            metascore: parseInt(formValues.metascore),
            stars: formValues.stars.split(',')
        }
        console.log(movie);
        axios
            .post('http://localhost:5000/api/movies/', movie)
            .then(res => {
                setFormValues(initialFormValues);
                history.push('/');
            })
            .catch(err => {
                console.log(err);
                setError(err);
            })
    }

    const cancelAdd = () => {
        setFormValues(initialFormValues);
        history.push('/');
    }
    
    return (
        <div className='form-container'>
            <form onSubmit={addFilm}>
                <h1>Add Film</h1>
                <label htmlFor='title'>Title:&nbsp;</label>
                <input 
                    type='text'
                    id='title'
                    name='title'
                    value={formValues.title}
                    onChange={handleInputChange}
                /><br/><br/>
                <label htmlFor='director'>Director:&nbsp;</label>
                <input 
                    type='text'
                    id='director'
                    name='director'
                    value={formValues.director}
                    onChange={handleInputChange}
                /><br/><br/>
                <label htmlFor='metascore'>Metascore:&nbsp;</label>
                <input 
                    type='number'
                    id='metascore'
                    name='metascore'
                    value={formValues.metascore}
                    onChange={handleInputChange}
                /><br/><br/>
                <label htmlFor='stars'>Stars:&nbsp;</label>
                <input 
                    type='text'
                    id='stars'
                    name='stars'
                    value={formValues.stars}
                    onChange={handleInputChange}
                /><br/><br/>
                <button>Submit changes</button>&nbsp;
                <button onClick={cancelAdd}>Cancel</button>
            </form>
            {error && <p className='error'>{error}</p>}
        </div>
    )
}

export default AddForm;