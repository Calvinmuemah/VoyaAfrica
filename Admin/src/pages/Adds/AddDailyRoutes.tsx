import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const AddRoute = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    routeNumber: '',
    origin: '',
    destination: '',
    description: '',
    imageUrl: '',
    distance: '',
    duration: '',
    price: '',
  });

  const [uploading, setUploading] = useState(false);

  const BACKEND_BASE_URL = 'http://localhost:4000/api/createDailyRoutes'; // Update if needed

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const res = await fetch(`${BACKEND_BASE_URL}/${id}`);
          const data = await res.json();
          setForm(data);
        } catch (err) {
          console.error('Failed to load route', err);
        }
      })();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch('http://localhost:4000/api/uploads/image', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setForm((prev) => ({ ...prev, imageUrl: data.imageUrl }));
    } catch (error) {
      alert('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${BACKEND_BASE_URL}/${id}` : BACKEND_BASE_URL;

    try {
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      navigate('/dailyRoutes');
    } catch (err) {
      console.error('Failed to save route', err);
    }
  };

  return (
    <div>
      <h3>{id ? 'Edit' : 'Add'} Route</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="routeNumber"
          value={form.routeNumber}
          onChange={handleChange}
          placeholder="Route Number"
          className="form-control mb-2"
          required
        />
        <input
          name="origin"
          value={form.origin}
          onChange={handleChange}
          placeholder="From (Origin)"
          className="form-control mb-2"
          required
        />
        <input
          name="destination"
          value={form.destination}
          onChange={handleChange}
          placeholder="To (Destination)"
          className="form-control mb-2"
          required
        />
        <input
          name="distance"
          value={form.distance}
          onChange={handleChange}
          placeholder="Distance (e.g., 120km)"
          className="form-control mb-2"
          required
        />
        <input
          name="duration"
          value={form.duration}
          onChange={handleChange}
          placeholder="Duration (e.g., 2hrs 15min)"
          className="form-control mb-2"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Route Details"
          className="form-control mb-2"
          rows={3}
        />
          <div className="mb-2">
          <label>Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={form.price}
            onChange={handleChange}
            placeholder="Price (e.g., 1500)"
            min={0}
            step="0.01"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="image">Route Image</label>
          <input type="file" id="image" onChange={handleImageChange} className="form-control" />
          {uploading && <small>Uploading...</small>}
          {form.imageUrl && (
            <img
              src={form.imageUrl}
              alt="Route"
              style={{ width: '150px', marginTop: '10px', borderRadius: '5px' }}
            />
          )}
        </div>
        <button type="submit" className="btn btn-success">
          {id ? 'Update' : 'Add'} Route
        </button>
        <Link to="/AddDailyRoute/new" className="btn btn-secondary ms-2">
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default AddRoute;
