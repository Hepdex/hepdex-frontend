import styled from "styled-components";
import Button from "../components/Button";
import Spinner from "../components/Spinner";
import useMutate from "../hooks/useMutate";
import FormBox from "../components/FormBox";
import DashboardBox from "../components/DashboardBox";
import IconTitle from "../components/IconTitle";
import { Form } from "../components/Form";
import { uploadResume } from "../services/apiResume";
import { BsFileEarmarkText, BsPaperclip, BsXLg } from "react-icons/bs";
import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { flex } from "../GlobalStyles";
import { notify } from "../utils/helpers";

// Upload resume container
const StyledUploadResume = styled.div`
  .upload-box {
    border: 1px dashed var(--color-grey-3);
    text-align: center;
    border-radius: 4px;
    padding: 48px 24px;
    cursor: pointer;
    background-color: var(--color-grey-1);

    p {
      color: var(--color-black-1);
    }

    &--types {
      display: block;
      color: var(--color-grey-2);
      font-size: 15px;
      line-height: 20px;
      margin-top: 4px;
    }
  }

  .file-box {
    ${flex("space-between", "center")}
    margin-top: 16px;
    margin-bottom: 32px;
    gap: 32px;

    &--name {
      ${flex(undefined, "center")}
      gap: 4px;
    }

    &--reset {
      background-color: transparent;
    }
  }
`;

export default function UploadResume() {
  // Upload resume
  const [upload, loading] = useMutate(uploadResume);

  // File state
  const [file, setFile] = useState(undefined);

  // Navigate hook
  const navigate = useNavigate();

  // Dropzone hook
  const { getInputProps, getRootProps } = useDropzone({
    onDrop: (files) => {
      setFile(files[0]);
    },
    maxFiles: 1,
    maxSize: 2010000,
    accept: {
      "application/pdf": [".pdf"],
    },
  });

  // Handle upload resume
  const handleUploadResume = async (e) => {
    // Prevent default submit
    e.preventDefault();

    // Check for file
    if (!file) return;

    // Get file
    const data = new FormData();
    data.append("resume", file);

    // Send request
    const response = await upload(data);

    // Check response
    if (response === 200) {
      // Success
      notify("Resume uploaded successfully", "success");

      // Navigate to profile page
      setTimeout(() => {
        navigate("/dashboard/candidate-profile");
      }, 2000);
    } else {
      // Error
      notify(response, "error");
    }
  };

  return (
    <StyledUploadResume>
      <FormBox
        title="Upload resume"
        subtitle="Let us know what you're great at."
      >
        <Form onSubmit={handleUploadResume}>
          <DashboardBox
            title={
              <IconTitle
                title="Upload resume"
                icon={<BsFileEarmarkText size={18} />}
                className="title"
              />
            }
          >
            <div className="form-content">
              <div className="upload-box" {...getRootProps()}>
                <input {...getInputProps()} name="resume" />
                <p className="text-md">
                  Drag your resume here or click to upload
                </p>
                <span className="upload-box--types">
                  Maximum file size of 2 MB. Supports only .pdf
                </span>
              </div>
            </div>
          </DashboardBox>
          <div className="file-box">
            <p className="file-box--name">
              <BsPaperclip size={20} fill="#757575" />
              <span>
                {file ? (
                  <>{`${file.name} - ${file.size} bytes`}</>
                ) : (
                  "No file added"
                )}
              </span>
            </p>
            {file && (
              <button
                className="file-box--reset"
                type="button"
                onClick={() => setFile(undefined)}
              >
                <BsXLg fill="#757575" />
              </button>
            )}
          </div>
          <div>
            <Button type="submit" disabled={loading} $loading={loading}>
              <span>Upload resume</span>
              {loading && <Spinner />}
            </Button>
          </div>
        </Form>
      </FormBox>
    </StyledUploadResume>
  );
}
