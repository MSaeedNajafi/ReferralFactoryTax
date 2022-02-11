import React, { useState, useEffect } from "react";
import axios from "axios";

import { Button, Divider, Grid } from "@mui/material";

function EmailSection(props) {
  const [usersEmailSend, setUsersEmailSend] = useState([]);
  const [mailContent, setMailContent] = useState(false);
  const [token, setToken] = useState(
    "aOIKFDPV2GVd7lvbQCz1t08sgvJto5N0dCWLaACKTxypWpsnGJjoDPtQ8SjXTtc7gCCc1xkkPYHLpQif"
  );

  useEffect(async () => {
    await showEmail();
  }, [props.id]);

  useEffect(() => {
    // console.log("Email: users->", usersEmailSend);
  }, [usersEmailSend]);

  const showEmail = async () => {
    await fetch(`https://referral-factory.com/api/v1/users/`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        // console.log(data.data);
        setUsersEmailSend(data.data.filter((u) => props.id == u.campaign_id));
      })
      .catch((error) => {
        console.log(error);
      });
    setMailContent(true);
  };

  const showEmailConent = () => {
    const list = [];
    let index = 0;

    for (let i = 0; i < usersEmailSend.length; i++) {
      for (let j = 0; j < usersEmailSend.length; j++) {
        if (
          usersEmailSend[i].id == usersEmailSend[j].referrer_id &&
          usersEmailSend[j].qualified
        ) {
          let obj = { id: "", name: "", q: 0 };
          obj.id = usersEmailSend[i].id;
          obj.name =
            usersEmailSend[i].first_name +
            " < " +
            usersEmailSend[i].email +
            " > ";
          obj.q = usersEmailSend.filter(
            (user) => user.referrer_id == usersEmailSend[i].id && user.qualified
          ).length;

          list[index] = obj;
          index++;
          break;
        }
      }
    }

    const sendEmaiLwithThisInfo = async (list) => {
      console.log(list);

      const response = await axios.post("http://localhost:8000/sendemail", {
        list,
      });

      console.log("response--> ", response.data);
    };

    return (
      <>
        {list.map((li, index) => (
          <>
            <Grid item xs={12} key={li.id} style={{}}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p>{li.name}</p>
                <p>{li.q}</p>
              </div>
            </Grid>
            <Divider style={{ width: "100%" }} />

            {/* 
            {index == list.length - 1 ? null : (
              <>
                <Divider style={{ width: "100%" }} />
              </>
            )} */}
          </>
        ))}

        {list.length > 0 ? (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p>Total Qualified</p>
              <p style={{ fontWeight: "bold" }}>
                {list.reduce(
                  (total, currentValue) => (total = total + currentValue.q),
                  0
                )}
              </p>
            </div>
          </>
        ) : (
          <>
            <p>There are no qualified users for this month.</p>
          </>
        )}

        <Button variant="contained" onClick={() => sendEmaiLwithThisInfo(list)}>
          Send Email
        </Button>
      </>
    );
  };

  return (
    <>
      <Grid item xs={12} style={{ padding: 20 }}>
        <Grid item xs={12} style={{ padding: 20, border: "1px solid grey" }}>
          <Button
            type="submit"
            variant="contained"
            onClick={() => {
              showEmail();
            }}
            // style={{ width: "100%" }}
          >
            Update Email Content
          </Button>
          {mailContent && <>{showEmailConent()}</>}
        </Grid>
      </Grid>
    </>
  );
}

export default EmailSection;
