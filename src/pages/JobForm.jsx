import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useApps } from '../context/ApplicationContext';

const schema = yup.object({
  company: yup.string().required("Company name is required"),
  role: yup.string().required("Role is required"),
  appliedDate: yup.string().required("Applied date is required"),
  location: yup.string().required("Location is required"),
  platform: yup.string().required("Platform is required"),
  salary: yup.number().typeError("Must be a number").required("Salary is required"),
  status: yup.string().required(),
  interviewDate: yup.string().nullable(),
  notes: yup.string()
}).required();

const JobForm = () => {
  const { addApp, updateApp, applications } = useApps();
  const { id } = useParams();
  const navigate = useNavigate();
  const existing = applications?.find(a => a.id === id);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: existing || { status: 'Applied' }
  });

  const onSubmit = (data) => {
    id ? updateApp(id, data) : addApp(data);
    navigate('/applications');
  };

  return (
    <div className="page-wrapper">
      <div className="form-card">
        <h2>{id ? "Edit Application" : "New Application"}</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="form-grid">
          <div className="input-group">
            <input {...register("company")} placeholder="Company Name" />
            {errors.company && <span className="error">{errors.company.message}</span>}
          </div>

          <div className="input-group">
            <input {...register("role")} placeholder="Job Role" />
            {errors.role && <span className="error">{errors.role.message}</span>}
          </div>

          <input {...register("location")} placeholder="Location (Remote/On-site)" />
          <input {...register("platform")} placeholder="Platform (LinkedIn/Referral)" />

          <div className="input-group">
            <input type="number" {...register("salary")} placeholder="Salary Range" />
            {errors.salary && <span className="error">{errors.salary.message}</span>}
          </div>

          <div className="input-group">
            <label style={{fontSize: '12px', color: '#64748b'}}>Applied Date</label>
            <input type="date" {...register("appliedDate")} />
          </div>

          <div className="input-group">
            <label style={{fontSize: '12px', color: '#64748b'}}>Interview Date (Optional)</label>
            <input type="date" {...register("interviewDate")} />
          </div>

          <select {...register("status")}>
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interview Scheduled</option>
            <option value="Offer">Offer Received</option>
            <option value="Rejected">Rejected</option>
          </select>

          <div className="full-width">
            <textarea {...register("notes")} placeholder="Notes..." rows="4" />
          </div>

          <div className="full-width">
            <button type="submit" className="save-btn">
              {id ? "Update Application" : "Save Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;