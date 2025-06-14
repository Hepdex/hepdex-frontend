import Button from "../components/Button";
import useMutate from "../hooks/useMutate";
import Spinner from "../components/Spinner";
import useQuery from "../hooks/useQuery";
import FormBox from "../components/FormBox";
import DashboardBox from "../components/DashboardBox";
import IconTitle from "../components/IconTitle";
import useDocumentTitle from "../hooks/useDocumentTitle";
import { useState } from "react";
import {
  BsBriefcase,
  BsCoin,
  BsGeoAlt,
  BsGlobe,
  BsInfoCircle,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
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
import { addJob } from "../services/apiJobs";
import { getTimezones, notify } from "../utils/helpers";
import { countries } from "../data/countries";
import { currencyFlagList } from "../data/currencies";
import { getDepartments } from "../services/apiDepartments";

export default function AddJob() {
  // Document title
  useDocumentTitle("Add job");

  return (
    <FormBox
      title="Add job"
      subtitle="To get started, add a few details about the job."
    >
      <AddJobForm />
    </FormBox>
  );
}

function AddJobForm() {
  // Fetch departments
  const [data] = useQuery(getDepartments);

  // Navigate hook
  const navigate = useNavigate();

  // Add job
  const [postJob, loading] = useMutate(addJob);

  // Checked state
  const [checked, setChecked] = useState("annually");

  // Location state
  const [location, setLocation] = useState("");

  // Timezones
  const timezones = getTimezones(location);

  // Handle add job
  async function handleAddJob(e) {
    // Prevent default submit
    e.preventDefault();

    // Get form values
    let data = Object.fromEntries(new FormData(e.target));

    // Check if timeZone is empty
    if (!data.timeZone)
      data.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    data = {
      ...data,
      country:
        // Get country
        countries.find((item) => item.code === location).name,

      // Remove emoji from currency
      currency: data.currency.split(" ")[1],
    };

    // Send request
    const response = await postJob(data);

    // Check response
    if (response === 200) {
      // Success
      notify("Job added successfully", "success");

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
    <Form $gap={32} onSubmit={handleAddJob}>
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
            <Select name="department" required>
              <option value="">Select department</option>
              {data?.departments.map((option, index) => (
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
              defaultItem={{}}
              items={countries}
              onSelect={(item) => setLocation(item.code)}
            />
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
              <Time name="startTime" required={true} defaultTime="08:00" />
            </FormGroup>
            <FormGroup label="End time">
              <Time name="endTime" required={true} defaultTime="17:00" />
            </FormGroup>
          </InputGroup>
        </div>
      </DashboardBox>
      <DashboardBox
        title={
          <IconTitle
            title="About the role"
            className="title"
            icon={<BsInfoCircle size={18} />}
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
            />
          </FormGroup>
        </div>
      </DashboardBox>
      <DashboardBox
        title={
          <IconTitle
            className="title"
            icon={<BsCoin size={18} />}
            title="Pay"
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
                name="currency"
                placeholder="Select currency"
                searchPlaceholder="Search currency..."
                defaultItem={{}}
                valueField="currency"
                items={currencyFlagList}
              />
            </FormGroup>
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
          </div>
        </div>
      </DashboardBox>
      <div>
        <Button type="submit" $loading={loading} disabled={loading}>
          <span>Add Job</span>
          {loading && <Spinner />}
        </Button>
      </div>
    </Form>
  );
}
