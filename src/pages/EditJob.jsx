import Button from "../components/Button";
import ContentLoader from "../components/ContentLoader";
import useMutate from "../hooks/useMutate";
import useQuery from "../hooks/useQuery";
import Spinner from "../components/Spinner";
import FormBox from "../components/FormBox";
import DashboardBox from "../components/DashboardBox";
import IconTitle from "../components/IconTitle";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { countries } from "../data/countries";
import { getJob, updateJob } from "../services/apiJobs";
import { useState } from "react";
import { BsBriefcase, BsCoin, BsGeoAlt, BsInfoCircle } from "react-icons/bs";
import {
  Form,
  FormGroup,
  Input,
  InputGroup,
  SearchSelect,
  Select,
  Textarea,
  Time,
} from "../components/Form";
import { useNavigate, useParams } from "react-router-dom";
import { getTimezones, notify } from "../utils/helpers";
import { currencyFlagList } from "../data/currencies";
import { getDepartments } from "../services/apiDepartments";

export default function EditJob() {
  // Document title
  useDocumentTitle("Edit job");

  // Get job ID
  const { jobID } = useParams();

  // Fetch job
  const [job, loading] = useQuery(getJob, `?jobID=${jobID}`);

  // Fetch departments
  const [data, pending] = useQuery(getDepartments);

  return (
    <>
      {loading || pending ? (
        <FormBox>
          <ContentLoader />
        </FormBox>
      ) : (
        <FormBox title="Edit job" subtitle="Update details about job.">
          {job && data?.departments && (
            <EditJobForm job={job.job} departments={data.departments} />
          )}
        </FormBox>
      )}
    </>
  );
}

// Edit job form
function EditJobForm({ job, departments }) {
  // Navigate hook
  const navigate = useNavigate();

  // Initial country
  let initialCountry = countries.find(
    (country) => country.name.toLowerCase() === job.country.toLowerCase()
  );

  // Initial currency
  const initialCurrency = currencyFlagList.find(
    (curr) => curr.currency === job.currency
  );

  // Location state
  const [location, setLocation] = useState(initialCountry.code);

  // Edit job
  const [editJob, loading] = useMutate(updateJob);

  // Checked state
  const [checked, setChecked] = useState(job.paymentInterval);

  // Timezones
  const timezones = getTimezones(location);

  // Handle update job
  async function handleUpdateJob(e) {
    // Prevent default submit
    e.preventDefault();

    // Get form values
    let data = Object.fromEntries(new FormData(e.target));
    data = {
      ...data,
      // Get country
      country: countries.find((item) => item.code === location).name,

      // Remove emoji from currency
      currency: data.currency.split(" ")[1],

      // Add job ID
      jobID: job._id,
    };

    // Check if timeZone is empty
    if (!data.timeZone)
      data.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Send request
    const response = await editJob(data);

    // Check response
    if (response === 200) {
      // Success
      notify("Job updated successfully", "success");

      // Navigate to jobs page
      setTimeout(() => {
        navigate("/dashboard/jobs");
      }, 2000);
    } else {
      // Error
      notify(response, "error");
    }
  }

  return (
    <Form $gap={32} onSubmit={handleUpdateJob}>
      <DashboardBox
        title={
          <IconTitle
            title="Job details"
            icon={<BsBriefcase size={18} />}
            className="title"
          />
        }
      >
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
            <Select name="department" defaultValue={job.department} required>
              <option value="">Select department</option>
              {departments.map((option, index) => (
                <option value={option.name} key={index}>
                  {option.name}
                </option>
              ))}
            </Select>
          </FormGroup>
        </div>
      </DashboardBox>
      <DashboardBox
        title={
          <IconTitle
            title="Location and working hours"
            icon={<BsGeoAlt size={18} />}
            className="title"
          />
        }
      >
        <div className="form-content">
          <FormGroup label="Location">
            <SearchSelect
              placeholder="Select location"
              searchPlaceholder="Search location..."
              name="country"
              defaultItem={initialCountry}
              items={countries}
              onSelect={(item) => setLocation(item.code)}
            />
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
                name="startTime"
                required={true}
                defaultTime={job.startTime}
              />
            </FormGroup>
            <FormGroup label="End time">
              <Time name="endTime" required={true} defaultTime={job.endTime} />
            </FormGroup>
          </InputGroup>
        </div>
      </DashboardBox>
      <DashboardBox
        title={
          <IconTitle
            title="About the role"
            icon={<BsInfoCircle size={18} />}
            className="title"
          />
        }
      >
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
      </DashboardBox>
      <DashboardBox
        title={
          <IconTitle
            className="title"
            title="Pay"
            icon={<BsCoin size={18} />}
          />
        }
      >
        <div className="form-content">
          <div className="radio-group">
            <div className="radio-group--box">
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
            <div className="radio-group--box">
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
            <div className="radio-group--box">
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
          <div className="form-content--row__box">
            <FormGroup label="Currency">
              <SearchSelect
                placeholder="Select currency"
                searchPlaceholder="Search currency..."
                name="currency"
                defaultItem={initialCurrency}
                valueField="currency"
                items={currencyFlagList}
              />
            </FormGroup>
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
          </div>
        </div>
      </DashboardBox>
      <div>
        <Button type="submit" $loading={loading} disabled={loading}>
          <span>Update Job</span>
          {loading && <Spinner />}
        </Button>
      </div>
    </Form>
  );
}
