import ct from "countries-and-timezones";
import Button from "../components/Button";
import countryList from "react-select-country-list";
import useMutate from "../hooks/useMutate";
import Spinner from "../components/Spinner";
import { useMemo, useState } from "react";
import { BsBriefcase, BsCoin, BsGeoAlt, BsInfoCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
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
import { addJob } from "../lib/apiJobs";
import { getTimezomes, notify } from "../utils/helpers";

export default function AddJob() {
  return (
    <div className="form-box">
      <div className="form-box__content">
        <h3 className="heading-md">Add job</h3>
        <p className="text-md">
          To get started, add a few details about the job.
        </p>
      </div>
      <AddJobForm />
    </div>
  );
}

// Add job form
function AddJobForm() {
  // Navigate hook
  const navigate = useNavigate();
  // Use mutate hook
  const [postJob, loading] = useMutate(addJob);
  // Checked state
  const [checked, setChecked] = useState("annually");
  // Location state
  const [location, setLocation] = useState("");
  // Country options
  const options = useMemo(() => countryList().getData(), []);
  // Timezones
  const timezones = getTimezomes(location);
  // Handle add job
  async function handleAddJob(e) {
    // Prevent default submit
    e.preventDefault();
    // Get form values
    const formData = new FormData(e.target);
    let data = Object.fromEntries(formData);
    data = {
      ...data,
      country: ct.getCountry(data.country).name,
    };
    if (!data.timeZone) data.timeZone = "";
    // Add job
    const response = await postJob(data);
    // Show message
    if (response === 200) {
      notify("Job added successfully", "success");
      // Navigate to jobs page
      setTimeout(() => {
        navigate("/dashboard/jobs");
      }, 2000);
    } else {
      notify(response, "error");
    }
  }
  return (
    <Form $gap={32} onSubmit={handleAddJob}>
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
              required
            />
          </FormGroup>
          <FormGroup label="Job type">
            <Select name="jobType" required>
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
              <Select name="timeZone" required>
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
                defaultTime="08:00"
              />
            </FormGroup>
            <FormGroup label="End time">
              <Time
                placeholder="End time"
                name="endTime"
                required={true}
                defaultTime="17:00"
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
            <FormGroup label="Minimum pay">
              <Input
                type="number"
                min={1}
                placeholder="Minimum pay"
                required
                name="minSalary"
              />
            </FormGroup>
            <FormGroup label="Maximum pay">
              <Input
                type="number"
                min={1}
                placeholder="Maximum pay"
                required
                name="maxSalary"
              />
            </FormGroup>
            <FormGroup label="Currency">
              <Select name="currency">
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
          <span>Add Job</span>
          {loading && <Spinner />}
        </Button>
      </div>
    </Form>
  );
}
