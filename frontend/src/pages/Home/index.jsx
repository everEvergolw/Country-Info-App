import { React, useState } from "react";
import { message, Input, Button, Spin } from "antd";
import ajax from "@/services";
import "./index.scss";

const Home = (props) => {
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // State to manage input errors



  const validateInput = () => {
    if (!info.trim()) {
      setError('Country name cannot be empty');
      return false;
    }
    if (!/^[a-zA-Z\s]+$/.test(info)) {
      setError('Country name can only contain English letters and spaces');
      return false;
    }
    // Reset error if all checks pass
    setError('');
    return true;
};




const onSend = () => {
  if (!validateInput()) return;

  setLoading(true);
  ajax.getCountryInfo(info)
    .then((res) => {
      setLoading(false); 

      switch(res.data.status) {
        case 20000:
          window.sessionStorage.setItem("info", JSON.stringify(res.data.data));
          window.location.href = `/CountryInfo`;
          break;
        case 40000:
          message.error(res.data.message); // "Country name is required"
          break;
        case 50000:
          message.error(res.data.message); // "Error fetching country data from API"
          break;
        case 40400:
          message.error(res.data.message); // "No information available for the given country name."
          break;
        default:
          message.error("An unknown error occurred!");
          break;
      }
    })
    .catch((err) => {
        setLoading(false);
        message.error("Network error or unexpected issue occurred!");
    });
};





  
  return (
    <>
      <div className="home">
        <div className="box">
          <div className="header">Country Explorer</div>
          <div className="body">
            <div className="text">Enter Country Name</div>
            <div className="info">
              <Input placeholder="Search by country name..." onChange={(e) => setInfo(e.target.value)} />
              {error && <div className="error">{error}</div>} {/* Display error to user */}
            </div>
            <div className="submit">
              <Button onClick={onSend}>Submit</Button>
            </div>
            <div className="loading">
              <Spin tip="Loading" size="small" spinning={loading}>
                <div className="content" />
              </Spin>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
