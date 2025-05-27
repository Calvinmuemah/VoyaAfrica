import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  location: string;
}

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  phone_number: Yup.string()
    .matches(/^\+?[0-9]\d{1,14}$/, 'Please enter a valid phone number')
    .required('Phone number is required'),
  location: Yup.string().required('Location is required'),
});

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const initialValues: RegisterFormValues = {
    name: '',
    email: '',
    password: '',
    phone_number: '',
    location: '',
  };

  const handleSubmit = async (values: RegisterFormValues) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('http://localhost:4000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || 'Registration successful!');
        setTimeout(() => {
          navigate('/'); // Redirect to login after short delay
        }, 1500);
      } else {
        setError(data.message || 'Something went wrong.');
      }
    } catch (err: any) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h5 className="mb-4 text-center">Register</h5>

      {error && (
        <div className="alert alert-danger d-flex align-items-center" role="alert">
          <AlertCircle size={18} className="me-2" />
          <div>{error}</div>
        </div>
      )}

      {success && (
        <div className="alert alert-success d-flex align-items-center" role="alert">
          <CheckCircle size={18} className="me-2" />
          <div>{success}</div>
        </div>
      )}

      <Formik initialValues={initialValues} validationSchema={RegisterSchema} onSubmit={handleSubmit}>
        {({ errors, touched }) => (
          <Form>
            {/* Name */}
            <div className="mb-3">
              <label className="form-label">Name</label>
              <Field
                name="name"
                className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`}
                placeholder="Enter your name"
              />
              <ErrorMessage name="name" component="div" className="invalid-feedback" />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <Field
                name="email"
                type="email"
                className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" className="invalid-feedback" />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <div className="input-group">
                <Field
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              <ErrorMessage name="password" component="div" className="invalid-feedback" />
            </div>

            {/* Phone Number */}
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <Field
                name="phone_number"
                className={`form-control ${errors.phone_number && touched.phone_number ? 'is-invalid' : ''}`}
                placeholder="+1234567890"
              />
              <ErrorMessage name="phone_number" component="div" className="invalid-feedback" />
            </div>

            {/* Location */}
            <div className="mb-3">
              <label className="form-label">Location</label>
              <Field
                name="location"
                className={`form-control ${errors.location && touched.location ? 'is-invalid' : ''}`}
                placeholder="Enter your location"
              />
              <ErrorMessage name="location" component="div" className="invalid-feedback" />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Registering...
                </>
              ) : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
