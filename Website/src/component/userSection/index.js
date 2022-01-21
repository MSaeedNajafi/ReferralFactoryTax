import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

function UserSection(props) {
  const [userId, setUserId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openModalQualified, setOpenModalQualified] = useState(false);
  const [referi, setReferi] = useState([]);
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

  useEffect(() => {
    console.log("users->", props.users);
  }, [props.users]);

  useEffect(() => {
    console.log("referi->", referi);
  }, [referi]);

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleClickOpenModalQualified = () => {
    setOpenModalQualified(true);
  };

  const handleCloseModalQualified = () => {
    setOpenModalQualified(false);
  };

  //fetch a user
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
    props.setOpen(true);
  };

  const showName = (id) => {
    const theUser = props.users.filter((u) => id == u.id);

    if (theUser.length > 0) {
      return theUser[0].first_name;
    }
    return "-";
  };

  const showReachedUsers = (id) => {
    // console.log(id, "->");
    return (
      <>
        {props.users.map((u) =>
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
                open={props.open}
                onClose={props.handleClose}
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
                  <Button onClick={props.handleClose} autoFocus>
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

  const showUsersWithConversion = (id) => {
    return (
      <>
        {props.users.map((u) =>
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
                open={props.open}
                onClose={props.handleClose}
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
                  <Button onClick={props.handleClose} autoFocus>
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
          // alert(data.message);
          await console.log("========");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    props.handleUsers(id);
  };

  const changeDate = (date) => {
    // console.log(date);
    var d = new Date(date);
    // console.log(d);
    // console.log(month[d.getMonth()]);
    // console.log("=========");
    return months[d.getMonth()];
  };

  return (
    <>
      <Grid
        item
        xs={12}
        style={{ border: "1px solid grey", padding: props.code ? 20 : 0 }}
      >
        {props.code && (
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
              {props.users.map((user, index) =>
                user.campaign_id == props.id ? (
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
                      <TableCell align="left">{user.email}</TableCell>
                      <TableCell align="left">{user.source}</TableCell>
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
                        {props.users.filter((u) => u.referrer_id == user.id)
                          .length > 0 ? (
                          <>
                            <Button
                              onClick={() => {
                                setUserId(user.id);
                                handleClickOpenModal();
                              }}
                              variant="outlined"
                            >
                              {
                                props.users.filter(
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
                                props.users.filter(
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
                        {props.users.filter(
                          (u) => u.referrer_id == user.id && u.qualified
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
                                props.users.filter(
                                  (u) => u.referrer_id == user.id && u.qualified
                                ).length
                              }
                            </Button>
                            {showQualifiedUsersInModal(userId)}
                          </>
                        ) : (
                          <>
                            <Button disabled variant="outlined">
                              {
                                props.users.filter(
                                  (u) => u.referrer_id == user.id && u.qualified
                                ).length
                              }
                            </Button>
                          </>
                        )}
                      </TableCell>

                      <TableCell align="left">
                        {changeDate(user.date)}
                      </TableCell>

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
        )}
      </Grid>
    </>
  );
}

export default UserSection;

{
  /* {usersEmailSend.map(
            (u) =>
              usersEmailSend.filter(
                (user) => user.referrer_id == u.id && user.qualified
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
                        {u.id} - {u.first_name} - {u.email}
                      </p>
                      <p>
                        {
                          usersEmailSend.filter(
                            (user) => user.referrer_id == u.id && user.qualified
                          ).length
                        }
                      </p>
                    </div>
                  </Grid>
                </>
              ) : null
            // ) : null
          )} */
}
