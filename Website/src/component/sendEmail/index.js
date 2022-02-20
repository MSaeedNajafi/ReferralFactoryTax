import React, { useState, useEffect } from "react";
import axios from "axios";

import { Button, Divider, Grid } from "@mui/material";

function EmailSection(props) {
  const [usersEmailSend, setUsersEmailSend] = useState([]);
  const [mailContent, setMailContent] = useState(false);
  const [token, setToken] = useState(
    "aOIKFDPV2GVd7lvbQCz1t08sgvJto5N0dCWLaACKTxypWpsnGJjoDPtQ8SjXTtc7gCCc1xkkPYHLpQif"
  );
  const months = [
    "January",
    "February ",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  // useEffect(async () => {
  //   await showEmail();
  // }, [props.id]);

  useEffect(() => {
    // console.log("Email: users->", usersEmailSend);
  }, [usersEmailSend]);

  const showEmail = async () => {
    // await fetch(`https://referral-factory.com/api/v1/users/`, {
    //   method: "GET",
    //   headers: new Headers({
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then(async (data) => {
    //     // console.log(data.data);
    //     setUsersEmailSend(data.data.filter((u) => props.id == u.campaign_id));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // setMailContent(true);
  };

  const changeDate = (date) => {
    // console.log(date);
    var d = new Date(date);
    // console.log(d);
    // console.log(month[d.getMonth()]);
    // console.log("=========");
    return months[d.getMonth()];
  };

  const showEmailConent = () => {
    // const list = props.savedUsers.filter((u) => props.id == u.campaign_id);
    const list = [];
    let index = 0;

    for (let i = 0; i < props.savedUsers.length; i++) {
      for (let j = 0; j < props.savedUsers.length; j++) {
        if (
          props.savedUsers[i].id == props.savedUsers[j].referrer_id &&
          props.savedUsers[j].qualified &&
          changeDate(props.savedUsers[j].qualified_at) ==
            months[new Date().getMonth()]
        ) {
          let obj = { id: "", name: "", q: 0 };
          obj.id = props.savedUsers[i].id;
          obj.name =
            props.savedUsers[i].first_name +
            " < " +
            props.savedUsers[i].email +
            " > ";
          obj.q = props.savedUsers.filter(
            (user) =>
              user.referrer_id == props.savedUsers[i].id &&
              user.qualified &&
              changeDate(props.savedUsers[j].qualified_at) ==
                months[new Date().getMonth()]
          ).length;

          console.log(" ->  " + props.savedUsers[i]);

          list[index] = obj;
          index++;
          break;
        }
      }
    }

    const sendEmaiLwithThisInfo = async (list) => {
      console.log(list);

      // const response = await axios.post("http://localhost:8000/sendemail", {
      //   list,
      // });

      // console.log("response--> ", response.data);
    };

    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            textAlign: "center",
          }}
        >
          <p>User Id</p>
          <p>First Fame</p>

          <p>Qualified</p>

          {/* <p>qualified</p>
          <p>reach</p>
          <p>referrer_id</p>
          <p>qualified_at</p> */}
        </div>
        {list.map((li, index) => (
          <>
            <Grid item xs={12} key={li.id} style={{}}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  textAlign: "center",
                }}
              >
                <p>{li.id}</p>
                <p>{li.name}</p>

                <p>{li.q}</p>

                {/* <p>{li.qualified + ""}</p>
                <p>{li.reach}</p>
                <p>{li.referrer_id}</p>
                <p>{changeDate(li.qualified_at)}</p> */}
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
          {/* <Button
            type="submit"
            variant="contained"
            onClick={() => {
              showEmail();
            }}
            // style={{ width: "100%" }}
          >
            Update Email Content
          </Button> */}
          <>{showEmailConent()}</>
        </Grid>
      </Grid>
    </>
  );
}

export default EmailSection;
