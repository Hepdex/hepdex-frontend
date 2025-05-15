import countryList from "react-select-country-list";
import Button from "../components/Button";
import ct from "countries-and-timezones";
import useMutate from "../hooks/useMutate";
import useQuery from "../hooks/useQuery";
import Spinner from "../components/Spinner";
import { getJob, updateJob } from "../lib/apiJobs";
import { useMemo, useState } from "react";
import { BsBriefcase, BsCoin, BsGeoAlt, BsInfoCircle } from "react-icons/bs";
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  Select,
  Textarea,
  Time,
} from "../components/Form";
import { currency_list } from "../data/currencies";
import { useNavigate, useParams } from "react-router-dom";
import { getTimezomes, notify } from "../utils/helpers";

export default function EditJob() {
  const { id } = useParams();
  // Fetch job
  const [job, loading] = useQuery(getJob, `?jobID=${id}`);
  return (
    <div className="form-box">
      <div className="form-box__content">
        <h3 className="heading-md">Edit job</h3>
        <p className="text-md">Update details about the job.</p>
      </div>
      {loading && <div>Loading...</div>}
      {job && <EditJobForm job={job.job} />}
    </div>
  );
}

// Edit job form
function EditJobForm({ job }) {
  // Navigate hook
  const navigate = useNavigate();
  // Country list
  const options = useMemo(() => countryList().getData(), []);
  // Initial country
  const initialCountry = options.find(
    (country) => country.label.toLowerCase() === job.country.toLowerCase()
  ).value;
  // Location state
  const [location, setLocation] = useState(initialCountry);
  // Use mutate
  const [editJob, loading] = useMutate(updateJob);
  // Checked state
  const [checked, setChecked] = useState(job.paymentInterval);
  // Timezones
  const timezones = getTimezomes(location);
  // Handle update job
  async function handleUpdateJob(e) {
    // Prevent default submit
    e.preventDefault();
    // Get form values
    const formData = new FormData(e.target);
    let data = Object.fromEntries(formData);
    data = {
      ...data,
      country: ct.getCountry(data.country).name,
      jobID: job._id,
    };
    if (!data.timeZone) data.timeZone = "";
    // Update job
    const response = await editJob(data);
    // Show message
    if (response === 200) {
      notify("Job updated successfully", "success");
      // Navigate to jobs page
      setTimeout(() => {
        navigate("/dashboard/jobs");
      }, 2000);
    } else {
      notify(response, "error");
    }
  }
  return (
    <Form $gap={32} onSubmit={handleUpdateJob}>
      <div className="dashboard-box">
        <h3 className="title icon-title">
          <span className="icon">
            <BsBriefcase size={18} />
          </span>
          Job details
        </h3>
        <div className="form-content">
          <FormGroup label="Job title">
            <Input
              placeholder="Job title"
              name="jobTitle"
              type="text"
              defaultValue={job.jobTitle}
              required
            />
          </FormGroup>
          <FormGroup label="Job type">
            <Select name="jobType" required defaultValue={job.jobType}>
              <option value="">Select job type</option>
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contractor">Contractor</option>
            </Select>
          </FormGroup>
          <FormGroup label="Department">
            <Input
              placeholder="Department"
              name="department"
              type="text"
              defaultValue={job.department}
              required
            />
          </FormGroup>
        </div>
      </div>
      <div className="dashboard-box">
        <h3 className="title icon-title">
          <span className="icon">
            <BsGeoAlt size={18} />
          </span>
          Location and working hours
        </h3>
        <div className="form-content">
          <FormGroup label="Location">
            <Select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required={true}
              name="country"
            >
              <option value="">Select location</option>
              {options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormGroup>
          {location && timezones.length > 0 && (
            <FormGroup label="Timezone">
              <Select name="timeZone" required defaultValue={job.timeZone}>
                <option value="">Select timezone</option>
                {timezones.map((tz, index) => (
                  <option value={tz.label} key={index}>
                    {tz.label}
                  </option>
                ))}
              </Select>
            </FormGroup>
          )}
          <InputGroup>
            <FormGroup label="Start time">
              <Time
                placeholder="Start time"
                name="startTime"
                required={true}
                defaultTime={job.startTime}
                defaultState={true}
              />
            </FormGroup>
            <FormGroup label="End time">
              <Time
                placeholder="End time"
                name="endTime"
                required={true}
                defaultState={true}
                defaultTime={job.endTime}
              />
            </FormGroup>
          </InputGroup>
        </div>
      </div>
      <div className="dashboard-box">
        <h3 className="title icon-title">
          <span className="icon">
            <BsInfoCircle size={18} />
          </span>
          About the role
        </h3>
        <div className="form-content">
          <p>
            Provide candidates with a clear understanding of the role, daily
            responsibilities and qualifications required.
          </p>
          <FormGroup>
            <Textarea
              rows={12}
              placeholder="Copy and paste the job description here."
              name="aboutRole"
              required
              defaultValue={job.aboutRole}
            />
          </FormGroup>
        </div>
      </div>
      <div className="dashboard-box">
        <h3 className="title icon-title">
          <span className="icon">
            <BsCoin size={18} />
          </span>
          Pay
        </h3>
        <div className="form-content">
          <div className="radio-group">
            <div className="radio-box">
              <label>
                <input
                  type="radio"
                  name="paymentInterval"
                  value="annually"
                  checked={checked === "annually"}
                  onChange={(e) => setChecked(e.target.value)}
                />
                <span>Annually</span>
              </label>
            </div>
            <div className="radio-box">
              <label>
                <input
                  type="radio"
                  name="paymentInterval"
                  value="monthly"
                  checked={checked === "monthly"}
                  onChange={(e) => setChecked(e.target.value)}
                />
                <span>Monthly</span>
              </label>
            </div>
            <div className="radio-box">
              <label>
                <input
                  type="radio"
                  name="paymentInterval"
                  value="hourly"
                  checked={checked === "hourly"}
                  onChange={(e) => setChecked(e.target.value)}
                />
                <span>Hourly</span>
              </label>
            </div>
          </div>
          <div className="pay-details">
            <FormGroup label="Minumum pay">
              <Input
                type="number"
                min={1}
                placeholder="Minimum pay"
                required
                defaultValue={job.minSalary}
                name="minSalary"
              />
            </FormGroup>
            <FormGroup label="Maximum pay">
              <Input
                type="number"
                min={1}
                placeholder="Maximum pay"
                required
                defaultValue={job.maxSalary}
                name="maxSalary"
              />
            </FormGroup>
            <FormGroup label="Currency">
              <Select name="currency" defaultValue={job.currency}>
                <option value="">Select currency</option>
                {currency_list.map((currency, index) => (
                  <option key={index} value={currency.code}>
                    {currency.code} ({currency.name})
                  </option>
                ))}
              </Select>
            </FormGroup>
          </div>
        </div>
      </div>
      <div>
        <Button type="submit" $loading={loading}>
          <span>Update Job</span>
          {loading && <Spinner />}
        </Button>
      </div>
    </Form>
  );
}
