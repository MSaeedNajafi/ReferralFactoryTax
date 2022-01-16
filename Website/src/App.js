import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Modal from "@mui/material/Modal";

import "./App.css";
import { LocalLaundryService } from "@mui/icons-material";

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
  const [referi, setReferi] = useState([]);
  const [open, setOpen] = useState(false);
  const [openListAdd, setOpenListAdd] = useState(false);
  const [userId, setUserId] = useState("");
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
  const [usersEmailSend, setUsersEmailSend] = useState([]);

  useEffect(() => {
    console.log(users);
  }, [users]);

  useEffect(() => {
    console.log("referi->", referi);
  }, [referi]);

  useEffect(() => {
    console.log("Email: users->", usersEmailSend);
  }, [usersEmailSend]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenListAdd = () => {
    setOpenListAdd(!openListAdd);
  };

  //============
  const [openModal, setOpenModal] = useState(false);

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [showEmailSection, setSHowEmailSection] = useState(false);
  const [mailContent, setMailContent] = useState(false);

  const [openModalQualified, setOpenModalQualified] = useState(false);

  const handleClickOpenModalQualified = () => {
    setOpenModalQualified(true);
  };

  const handleCloseModalQualified = () => {
    setOpenModalQualified(false);
  };
  //============
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
        with: "all",
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

  const updateUser = async (id, str) => {
    console.log("user id: ", id);

    if (str) {
      console.log("User is qualified ");
      await fetch(`https://referral-factory.com/api/v1/users/${id}`, {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        }),
        body: `qualified=0&select=id`,
      })
        .then((res) => res.json())
        .then(async (data) => {
          await console.log("========");
          await console.log(data);
          // alert(data.message);

          await console.log("========");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("User is not qualified ");
      await fetch(`https://referral-factory.com/api/v1/users/${id}`, {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        }),
        body: `qualified=1&select=id`,
      })
        .then((res) => res.json())
        .then(async (data) => {
          await console.log("========");
          await console.log(data);

          await console.log("========");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    handleUsers(id);
  };

  const handleClickOpen = async (id) => {
    // console.log(id);
    await fetch(`https://referral-factory.com/api/v1/users/${id}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        setReferi(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setOpen(true);
  };

  const changeDate = (date) => {
    // console.log(date);
    var d = new Date(date);
    // console.log(d);
    // console.log(month[d.getMonth()]);

    // console.log("=========");
    return months[d.getMonth()];
  };

  const showUsersWithConversion = (id) => {
    return (
      <>
        {users.map((u) =>
          u.referrer_id == id && u.qualified ? (
            // <div key={Math.floor(Math.random() * 100)}>
            <>
              <Button
                variant="text"
                onClick={() => handleClickOpen(u.id)}
                key={Math.floor(Math.random() * 100)}
              >
                {u.first_name}
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"User Information"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText
                    id="alert-dialog-description"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      // alignContent: "center",
                    }}
                  >
                    <>
                      <Typography variant="button" display="block" gutterBottom>
                        id
                      </Typography>
                      <Typography
                        variant="button"
                        display="block"
                        style={{
                          fontWeight: "bold",
                        }}
                        gutterBottom
                      >
                        {referi.id}
                      </Typography>
                    </>

                    <>
                      <Typography variant="button" display="block" gutterBottom>
                        name
                      </Typography>
                      <Typography
                        variant="button"
                        display="block"
                        style={{
                          fontWeight: "bold",
                        }}
                        gutterBottom
                      >
                        {referi.first_name}
                      </Typography>
                    </>

                    <>
                      <Typography
                        variant="button"
                        display="block"
                        style={{
                          fontWeight: "bold",
                        }}
                        gutterBottom
                      >
                        {referi.email}
                      </Typography>
                    </>

                    <>
                      <Link href={referi.url}>Click Here</Link>
                    </>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} autoFocus>
                    Ok
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          ) : // </div>
          null
        )}
      </>
    );
  };

  const showReachedUsers = (id) => {
    // console.log(id, "->");
    return (
      <>
        {users.map((u) =>
          u.referrer_id == id ? (
            // <div key={Math.floor(Math.random() * 100)}>
            <>
              <Button
                variant="text"
                onClick={() => handleClickOpen(u.id)}
                key={Math.floor(Math.random() * 100)}
              >
                {u.first_name}
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"User Information"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText
                    id="alert-dialog-description"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      // alignContent: "center",
                    }}
                  >
                    <>
                      <Typography variant="button" display="block" gutterBottom>
                        id
                      </Typography>
                      <Typography
                        variant="button"
                        display="block"
                        style={{
                          fontWeight: "bold",
                        }}
                        gutterBottom
                      >
                        {referi.id}
                      </Typography>
                    </>

                    <>
                      <Typography variant="button" display="block" gutterBottom>
                        name
                      </Typography>
                      <Typography
                        variant="button"
                        display="block"
                        style={{
                          fontWeight: "bold",
                        }}
                        gutterBottom
                      >
                        {referi.first_name}
                      </Typography>
                    </>
                    <>
                      <Typography variant="button" display="block" gutterBottom>
                        qualified
                      </Typography>
                      <Typography
                        variant="button"
                        display="block"
                        style={{
                          fontWeight: "bold",
                        }}
                        gutterBottom
                      >
                        {referi.qualified + " "}
                      </Typography>
                    </>

                    <>
                      <Typography
                        variant="button"
                        display="block"
                        style={{
                          fontWeight: "bold",
                        }}
                        gutterBottom
                      >
                        {referi.email}
                      </Typography>
                    </>

                    <>
                      <Link href={referi.url}>Click Here</Link>
                    </>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} autoFocus>
                    Ok
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          ) : // </div>
          null
        )}
      </>
    );
  };

  const showName = (id) => {
    const theUser = users.filter((u) => id == u.id);

    if (theUser.length > 0) {
      return theUser[0].first_name;
    }
    return "-";
  };

  const showReachedUsersInModal = (id) => {
    return (
      <>
        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Users Reached"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {showReachedUsers(id)}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };

  const showQualifiedUsersInModal = (id) => {
    return (
      <>
        <Dialog
          open={openModalQualified}
          onClose={handleCloseModalQualified}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Users Qualified"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {showUsersWithConversion(id)}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModalQualified} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };

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
        console.log(data.data);
        setUsersEmailSend(data.data.filter((u) => id == u.campaign_id));
      })
      .catch((error) => {
        console.log(error);
      });
    setMailContent(true);
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

                {/* Campaign information section  */}
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
                        <span
                          style={
                            {
                              // backgroundColor: "#e84a4a",
                              // padding: 5,
                              // borderRadius: 25,
                              // fontSize: 12,
                            }
                          }
                        >
                          {code}
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
                        {/* <Button variant="outlined" onClick={() => handleUsers("campaign")}>
                      Submit with Campaign
                    </Button>
                    <Button variant="outlined" onClick={() => handleUsers("referrer")}>
                      Submit with Referred
                    </Button> */}
                      </div>
                      <br />
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>#</TableCell>
                              <TableCell>Id</TableCell>
                              {/* <TableCell>Campaign ID</TableCell> */}
                              <TableCell>Name</TableCell>
                              <TableCell align="left">Qualified</TableCell>
                              <TableCell align="left">Email</TableCell>
                              <TableCell align="left">Source</TableCell>
                              <TableCell align="left">Referrer Id</TableCell>
                              <TableCell align="left">Referrer Name</TableCell>
                              <TableCell align="left">Url</TableCell>
                              <TableCell align="left">Reached</TableCell>
                              {/* <TableCell align="left">Reached To</TableCell> */}
                              <TableCell align="left">Qualified</TableCell>
                              {/* <TableCell align="left">Qualified</TableCell> */}
                              <TableCell align="left">Date Created</TableCell>
                              <TableCell align="left">Action</TableCell>
                            </TableRow>
                          </TableHead>
                          {users.map((user, index) =>
                            user.campaign_id == id ? (
                              <TableBody key={user.id}>
                                <TableRow
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                  style={{
                                    backgroundColor: !user.referrer_id
                                      ? "white"
                                      : "#a9c1f9",
                                  }}
                                >
                                  <TableCell component="th" scope="row">
                                    {index + 1}
                                  </TableCell>
                                  <TableCell component="th" scope="row">
                                    {user.id}
                                  </TableCell>
                                  {/* <TableCell component="th" scope="row">
                                  {user.campaign_id}
                                </TableCell> */}
                                  <TableCell component="th" scope="row">
                                    {user.first_name}
                                  </TableCell>
                                  <TableCell component="th" scope="row">
                                    {user.qualified + ""}
                                  </TableCell>
                                  <TableCell align="left">
                                    {user.email}
                                  </TableCell>
                                  <TableCell align="left">
                                    {user.source}
                                  </TableCell>
                                  <TableCell align="left">
                                    {!user.referrer_id ? "-" : user.referrer_id}
                                  </TableCell>
                                  <TableCell align="left">
                                    {showName(user.referrer_id)}
                                  </TableCell>
                                  <TableCell align="left">
                                    <Link href={user.url}>{user.url}</Link>
                                  </TableCell>
                                  <TableCell align="left">
                                    {users.filter(
                                      (u) => u.referrer_id == user.id
                                    ).length > 0 ? (
                                      <>
                                        <Button
                                          onClick={() => {
                                            setUserId(user.id);
                                            handleClickOpenModal();
                                          }}
                                          variant="outlined"
                                        >
                                          {
                                            users.filter(
                                              (u) => u.referrer_id == user.id
                                            ).length
                                          }
                                        </Button>
                                        {showReachedUsersInModal(userId)}
                                      </>
                                    ) : (
                                      <>
                                        <Button disabled variant="outlined">
                                          {
                                            users.filter(
                                              (u) => u.referrer_id == user.id
                                            ).length
                                          }
                                        </Button>
                                      </>
                                    )}
                                  </TableCell>
                                  {/* <TableCell
                                    align="left"
                                    style={{ display: "flex" }}
                                    id="referes"
                                  >
                                    {showReachedUsers(user.id)}
                                  </TableCell> */}

                                  <TableCell align="left">
                                    {/* {
                                      users.filter(
                                        (u) =>
                                          u.referrer_id == user.id &&
                                          u.qualified
                                      ).length
                                    } */}
                                    {users.filter(
                                      (u) =>
                                        u.referrer_id == user.id && u.qualified
                                    ).length > 0 ? (
                                      <>
                                        <Button
                                          onClick={() => {
                                            setUserId(user.id);
                                            handleClickOpenModalQualified();
                                          }}
                                          variant="outlined"
                                        >
                                          {
                                            users.filter(
                                              (u) =>
                                                u.referrer_id == user.id &&
                                                u.qualified
                                            ).length
                                          }
                                        </Button>
                                        {showQualifiedUsersInModal(userId)}
                                      </>
                                    ) : (
                                      <>
                                        <Button disabled variant="outlined">
                                          {
                                            users.filter(
                                              (u) =>
                                                u.referrer_id == user.id &&
                                                u.qualified
                                            ).length
                                          }
                                        </Button>
                                      </>
                                    )}
                                  </TableCell>
                                  {/* <TableCell
                                    align="left"
                                    style={{
                                      display: "flex",
                                    }}
                                  >
                                    {showUsersWithConversion(user.id)}
                                  </TableCell> */}
                                  <TableCell align="left">
                                    {changeDate(user.date)}
                                  </TableCell>
                                  {/* <TableCell>
                                    {users.filter(
                                      (u) => u.referrer_id == user.id
                                    ).length > 0 ? (
                                      <>
                                        <Button
                                          onClick={() => {
                                            setUserId(user.id);
                                            handleClickOpenModal();
                                          }}
                                          variant="outlined"
                                        >
                                          Reached
                                        </Button>
                                        {showReachedUsersInModal(userId)}
                                      </>
                                    ) : (
                                      "-"
                                    )}
                                  </TableCell> */}
                                  <TableCell align="left" key={user.id}>
                                    <Button
                                      variant="contained"
                                      onClick={() => {
                                        setUserId(user.id);
                                        updateUser(user.id, user.qualified);
                                      }}
                                    >
                                      update
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            ) : null
                          )}
                        </Table>
                      </TableContainer>
                    </div>
                  )}
                </Grid>

                <Divider style={{ width: "100%" }} />

                {/* Campaign users section */}
                <Grid item xs={12} style={{ padding: 20 }}>
                  {!showEmailSection && (
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={() => {
                        setSHowEmailSection(true);
                      }}
                      style={{ width: "100%" }}
                      disabled={code.length == 0 ? true : false}
                    >
                      Show
                    </Button>
                  )}
                  {showEmailSection && (
                    <>
                      <Grid item xs={12} style={{ padding: 20 }}>
                        <Button
                          type="submit"
                          variant="contained"
                          onClick={() => {
                            showEmail();
                          }}
                          // style={{ width: "100%" }}
                        >
                          Show Email
                        </Button>
                        {mailContent && (
                          <>
                            {usersEmailSend.map(
                              (u) =>
                                // u.qualified ? (
                                usersEmailSend.filter(
                                  (user) =>
                                    user.referrer_id == u.id && user.qualified
                                ).length > 0 ? (
                                  <>
                                    <Grid item xs={12} key={u.id}>
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "space-between",
                                        }}
                                      >
                                        <p>
                                          {u.id} - {u.first_name} -{u.email}
                                        </p>
                                        <p>
                                          {
                                            usersEmailSend.filter(
                                              (user) =>
                                                user.referrer_id == u.id &&
                                                user.qualified
                                            ).length
                                          }
                                        </p>
                                      </div>
                                    </Grid>
                                  </>
                                ) : null
                              // ) : null
                            )}
                          </>
                        )}
                      </Grid>
                      <Button
                        type="submit"
                        variant="contained"
                        onClick={() => {
                          setSHowEmailSection(false);
                          setMailContent(false);
                        }}
                        style={{ width: "100%" }}
                      >
                        Hide
                      </Button>
                    </>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </div>
      </Container>
    </Grid>
  );
}

export default App;

// console.log(
//   "->",
//   users.filter(
//     (u) => user.referrer_id == u.id
//   )git
// )
