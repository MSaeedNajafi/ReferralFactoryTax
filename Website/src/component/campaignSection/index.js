import React from "react";

import Button from "@mui/material/Button";
import { Link } from "@mui/material";

function CampaignSection(props) {
  return (
    <>
      <div style={{ border: "1px solid grey", padding: 20 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          Campaign Name:
          <span style={{}}> {props.name}</span>
        </div>
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          Campaign Code:
          <span style={{}}>{props.code}</span>
        </div>
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          How many people it has reached in total:
          <span style={{}}>{props.reach}</span>
        </div>
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          Link for the referal Factory:
          <Link href={props.url}>{props.url}</Link>
        </div>
        <br />
        <div>
          <Button variant="contained" onClick={() => props.handleUsers("all")}>
            get users
          </Button>
        </div>
      </div>
    </>
  );
}

export default CampaignSection;
