import React, { useState } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import "./App.css";
import EmailSection from "./component/sendEmail";
import UserSection from "./component/userSection";

function App() {
  const [id, setID] = useState("");
  const [code, setCode] = useState("");
  const [token, setToken] = useState(
    "aOIKFDPV2GVd7lvbQCz1t08sgvJto5N0dCWLaACKTxypWpsnGJjoDPtQ8SjXTtc7gCCc1xkkPYHLpQif"
  );
  const [loading, setLoading] = useState(false);
  const [end, setEnd] = useState(false);
  const [live, setLive] = useState(false);
  const [name, setName] = useState(false);
  const [reach, setReach] = useState(false);
  const [start, setStart] = useState(false);
  const [status, setStatus] = useState(false);
  const [url, setURL] = useState("");
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [openListAdd, setOpenListAdd] = useState(false);
  const [showEmailSection, setSHowEmailSection] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenListAdd = () => {
    setOpenListAdd(!openListAdd);
  };

  const handleSubmit = async () => {
    setLoading(true);
    await fetch(`https://referral-factory.com/api/v1/campaigns/${id}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setCode(data.data.code);
        setEnd(data.data.end);
        setLive(data.data.live);
        setName(data.data.name);
        setReach(data.data.reach);
        setStart(data.data.start_at);
        setStatus(data.data.status);
        setURL(data.data.url);

        //===new===
        setSHowEmailSection(true);
      })
      .catch((error) => {
        setLoading(false);
      });
    setLoading(false);

    // window.location.reload();
  };

  const handleUsers = async (str) => {
    await fetch("https://referral-factory.com/api/v1/users", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        with: "campaign",
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        setUsers(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ padding: 20, backgroundColor: "#33335b" }}
    >
      <Container
        style={{ padding: 20, backgroundColor: "#5485fb", maxWidth: "90%" }}
        // maxWidth="lg"
      >
        <div className="App">
          <ListItemButton onClick={handleOpenListAdd}>
            <ListItemText primary="Search For a Campaign" />
            {openListAdd ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openListAdd} timeout="auto" unmountOnExit>
            <Box sx={{ bgcolor: "#cfe8fc" }}>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                {/* search for a Campaign section */}
                <Grid item xs={12} style={{ padding: 20 }}>
                  <div
                    style={{
                      display: "flex",
                      border: "1px solid grey",
                      padding: 20,
                      justifyContent: "space-between",
                    }}
                  >
                    <TextField
                      id="Id"
                      placeholder="Campaign ID"
                      value={id}
                      label="Campaign ID"
                      variant="outlined"
                      onChange={(e) => {
                        setID(e.target.value);
                      }}
                      style={{ width: "100%" }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={handleSubmit}
                      style={{ width: "100%" }}
                    >
                      Search for a Campaign
                    </Button>
                  </div>
                </Grid>

                <Divider style={{ width: "100%" }} />

                {/* Campaign information and user section  */}
                <Grid item xs={12} style={{ padding: code ? 20 : 0 }}>
                  {code && (
                    <div style={{ border: "1px solid grey", padding: 20 }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        Campaign Name:
                        <span style={{}}> {name}</span>
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
                        <span style={{}}>{code}</span>
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
                        <span
                          style={
                            {
                              // fontWeight: "bold",
                              // border: "1px solid grey",
                              // padding: 5,
                            }
                          }
                        >
                          {reach}
                        </span>
                      </div>
                      <br />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        Link for the referal Factory:{" "}
                        <Link href={url}>{url}</Link>
                      </div>
                      <br />
                      <div>
                        <Button
                          variant="contained"
                          onClick={() => handleUsers("all")}
                        >
                          get users
                        </Button>
                      </div>
                      <br />

                      {/* User Detailsgi Section */}
                      <UserSection
                        id={id}
                        code={code}
                        // toke={token}
                        open={open}
                        users={users}
                        setOpen={setOpen}
                        handleClose={handleClose}
                        handleUsers={handleUsers}
                      />
                    </div>
                  )}
                </Grid>

                <Divider style={{ width: "100%" }} />

                {/* Seding Email Section */}
                <>{showEmailSection && <EmailSection id={id} />}</>
              </Grid>
            </Box>
          </Collapse>
        </div>
      </Container>
    </Grid>
  );
}

export default App;
