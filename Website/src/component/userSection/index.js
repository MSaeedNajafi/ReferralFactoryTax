import React, { useState, useEffect } from "react";
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

import { DataGrid, getGridStringOperators } from "@mui/x-data-grid";

import { usePagedData } from "./usePagedData";

function UserSection(props) {
  const [userId, setUserId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openModalQualified, setOpenModalQualified] = useState(false);
  const [referi, setReferi] = useState();
  const [page, setPage] = useState(props.currentPageNr);
  const [maxPage, setMaxPage] = useState(props.maxPageNr);
  const [users, setUsers] = useState(props.users);
  const [token, setToken] = useState(
    "aOIKFDPV2GVd7lvbQCz1t08sgvJto5N0dCWLaACKTxypWpsnGJjoDPtQ8SjXTtc7gCCc1xkkPYHLpQif"
  );
  const [rowsState, setRowsState] = React.useState({
    page: 1,
    pageSize: 25,
    rows: [],
    loading: false,
  });
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

  // useEffect(() => {
  //   console.log("< users--->", users);
  // }, [users]);

  const { rows, loading } = usePagedData(
    props.id,
    rowsState.page,
    rowsState.pageSize
  );

  useEffect(() => {
    let active = true;

    // console.log("here -->>>>>>", rows);

    (async () => {
      setRowsState((prev) => ({ ...prev, loading: true }));

      if (!active) {
        return;
      }
      setRowsState((prev) => ({ ...prev, loading: false, rows: rows }));
    })();

    return () => {
      active = false;
    };
  }, [rowsState.page, rowsState.pageSize, rows]);

  const fetchAllUsers = async (pageNumber) => {
    console.log("----------------------------------");
    console.log("page number: ", pageNumber);
    console.log("----------------------------------");
    await fetch(
      `https://referral-factory.com/api/v1/users?page=${pageNumber}`,
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          with: "all",
        }),
      }
    )
      .then((res) => res.json())
      .then(async (data) => {
        // console.log("=================rows=================");
        // console.log("---->", data);
        // console.log("---->", data.data);
        setUsers(data.data);
        return data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchUser = async (url) => {
    return fetch(url, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        with: "all",
      }),
    }).then((res) => res.json());
  };

  useEffect(async () => {
    console.log("+++++++++++++++++++");
    await fetchAllUsersLiam();
    console.log("+++++++++++++++++++");
  }, [props.maxPageNr]);

  const fetchAllUsersLiam = async () => {
    // let resp = await fetchUser(`https://referral-factory.com/api/v1/users?page=0}`)
    // get the page total out of the first respons
    let totalPages = props.maxPageNr + 1;
    console.log("totalPages ==> ", totalPages);

    // //still have to add the rate limiter
    const urls = Array.from(Array(totalPages).keys()).map(
      (pageNo) => `https://referral-factory.com/api/v1/users?page=${pageNo}`
    );

    console.log(urls);
    // Smart stuff to respect the page limit.
    let allUsers = [];
    // for (url in urls) {
    //   //rateLimiter.wait()
    //   let cutUsers = await fetchUser(url);
    //   //add all the users together
    //   allUsers += allUsers;
    // }

    return allUsers;
    // await fetch(
    //   `https://referral-factory.com/api/v1/users?page=${pageNumber}`,
    //   {
    //     method: "GET",
    //     headers: new Headers({
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //       with: "all",
    //     }),
    //   }
    // )
    //   .then((res) => res.json())
    //   .then(async (data) => {
    //     // console.log("=================rows=================");
    //     // console.log("---->", data);
    //     // console.log("---->", data.data);
    //     setUsers(data.data);
    //     return data.data;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

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
    const theUser = users.filter((u) => id == u.id);

    if (theUser.length > 0) {
      return theUser[0].first_name;
    }
    return "-";
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

  const showNumberOfReached = (uId) => {
    console.log("------>", uId);
    return (
      <>
        {users.filter((u) => u.referrer_id == uId).length > 0 ? (
          <>
            <Button
              onClick={() => {
                setUserId(uId);
                handleClickOpenModal();
              }}
              variant="outlined"
            >
              {users.filter((u) => u.referrer_id == uId).length}
            </Button>
            {showReachedUsersInModal(userId)}
          </>
        ) : (
          <>
            <Button disabled variant="outlined">
              {users.filter((u) => u.referrer_id == uId).length}
            </Button>
          </>
        )}
      </>
    );
  };

  const justSHowReached = (uId) => {
    return props.users.filter((u) => u.referrer_id == uId).length;
  };

  const columns = [
    { field: "col1", headerName: "#", width: 50 },
    { field: "col2", headerName: "Id", width: 100, sortable: false },
    { field: "col3", headerName: "Name", width: 100 },
    // { field: "col4", headerName: "Qualified", width: 100 },
    { field: "col5", headerName: "Email", width: 200 },
    { field: "col6", headerName: "converted_referrals_count", width: 200 },
    // { field: "col6", headerName: "Source", width: 75 },
    // { field: "col7", headerName: "Referrer Id", width: 125 },
    // { field: "col8", headerName: "Referrer Name", width: 125 },
    // { field: "col9", headerName: "Url", width: 300 },
    // {
    //   field: "col10",
    //   headerName: "Reached",
    //   width: 150,
    //   renderCell: (params) => {
    //     const size = 0;
    //     const onClick = (e) => {
    //       e.stopPropagation(); // don't select this row after clicking
    //       //   console.log("00000000000000000000");
    //       //   console.log(
    //       //     props.users.filter(
    //       //       (u) => u.referrer_id == thisRow.col2 && thisRow.col4
    //       //     ).length
    //       //   );
    //       //   console.log("00000000000000000000");
    //       console.log("======================");

    //       const api = params.api;
    //       const thisRow = {};

    //       api
    //         .getAllColumns()
    //         .filter((c) => c.field !== "__check__" && !!c)
    //         .forEach(
    //           (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
    //         );

    //       //   console.log("===> ", thisRow.col2, thisRow.col4);
    //       console.log(params);
    //       setUserId(thisRow.col2);
    //       handleClickOpenModal();
    //       //   return alert(JSON.stringify(thisRow, null, 4));
    //       //   size = props.users.filter(
    //       //     (u) => u.referrer_id == thisRow.col2 && thisRow.col4
    //       //   ).length;
    //       console.log(showReachedUsersInModal(userId));
    //       console.log("======================");
    //     };

    //     // props.users.filter(
    //     //     (u) => u.referrer_id == user.id
    //     //   ).length;

    //     return (
    //       <>
    //         <Button onClick={onClick} variant="outlined">
    //           {size}
    //         </Button>
    //         {showReachedUsersInModal(userId)}
    //       </>
    //     );
    //   },
    // },
    // { field: "col11", headerName: "Qualified", width: 150 },
    { field: "col12", headerName: "Date Converted", width: 150 },
    // {
    //   field: "col13",
    //   headerName: "Action",
    //   width: 150,
    //   sortable: false,
    //   filterable: false,
    //   hideable: false,

    //   renderCell: (params) => {
    //     const onClick = (e) => {
    //       e.stopPropagation(); // don't select this row after clicking

    //       const api = params.api;
    //       const thisRow = {};

    //       api
    //         .getAllColumns()
    //         .filter((c) => c.field !== "__check__" && !!c)
    //         .forEach(
    //           (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
    //         );

    //       console.log("---->", thisRow.col2, thisRow.col4);

    //       setUserId(thisRow.col2);
    //       updateUser(thisRow.col2, thisRow.col4);
    //       //   return alert(JSON.stringify(thisRow, null, 4));
    //     };

    //     return (
    //       <>
    //         <Button variant="contained" onClick={onClick}>
    //           update
    //         </Button>
    //       </>
    //     );
    //   },
    // },
  ];

  const Table1 = () => {
    return (
      <div
        style={{
          //   border: "1px solid grey",
          height: 500,
          width: "100%",
          padding: props.code ? 20 : 0,
        }}
      >
        <DataGrid
          // rows={rows}
          columns={columns}
          pagination
          rowCount={props.total}
          paginationMode="server"
          // pageSize={25}
          rowsPerPageOptions={[25]}
          {...rowsState}
          onPageChange={(page) => {
            // console.log("and page is ", page);
            setRowsState((prev) => ({ ...prev, page }));
          }}
          onPageSizeChange={(pageSize) =>
            setRowsState((prev) => ({ ...prev, pageSize }))
          }
        />
      </div>
    );
  };

  const Table2 = () => {
    return (
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
              {users.map((user, index) =>
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
                        {users.filter((u) => u.referrer_id == user.id).length >
                        0 ? (
                          <>
                            <Button
                              onClick={() => {
                                setUserId(user.id);
                                handleClickOpenModal();
                              }}
                              variant="outlined"
                            >
                              {
                                users.filter((u) => u.referrer_id == user.id)
                                  .length
                              }
                            </Button>
                            {showReachedUsersInModal(userId)}
                          </>
                        ) : (
                          <>
                            <Button disabled variant="outlined">
                              {
                                users.filter((u) => u.referrer_id == user.id)
                                  .length
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
                                users.filter(
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
                                users.filter(
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
    );
  };

  return (
    <>
      <Table1 />
      {/* <Table2 /> */}
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
